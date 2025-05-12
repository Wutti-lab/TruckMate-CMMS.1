
import React from "react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AppFunction } from "./types";
import { getLocalizedTitle, getLocalizedDescription } from "./utils";

interface FunctionCardProps {
  func: AppFunction;
  language: string;
}

export function FunctionCard({ func, language }: FunctionCardProps) {
  return (
    <Link to={func.path} className="block transition-transform hover:scale-105">
      <Card className="h-full border border-gray-200 hover:border-fleet-500 hover:shadow-md transition-all">
        <CardHeader className="pb-2">
          <div className="flex items-start justify-between">
            <CardTitle className="text-lg font-medium flex items-center gap-2">
              <func.icon className="h-5 w-5 text-fleet-600" />
              {getLocalizedTitle(func, language)}
            </CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">
            {getLocalizedDescription(func, language)}
          </p>
        </CardContent>
      </Card>
    </Link>
  );
}
