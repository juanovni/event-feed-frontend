import Image from "next/image"

export const Logo = () => {
  return (
    <div className="fixed top-0 left-4 md:left-0 md:justify-start justify-center flex items-center gap-2 w-full md:w-auto">
      <Image
        width={100}
        height={100}
        src="/images/logodal.png"
        alt="AlLado"
        className="h-28 md:h-32 w-auto object-contain"
      />
    </div>
  )
}
