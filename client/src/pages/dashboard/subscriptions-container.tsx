import { useState, useEffect, useCallback } from 'react';
import { Subscription } from '../../utils/types';
import { fetchSubscriptions } from '../../services/apiService';
import FilterButton from './filter-button';
import SortButton from './sort-button';
import SubscriptionList from './subscriptions-list';
// import AddEditSubscriptionForm from '../../components/AddEditSubscriptionForm';
// import Notifications from '../../components/Notifications';
// import { HamburgerIcon, TriangleDownIcon } from '@chakra-ui/icons';
// import { Card, CardBody } from '@nextui-org/react';
// import { PencilSquareIcon } from '@heroicons/react/24/outline';

export default function SubscriptionsContainer() {
  // STATES:
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [currentSubscription, setCurrentSubscription] = useState<
    Subscription | undefined
  >(undefined);
  const [subscriptions, setSubscriptions] = useState<Subscription[]>([]);
  const [sortCriteria, setSortCriteria] = useState('');
  const [filterCriteria, setFilterCriteria] = useState('all');

  // FUNCTIONS:
  // Define applySortAndFilter inside useCallback to memoize it
  const applySortAndFilter = useCallback(
    (data: Subscription[]) => {
      let result = data;

      // Filter:
      if (filterCriteria !== 'all') {
        result = result.filter((sub: Subscription) =>
          filterCriteria === 'active'
            ? sub.active === true
            : sub.active === false,
        );
      }

      // Sort:
      result.sort((a: Subscription, b: Subscription) => {
        switch (sortCriteria) {
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

      setSubscriptions(result);
    },
    [filterCriteria, sortCriteria],
  );

  // Fetch and refresh subscriptions
  const refreshSubscriptions = useCallback(async () => {
    try {
      const data = await fetchSubscriptions();
      applySortAndFilter(data);
    } catch (error) {
      console.error('Error fetching subscriptions:', error);
    }
  }, [applySortAndFilter]);

  // Handle subscription edits:
  function handleEdit(subscription: Subscription) {
    setCurrentSubscription(subscription);
    setIsFormOpen(true);
  }

  // function handleClose() {
  //   setIsFormOpen(false);
  //   setCurrentSubscription(undefined);
  //   refreshSubscriptions();
  // }

  // const totalCost = subscriptions
  //   .filter((sub) => sub.active === true)
  //   .reduce((acc, curr) => acc + curr.cost, 0);
  // const averageExpenses = totalCost.toFixed(2);

  // const handleSortSelection = (criteria: string) => {
  //   setSortCriteria(criteria);
  // };

  // const handleFilterSelection = (criteria: string) => {
  //   setFilterCriteria(criteria);
  // };

  // EFFECTS:
  useEffect(() => {
    refreshSubscriptions();
  }, [refreshSubscriptions]);

  // RENDER:
  if (subscriptions) {
    return (
      <div className="col-span-8">
        <div className="flex flex-row gap-3 w-full">
          <div className="flex flex-row justify-between w-full px-3 mb-3 items-end">
            <div className="flex flex-row justify-start gap-3">
              <FilterButton setFilterCriteria={setFilterCriteria} />
              <SortButton setSortCriteria={setSortCriteria} />
            </div>
            <p className="font-semibold">Payment due:</p>
          </div>

          <div className="w-[30px]"></div>
        </div>
        <SubscriptionList onEdit={handleEdit} subscriptions={subscriptions} />
        {/* filter buttons, sort, and payment due text */}

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
        </Flex>

        <Flex justifyContent="space-between" alignItems="center">
          <Text fontSize="2xl" fontWeight="bold">
            Subscriptions
          </Text>
          <Notifications />
          <Button colorScheme="teal" onClick={() => setIsFormOpen(true)}>
            Add Subscription
          </Button>
        </Flex>
        <Box flex="1" overflowY="auto">
          <SubscriptionList subscriptions={subscriptions} onEdit={handleEdit} />
        </Box>
        {isFormOpen && (
          <AddEditSubscriptionForm
            isOpen={isFormOpen}
            onClose={handleClose}
            subscription={currentSubscription}
            refreshSubscriptions={refreshSubscriptions}
          />
        )}
        <Flex
          justifyContent="space-between"
          alignItems="center"
          p={2}
          bg="gray.200"
          borderRadius="xl"
        >
          <Box borderRadius="lg">
            <Text fontSize="xl">Average Expenses</Text>
            <Text fontSize="sm" as="i" fontStyle="italic">
              per month
            </Text>
          </Box>
          <Text fontSize="xl">${averageExpenses}</Text>
        </Flex> */}
      </div>
    );
  }
}
