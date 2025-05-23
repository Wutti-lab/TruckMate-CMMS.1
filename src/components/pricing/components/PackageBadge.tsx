
import { Badge } from "@/components/ui/badge";

interface PackageBadgeProps {
  text: string;
  variant: "blue" | "green" | "purple";
}

export function PackageBadge({ text, variant }: PackageBadgeProps) {
  const getBadgeStyles = () => {
    switch (variant) {
      case "blue":
        return "bg-blue-50 text-blue-600 border-blue-200";
      case "green":
        return "bg-green-50 text-green-600 border-green-200";
      case "purple":
        return "bg-purple-50 text-purple-600 border-purple-200";
      default:
        return "bg-blue-50 text-blue-600 border-blue-200";
    }
  };

  return (
    <Badge variant="outline" className={`mx-auto mb-2 ${getBadgeStyles()}`}>
      {text}
    </Badge>
  );
}
