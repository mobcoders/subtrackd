import { useAuth } from '@clerk/clerk-react';
import { Button, Card, CardBody } from '@nextui-org/react';
import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function IndexPage() {
  const { userId } = useAuth();
  const navigate = useNavigate();
  const info = [
    {
      title: 'Real-time tracking',
      text: 'View and organize all your subscriptions in one place.',
    },
    {
      title: 'Daily, monthly, and yearly totals',
      text: 'Understand your spending at a glance.',
    },
    {
      title: 'Payment notifications',
      text: 'Stay ahead with timely reminders.',
    },
  ];

  useEffect(() => {
    if (userId) {
      navigate('/dashboard');
    }
  });
  return (
    <div className="container mx-auto px-4 col-span-12">
      <div className="text-center my-10">
        <h1 className="text-6xl text-blush">
          <span className="font-bold text-white">sub</span>
          <span className="font-bold text-pink">trackd</span>
        </h1>
        <p className="text-3xl mt-4 text-blush">
          The ultimate subscription management tool.
        </p>
      </div>

      <div className="grid grid-cols-3 gap-4 my-8 mx-48">
        {info.map((information, index) => (
          <Card className="bg-transparent text-white border-solid border-2 border-pink">
            <CardBody className="text-center">
              <p className="text-xl font-semibold mb-3">{information.title}</p>
              <p>{information.text}</p>
            </CardBody>
          </Card>
        ))}
      </div>

      <div className="text-center my-10">
        <p className="mt-4 text-2xl ">
          Join today to take control of your subscriptions.
        </p>
        <Link to="/sign-in">
          <Button className="mt-6 mx-3 bg-pink text-white" size="lg">
            Sign in
          </Button>
        </Link>
        <Link to="/sign-up">
          <Button
            className="mt-6 mx-3 bg-transparent border-solid border-2 border-pink text-white hover:bg-pink"
            size="lg"
          >
            Sign up
          </Button>
        </Link>
      </div>
    </div>
  );
}
