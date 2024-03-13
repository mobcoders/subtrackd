import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import SubscriptionsContainer from '../components/dashboard/subscriptions-container';
import Insights from '../components/dashboard/insights';
import * as React from 'react'
import { useAuth } from "@clerk/clerk-react"
import { useNavigate } from "react-router-dom"

export default function DashboardPage() {
  const { userId, isLoaded } = useAuth()
  const navigate = useNavigate()

  console.log('test', userId)

  React.useEffect(() => {
    if (!userId) {
      navigate("/sign-in")
    }
  }, [])

  if (!isLoaded) return "Loading..."

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
    <>
      <SubscriptionsContainer notify={notify} />
      <Insights/>
      <ToastContainer />
    </>
  );
}
