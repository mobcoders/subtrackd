import { calculateRenewalText } from '../../utils/date-utils';
import { Subscription } from '../../utils/types';
import { Card, CardBody } from '@nextui-org/react';
import ModifySubscriptionModal from './modify-subscription-modal';

export default function SubscriptionItem({
  subscription,
  notify,
}: {
  subscription: Subscription;
}) {
  // FUNCTIONS:
  const renewalText = calculateRenewalText(
    new Date(subscription.billingDate),
    subscription.monthly,
  );

  // RENDER:
  return (
    <div className="flex flex-row">
      <Card shadow="sm" className="flex-1 py-3 border-solid border-2 border-pink text-white hover:scale-[1.015] my-1 mx-3 bg-transparent">
        <CardBody className="flex flex-row justify-between">
          {/* Subscription name: */}
          <div className="w-2/5">{subscription.name}</div>

          {/* Subscription cost: */}
          <div className="text-right w-1/5">{`£${subscription.cost.toFixed(2)}`}</div>
          {/* Subscription billing date: */}
          <div className="text-right w-2/5">{renewalText}</div>
        </CardBody>
      </Card>

      {/* Edit button: */}
      <ModifySubscriptionModal subscription={subscription} notify={notify} />
    </div>
  );
}
