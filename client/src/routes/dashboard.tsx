import { useAuth } from '@clerk/clerk-react';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import SubscriptionsContainer from '../components/dashboard/subscriptions-container';
import Insights from '../components/dashboard/insights';

export default function DashboardPage() {
  const { userId, isLoaded } = useAuth();
  const navigate = useNavigate();

  // USE EFFECT:
  useEffect(() => {
    if (!userId) {
      navigate('/sign-in');
    }
  }, []);

  // FUNCTIONS:
  function notify(type?: string): void {
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
  if (!isLoaded) return 'Loading...';

  return (
    <>
      <SubscriptionsContainer notify={notify} />
      <Insights />
      <ToastContainer />
    </>
  );
}
