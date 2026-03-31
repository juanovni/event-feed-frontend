import { poppinsFont } from '@/config/fonts';

interface Props {
  title: string;
  children: React.ReactNode;
}

export const Title = ({ title, children }: Props) => {
  return (
    <div className="flex items-center justify-between">
      <h1 className={`${poppinsFont.className} text-lg px-12 md:px-0 md:text-2xl font-bold text-gray-900`}>
        {title}
      </h1>
      <div className="flex space-x-2">
        {children}
      </div>
    </div>
  )
}