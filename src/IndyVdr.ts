import type { NativeIndyVdrBindings } from './turboModule';

declare var _indy_vdr: NativeIndyVdrBindings;

const NativeIndyVdr = _indy_vdr as NativeIndyVdrBindings;

// TODO: proper documentation
class IndyVdr {
  // TODO: how do we generate a handle
  private handle: number = 0;

  get getHandle() {
    return this.handle;
  }

  public version() {
    return NativeIndyVdr.version();
  }

  // TODO: accept json and serialize it
  public setConfig(config: string) {
    NativeIndyVdr.set_config({ config });
  }

  // TODO: this causes rust to panic. How do we deal with this
  public setDefaultLogger() {
    NativeIndyVdr.set_default_logger();
  }

  // TODO: indyvdr allows any u64 number to be a protocol version. Is this correct?
  public setProtocolVersion(version: number) {
    NativeIndyVdr.set_protocol_version({ version });
  }

  public setSocksProxy(socksProxy: string) {
    NativeIndyVdr.set_socks_proxy({ socks_proxy: socksProxy });
  }

  // TODO: typing of aml
  public buildAcceptanceMechanismsRequest(
    submitterDid: string,
    aml: Record<string, unknown>,
    version: string,
    amlContext?: string
  ) {
    const serializedAml = JSON.stringify(aml);
    const handle = NativeIndyVdr.build_acceptance_mechanisms_request({
      submitter_did: submitterDid,
      aml: serializedAml,
      version,
      aml_context: amlContext,
      handle_p: this.handle,
    });
    this.handle = handle;
  }

  // TODO: version and timestamp collide
  public buildGetAcceptanceMechanismsRequest(
    timestamp?: Date,
    submitterDid?: string,
    version?: string
  ) {
    const handle = NativeIndyVdr.build_get_acceptance_mechanisms_request({
      submitter_did: submitterDid,
      timestamp: timestamp?.valueOf(),
      version: version,
      handle_p: this.handle,
    });
    this.handle = handle;
  }
}

export { IndyVdr, NativeIndyVdr };
