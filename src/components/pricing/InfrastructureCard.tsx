
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";

interface InfrastructureCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  details: string[];
  recommendations?: string[];
  saasFeatures?: string[];
}

export function InfrastructureCard({ 
  icon: Icon, 
  title, 
  description, 
  details, 
  saasFeatures
}: InfrastructureCardProps) {
  return (
    <Card className="flex flex-col h-full">
      <CardHeader className="space-y-1">
        <div className="flex items-center justify-center mb-2">
          <div className="p-2 rounded-full bg-fleet-50">
            <Icon className="h-6 w-6 text-fleet-600" />
          </div>
        </div>
        <CardTitle className="text-center">{title}</CardTitle>
        <CardDescription className="text-center">
          {description}
        </CardDescription>
      </CardHeader>
      <CardContent className="text-sm flex-grow">
        <ul className="space-y-2">
          {details.map((detail, index) => (
            <li key={index} className="flex items-start">
              <span className="mr-2">•</span>
              {detail}
            </li>
          ))}
        </ul>
        
        {saasFeatures && saasFeatures.length > 0 && (
          <>
            <div className="border-t my-4 border-gray-200"></div>
            <h4 className="font-medium mb-2 text-fleet-700">SaaS-Vorteile:</h4>
            <ul className="space-y-2 text-sm list-disc pl-4">
              {saasFeatures.map((feature, index) => (
                <li key={`saas-${index}`} className="text-gray-700">{feature}</li>
              ))}
            </ul>
          </>
        )}
      </CardContent>
    </Card>
  );
}
