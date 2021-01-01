class CssClasses {
  static processArgs(args) {
    return (
      args
        .map((arg) => {
          // convert sets to arrays
          if (arg instanceof Set) {
            arg = Array.from(arg);
          }

          // convert arrays to strings
          if (arg instanceof Array) {
            arg = arg.join(" ");
          }

          // convert cssClasseses to strings
          if (arg instanceof CssClasses) {
            arg = `${arg}`;
          }

          // select keys with truthy values from objects
          if (typeof arg === "object" && arg !== null) {
            arg = Object.keys(arg)
              .filter((clss) => arg[clss])
              .join(" ");
          }

          // ignore non-string values
          if (typeof arg !== "string") {
            arg = "";
          }

          // split into classname array
          return arg.split(" ");
        })
        // flatten array
        .flat()
        // ignore falsy values
        .filter((arg) => arg)
    );
  }

  constructor(...addClsses) {
    this._clsses = new Set();
    this.plus(...addClsses);
  }

  toString() {
    return Array.from(this._clsses)
      .map((key) => (this._module ? this._module[key] : key))
      .filter((clss) => clss)
      .join(` `)
      .trim();
  }

  use(...styles) {
    styles.forEach((style) => {
      if (typeof style !== "object") {
        throw new Error("Module must be an object");
      }
    });

    this._module = Object.assign(this._module || {}, ...styles);

    return this;
  }

  plus(...addClsses) {
    CssClasses.processArgs(addClsses).forEach(
      (clss) => clss && this._clsses.add(clss)
    );

    return this;
  }

  minus(...removeClsses) {
    CssClasses.processArgs(removeClsses).forEach(
      (clss) => clss && this._clsses.delete(clss)
    );

    return this;
  }
}

/**
 * Create a CssClasses instance
 */
const cssClasses = (...addClasses) => new CssClasses(...addClasses);

/**
 * Use CssClasses instance with a css module
 */
const useCssModule = (...styles) => (...addClasses) =>
  cssClasses(...addClasses).use(...styles);

/**
 * Create a CssClasses instance
 * suitable for use in JSX with object spread operator
 */
const classNames = (...addClasses) => ({
  className: cssClasses(...addClasses).toString(),
});

/**
 * Create a CssClasses instance with a css module
 * suitable for use in JSX with object spread operator
 */
const useCssModuleClassNames = (...styles) => (...addClasses) => ({
  className: useCssModule(...styles)(...addClasses).toString(),
});

/**
 * Export
 */
module.exports = {
  cssClasses,
  useCssModule,
  classNames,
  useCssModuleClassNames,
};
