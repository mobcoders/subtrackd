import { Image } from '@nextui-org/react';
import Notifications from './notifications';

export default function Navbar() {
  return (
    <div className="col-span-12 flex justify-between my-12">
      <Image
        width={150}
        alt="Subtrackd Logo"
        src="/subtrackd-logo.svg"
        className="rounded-none"
      />
      <Notifications />
    </div>
  );
}
