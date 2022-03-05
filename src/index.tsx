import { registerIndyVdr } from 'indy-vdr'
import { indyVdr } from './indyVdr'

export * from 'indy-vdr'

registerIndyVdr({ vdr: indyVdr })
