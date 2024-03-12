import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
} from '@nextui-org/react';
import { FunnelIcon } from '@heroicons/react/24/outline';

export default function FilterButton({
  setFilterCriteria,
}: {
  setFilterCriteria: (criteria: string) => void;
}) {
  return (
    // RENDER:
    <Dropdown>
      <DropdownTrigger>
        <FunnelIcon width={40} className="cursor-pointer hover:scale-[1.1]" />
      </DropdownTrigger>
      <DropdownMenu
        aria-label="Static Actions"
        onAction={(key) => setFilterCriteria(key as string)}
      >
        <DropdownItem key="active">Active</DropdownItem>
        <DropdownItem key="suspended">Suspended</DropdownItem>
        <DropdownItem key="all">All</DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
}
