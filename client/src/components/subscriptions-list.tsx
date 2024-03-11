import { Subscription } from '../utils/types';
import SubscriptionItem from './subscription-item';
import { Flex, Box } from '@chakra-ui/react';

export default function SubscriptionList({
  onEdit,
  subscriptions,
}: {
  onEdit: (subscription: Subscription) => void;
  subscriptions: Subscription[];
}) {
  return (
    <div className="flex flex-col gap-3">
      {subscriptions.map((subscription) => (
        <SubscriptionItem
          key={subscription._id}
          subscription={subscription}
          onEdit={() => onEdit(subscription)}
        />
      ))}
    </div>
  );
}
