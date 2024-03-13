import { useAuth } from '@clerk/clerk-react';
import { Button, Card, CardBody } from '@nextui-org/react';
import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function IndexPage() {
  const { userId } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (userId) {
      navigate('/dashboard');
    }
  });
  return (
    <div className="container mx-auto px-4 col-span-12">
      <div className="text-center my-10">
        <h1 className="text-5xl font-bold">Welcome to SubTrackd</h1>
        <p className="text-xl mt-4">Your Ultimate Subscription Management Tool!</p>
      </div>

      <div className="my-6">
        <p className="text-center text-lg">Never Lose Track of Your Subscriptions Again!</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-8">
        <Card isHoverable isPressable>
          <CardBody>
            <p className="text-lg font-semibold">Real-Time Tracking</p>
            <p>View and organize all your subscriptions in one place.</p>
          </CardBody>
        </Card>

        <Card isHoverable isPressable>
          <CardBody>
            <p className="text-lg font-semibold">Daily, Monthly, and Yearly Totals</p>
            <p>Understand your spending at a glance.</p>
          </CardBody>
        </Card>

        <Card isHoverable isPressable>
          <CardBody>
            <p className="text-lg font-semibold">Next Billing Cycle Notifications</p>
            <p>Stay ahead with timely reminders.</p>
          </CardBody>
        </Card>
      </div>

      <div className="text-center my-10">
        <h4 className="text-2xl font-bold">Why SubTrackd?</h4>
        <p className="mt-4">Join SubTrackd today and take control of your subscriptions.</p>
        <Link to="/sign-in"><Button className='mt-6 mx-3'>Sign in</Button></Link>
        <Link to="/sign-up"><Button className='mt-6 mx-3'>Sign up</Button></Link>

      </div>
    </div>
  );
}
