import { differenceInDays, addMonths, isBefore, addYears } from 'date-fns';

function calculateRenewalText(billingDateInput: Date, monthly: boolean) {
  const today = new Date();
  let billingDate = new Date(billingDateInput);

  // Monthly subscription calculations:
  if (monthly) {
    let monthsToAdd = 0;
    while (isBefore(billingDate, today)) {
      billingDate = addMonths(new Date(billingDateInput), monthsToAdd++);
    }

    const daysLeft = differenceInDays(billingDate, today);

    if (daysLeft > 1) return `${daysLeft} days`;
    if (daysLeft === 1) return 'Tomorrow';
    if (daysLeft === 0) return 'Today';

    return 'Renewal date passed';
  } else {
    // Yearly subscription calculations:
    let yearstoAdd = 0;
    while (isBefore(billingDate, today)) {
      billingDate = addYears(new Date(billingDateInput), yearstoAdd++);
    }

    const daysLeft = differenceInDays(billingDate, today);

    if (daysLeft > 1) return `${daysLeft} days`;
    if (daysLeft === 1) return 'Tomorrow';
    if (daysLeft === 0) return 'Today';

    return 'Renewal date passed';
  }
}

export { calculateRenewalText };
