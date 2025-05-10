
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Advertisement } from './types';

interface AdPreviewProps {
  ad: Omit<Advertisement, 'id' | 'active'>;
}

const AdPreview: React.FC<AdPreviewProps> = ({ ad }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>ตัวอย่าง</CardTitle>
        <CardDescription>โฆษณาของคุณจะมีลักษณะแบบนี้</CardDescription>
      </CardHeader>
      <CardContent>
        <div className={`${ad.bgColor} w-full text-white p-3 rounded-md shadow-md`}>
          <div className="flex flex-col items-center text-center px-6 py-2">
            {ad.image && (
              <div className="mb-2">
                <img 
                  src={ad.image} 
                  alt={ad.title || "ภาพโฆษณา"} 
                  className="h-12 w-auto object-contain rounded"
                />
              </div>
            )}
            <h3 className="font-bold text-sm">{ad.title || "ชื่อโฆษณา"}</h3>
            <p className="text-xs mt-1">{ad.description || "รายละเอียดโฆษณา"}</p>
            <a 
              href={ad.link || "#"} 
              className="mt-2 text-xs bg-white/20 hover:bg-white/30 transition-colors px-3 py-1 rounded-full"
            >
              เรียนรู้เพิ่มเติม
            </a>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default AdPreview;
