import React from 'react'
import OverView from './_components/OverView'
import { UploadActivityChart } from './_components/UploadActivity'
import { ContentDistributionChart } from './_components/ContentDistribution'
import { RecentUploadsTable } from './_components/RecentUploadsTable'

function Page() {
  return (
    <div className="min-h-screen bg-transparent space-y-8">
      
      {/* ১. ওভারভিউ সেকশন (কার্ডগুলো) */}
      <OverView />

      {/* ২. চার্ট সেকশন (Grid ব্যবহার করা হয়েছে যাতে ২টা পাশাপাশি থাকে) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <UploadActivityChart />
        <ContentDistributionChart />
      </div>

      {/* ৩. রিসেন্ট আপলোড টেবিল সেকশন */}
      <div className="w-full">
        <RecentUploadsTable />
      </div>

    </div>
  )
}

export default Page