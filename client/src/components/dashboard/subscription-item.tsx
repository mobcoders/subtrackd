import { calculateRenewalText } from '../../utils/date-utils';
import { Subscription } from '../../utils/types';
import { Card, CardBody } from '@nextui-org/react';
import ModifySubscriptionModal from './modify-subscription-modal';

export default function SubscriptionItem({
  subscription,
  notify,
}: {
  subscription: Subscription;
  notify: (type: string) => void;
}) {
  // FUNCTIONS:
  const renewalText = calculateRenewalText(
    new Date(subscription.billingDate),
    subscription.monthly,
  );

  // RENDER:
  return (
    <div className="flex flex-row">
      <Card
        shadow="sm"
        className={
          (subscription.active
            ? 'bg-transparent text-white border-pink'
            : 'bg-[rgba(21,1,49,0.5)] text-light-purple border-light-purple') +
          ' flex-1 py-1 border-solid border-2  hover:scale-[1.015] my-1 mx-3'
        }
      >
        <CardBody className="flex flex-row items-center">
          {/* Subscription name: */}
          <div className="w-64">{subscription.name}</div>

          {/* Subscription cost: */}
          <div className="text-right grow">{`£${subscription.cost.toFixed(2)}`}</div>
          {/* Subscription billing date: */}
          <div className="text-right grow">{renewalText}</div>

          {/* Edit button: */}
          <div className="grow-0 pl-20 flex justify-end">
            <ModifySubscriptionModal
              subscription={subscription}
              notify={notify}
            />
          </div>
        </CardBody>
      </Card>
    </div>
  );
}
