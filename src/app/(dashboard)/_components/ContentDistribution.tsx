'use client';

import React from 'react'; // React ইমপোর্ট নিশ্চিত করুন
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// Cell ইমপোর্ট করুন এখান থেকে
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, CartesianGrid, Tooltip, Cell } from "recharts";

const distributionData = [
  { name: "Videos", value: 1200, color: "#22d3ee" }, // Cyan
  { name: "Images", value: 3700, color: "#4ade80" }, // Green
  { name: "Clips", value: 900, color: "#f8fafc" },  // White
];

export function ContentDistributionChart() {
  return (
    <Card className="bg-[#000000B2] border-[#00FFFF] shadow-[0px_0px_10px_0px_#0000001A] rounded-2xl overflow-hidden">
      <CardHeader>
        <CardTitle className="text-xl font-medium text-cyan-400">Content Distribution</CardTitle>
      </CardHeader>
      <CardContent className="h-[300px] p-6 pt-0">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={distributionData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#111827" vertical={false} />
            
            <XAxis 
              dataKey="name" 
              stroke="#6b7280" 
              fontSize={12}
              tickLine={false}
              axisLine={false}
            />
            
            <YAxis 
              stroke="#6b7280" 
              fontSize={12}
              tickLine={false}
              axisLine={false}
            />
            
            <Tooltip 
              contentStyle={{ background: "#0f172a", border: "1px solid #1e293b", color: "white" }}
              cursor={{ fill: 'transparent' }}
            />
            
            <Bar 
              dataKey="value" 
              radius={[10, 10, 0, 0]} 
              barSize={50}
            >
              {/* এখানে 'cell' এর বদলে 'Cell' (Capital C) ব্যবহার করা হয়েছে */}
              {
                distributionData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))
              }
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}