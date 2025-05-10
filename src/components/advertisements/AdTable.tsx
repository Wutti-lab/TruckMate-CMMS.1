
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Advertisement } from './types';
import { useLanguage } from '@/contexts/LanguageContext';

interface AdTableProps {
  advertisements: Advertisement[];
  onToggleStatus: (id: string) => void;
  onDelete: (id: string) => void;
}

const AdTable: React.FC<AdTableProps> = ({ advertisements, onToggleStatus, onDelete }) => {
  const { t } = useLanguage();
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>{t("manageAds")}</CardTitle>
        <CardDescription>{t("allExistingAds")}</CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>{t("title")}</TableHead>
              <TableHead>{t("description")}</TableHead>
              <TableHead>{t("image")}</TableHead>
              <TableHead>{t("status")}</TableHead>
              <TableHead className="text-right">{t("actions")}</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {advertisements.map((ad) => (
              <TableRow key={ad.id}>
                <TableCell className="font-medium">{ad.title}</TableCell>
                <TableCell>{ad.description}</TableCell>
                <TableCell>
                  {ad.image ? (
                    <img 
                      src={ad.image} 
                      alt={ad.title} 
                      className="h-8 w-auto object-contain"
                    />
                  ) : (
                    <span className="text-gray-400">-</span>
                  )}
                </TableCell>
                <TableCell>
                  <span className={`px-2 py-1 rounded-full text-xs ${ad.active ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>
                    {ad.active ? t("active") : t("inactive")}
                  </span>
                </TableCell>
                <TableCell className="text-right space-x-2">
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => onToggleStatus(ad.id)}
                  >
                    {ad.active ? t("deactivate") : t("activate")}
                  </Button>
                  <Button 
                    variant="destructive" 
                    size="sm"
                    onClick={() => onDelete(ad.id)}
                  >
                    {t("delete")}
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default AdTable;
