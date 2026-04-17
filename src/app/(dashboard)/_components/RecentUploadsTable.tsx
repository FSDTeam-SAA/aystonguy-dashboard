import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Eye } from 'lucide-react';

const uploadsData = Array(5).fill({
  title: "Epic Cooking Fail: Naile...",
  type: "Video",
  category: "Comedy",
  views: "3.2K",
  date: "2 hours ago",
  status: "Published"
});

export function RecentUploadsTable() {
  return (
    <Card className="bg-[#000000B2] border-[#00FFFF] shadow-2xl rounded-2xl overflow-hidden">
      <CardHeader className="pb-4 px-6">
        <CardTitle className="text-xl font-medium text-cyan-400">Recent Uploads</CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <Table>
          <TableHeader className="bg-white/5">
            <TableRow className="border-cyan-950/50 hover:bg-transparent">
              {/* Headings - whitespace-nowrap ব্যবহার করা হয়েছে যাতে টেক্সট ভেঙে না যায় */}
              <TableHead className="text-gray-400 font-semibold py-4 px-6 text-left">Content</TableHead>
              <TableHead className="text-gray-400 font-semibold px-4 text-left">Type</TableHead>
              <TableHead className="text-cyan-400 font-semibold px-4 text-left">Category</TableHead>
              <TableHead className="text-gray-400 font-semibold px-4 text-left">Views</TableHead>
              <TableHead className="text-gray-400 font-semibold px-4 text-left">Date</TableHead>
              <TableHead className="text-gray-400 font-semibold px-6 text-right">Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {uploadsData.map((upload, index) => (
              <TableRow key={index} className="border-cyan-950/30 hover:bg-white/5 transition-colors">
                {/* Content Column */}
                <TableCell className="py-4 px-6">
                  <div className="flex items-center gap-3">
                    <div className="min-w-10 h-6 bg-cyan-950/50 rounded-md border border-cyan-800/50 shadow-inner" />
                    <span className="text-gray-200 font-medium whitespace-nowrap">{upload.title}</span>
                  </div>
                </TableCell>
                
                {/* Type Column */}
                <TableCell className="px-4">
                  <span className="inline-flex items-center justify-center rounded-full border border-cyan-500/30 bg-cyan-500/10 px-3 py-1 text-[10px] font-bold text-cyan-400 uppercase tracking-tight">
                    {upload.type}
                  </span>
                </TableCell>
                
                {/* Category Column */}
                <TableCell className="px-4 text-gray-300 font-medium">
                  {upload.category}
                </TableCell>
                
                {/* Views Column */}
                <TableCell className="px-4 text-gray-400">
                  <div className="flex items-center gap-2">
                    <Eye className="w-4 h-4 text-cyan-500/50" />
                    <span className="text-sm font-medium">{upload.views}</span>
                  </div>
                </TableCell>
                
                {/* Date Column */}
                <TableCell className="px-4 text-gray-400 text-sm italic">
                  {upload.date}
                </TableCell>
                
                {/* Status Column - একে ডানদিকে অ্যালাইন করা হয়েছে (text-right) */}
                <TableCell className="px-6 text-right">
                  <span className="inline-flex items-center rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 text-[11px] font-bold text-emerald-400">
                    {upload.status}
                  </span>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}