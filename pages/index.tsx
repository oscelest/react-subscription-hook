import React from "react";
import {createSubscription, useSubscription} from "../src/hooks";
import Style from "./index.module.css";

const subscription = createSubscription<number>(0);

function IndexPage() {
  const [value, setValue] = useSubscription(subscription);
  const [value2] = useSubscription(subscription);
  
  return (
    <div className={Style.Component}>
      <div>
        <span>Counter:</span>
        <span>{value}</span>
        <span>{value2}</span>
      </div>
      <button onClick={onComponentClick}>Click me for dialog!</button>
    </div>
  );
  
  function onComponentClick() {
    setValue(value + 1);
  }
}

export default IndexPage;
