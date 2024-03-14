# subtrackd

## Overview

**subtrackd** enables users to effectively manage their subscriptions. Users can view, add, update, and delete subscriptions, as well as receive timely in-app notifications for upcoming payments.

## Features

- **OAuth**: Sign in or sign up through Clerk to access your **subtrackd** account.
- **CRUD Operations**: Add, update, and delete subscriptions with ease.
- **View Subscriptions**: See all subscriptions or filter subscriptions on a more granular level.
- **In-App Notifications**: Using cronJob.

## Prerequisites

- Node.js (version 14+ recommended)
- MongoDB (local installation or MongoDB Atlas cluster)
- npm (included with Node.js)

## Deployed Version

**subtrackd** is deployed [here](https://symphonious-starlight-f902b2.netlify.app/). Create an account to start using the up-to-date build.

## Local Version

Alternatively, you can run **subrtrackd** locally.

1. Navigate to chosen location and clone the repository:

```
git clone https://github.com/mobcoders/subtrackd.git (HTTPS)
git clone git@github.com:mobcoders/subtrackd.git (SSH)
```

2. Create a .env file in /server with the following fields:

```
PORT="Add custom port or app will default to port 3000"
MONGODB_URI="Create a remote MongoDB database and add the URI here"
CLERK_SECRET_KEY="Create a Clerk application, navigate to API keys and add its secret key here"
```

3. Create a .env.local file in the client/src with the following fields:

```
VITE_CLERK_PUBLISHABLE_KEY="From the Clerk application's API keys, add its publishable key here"
```

4. Create new terminal, install the server dependencies and run the server:

```
$ cd server/
npm install
npm start
```

5. Create another new terminal, install the client dependencies and run the client:

```
$ cd client/
npm install
npm run dev
```

**subtrackd** will be running at: http://localhost:5173/
