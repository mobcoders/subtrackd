import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Navbar from '../../components/nav';
import SubscriptionsContainer from './subscriptions-container';

export default function Dashboard() {
  function notify(type: string) {
    switch (type) {
      case 'add':
        toast('Subscription successfully added!');
        break;
      case 'modify':
        toast('Subscription successfully modified!');
        break;
      case 'delete':
        toast('Subscription successfully deleted!');
        break;
      default:
        console.error('Unexpected toast input');
    }
  }

  // RENDER:
  return (
    <div className="grid grid-cols-12 gap-4 px-0 mx-auto">
      <Navbar />
      <SubscriptionsContainer notify={notify} />
      <div>
        <ToastContainer />
      </div>
    </div>
  );
}
