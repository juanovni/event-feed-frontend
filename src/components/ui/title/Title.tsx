import { poppinsFont } from '@/config/fonts';

interface Props {
  title: string;
  children: React.ReactNode;
}

export const Title = ({ title, children }: Props) => {
  return (
    <div className="flex items-center justify-between p-3 md:p-0">
      <h1 className={`${poppinsFont.className} text-lg py-2 md:py-0 px-12 ${children ? 'md:px-1' : 'md:px-0'} md:text-2xl font-bold text-gray-900`}>
        {title}
      </h1>
      {children && (
        <div className="flex space-x-2 py-2 p-2">
          {children}
        </div>
      )}
    </div>
  )
}