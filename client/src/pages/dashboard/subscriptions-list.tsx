import SubscriptionItem from './subscription-item';
import { useStore } from '../../zustand/store';

export default function SubscriptionList({ notify }) {
  // ZUSTAND:
  const displaySubscriptions = useStore((state) => state.displaySubscriptions);

  // RENDER:
  return (
    <>
      {displaySubscriptions.length > 0 && (
        <div className="flex flex-col gap-3 overflow-y-scroll h-[500px]">
          {displaySubscriptions.map((subscription) => (
            <SubscriptionItem
              key={subscription._id}
              subscription={subscription}
              notify={notify}
            />
          ))}
        </div>
      )}
      {displaySubscriptions.length === 0 && <p>No subscriptions yet...</p>}
    </>
  );
}
