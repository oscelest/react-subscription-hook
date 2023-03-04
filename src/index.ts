export {createSubscription, useSubscription} from "./hooks";

export type NotFunction = string | number | boolean | null | undefined | bigint | readonly any[] | {apply?: never, [k: string]: any} | {call?: never, [k: string]: any};
export type PrevStateFn<V> = (prev: V) => V
export type UpdateFn<V> = (value: V | PrevStateFn<V>) => void
export type SubscriptionUpdateCallbackFn<V extends NotFunction> = (value: V) => void

export interface Subscription<V extends NotFunction = NotFunction> {
  value: V;
  subscribe(callback: SubscriptionUpdateCallbackFn<V>): void;
  unsubscribe(callback: SubscriptionUpdateCallbackFn<V>): void;
}
