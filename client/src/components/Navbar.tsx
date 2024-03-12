import { Image } from '@nextui-org/react';

export default function Navbar() {
  return (
    <div className="col-span-12 my-12">
      <Image
        width={150}
        alt="Subtrackd Logo"
        src="/subtrackd-logo.svg"
        className="rounded-none"
      />
    </div>
  );
}
