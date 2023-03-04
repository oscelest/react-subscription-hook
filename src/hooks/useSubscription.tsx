import {useEffect, useState} from "react";
import {Subscription} from "../classes/Subscription";

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

