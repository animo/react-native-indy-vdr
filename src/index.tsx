import type { Spec } from './turboModule';

declare var _indyVdr: Spec;

const IndyVdr = _indyVdr as Spec;

export type TurboModuleType = Spec;

export default IndyVdr;
