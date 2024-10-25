import { Button } from "@/components/ui/button"
import download from "@/Functions/download"
import Image from "next/image"
import dynamic from "next/dynamic";

export default function About() {
  const AboutComponent = dynamic(() => import('./_components/about-component'), { ssr: false })
  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <h1 className="text-4xl font-bold">About Me</h1>
      <div className="flex flex-col space-y-4 md:flex-row md:items-start md:space-y-0 md:space-x-4">
        <div className="flex flex-col w-48 h-64 rounded-3xl overflow-hidden shrink-0">
          <Image
            src="/assets/avatar.jpg"
            alt="Avatar"
            width={1000}
            height={1000}
            className="w-full h-full object-cover"
            quality={100}
          />
        </div>
        <div className="flex flex-col w-full space-y-4">
          <AboutComponent />
          <Button 
            className="bg-violet-600 hover:bg-violet-700 text-zinc-50 px-4 py-2 rounded-lg w-fit"
            onClick={download}
          >
            Download CV
          </Button>
        </div>
      </div>
    </div>
  )
}