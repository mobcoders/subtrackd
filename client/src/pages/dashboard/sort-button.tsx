import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
} from '@nextui-org/react';
import { AdjustmentsHorizontalIcon } from '@heroicons/react/24/outline';

export default function SortButton({
  setSortCriteria,
}: {
  setSortCriteria: (criteria: string) => void;
}) {
  return (
    // RENDER:
    <Dropdown>
      <DropdownTrigger>
        <AdjustmentsHorizontalIcon
          width={40}
          className="cursor-pointer hover:scale-[1.1]"
        />
      </DropdownTrigger>
      <DropdownMenu
        aria-label="Static Actions"
        onAction={(key) => setSortCriteria(key)}
      >
        <DropdownItem key="alphabetical">A - Z</DropdownItem>
        <DropdownItem key="billDate">Billing Date</DropdownItem>
        <DropdownItem key="costAsc">Cost Ascending</DropdownItem>
        <DropdownItem key="costDesc">Cost Descending</DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
}

// case 'alphabetical':
//             return a.name.localeCompare(b.name);
//           case 'billDate':
//             return (
//               new Date(a.billingDate).getTime() -
//               new Date(b.billingDate).getTime()
//             );
//           case 'mostExpensive':
//             return b.cost - a.cost;
//           case 'cheapest':
//             return a.cost - b.cost;
//           default:
//             return 0;
