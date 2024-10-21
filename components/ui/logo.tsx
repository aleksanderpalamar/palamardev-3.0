import Image from 'next/image'

export const Logo = () => {
  return (
    <div className="flex items-center bg-violet-500 rounded-3xl overflow-hidden">
      <Image 
        src="/assets/favicon.png"
        alt="logo"
        width={100}
        height={100}
        className="w-16 h-16 object-cover"
        quality={100}
      />
    </div>
  )
}