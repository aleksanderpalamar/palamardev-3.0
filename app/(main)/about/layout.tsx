"use client";

import { useEffect, useState } from "react";

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);    
  }, [])

  if (!isClient) {
    return null
  }

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {children}
    </div>
  )
}