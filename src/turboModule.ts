import { TurboModule, TurboModuleRegistry } from 'react-native-tscodegen-types';

// General interface for the package. Our generated cpp wrapper will be based on this
export interface Spec extends TurboModule {
  set_config(cfg: string): number;
  version(): string;
}

// We MUST export this according to tscodegen. We are ignoring it however.
export default TurboModuleRegistry.getEnforcing<Spec>('IndyVdr') as Spec;
