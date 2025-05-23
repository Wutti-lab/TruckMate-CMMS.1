
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";
import { ReactNode } from "react";

interface InfrastructureCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  details: string[];
  recommendations?: string[];
}

export function InfrastructureCard({ 
  icon: Icon, 
  title, 
  description, 
  details, 
  recommendations 
}: InfrastructureCardProps) {
  return (
    <Card>
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
      <CardContent className="text-sm">
        <ul className="space-y-2">
          {details.map((detail, index) => (
            <li key={index}>{detail}</li>
          ))}
        </ul>
        
        {recommendations && recommendations.length > 0 && (
          <>
            <div className="border-t my-4 border-gray-200"></div>
            <h4 className="font-medium mb-2 text-fleet-700">Empfehlungen:</h4>
            <ul className="space-y-2 text-sm list-disc pl-4">
              {recommendations.map((recommendation, index) => (
                <li key={`rec-${index}`} className="text-gray-700">{recommendation}</li>
              ))}
            </ul>
          </>
        )}
      </CardContent>
    </Card>
  );
}
