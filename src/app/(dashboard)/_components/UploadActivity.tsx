'use client';

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Line, LineChart, ResponsiveContainer, XAxis, YAxis, CartesianGrid, Tooltip } from "recharts";

const uploadData = [
  { name: "Jan", uploads: 20 },
  { name: "Feb", uploads: 35 },
  { name: "Mar", uploads: 50 },
  { name: "Apr", uploads: 68 },
];

export function UploadActivityChart() {
  return (
    <Card className="bg-[#000000B2] border-[#00FFFF] shadow-[0px_0px_10px_0px_#0000001A] rounded-2xl overflow-hidden">
      <CardHeader>
        <CardTitle className="text-xl font-medium text-cyan-400">Upload Activity</CardTitle>
      </CardHeader>
      <CardContent className="h-[300px] p-6 pt-0">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={uploadData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
            {/* ড্যাশড গ্রিড লাইন */}
            <CartesianGrid strokeDasharray="3 3" stroke="#111827" vertical={false} />
            
            <XAxis 
              dataKey="name" 
              stroke="#6b7280" 
              fontSize={12}
              tickLine={false}
              axisLine={false}
              padding={{ left: 10, right: 10 }}
            />
            
            <YAxis 
              stroke="#6b7280" 
              fontSize={12}
              tickLine={false}
              axisLine={false}
              tickFormatter={(value) => `${value}`}
            />
            
            <Tooltip 
              contentStyle={{ background: "#0f172a", border: "1px solid #1e293b", color: "white" }} 
              labelStyle={{ color: "#22d3ee" }}
            />
            
            {/* মেইন লাইন: সায়ান কালার এবং গ্লোয়িং ডট */}
            <Line 
              type="linear" 
              dataKey="uploads" 
              stroke="#22d3ee" 
              strokeWidth={2}
              dot={{ stroke: "#22d3ee", strokeWidth: 2, r: 6, fill: "#0f172a" }}
              activeDot={{ r: 8, stroke: "#22d3ee", fill: "#22d3ee" }}
            />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}