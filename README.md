# react-dialog

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

The `useDialog` hook takes a namespace as argument. This is the namespace which the dialogs created by the `createDialog` function will be stored.
The `dialog` renderer supplied by the hook will display only dialogs from that namespace. The default namespace is `"global"`.

## Properties

The `DialogInstance` component inherits all HTMLDivElement properties and applies them directly to the outermost element.
This includes the className property for those using CSS modules.

### overlay: boolean

Determines if an overlay should be shown behind the dialog, disabling clicking on anything behind the dialog.

**Default value**: `true`

### dismissible: boolean

Only relevant if overlay is set to true.
Determines if the dialog should be able to be dismissed by clicking on the overlay behind the dialog.
Dismissing a dialog in this way will trigger the onClose handler.

**Default value**: `true`

### closeable: boolean

Determines if a close button should be shown inside the dialog that can be clicked to close the dialog.

**Default value**: `true`

### onClose: callback(dialog: Dialog): void

A callback function which is called when the dialog is dismissed or closed, either through the close button, the overlay, or the Dialog close method.

**Default value**: `undefined`
