import { cn } from '@/utils'
import { cva, VariantProps } from 'class-variance-authority'
import { ComponentProps } from 'react'

const loadingVariants = cva(
  'relative mx-auto h-7 w-28 [&_div]:absolute [&_div]:size-2 [&_div]:rounded-full',
  {
    variants: {
      color: {
        purple: '[&_div]:bg-draftly-purple',
        white: '[&_div]:bg-white'
      }
    },
    defaultVariants: { color: 'purple' }
  }
)

type LoadingProps = ComponentProps<'div'> & VariantProps<typeof loadingVariants>

const Loading = ({ color, className, ...props }: LoadingProps) => (
  <div className={cn(loadingVariants({ color, className }))} {...props}>
    <div className="animate-loading left-[15%]"></div>
    <div className="animate-loading animate-delay-200 left-[45%]"></div>
    <div className="animate-loading animate-delay-300 right-[15%]"></div>
  </div>
)

export default Loading
