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
        <h1 className="text-6xl text-blush relative inline-block">
          <span className="font-bold text-white">sub</span>
          <span className="font-bold text-pink relative">
            trackd
            <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-full w-full h-12">
              <div className="absolute top-0 left-0 w-full h-full animate-spin-slow">
                <img
                  src="/netflix-logo.png"
                  alt="Logo 1"
                  className="absolute top-0 left-0 w-8 h-8 transform translate-x-[50%] translate-y-[50%] animate-orbit-1"
                />
                <img
                  src="/disneyplus-logo.png"
                  alt="Logo 2"
                  className="absolute top-0 left-0 w-8 h-8 transform translate-x-[50%] translate-y-[50%] animate-orbit-2"
                />
                <img
                  src="/youtube-logo.jpg"
                  alt="Logo 3"
                  className="absolute top-0 left-0 w-8 h-8 transform translate-x-[50%] translate-y-[50%] animate-orbit-3"
                />
                <img
                  src="/paramountplus-logo.png"
                  alt="Logo 4"
                  className="absolute top-0 left-0 w-8 h-8 transform translate-x-[50%] translate-y-[50%] animate-orbit-4"
                />
                <img
                  src="/hulu-logo.png"
                  alt="Logo 5"
                  className="absolute top-0 left-0 w-8 h-8 transform translate-x-[50%] translate-y-[50%] animate-orbit-5"
                />
                <img
                  src="/gousto-logo.png"
                  alt="Logo 6"
                  className="absolute top-0 left-0 w-8 h-8 transform translate-x-[50%] translate-y-[50%] animate-orbit-6"
                />
                <img
                  src="/hellofresh-logo.png"
                  alt="Logo 7"
                  className="absolute top-0 left-0 w-8 h-8 transform translate-x-[50%] translate-y-[50%] animate-orbit-7"
                />
                <img
                  src="/amazonprime-logo.png"
                  alt="Logo 8"
                  className="absolute top-0 left-0 w-8 h-8 transform translate-x-[50%] translate-y-[50%] animate-orbit-8"
                />
                {/* Add more logo images as needed */}
              </div>
            </div>
          </span>
        </h1>
        <p className="text-3xl mt-4 text-blush">
          The ultimate subscription management tool.
        </p>
      </div>
      <div className="grid grid-cols-3 gap-4 my-8 mx-48">
        {info.map((information, index) => (
          <Card
            key={index}
            className="bg-transparent text-white border-solid border-2 border-pink"
          >
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
