import { Subscription } from '../../utils/types';
import SubscriptionItem from './subscription-item';

export default function SubscriptionList({
  setSubscriptions,
  subscriptions,
  applySortAndFilter,
}: {
  onEdit: (subscription: Subscription) => void;
  subscriptions: Subscription[];
}) {
  return (
    // RENDER:
    <div className="flex flex-col gap-3">
      {subscriptions.map((subscription) => (
        <SubscriptionItem
          key={subscription._id}
          subscription={subscription}
          setSubscriptions={setSubscriptions}
          applySortAndFilter={applySortAndFilter}
        />
      ))}
    </div>
  );
}
