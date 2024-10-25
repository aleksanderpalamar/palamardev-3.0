"use client";

import { about } from "@/data"
import { Skeleton } from "@/components/ui/skeleton";
import { useEffect, useState } from "react";
import { Loader2 } from "lucide-react";


const AboutComponent = () => {
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setLoading(true)

    setTimeout(() => {
      setLoading(false)
    }, 1000)
  }, [])

  if (loading) {
    return (
      <div className="flex flex-col space-y-3">
        <Skeleton className="h-[300px] w-full rounded-xl bg-zinc-800 flex items-center justify-center">
          <Loader2 className="w-6 h-6 mx-auto animate-spin" />
        </Skeleton>
      </div>
    )
  }
  return (
    <p className="text-sm flex-1">
      {about.map((paragraph) => (
        <span key={paragraph.id}
          className="mb-4 text-zinc-50 text-wrap block text-justify 
          whitespace-normal space-y-3 overflow-hidden break-words w-full"
          dangerouslySetInnerHTML={{ __html: paragraph.description }}
        />
      ))}
    </p>
  )
}

export default AboutComponent