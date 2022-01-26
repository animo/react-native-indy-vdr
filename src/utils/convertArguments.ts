// TODO: RENAME

import type { Callback, CallbackWithResponse } from 'src/IIndyVdr';

type Argument =
  | string
  | number
  | Record<string, unknown>
  | Date
  | Callback
  | CallbackWithResponse;

type SerializedArgument = Record<
  string,
  string | number | Callback | CallbackWithResponse
>;

export type SerializedArguments<Type> = {
  [Property in keyof Type]: Type[Property] extends string
    ? string
    : Type[Property] extends number
    ? number
    : Type[Property] extends Record<string, unknown>
    ? string
    : Type[Property] extends Record<string, unknown> | undefined
    ? string | undefined
    : Type[Property] extends Date
    ? number
    : Type[Property] extends Date | undefined
    ? number | undefined
    : Type[Property] extends string | undefined
    ? undefined | string
    : Type[Property] extends number | undefined
    ? undefined | number
    : Type[Property] extends Callback | undefined
    ? undefined | Callback
    : Type[Property] extends CallbackWithResponse | undefined
    ? undefined | CallbackWithResponse
    : unknown;
};

// Date -> number
// Object -> string
// number -> number
// string -> string
const serializeArguments = (args: Record<string, Argument>) => {
  Object.entries(args).forEach(([key, val]) => {
    if (typeof val === 'object') {
      if (typeof val.getDay === 'function') {
        return { [key]: val.valueOf() };
      }
      console.log('OBJ');
      return { [key]: JSON.stringify(val) };
    }
    return { [key]: val };
  });

  return args as SerializedArgument;
};

export { serializeArguments };
