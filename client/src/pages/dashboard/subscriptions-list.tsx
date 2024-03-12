import SubscriptionItem from './subscription-item';
import { useStore } from '../../zustand/store';

export default function SubscriptionList({ notify }) {
  // ZUSTAND:
  const displaySubscriptions = useStore((state) => state.displaySubscriptions);

  // RENDER:
  return (
    <div className="flex flex-col gap-3">
      {displaySubscriptions.map((subscription) => (
        <SubscriptionItem
          key={subscription._id}
          subscription={subscription}
          notify={notify}
        />
      ))}
    </div>
  );
}
