import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Button,
} from '@nextui-org/react';
import { AdjustmentsHorizontalIcon } from '@heroicons/react/24/outline';
import { useStore } from '../../zustand/store';
import { Subscription } from '../../utils/types';

export default function SortButton() {
  // ZUSTAND:
  const allSubscriptions = useStore((state) => state.allSubscriptions);
  const setDisplaySubscriptions = useStore(
    (state) => state.setDisplaySubscriptions,
  );

  // FUNCTIONS:
  async function handleSort(key: string) {
    const sortSubs = await allSubscriptions;
    sortSubs.sort((a: Subscription, b: Subscription) => {
      switch (key) {
        case 'alphabetical':
          return a.name.localeCompare(b.name);
        case 'billDate':
          return (
            new Date(a.billingDate).getTime() -
            new Date(b.billingDate).getTime()
          );
        case 'costDesc':
          return b.cost - a.cost;
        case 'costAsc':
          return a.cost - b.cost;
        default:
          return 0;
      }
    });
    setDisplaySubscriptions(sortSubs);
  }

  // RENDER:
  return (
    <Dropdown>
      <DropdownTrigger>
        <Button isIconOnly className="bg-transparent">
          <AdjustmentsHorizontalIcon
            width={40}
            className="cursor-pointer hover:scale-[1.1] stroke-1 stroke-white"
          />
        </Button>
      </DropdownTrigger>
      <DropdownMenu
        aria-label="Static Actions"
        onAction={(key) => handleSort(key as string)}
      >
        <DropdownItem key="alphabetical">A - Z</DropdownItem>
        <DropdownItem key="billDate">Billing Date</DropdownItem>
        <DropdownItem key="costAsc">Cost Ascending</DropdownItem>
        <DropdownItem key="costDesc">Cost Descending</DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
}
