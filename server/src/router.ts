import express from 'express';
export const router = express.Router();
import { getSubs, addSub, editSub, deleteSub, getNotification } from './controllers/controllers';
import { ClerkExpressRequireAuth } from '@clerk/clerk-sdk-node'
import {
    PasswordlessClient,
    PasswordlessOptions,
    RegisterOptions,
    RegisterTokenResponse, VerifiedUser
} from "@passwordlessdev/passwordless-nodejs";
import SigninRequest from './SigninRequest';
import SignupRequest from './SignupRequest';
import { User } from './models/user';

const config = {
  clerkSecretKey: process.env.CLERK_SECRET_KEY,
}

router.get('/subscriptions/:userid', ClerkExpressRequireAuth(), getSubs);
router.post('/subscriptions/:userid',ClerkExpressRequireAuth(), addSub);
router.put('/subscriptions/:id/:userid',ClerkExpressRequireAuth() ,editSub)
router.delete('/subscriptions/:id/:userid',ClerkExpressRequireAuth(), deleteSub)
router.get('/notifications/:userid',ClerkExpressRequireAuth() ,getNotification)
router.post('/users/register', async (req, res) => {
    const signupRequest: SignupRequest = req.body;
    // const repository: UserRepository = new UserRepository();
    let id: string = null;
    try {
        const newUser = await User.create(signupRequest.username);
        id = newUser._id as unknown as string;
    } catch {
        // do error handling, creating user failed.
    }

    if (!id) {
        // Do not proceed to create a token, we failed to create a user.
        res.send(400);
    }

    let registerOptions = new RegisterOptions();
    registerOptions.userId = id;
    registerOptions.username = signupRequest.username;

    // Setting an alias is optional, you can define multiple unique aliases, but we're only setting one.
    if (signupRequest.alias) {
        registerOptions.aliases = new Array(1);
        registerOptions.aliases[0] = signupRequest.alias;
    }

    registerOptions.discoverable = true;

    const passwordlessOptions: PasswordlessOptions = {
        baseUrl: process.env.PASSWORDLESS_API as string
    }
    const passwordlessClient = new PasswordlessClient(
        process.env.PASSWORDLESS_SECRET as string,
        passwordlessOptions
    );
    const token: RegisterTokenResponse = await passwordlessClient.createRegisterToken(registerOptions);
    res.send(token);
});
