import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Button,
} from '@nextui-org/react';
import { FunnelIcon } from '@heroicons/react/24/outline';

export default function FilterButton({ setFilterCriteria }) {
  return (
    <Dropdown>
      <DropdownTrigger>
        <FunnelIcon width={40} />
      </DropdownTrigger>
      <DropdownMenu
        aria-label="Static Actions"
        onAction={(key) => setFilterCriteria(key)}
      >
        <DropdownItem key="active">Active</DropdownItem>
        <DropdownItem key="suspended">Suspended</DropdownItem>
        <DropdownItem key="all">All</DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
}
