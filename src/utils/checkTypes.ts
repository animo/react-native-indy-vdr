import type { IndyVdrNativeBindings } from '../IIndyVdr'
import type { IndyVdrTscodegen } from '../turboModule'

// TODO: any type...
type GenericMethods<Base extends { [method: string]: any }> = {
  [Property in keyof Base]: (
    ...args: Parameters<Base[Property]>[0] extends {} ? [options: {}] : []
  ) => ReturnType<Base[Property]>
}

type ShapeOf<T> = {
  [Property in keyof T]: T[Property]
}

type AssertEqual<X extends ShapeOf<Y>, Y extends ShapeOf<X>> = never

// this type checks if the tscodegen interface is the same as the implementation
// At the moment we can not convert between them and this still provides a compile-time way
// to check if the types are equal.
export type Assertion = AssertEqual<GenericMethods<IndyVdrNativeBindings>, IndyVdrTscodegen>
