import { Colors } from "../Colors/Color.types"

export interface SpinnerTypes {
  size?: SpinnerSize
  customWidth?: number
  color?: Colors
}

export enum SpinnerSize {
  SMALL = 'small',
  MEDIUM = 'medium',
  LARGE = 'large'
}