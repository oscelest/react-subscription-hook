import {SubscriptionInstance} from "./classes";

export {useSubscription, trackSubscription} from "./hooks";

export type NotFunction = string | number | boolean | null | undefined | bigint | readonly any[] | {apply?: never, [k: string]: any} | {call?: never, [k: string]: any};

export type PrevStateFn<V extends NotFunction> = (prev: V) => V
export type PrevStateAsyncFn<V extends NotFunction> = (prev: V) => Promise<V>

export type UpdateFn<V extends NotFunction> = (value: V | PrevStateFn<V> | PrevStateAsyncFn<V>) => any
export type CallbackFn<V extends NotFunction> = (value: V) => void

export function createSubscription<C extends NotFunction>(context: C): Subscription<C> {
  return new SubscriptionInstance<C>(context);
}

export interface Subscription<V extends NotFunction = NotFunction> {
  value: V;
  subscribe(callback: CallbackFn<V>): void;
  unsubscribe(callback: CallbackFn<V>): void;
}
