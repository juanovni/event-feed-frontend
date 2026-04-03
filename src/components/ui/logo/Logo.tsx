import Image from "next/image"

export const Logo = () => {
  return (
    <div className="fixed flex items-center gap-2">
      <Image
        width={100}
        height={100}
        src="/images/logodal.png"
        alt="AlLado"
        className="relative h-32 w-auto object-contain"
      />
    </div>
  )
}
