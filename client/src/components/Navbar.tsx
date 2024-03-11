import {
  Box,
  Flex,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Text,
} from '@chakra-ui/react';
import { HamburgerIcon, TriangleDownIcon } from '@chakra-ui/icons';
import { Image } from '@nextui-org/react';

export default function Navbar({
  setSortCriteria,
  setFilterCriteria,
}: {
  setSortCriteria: (criteria: string) => void;
  setFilterCriteria: (criteria: string) => void;
}) {
  const handleSortSelection = (criteria: string) => {
    setSortCriteria(criteria);
  };

  const handleFilterSelection = (criteria: string) => {
    setFilterCriteria(criteria);
  };
  return (
    <>
      <Image
        width={150}
        alt="Subtrackd Logo"
        src="/subtrackd-logo.svg"
        className="rounded-none"
      />
      <Flex justifyContent="space-between" alignItems="center" w="full">
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

        <Flex flexDirection="column" align="center">
          <Text
            fontSize="4xl"
            fontWeight="bold"
            fontFamily="'Poppins', sans-serif"
            color="teal"
            as="i"
          >
            onTrial
          </Text>
          <Text
            fontSize="sm"
            color="gray.500"
            fontFamily="'Poppins', sans-serif"
            as="i"
          >
            subscriptions tracker
          </Text>
        </Flex>

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
      </Flex>
    </>
  );
}
