const {
  cssClasses,
  useCssModule,
  classNames,
  useCssModuleClassNames,
} = require("./index");

describe("cssClasses", () => {
  describe("processArgs()", () => {
    describe("typeof arg === 'object'", () => {
      it("should select object keys with truthy values as classes", () => {
        expect(
          cssClasses({
            expected: true,
            notexpected1: false,
            notexpected2: 0,
            notexpected3: null,
            notexpected4: undefined,
            notexpected5: "",
          }).toString()
        ).toEqual("expected");
      });
    });

    describe("arg instanceof Set", () => {
      it("should use set items as classes", () => {
        expect(cssClasses(new Set(["expected"])).toString()).toEqual(
          "expected"
        );
      });
    });

    describe("arg instanceof Array", () => {
      it("should use array items as classes", () => {
        expect(cssClasses(["expected"]).toString()).toEqual("expected");
      });
    });

    describe("arg instanceof cssClasses", () => {
      it("should use cssClasses toString value as classes", () => {
        expect(cssClasses(cssClasses(["expected"])).toString()).toEqual(
          "expected"
        );
      });
    });

    describe("typeof arg !== 'string'", () => {
      it("should ignore numbers", () => {
        expect(cssClasses(1).toString()).toEqual("");
      });
      it("should ignore null", () => {
        expect(cssClasses(null).toString()).toEqual("");
      });
      it("should ignore undefined", () => {
        expect(cssClasses().toString()).toEqual("");
      });
      it("should ignore maps", () => {
        expect(
          cssClasses(
            new Map([[() => "notexpected", () => "notexpected"]])
          ).toString()
        ).toEqual("");

        expect(
          cssClasses(new Map([["notexpected", "notexpected"]])).toString()
        ).toEqual("");
      });
    });
  });

  describe("plus", () => {
    describe("single argument", () => {
      it("should add class", () => {
        expect(cssClasses().plus("expected").toString()).toEqual("expected");
      });
    });
    describe("single argument with spaces", () => {
      it("should add classes", () => {
        expect(cssClasses().plus("expected expected2").toString()).toEqual(
          "expected expected2"
        );
      });
    });
    describe("multiple arguments", () => {
      it("should add classes", () => {
        expect(cssClasses().plus("expected", "expected2").toString()).toEqual(
          "expected expected2"
        );
      });
    });
  });

  describe("minus", () => {
    describe("single argument", () => {
      it("should remove class", () => {
        expect(
          cssClasses("expected notexpected").minus("notexpected").toString()
        ).toEqual("expected");
      });
    });
    describe("single argument with spaces", () => {
      it("should remove classes", () => {
        expect(
          cssClasses("expected notexpected notexpected2")
            .minus("notexpected notexpected2")
            .toString()
        ).toEqual("expected");
      });
    });
    describe("multiple arguments", () => {
      it("should remove classes", () => {
        expect(
          cssClasses("expected notexpected notexpected2")
            .minus("notexpected", "notexpected2")
            .toString()
        ).toEqual("expected");
      });
    });
  });

  describe("classNames", () => {
    it("should return classes as value of 'classname' in an object", () => {
      expect(cssClasses("expected").classNames()).toEqual({
        className: "expected",
      });
    });
  });
});

describe("cssModule", () => {
  describe("use", () => {
    let cssModuleClasses;

    describe("with single argument", () => {
      cssModuleClasses = useCssModule({
        "css-module-key": "expected",
      });

      it("should use classes as keys for module property", () => {
        expect(cssModuleClasses("css-module-key").toString()).toEqual(
          "expected"
        );
      });
    });

    describe("with multiple arguments", () => {
      cssModuleClasses = useCssModule(
        {
          "css-module-key": "expected",
        },
        {
          "css-module-key2": "expected2",
        }
      );

      it("should use classes as keys for module property", () => {
        expect(
          cssModuleClasses("css-module-key css-module-key2").toString()
        ).toEqual("expected expected2");
      });
    });
  });
});

describe("classNames", () => {
  it("should provide an alternative to cssClasses for use with the spread operator", () => {
    expect(classNames("expected")).toEqual({
      className: "expected",
    });
  });
});

describe("moduleClassNames", () => {
  it("should provide an alternative to cssClasses for use with the spread operator", () => {
    const moduleClassNames = useCssModuleClassNames({
      "css-module-key": "expected",
    });
    expect(moduleClassNames("css-module-key")).toEqual({
      className: "expected",
    });
  });
});
