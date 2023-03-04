import {useEffect, useState} from "react";

class Subscription<V extends NotFunction = NotFunction> {
  
  private value: V;
  private readonly subscription_list: SubscriptionUpdateCallbackFn<V>[];
  
  constructor(value: V) {
    this.value = value as V;
    this.subscription_list = [];
  }
  
  public getValue(): V {
    return this.value;
  }
  
  public setValue(value: V) {
    this.value = value;
    for (let fn of this.subscription_list) {
      fn(this.value);
    }
    return value;
  }
  
  public subscribe(callback: SubscriptionUpdateCallbackFn<V>) {
    this.subscription_list.push(callback);
  }
  
  public unsubscribe(callback: SubscriptionUpdateCallbackFn<V>) {
    for (let i = this.subscription_list.length; i >= 0; i--) {
      if (this.subscription_list[i] !== callback) continue;
      delete this.subscription_list[i];
    }
  }
}


export function createSubscription<C extends NotFunction>(context: C): Subscription<C> {
  return new Subscription<C>(context);
}

export function useSubscription<V extends NotFunction>(subscription: Subscription<V>): [V, UpdateFn<V>] {
  const [internal_value, setInternalValue] = useState<V>(subscription.getValue());
  
  useEffect(
    () => {
      subscription.subscribe(onSubscriptionUpdate);
      
      return () => {
        subscription.unsubscribe(onSubscriptionUpdate);
      };
    },
    []
  );
  
  return [internal_value, setValue];
  
  function setValue(value: V | PrevStateFn<V>) {
    value = typeof value === "function" ? value(internal_value) : value;
    subscription.setValue(value);
  }
  
  function onSubscriptionUpdate(value: V) {
    setInternalValue(value);
  }
}

type UpdateFn<V> = (value: V | PrevStateFn<V>) => void
type PrevStateFn<V> = (prev: V) => V
type NotFunction = string | number | boolean | null | undefined | bigint | readonly any[] | {apply?: never, [k: string]: any} | {call?: never, [k: string]: any};
type SubscriptionUpdateCallbackFn<V extends NotFunction> = (value: V) => void
