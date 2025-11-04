import { Slot, SlotProps } from '@radix-ui/react-slot'
import { Icons, icons } from './icons'

type IconProps = SlotProps & {
  name: Icons
}

const Icon = ({ name, className, ...props }: IconProps) => {
  return (
    <Slot {...props} className={className}>
      {icons[name]}
    </Slot>
  )
}

export default Icon
