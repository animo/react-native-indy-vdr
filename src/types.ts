export type Raw = Record<string, unknown>

export type Aml = Record<string, unknown>

// TODO: can we type validate this string? e.g. must have a signature type
export type CredentialDefinitionId = string

export type SchemaId = string

export type RevocationRegistryId = string

export type Did = string

// TODO: is this correct?
export type VerifierKey = string

export type SignatureType = 'CL'

enum ProtocolVersion {
  Node1_3 = 1,
  Node1_4 = 2,
}

// TODO: enum
export type NymRoles = 'STEWARD' | 'TRUSTEE' | 'ENDORSER' | 'NETWORK_MONITOR'

export type RegistryDefinition = 'CL_ACCUM'

export type RichSchemaType = 'sch' | 'map' | 'ctx' | 'enc' | 'cdf' | 'pdf'

export type RevocationRegistryDelta = {
  ver: '1.0'
  value: string
}

type CredentialDefinitionData = {
  // TODO: unknown type
  primary: Record<string, unknown>
  // TODO: unknown type
  revocation?: Record<string, unknown>
}

export type CredentialDefinitionV1 = {
  id: CredentialDefinitionId
  // TODO: do we want change the casing here? if we can, yes.
  schemaId: SchemaId
  type: SignatureType
  tag: string
  value: CredentialDefinitionData
  ver: '1.0'
}

// TODO: check if rename works
export type SchemaV1 = {
  id: SchemaId
  name: string
  version: string
  // TODO: they expect a hashset of strings. will this suffice?
  attrNames: string[]
  seqNo?: number
  ver: '1.0'
}

export type CustomRequest = {
  protocolVersion: ProtocolVersion
  // TODO: is this optional
  reqId?: number
  // TODO: did or string?
  identifier: Did
  operation: {
    type: string
    timestamp: Date
    from: number
    to: number
  }
}

export type PoolCreateParams = {
  transactions?: string
  transactions_path?: string
  // TODO: is this correct? they expect: HashMap<string, f32>
  node_weights?: Record<string, number>
}

export type PoolStatus = {
  mt_root: string
  mt_size: number
  nodes: string[]
}

type Transaction = {
  // TODO: what can be inside here?
  reqSignature: {}
  txn: {
    data: {
      data: {
        alias: string
        blskey: string
        blskey_pop: string
        client_ip: string
        client_port: string
        node_ip: string
        node_port: number
        services: string[]
      }
      dest: Did
    }
    metadata: {
      from: string
    }
    type: string
  }
  txnMetadata: {
    seqNo: number
    txnId: string
  }
  ver: string
}

export type Transactions = Transaction[]

export type TransactionAuthorAgreementAcceptance = {
  mechanism: string
  taaDigest: string
  // TODO: should we use date?
  time: number
}

type VerifierInfo = {
  client_addr: String
  node_addr: String
  public_key: String
  enc_key: string
  bls_key?: string
}

export type Verifiers = Record<string, VerifierInfo>

// TODO: what even is this?
export type SendRequest = string

// TODO: what even is this?
export type SubmitRequest = string
