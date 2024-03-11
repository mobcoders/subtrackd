import { differenceInDays, addMonths, isBefore, addYears } from 'date-fns';

function calculateRenewalText(billingDateInput: Date, monthly: boolean) {
  const today = new Date();
  let billingDate = new Date(billingDateInput);

  // Monthly subscription calculations:
  if (monthly) {
    while (isBefore(billingDate, today)) {
      billingDate = addMonths(new Date(billingDateInput), 1);
    }

    const daysLeft = differenceInDays(billingDate, today);

    if (daysLeft > 1) return `${daysLeft} days`;
    if (daysLeft === 1) return 'Tomorrow';
    if (daysLeft === 0) return 'Today';

    return 'Renewal date passed';
  } else {
    // Yearly subscription calculations:
    while (isBefore(billingDate, today)) {
      billingDate = addYears(new Date(billingDateInput), 1);
    }

    const daysLeft = differenceInDays(billingDate, today);

    if (daysLeft > 1) return `... in ${daysLeft}`;
    if (daysLeft === 1) return 'Tomorrow';
    if (daysLeft === 0) return 'Today';

    return 'Renewal date passed';
  }
}

export { calculateRenewalText };
