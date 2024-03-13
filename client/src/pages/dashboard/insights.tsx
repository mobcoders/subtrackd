import { Card, CardHeader, CardBody, Divider } from '@nextui-org/react';
import { useStore } from '../../zustand/store';

export default function Insights() {

  //ZUSTAND
  const monthlyTotal = useStore((state) => state.monthlyTotal).toFixed(2);
 
  //Calculations
  const dailyTotal = (parseFloat(monthlyTotal)/30).toFixed(2);
  const yearlyTotal = (parseFloat(monthlyTotal) * 12).toFixed(2);

  //RENDER
  return (
    <Card
      isBlurred
      shadow="sm"
      className="col-span-4 border-none text-white bg-background/60 bg-transparent"
    >
      <CardHeader className="flex justify-center">
        <p>Insights</p>
      </CardHeader>
      <Divider />
      <CardBody className="flex flex-col justify-around">
        <div className="text-center">
          <p>
            <strong>Daily</strong>
          </p>
          <p>£{dailyTotal}</p>
        </div>
        <div className="text-center">
          <p>
            <strong>Monthly</strong>
          </p>
          <p>£{monthlyTotal}</p>
        </div>
        <div className="text-center">
          <p>
            <strong>Yearly</strong>
          </p>
          <p>£{yearlyTotal}</p>
        </div>
      </CardBody>
      <Divider />
    </Card>
  );
}
