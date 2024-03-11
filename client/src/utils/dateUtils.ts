import { differenceInDays, addMonths, isBefore, addYears } from 'date-fns';

function calculateRenewalText(billingDateInput: Date, monthly: boolean) {
  const today = new Date();
  let billingDate = new Date(billingDateInput);

  if (monthly) {
    while (isBefore(billingDate, today)) {
      billingDate = addMonths(new Date(billingDateInput), 1);
    }

    const daysLeft = differenceInDays(billingDate, today);

    if (daysLeft > 1) return `${daysLeft} days left`;
    if (daysLeft === 1) return 'Renewal in 1 day';
    if (daysLeft === 0) return 'Renewal today';

    return 'Renewal date passed';
  } else {
    while (isBefore(billingDate, today)) {
      billingDate = addYears(new Date(billingDateInput), 1);
    }

    const daysLeft = differenceInDays(billingDate, today);

    if (daysLeft > 1) return `${daysLeft} days left`;
    if (daysLeft === 1) return 'Renewal in 1 day';
    if (daysLeft === 0) return 'Renewal today';

    return 'Renewal date passed';
  }
}

export { calculateRenewalText };
