import { useEffect } from 'react';
import { fetchSubscriptions } from '../../services/apiService';
import FilterButton from './filter-button';
import SortButton from './sort-button';
import SubscriptionList from './subscriptions-list';
import { useStore } from '../../zustand/store';
import AddSubscriptionModal from '../../components/AddSubscriptionModal';

export default function SubscriptionsContainer({ notify }) {
  // ZUSTAND:
  const { setAllSubscriptions, setDisplaySubscriptions } = useStore();
  const allSubscriptions = useStore((state) => state.allSubscriptions);

  useEffect(() => {
    async function fetchAllSubscriptions() {
      const res = await fetchSubscriptions();
      setAllSubscriptions(res);
      setDisplaySubscriptions(res);
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
          </div>
          <p className="font-semibold">Payment due:</p>
        </div>
        <AddSubscriptionModal />
      </div>
      {allSubscriptions && <SubscriptionList notify={notify} />}
    </div>
  );
}
