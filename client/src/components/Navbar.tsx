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
      {/* <Flex justifyContent="space-between" alignItems="center" w="full">
        <Menu>
          <MenuButton as={Button} leftIcon={<HamburgerIcon />} mr={4}>
            Sort
          </MenuButton>
          <MenuList>
            <MenuItem
              onClick={() => handleSortSelection('alphabetical')}
              role="menuitem"
            >
              Alphabetic
            </MenuItem>
            <MenuItem
              onClick={() => handleSortSelection('billDate')}
              role="menuitem"
            >
              Bill Date
            </MenuItem>
            <MenuItem
              onClick={() => handleSortSelection('mostExpensive')}
              role="menuitem"
            >
              Most Expensive
            </MenuItem>
            <MenuItem
              onClick={() => handleSortSelection('cheapest')}
              role="menuitem"
            >
              Cheapest
            </MenuItem>
          </MenuList>
        </Menu>

        <Menu>
          <MenuButton as={Button} rightIcon={<TriangleDownIcon />}>
            Filter
          </MenuButton>
          <MenuList>
            <MenuItem onClick={() => handleFilterSelection('all')}>
              All Subscriptions
            </MenuItem>
            <MenuItem onClick={() => handleFilterSelection('active')}>
              Active Subscriptions
            </MenuItem>
            <MenuItem onClick={() => handleFilterSelection('suspended')}>
              Suspended Subscriptions
            </MenuItem>
          </MenuList>
        </Menu>
      </Flex> */}
    </div>
  );
}
