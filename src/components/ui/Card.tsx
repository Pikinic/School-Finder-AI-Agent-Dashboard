import type { HTMLAttributes, ReactNode } from 'react'
import { cn } from '../../utils/cn.js'

type CardProps = HTMLAttributes<HTMLDivElement> & {
  children: ReactNode
  padded?: boolean
}

const Card = ({ children, className, padded = true, ...props }: CardProps) => {
  return (
    <div
      className={cn(
        'rounded-[20px] border border-[#E5E7EB] bg-white shadow-[0_16px_40px_rgba(17,24,39,0.06)]',
        padded && 'p-6',
        className,
      )}
      {...props}
    >
      {children}
    </div>
  )
}

export default Card
