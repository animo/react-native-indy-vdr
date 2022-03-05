import type { AssertEqual, GenericMethods, IndyVdrNativeBindings } from 'indy-vdr'
import type { IndyVdrTscodegen } from 'src/turboModule'

// this type checks if the tscodegen interface is the same as the implementation
// At the moment we can not convert between them and this still provides a compile-time way
// to check if the types are equal.
export type Assertion = AssertEqual<GenericMethods<IndyVdrNativeBindings>, IndyVdrTscodegen>
