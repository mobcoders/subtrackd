import {
  Card,
  CardHeader,
  CardBody,
  Divider,
  Tab,
  Tabs,
} from '@nextui-org/react';
import { useStore } from '../../zustand/store';

export default function Insights() {
  //ZUSTAND
  const monthlyTotal = useStore((state) => state.monthlyTotal).toFixed(2);

  //Calculations
  const dailyTotal = (parseFloat(monthlyTotal) / 30).toFixed(2);
  const yearlyTotal = (parseFloat(monthlyTotal) * 12).toFixed(2);

  const insights = [
    { title: 'Daily', amount: dailyTotal },
    { title: 'Monthly', amount: monthlyTotal },
    { title: 'Yearly', amount: yearlyTotal },
  ];

  //RENDER
  return (
    <Card shadow="none" className="col-span-4 text-white bg-transparent">
      <CardHeader className="flex justify-center">
        <p className="font-semibold">Insights</p>
      </CardHeader>
      <CardBody className="flex flex-col items-center">
        <Tabs aria-label="Options" radius="full" color="secondary">
          {insights.map((insight, index) => (
            <Tab key={index} title={insight.title}>
              <Card className="flex justify-center text-white border-solid border-2 border-pink bg-transparent w-80 h-80">
                <p className="text-center text-5xl">£{insight.amount}</p>
              </Card>
            </Tab>
          ))}
        </Tabs>
      </CardBody>
      <Divider />
    </Card>
  );
}
