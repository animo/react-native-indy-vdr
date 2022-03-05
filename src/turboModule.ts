import { TurboModule, TurboModuleRegistry } from 'react-native-tscodegen-types'

export interface IndyVdrTscodegen extends TurboModule {
  version(): string

  get_current_error(): string

  set_config(options: {}): void

  set_default_logger(): void

  set_protocol_version(options: {}): void

  set_socks_proxy(options: {}): void

  build_acceptance_mechanisms_request(options: {}): number

  build_get_acceptance_mechanisms_request(options: {}): number

  build_attrib_request(options: {}): number

  build_get_attrib_request(options: {}): number

  build_cred_def_request(options: {}): number

  build_get_cred_def_request(options: {}): number

  build_get_revoc_reg_def_request(options: {}): number

  build_get_revoc_reg_request(options: {}): number

  build_get_revoc_reg_delta_request(options: {}): number

  build_revoc_reg_def_request(options: {}): number

  build_custom_request(options: {}): number

  build_disable_all_txn_author_agreements_request(options: {}): number

  build_get_nym_request(options: {}): number

  build_get_schema_request(options: {}): number

  build_get_txn_author_agreement_request(options: {}): number

  build_get_txn_request(options: {}): number

  build_get_validator_info_request(options: {}): number

  build_nym_request(options: {}): number

  build_revoc_reg_entry_request(options: {}): number

  build_schema_request(options: {}): number

  build_txn_author_agreement_request(options: {}): number

  build_rich_schema_request(options: {}): number

  build_get_rich_schema_object_by_id_request(options: {}): number

  build_get_rich_schema_object_by_metadata_request(options: {}): number

  pool_create(options: {}): number

  pool_refresh(options: {}): void

  pool_get_status(options: {}): void

  pool_get_transactions(options: {}): void

  pool_get_verifiers(options: {}): void

  pool_submit_action(options: {}): void

  pool_submit_request(options: {}): void

  pool_close(options: {}): void

  prepare_txn_author_agreement_acceptance(options: {}): string

  request_free(options: {}): void

  request_get_body(options: {}): string

  request_get_signature_input(options: {}): string

  request_set_endorser(options: {}): void

  request_set_multi_signature(options: {}): void

  request_set_signature(options: {}): void

  request_set_txn_author_agreement_acceptance(options: {}): void
}

// We MUST export this according to tscodegen. We are ignoring it however.
export default TurboModuleRegistry.getEnforcing<IndyVdrTscodegen>('IndyVdr')
