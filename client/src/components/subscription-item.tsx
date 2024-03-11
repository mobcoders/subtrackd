import { calculateRenewalText } from '../utils/dateUtils';
import { Subscription } from '../utils/types';
import { Card, CardBody } from '@nextui-org/react';
import { PencilSquareIcon } from '@heroicons/react/24/outline';

export default function SubscriptionItem({
  subscription,
  onEdit,
}: {
  subscription: Subscription;
  onEdit: () => void;
}) {
  const renewalText = calculateRenewalText(
    new Date(subscription.billingDate),
    subscription.monthly,
  );

  return (
    <div className="flex flex-row gap-3">
      <Card className="flex-1 bg-transparent border-solid border-2 border-light-purple text-white">
        <CardBody className="flex flex-row justify-between">
          <div className="w-2/5">{subscription.name}</div>
          <div className="text-right w-1/5">{`£${subscription.cost.toFixed(2)}`}</div>
          <div className="text-right w-2/5">{renewalText}</div>
        </CardBody>
      </Card>
      <PencilSquareIcon width={30} />
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
