import { calculateRenewalText } from '../../utils/dateUtils';
import { Subscription } from '../../utils/types';
import { Card, CardBody } from '@nextui-org/react';
import { PencilSquareIcon } from '@heroicons/react/24/outline';
import ModifySubscriptionModal from '../../components/ModifySubscriptionModal';

export default function SubscriptionItem({
  subscription,
  setSubscriptions,
  applySortAndFilter,
}: {
  subscription: Subscription;
  onEdit: () => void;
}) {
  // FUNCTIONS:
  const renewalText = calculateRenewalText(
    new Date(subscription.billingDate),
    subscription.monthly,
  );

  // RENDER:
  return (
    <div className="flex flex-row gap-3">
      <Card className="flex-1 py-3 bg-transparent border-solid border-2 border-pink text-white hover:scale-[1.015]">
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
      <ModifySubscriptionModal
        subscription={subscription}
        setSubscriptions={setSubscriptions}
        applySortAndFilter={applySortAndFilter}
      />
    </div>
  );
}

// <Box
//   borderWidth="1px"
//   borderRadius="lg"
//   overflow="hidden"
//   p={4}
//   m={2}
//   boxShadow="lg"
//   maxW="sm"
//   display="flex"
//   justifyContent=""
//   alignItems="center"
// >
//   {/* Subscriptions Name */}
//   <Text fontSize="xl" fontWeight="bold" flexShrink={0}>
//     {subscription.name}
//   </Text>

//   <Spacer />

//   {/* Cost and Billig date info */}
//   <Flex direction="column" align="end">
//     <Text fontSize="sm">
//       ${subscription.cost} / {subscription.monthly? "Month" : "Year"}
//     </Text>
//     <Text fontSize="sm" as="i">
//       {renewalText}
//     </Text>
//   </Flex>

//   {/* edit button */}
//   <Button onClick={onEdit} colorScheme="yellow" ml={4}>
//     Edit
//   </Button>
// </Box>
