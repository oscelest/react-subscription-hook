import {useEffect} from "react";
import {CallbackFn, NotFunction, Subscription} from "../index";

export function trackSubscription<V extends NotFunction>(subscription: Subscription<V>, callback: CallbackFn<V>): void {
  useEffect(
    () => {
      subscription.subscribe(onSubscriptionUpdate);
      return () => {
        subscription.unsubscribe(onSubscriptionUpdate);
      };
    },
    []
  );
  
  function onSubscriptionUpdate(value: V) {
    callback?.(value);
  }
}
