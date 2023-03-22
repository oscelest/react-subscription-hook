import {useEffect, useState} from "react";
import {SubscriptionInstance} from "../classes";
import {NotFunction, PrevStateAsyncFn, PrevStateFn, Subscription, UpdateFn} from "../index";

export function createSubscription<C extends NotFunction>(context: C): Subscription<C> {
  return new SubscriptionInstance<C>(context);
}

export function useSubscription<V extends NotFunction>(subscription: Subscription<V>): [V, UpdateFn<V>] {
  const [internal_value, setInternalValue] = useState<V>(subscription.value);
  
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
  
  function setValue(value: V | PrevStateFn<V> | PrevStateAsyncFn<V>): void {
    const temp_value = typeof value === "function" ? value(internal_value) : value;
    if (temp_value instanceof Promise) {
      temp_value.then(value => subscription.value = value);
    }
    else {
      subscription.value = temp_value;
    }
  }
  
  function onSubscriptionUpdate(value: V) {
    setInternalValue(value);
  }
}

