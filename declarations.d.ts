declare module "*.module.css" {
  const content: {[className: string]: string};
  export = content;
}

type PrevStateFn<V> = (prev: V) => V
type UpdateFn<V> = (value: V | PrevStateFn<V>) => void
type NotFunction = string | number | boolean | null | undefined | bigint | readonly any[] | {apply?: never, [k: string]: any} | {call?: never, [k: string]: any};
type SubscriptionUpdateCallbackFn<V extends NotFunction> = (value: V) => void
