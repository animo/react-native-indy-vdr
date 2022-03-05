import type { IndyVdrNativeBindings } from 'indy-vdr'
import { IndyVdrReactNative } from './IndyVdrReactNative'

declare var _indy_vdr: IndyVdrNativeBindings

const nativeIndyVdr = _indy_vdr

export const indyVdr = new IndyVdrReactNative({ nativeIndyVdr })
