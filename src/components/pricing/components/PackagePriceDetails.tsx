
interface PackagePriceDetailsProps {
  subscriptionPrice: number;
  hostingPrice: number;
  subscriptionText: string;
  hostingText: string;
  isYearly: boolean;
  thbMonth: string;
  includedText: string;
}

export function PackagePriceDetails({
  subscriptionPrice,
  hostingPrice,
  subscriptionText,
  hostingText,
  isYearly,
  thbMonth,
  includedText
}: PackagePriceDetailsProps) {
  return (
    <div>
      <p className="font-medium mb-1">{includedText}:</p>
      <ul className="space-y-1 list-disc pl-5">
        <li>
          {subscriptionText}: {isYearly ? Math.round(subscriptionPrice * 0.9) : subscriptionPrice} {thbMonth}
        </li>
        <li>
          {hostingText}: {isYearly ? Math.round(hostingPrice * 0.9) : hostingPrice} {thbMonth}
        </li>
      </ul>
    </div>
  );
}
