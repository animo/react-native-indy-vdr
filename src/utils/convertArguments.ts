// TODO: RENAME

import type { Callback, CallbackWithResponse } from 'src/IIndyVdr';

type Argument =
  | string
  | number
  | Record<string, unknown>
  | Date
  | Callback
  | CallbackWithResponse;

type SerializedArguments = Record<
  string,
  string | number | Callback | CallbackWithResponse
>;

export type SerializedArgument<Type> = {
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
    : Type[Property] extends Callback
    ? Callback
    : Type[Property] extends CallbackWithResponse
    ? CallbackWithResponse
    : unknown;
};

// Date -> number
// Object -> string
// number -> number
// string -> string
const serializeArguments = (args: Record<string, Argument>) => {
  const retVal: SerializedArguments = {};
  Object.entries(args).map(([key, val]) => (retVal[key] = serialize(val)));
  return retVal;
};

const serialize = (arg: Argument): string | number => {
  switch (typeof arg) {
    case 'string':
      return arg;
    case 'number':
      return arg;
    case 'object':
      return isDate(arg)
        ? (arg.valueOf() as number)
        : (JSON.stringify(arg) as string);
    default:
      throw new Error('could not serialize value');
  }
};

const isDate = <T extends Date | Record<string, unknown>>(arg: T) =>
  typeof arg.getDay === 'function';

export { serializeArguments };
