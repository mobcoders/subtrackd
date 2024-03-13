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

  //RENDER
  return (
    <Card
      shadow="sm"
      className="col-span-4 text-white border-solid border-2 border-pink bg-transparent"
    >
      <CardHeader className="flex justify-center">
        <p>Insights</p>
      </CardHeader>
      <Divider />
      <CardBody className='flex flex-col items-center'>
        <Tabs aria-label="Options">
          <Tab key="daily" title="Daily">
            <Card>
              <CardBody className='text-center'>£{dailyTotal}</CardBody>
            </Card>
          </Tab>
          <Tab key="monthly" title="Monthly">
            <Card>
              <CardBody className='text-center'>£{monthlyTotal} </CardBody>
            </Card>
          </Tab>
          <Tab key="yearly" title="Yearly">
            <Card>
              <CardBody className='text-center'>
              £{yearlyTotal}
              </CardBody>
            </Card>
          </Tab>
        </Tabs>
      </CardBody>
      <Divider />
    </Card>
  );
}
