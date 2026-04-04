import Image from "next/image"

export const Logo = () => {
  return (
    <div className="fixed top-4 md:top-4 left-4 justify-start flex items-center w-full md:w-auto">
      <Image
        width={100}
        height={100}
        src="/images/logo/logo_qbuenplan_400.png"
        alt="AlLado"
        className="w-auto"
      />
    </div>
  )
}
