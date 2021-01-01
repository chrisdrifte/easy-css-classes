# Easy CSS Classes

Dynamic CSS classes in javascript often involves ugly string manipulations, and the odd accidental "undefined" class name.

There is an easier way.

# Installation

```shell
npm i -D easy-css-classes
```

# Basic Usage

```javascript
import React from "react";
import { cssClasses } from "easy-css-classes";

export example = () => <div className={cssClasses("my-class", "my-class-2")}>
```

# CSS Modules

```javascript
import React from "react";
import { cssModule } from "easy-css-classes";
import styles from "./styles.css";

const cssModuleClass = cssModule(styles);

export example = () => <div className={cssModuleClass("my-class", "my-class-2")}>
```

# Methods

## Plus

```javascript
// classes = "class-1 class2"
const classes = `${cssClasses("class-1").plus("class-2")}`;
```

## Minus

```javascript
// classes = "class-1"
const classes = `${cssClasses("class-1 class-2").minus("class-2")}`;
```

# Advanced usage

Use `Strings`, `Sets`, `Arrays` and even `Objects` as arguments. When an `Object` is provided, keys with truthy values are used as class names.

```javascript
// classes = "class-1"
const classes = `${cssClasses({
  "class-1": true,
  "class-2": false,
})}`;
```
