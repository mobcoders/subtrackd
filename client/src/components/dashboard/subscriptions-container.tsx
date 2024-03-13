import { useEffect } from 'react';
import { fetchSubscriptions } from '../../services/api-service';
import FilterButton from './filter-button';
import SortButton from './sort-button';
import SubscriptionList from './subscriptions-list';
import { useStore } from '../../zustand/store';
import AddSubscriptionModal from './add-subscription-modal';
import { useAuth } from '@clerk/clerk-react';

export default function SubscriptionsContainer({ notify }) {
  const { userId, getToken } = useAuth();

  // ZUSTAND:
  const { setAllSubscriptions } = useStore();
  const allSubscriptions = useStore((state) => state.allSubscriptions);

  useEffect(() => {
    async function fetchAllSubscriptions() {
      const token = await getToken();
      const res = await fetchSubscriptions(userId, token);
      setAllSubscriptions(res);
    }
    fetchAllSubscriptions();
  }, []);

  //RENDER
  return (
    <div className="col-span-8">
      <div className="flex flex-row gap-3 w-full">
        <div className="flex flex-row justify-between w-full px-3 mb-3 items-end">
          <div className="flex flex-row justify-start gap-3">
            <FilterButton />
            <SortButton />
            <AddSubscriptionModal notify={notify} />
          </div>
          <p className="font-semibold">Payment due:</p>
        </div>
        <div className="w-[40px]"></div>
      </div>
      {allSubscriptions && <SubscriptionList notify={notify} />}
    </div>
  );
}
