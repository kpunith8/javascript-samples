
test('test truthy', () => {
  expect(true).toBeTruthy()
})
// Uncomment the file when running with mocha

// const sinon = require("sinon");
// const fs = require("fs");
// const chai = require("chai");
// const assert = require("chai").assert;
// const expect = require("chai").expect;
// const sinonChai = require("sinon-chai");
// chai.should();
// chai.use(sinonChai);

// sinon.assert.expose(chai.assert, { prefix: "" });

// describe("test sample", () => {
//   let data = { name: "name" };
//   let prev;
//   beforeEach(() => {
//     prev = data;
//     data = {};

//     console.log("main, beforeEach", data);
//   });

//   afterEach(() => {
//     data = prev;
//     console.log("main, afterEach", data);
//   });

//   context("Context-1", () => {
//     before(() => {
//       data = { name: "Punith" };
//       console.log("sub-1, before", data.name);
//     });

//     after(() => {
//       data = { name: "P" };

//       console.log("sub-1, after", data.name, prev);
//     });

//     it("should have data-1", () => {});

//     context("sub-sub Context-1", () => {
//       beforeEach(() => {
//         data = { name: "Sahana" };
//         console.log("sub-sub, beforeEach", data.name);
//       });

//       afterEach(() => {
//         data = { name: "S" };
//         console.log("sub-sub, afterEach", data.name);
//       });

//       it("should have sub-sub data", () => {});
//     });
//   });

//   context("Context-2", () => {
//     beforeEach(() => {
//       data = { name: "Shiri" };
//       console.log("sub-2, beforeEach", data.name);
//     });

//     afterEach(() => {
//       data = { name: "SH" };
//       //data = prev
//       console.log("sub-2, afterEach", data.name);
//     });

//     it("should have data-2", () => {});
//   });
// });

// describe("Sinon examples", () => {
//   sandbox = null;
//   beforeEach(() => {
//     sandbox = sinon.createSandbox();
//   });

//   afterEach(() => {
//     sandbox.restore();
//     sinon.restore();
//   });

//   context("Sinon fake examples", () => {
//     it("Fake returns and call count", () => {
//       const fakeFunction = sinon.fake();
//       const fakeWithReturns = sinon.fake.returns("Hello there!");
//       const fakeThrows = sinon.fake.throws(new Error("Error!!!"));

//       fakeFunction();
//       console.log("Fake with return:", fakeWithReturns());
//       //console.log("Fake with errors:", fakeThrows());

//       console.log("Fake count:", fakeFunction.callCount);
//     });

//     it("instance properties, callback, lastArg", () => {
//       const f = sinon.fake();
//       const cb1 = function () {};
//       const cb2 = function () {};

//       f(1, 2, 3, cb1);
//       f(1, 2, 3, cb2);

//       console.log(
//         "callback:",
//         f.callback,
//         "Using lastCall:",
//         f.lastCall.callback,
//         "using lastArg:",
//         f.lastCall.lastArg
//       );
//       console.log(
//         "First callback using getCall(0):",
//         f.getCall(0).callback,
//         "Using firstCall:",
//         f.firstCall.callback
//       );
//     });
//   });

//   context("Sinon fake yields and asyncYields", () => {
//     // sinon.fake.yields takes some values, and returns a function that when being called,
//     // expects the last argument to be a callback and invokes that callback with the same previously given values.
//     // The returned function is normally used to fake a service function that takes a callback as the last argument.
//     // When the fake function is called, it always calls the last argument it received,
//     // which is expected to be a callback, with the values that the yields function previously took.
//     it("yields", () => {
//       const fakeYields = sinon.fake.yields(null, "file content");
//       //use replace to replace readFile with a fake
//       sinon.replace(fs, "readFile", fakeYields);
//       fs.readFile("somefile", (err, data) => {
//         console.log(data);
//       });
//       console.log("end of this event loop");
//     });

//     it("yieldsAsync", () => {
//       const fakeAsync = sinon.fake.yieldsAsync(null, "async file content");
//       sinon.replace(fs, "readFile", fakeAsync);
//       fs.readFile("somefile", (err, data) => {
//         console.log(data);
//       });
//       console.log("end of this event loop");
//     });
//   });

//   context("Sinon Spy examples", () => {
//     // A test spy is a function that records arguments, return value,
//     // the value of this and exception thrown (if any) for all its calls. There are two types of spies:
//     // Some are anonymous functions, while others wrap methods that already exist in the system under test.

//     // When the behavior of the spied-on function is not under test, you can use an anonymous function spy.
//     // The spy won’t do anything except record information about its calls.
//     // A common use case for this type of spy is testing how a function handles a callback

//     // spy to wrap all object method
//     // sinon.spy(object)

//     // Note that it’s usually better practice to spy individual methods,
//     // particularly on objects that you don’t understand or control all the methods for

//     // Spying individual methods tests intent more precisely and
//     // is less susceptible to unexpected behavior as the object’s code evolves.

//     // sandbox.spy(jQuery);
//     it("Spy: wrap all methods", () => {
//       // jQuery.getJSON("/some/resource");
//       // assert(jQuery.ajax.calledOnce);
//       // assertEquals("/some/resource", jQuery.ajax.getCall(0).args[0].url);
//       // assertEquals("json", jQuery.ajax.getCall(0).args[0].dataType);
//     });

//     it("Spy: wrapping an existing method", () => {
//       // sinon.spy(object, "method") // creates a spy that wraps the existing function object.method
//       // The spy will behave exactly like the original method (including when used as a constructor)
//       // but you will have access to data about all calls.
//       // sinon.spy(jQuery, "ajax");
//       // jQuery.getJSON("/some/resource");
//       // assert(jQuery.ajax.calledOnce);
//       // assertEquals("/some/resource", jQuery.ajax.getCall(0).args[0].url);
//       // assertEquals("json", jQuery.ajax.getCall(0).args[0].dataType);
//       // The original method can be restored by calling object.method.restore()
//     });

//     it("Spy: API", () => {
//       // The preferred approach is to use the spy’s 'calledWith' method, because it keeps
//       // your test from being too specific about which call did what and so on.
//       // It will return true if the spy was ever called with the provided arguments.
//       // assert(spy.calledWith(message));
//       // If you want to be specific, you can directly check the first argument of the first call.
//       // There are two ways of achieving this
//       // assertEquals(message, spy.args[0][0]); // or
//       // assertEquals(message, spy.getCall(0).args[0]);
//     });

//     it("Spy: properties, withArgs", () => {
//       const object = {
//         method: function (param1) {
//           console.log(`withArgs ${param1}`);
//         },
//       };
//       const spy = sinon.spy(object, "method");

//       object.method(42);
//       object.method(1);

//       assert.isTrue(spy.withArgs(42).calledOnce);
//       assert.isTrue(spy.withArgs(1).calledOnce);
//     });
//   });

//   context("Spy: Stubs examples", () => {
//     // Test stubs are functions (spies) with pre-programmed behavior.
//     // They support the full test spy API in addition to methods which can be used to alter the stub’s behavior.
//     // As spies, stubs can be either anonymous, or wrap existing functions.
//     // When wrapping an existing function with a stub, the original function is not called.
//     it("stub throws", () => {
//       const stub = sinon.stub().throws();
//       const spy1 = sinon.spy();
//       const spy2 = sinon.spy();

//       // stub();
//       spy1();
//       spy2();

//       assert.isTrue(spy1.called);
//       assert.isTrue(spy2.called);
//       //assert.isTrue(stub.calledBefore(spy1));

//       // Creates an anonymous stub function
//       // const stub = sinon.stub();

//       // To stub object methods
//       // stub(obj, 'meth').callsFake(fn)
//     });

//     it("createStubInstance", () => {
//       // If you want to create a stub object of MyConstructor,
//       // but don’t want the constructor to be invoked, use this utility function.
//       // var stub = sinon.createStubInstance(MyConstructor, overrides);
//       // overrides is an optional map overriding created stubs, for example:
//       // var stub = sinon.createStubInstance(MyConstructor, {
//       //   foo: sinon.stub().returnsThis()
//       // });
//       // is the same as:
//       // var stub = sinon.createStubInstance(MyConstructor);
//       // stub.foo.returnsThis();
//       // If provided value is not a stub, it will be used as the returned value:
//       // var stub = sinon.createStubInstance(MyConstructor, {
//       // foo: 3
//       // });
//       // is the same as:
//       // var stub = sinon.createStubInstance(MyConstructor);
//       // stub.foo.returns(3);
//     });

//     it("stub withArgs", () => {
//       const err = "error!";
//       const callback = sinon.stub();
//       callback.withArgs(42).returns(1);
//       callback.withArgs(1).throws(err);

//       callback(); // No return value, no exception
//       console.log("stub returs:", callback(42)); // Returns 1
//       expect(callback).to.have.been.calledTwice;
//       // console.log('stub throws:', callback(1)); // Throws Error("name")

//       // asser.isTrue(callback.threw())?
//       // expect(callback(1)).to.have.been.returned('error!');
//       // stub.resetBehavior();
//       // Resets the stub’s behaviour to the default behaviour
//       // reset behaviour of all stubs using `sinon.resetBehavior()`

//       // stub.resetHistory();
//       // Resets the stub’s history
//       // reset history of all stubs using `sinon.resetHistory()`
//     });

//     it("stub callsFake", () => {
//       // stub.callsFake(fakeFunction);
//       // Makes the stub call the provided fakeFunction when invoked.

//       const myObj = {};
//       myObj.prop = function propFn() {
//         return "foo";
//       };

//       sinon.stub(myObj, "prop").callsFake(function fakeFn() {
//         return "bar";
//       });
//       myObj.prop();
//       expect(myObj.prop).to.have.been.returned("bar");
//     });
//   });
// });
