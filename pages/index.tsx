import React from "react";
import {createSubscription, useSubscription} from "../src";
import Style from "./index.module.css";

export const subscription = createSubscription<number>(0);

function IndexPage() {
  const [value, setValue] = useSubscription(subscription);
  const [value2, setValue2] = useSubscription(subscription);
  
  return (
    <div className={Style.Component}>
      <div>
        <span>Counter:</span>
        <span>{value}</span>
        <span>{value2}</span>
      </div>
      <button onClick={onComponentClick}>Click me for 1!</button>
      <button onClick={onComponentClick2}>Click me for 2!</button>
    </div>
  );
  
  function onComponentClick() {
    setValue(value + 1);
  }
  
  function onComponentClick2() {
    setValue2(value => value + 2);
  }
}

export default IndexPage;
