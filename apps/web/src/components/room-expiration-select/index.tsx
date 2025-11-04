import { Hours } from '@/constants'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '../select'
import { ComponentProps } from 'react'

type RoomExpirationSelectProps = ComponentProps<typeof Select> & {
  className?: string
}

const RoomExpirationSelect = ({
  className,
  ...props
}: RoomExpirationSelectProps) => {
  return (
    <div className={className}>
      <Select {...props}>
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Select expiration" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value={Hours.ONE_HOUR}>1 hour</SelectItem>
          <SelectItem value={Hours.FIVE_HOURS}>5 hours</SelectItem>
          <SelectItem value={Hours.TWELVE_HOURS}>12 hours</SelectItem>
          <SelectItem value={Hours.ONE_DAY}>1 day</SelectItem>
          <SelectItem value={Hours.THREE_DAYS}>3 days</SelectItem>
          <SelectItem value={Hours.ONE_WEEK}>1 week</SelectItem>
          <SelectItem value={Hours.TWO_WEEKS}>2 weeks</SelectItem>
          <SelectItem value={Hours.ONE_MONTH}>1 month</SelectItem>
          <SelectItem value="custom" disabled>
            Custom (soon)
          </SelectItem>
        </SelectContent>
      </Select>
    </div>
  )
}

export default RoomExpirationSelect
