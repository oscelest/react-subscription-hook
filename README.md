# react-subscription-hook

## Introduction

`react-subscription-hook` is a [React](https://reactjs.org/) functional component hook which creates a subscription object that can be used with the useSubscription hook.
This allows for data to be shared between components by using the same subscription object. 
Each being updated as another has their state updated.

## Installation

To install run the following command:

```shell
npm install @noxy/react-subscription-hook@latest
```

Typescript types are already available in the library so no need to get external types.

## Usage

The following is an example of how to use the component:

```typescript jsx
import {useSubscription, createSubscription} from "@noxy/react-subscription-hook";
import React, {HTMLProps, useContext} from "react";

const subscription = createSubscription<number>(0);

function TestComponent(props: HTMLProps<HTMLDivElement>) {
  const [value, setValue] = useSubscription(subscription);
  const [other] = useSubscription(subscription);
  
  return (
    <>
      <div>
        <button onClick={onButtonValueClick}>Add one</button>
        <button onClick={onButtonOtherClick}>Add two</button>
      </div>
      <div>
        <span>Current value:</span>
        <span>{value}</span>
      </div>
      <div>
        <span>Another value:</span>
        <span>{other}</span>
      </div>
    </>
  );
  
  function onButtonValueClick() {
    setValue(value + 1);
  }
  
  function onButtonOtherClick() {
    setValue((state) => state + 2);
  }
}

```

The `createSubscription` creates a `Subscription` object with an initial value that can be used with the useSubscription hook.
`useSubscription` takes a `Subscription` object to return a tuple containing the current value and a value updating function.
