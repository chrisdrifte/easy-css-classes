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

export example = () => (
  <div className={cssClasses("my-class", "my-class-2")}>
    Example
  </div>
);
```

# CSS Modules

```javascript
import React from "react";
import { useCssModule } from "easy-css-classes";
import styles from "./styles.css";

const moduleClasses = useCssModule(styles);

export example = () => (
  <div className={moduleClasses("my-class", "my-class-2")}>
    Example
  </div>
);
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

## Argument types

Use `Strings`, `Sets`, `Arrays` and even `Objects` as arguments. When an `Object` is provided, keys with truthy values are used as class names.

```javascript
// classes = "class-1"
const classes = `${cssClasses({
  "class-1": true,
  "class-2": false,
})}`;
```

## Shorthand syntax

For convience, a shorthand syntax is provided for JSX:

```javascript
import React from "react";
import { classNames } from "easy-css-classes";

export example = () => (
  <div {...classNames("my-class", "my-class-2")}>
    Example
  </div>
);
```

```javascript
import React from "react";
import { useCssModuleClassNames } from "easy-css-classes";
import styles from "./styles.css";

const moduleClassNames = useCssModuleClassNames(styles);

export example = () => (
  <div {...moduleClassNames("my-class", "my-class-2")}>
    Example
  </div>
);
```
