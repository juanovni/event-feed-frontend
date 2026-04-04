import Image from "next/image"

export const Logo = ({className}: {className?: string}) => {
  return (
    <div className={`fixed top-4 md:top-4 left-4 flex items-center w-full md:w-auto ${className}`}>
      <Image
        width={100}
        height={100}
        src="/images/logo/logo_qbuenplan_400.png"
        alt="QueBuenPlan! "
        className="w-auto"
      />
    </div>
  )
}
