import { useState, useEffect, useCallback } from 'react';
import { Subscription } from '../../utils/types';
import { fetchSubscriptions } from '../../services/apiService';
import FilterButton from './filter-button';
import SortButton from './sort-button';
import SubscriptionList from './subscriptions-list';
import { useStore } from '../../zustand/store';
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
  
  const [filterCriteria, setFilterCriteria] = useState('all');

  // ZUSTAND:
  const { setAllSubscriptions } = useStore();
  const allSubscriptions = useStore((state) => state.allSubscriptions);

  useEffect(() => {
    async function fetchAllSubscriptions() {
      const res = await fetchSubscriptions();
      setAllSubscriptions(res);
    }
    fetchAllSubscriptions();
  }, []);

  

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


  // RENDER:
  if (subscriptions) {
    return (
      <div className="col-span-8">
        <div className="flex flex-row gap-3 w-full">
          <div className="flex flex-row justify-between w-full px-3 mb-3 items-end">
            <div className="flex flex-row justify-start gap-3">
              <FilterButton setFilterCriteria={setFilterCriteria} />
              <SortButton/>
            </div>
            <p className="font-semibold">Payment due:</p>
          </div>

          <div className="w-[30px]"></div>
        </div>
        <SubscriptionList onEdit={handleEdit} subscriptions={subscriptions} />
        {/* filter buttons, sort, and payment due text */}
      </div>
    );
  }
}
