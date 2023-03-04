
export class Subscription<V extends NotFunction = NotFunction> {
  
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
