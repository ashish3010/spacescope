import { IconKey } from "../Icon/Icon.types"

export enum ButtonSize {
  MEDIUM = 'medium',
  LARGE = 'large'
}

export enum ButtonKind {
  PRIMARY = 'primary',
  SECONDARY = 'secondary'
}

export interface ButtonProps {
  size?: ButtonSize
  isLoading?: boolean
  disabled?: boolean
  prefixIc?: IconKey
  suffixIc?: IconKey
  kind?: ButtonKind
  title: string,
  onClick: () => void
}