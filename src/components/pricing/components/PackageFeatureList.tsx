
interface PackageFeatureListProps {
  features: string[];
  featuresText: string;
}

export function PackageFeatureList({ features, featuresText }: PackageFeatureListProps) {
  return (
    <div>
      <p className="font-medium mb-1">{featuresText}:</p>
      <ul className="space-y-1 list-disc pl-5">
        {features.map((feature, index) => (
          <li key={index}>{feature}</li>
        ))}
      </ul>
    </div>
  );
}
