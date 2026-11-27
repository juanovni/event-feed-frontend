import Image from "next/image"

export const Logo = ({className}: {className?: string}) => {
  return (
    <div className={`fixed flex items-center w-full md:w-auto ${className}`}>
      <Image
        width={2027}
        height={337}
        src="/images/logo/thenextticket-logo.png"
        alt="TheNextTicket"
        className="h-auto w-48 max-w-full"
      />
    </div>
  )
}
