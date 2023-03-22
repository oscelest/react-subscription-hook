import {CallbackFn, NotFunction, Subscription} from "../index";

export class SubscriptionInstance<V extends NotFunction = NotFunction> implements Subscription<V> {
  
  #value: V;
  readonly #subscription_list: CallbackFn<V>[];
  
  constructor(value: V) {
    this.#value = value as V;
    this.#subscription_list = [];
  }
  
  public get value() {
    return this.#value;
  }
  
  public set value(value: V) {
    this.#value = value;
    for (let fn of this.#subscription_list) {
      fn(this.#value);
    }
  }
  
  public subscribe(callback: CallbackFn<V>) {
    this.#subscription_list.push(callback);
  }
  
  public unsubscribe(callback: CallbackFn<V>) {
    for (let i = this.#subscription_list.length; i >= 0; i--) {
      if (this.#subscription_list[i] !== callback) continue;
      this.#subscription_list.splice(i, 1);
    }
  }
}
