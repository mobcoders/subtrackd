import { SignUp } from '@clerk/clerk-react';

export default function SignUpPage() {
  // RENDER:
  return (
    <div className="col-span-12 flex justify-center mt-20">
      <SignUp />{' '}
    </div>
  );
}
