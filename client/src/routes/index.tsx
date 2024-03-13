import { useAuth } from '@clerk/clerk-react';
import { Button, Card, CardBody, Image } from '@nextui-org/react';
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

  // USE EFFECT:
  useEffect(() => {
    if (userId) {
      navigate('/dashboard');
    }
  });

  // RENDER:
  return (
    <div className="mx-auto px-4 col-span-12">
      <div className="text-center">
        <h1 className="text-6xl text-blush mb-4">
          <span className="font-bold text-white">sub</span>
          <span className="font-bold text-pink">trackd</span>
        </h1>
        <p className="text-3xl mb-10 text-blush">
          The ultimate subscription management tool.
        </p>
      </div>

      <div className="flex gap-10 mb-5">
        <Image
          width={600}
          alt="subtrackd demo"
          src="/subtrackd-demo.png"
          className="p-0 m-0"
        />
        <div className="flex flex-col gap-5 w-80 justify-center items-center">
          <div className="flex gap-3">
            <Link to="/sign-in">
              <Button className="bg-pink text-white" size="lg">
                Sign in
              </Button>
            </Link>
            <Link to="/sign-up">
              <Button
                className="bg-transparent text-white border-solid border-2 border-pink hover:bg-pink"
                size="lg"
              >
                Join today
              </Button>
            </Link>
          </div>
          {info.map((information, index) => (
            <Card className="bg-transparent text-white border-solid border-2 border-pink">
              <CardBody className="text-center">
                <p className="text-xl font-semibold mb-3">
                  {information.title}
                </p>
                <p>{information.text}</p>
              </CardBody>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
