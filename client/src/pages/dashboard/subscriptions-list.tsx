import SubscriptionItem from './subscription-item';
import { useStore } from '../../zustand/store';


export default function SubscriptionList(){
  //ZUSTAND
  const displaySubscriptions = useStore((state) => state.displaySubscriptions);

  return (
    // RENDER:
    <div className="flex flex-col gap-3">
      {displaySubscriptions.map((subscription) => (
        <SubscriptionItem
          key={subscription._id}
          subscription={subscription}
        />
      ))}
    </div>
  );
}
