import { SignIn } from '@clerk/clerk-react';

export default function SignInPage() {
  // RENDER:
  return (
    <div className="col-span-12 flex justify-center mt-20">
      {' '}
      <SignIn />
    </div>
  );
}
