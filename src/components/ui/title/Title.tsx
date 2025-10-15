import { poppinsFont } from '@/config/fonts';

interface Props {
  title: string;
  subtitle?: string;
  className?: string;
}

export const Title = ({ title, subtitle, className }: Props) => {
  return (
    <div className={`mt-3 ${className}`}>
      <h1 className={`${poppinsFont.className} antialiased text-3xl font-semibold my-2`}>
        {title}
      </h1>

      {
        subtitle && (
          <h3 className="text-xl mb-5">{subtitle}</h3>
        )
      }

    </div>
  )
}