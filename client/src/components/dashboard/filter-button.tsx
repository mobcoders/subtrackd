import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Button,
} from '@nextui-org/react';
import { FunnelIcon } from '@heroicons/react/24/outline';
import { useStore } from '../../zustand/store';
import { Subscription } from '../../utils/types';

export default function FilterButton() {
  // ZUSTAND:
  const allSubscriptions = useStore((state) => state.allSubscriptions);
  const { setDisplaySubscriptions } = useStore();

  // FUNCTIONS:
  function handleFilter(filterBy: string) {
    if (filterBy === 'all') {
      setDisplaySubscriptions(allSubscriptions);
    } else {
      setDisplaySubscriptions(
        allSubscriptions.filter((subscription: Subscription) =>
          filterBy === 'active'
            ? subscription.active === true
            : subscription.active === false,
        ),
      );
    }
  }

  // RENDER:
  return (
    <Dropdown>
      <DropdownTrigger>
        <Button isIconOnly className="bg-transparent">
          <FunnelIcon
            width={40}
            className="cursor-pointer hover:scale-[1.1] stroke-1 stroke-white"
          />
        </Button>
      </DropdownTrigger>
      <DropdownMenu
        aria-label="Static Actions"
        onAction={(key) => handleFilter(key as string)}
      >
        <DropdownItem key="active">Active</DropdownItem>
        <DropdownItem key="suspended">Suspended</DropdownItem>
        <DropdownItem key="all">All</DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
}
