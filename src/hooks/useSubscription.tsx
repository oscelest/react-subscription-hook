import {useEffect, useState} from "react";
import {SubscriptionInstance} from "../classes";
import {NotFunction, PrevStateFn, Subscription, UpdateFn} from "../index";

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
  
  function setValue(value: V | PrevStateFn<V>) {
    value = typeof value === "function" ? value(internal_value) : value;
    subscription.value = value;
  }
  
  function onSubscriptionUpdate(value: V) {
    setInternalValue(value);
  }
}

