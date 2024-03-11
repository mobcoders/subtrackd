import Navbar from '../components/Navbar';
import SubscriptionsContainer from '../components/subscriptions-container';

export default function Dashboard() {
  // STATES:

  // RENDER:
  return (
    <div className="grid grid-cols-12 gap-4 px-0 mx-auto">
      <Navbar />
      <SubscriptionsContainer />
    </div>
  );
}
