import { expect } from "chai";
import sinon from "sinon";
import get from "lodash/get";

import WebMidiRouter from "../src/";

describe("WebMidiRouter", () => {
  const router = new WebMidiRouter();

  describe("when instantiating", () => {
    it("should create an instance", () => {
      expect(router).to.be.an.instanceOf(WebMidiRouter);
    });

    it("should return promise when enabled", () => {
      router.enable().then(res => {
        expect(res).to.be.true;
      });
    });

    it("should have inputs and outpus", () => {
      expect(router.inputs.length).to.equal(0);
      expect(router.outputs.length).to.equal(0);
    });
  });

  describe("when adding a route with a new function handler", () => {
    const portName = "portName";
    const chan = 1;
    const type = "controlchange";
    const note = 1;
    const value = 1;
    const handler = () => {};
    const config = {
      portName,
      chan,
      type,
      note,
      value,
      handler
    };

    it("should create the correct route mappings", async () => {
      router.addRoute(config);

      expect(
        get(
          router._routes,
          `[${portName}][${chan}][${type}][${note}][${value}]`
        )
      ).to.equal(handler.name);

      expect(router._handlers).to.include.keys(handler.name);
      expect(router._handlers[handler.name]).to.equal(handler);
    });

    it("should execute a controlchange handler if exist", () => {
      const portName = "portName";
      const chan = 1;
      const type = "controlchange";
      const note = 1;
      const value = 1;

      expect(
        get(
          router._routes,
          `[${portName}][${chan}][${type}][${note}][${value}]`
        )
      ).to.equal(handler.name);

      const fakeInput = {
        addListener: sinon.spy(),
      }

      const handlerSpy = sinon.spy();

      const getInputByNameFake = sinon.fake.returns(fakeInput);
      const getHandlerByNameFake = sinon.fake.returns(handlerSpy);

      sinon.replace(router.backend, "getInputByName", getInputByNameFake);
      sinon.replace(router, "getHandlerByName", getHandlerByNameFake)
      router.enableRoutes();

      // Simulate midi message
      const cc = 16;
      router._onControlChange(portName)({ channel: chan, controller: { number: note }, value, data: [cc, note, value]});

      expect(fakeInput.addListener.calledOnce).to.be.true;
      expect(getHandlerByNameFake.calledOnce).to.be.true;
      expect(handlerSpy.calledOnce).to.be.true;
    });
  });

  describe("when adding a route with an exisiting function handler", () => {
    it("should create the correct route mappings", async () => {
      const portName = "portName";
      const chan = 2;
      const type = "controlchange";
      const note = 1;
      const value = 1;
      const handler = "handler";
      const config = {
        portName,
        chan,
        type,
        note,
        value,
        handler
      };

      router.addRoute(config);

      expect(
        get(
          router._routes,
          `[${portName}][${chan}][${type}][${note}][${value}]`
        )
      ).to.equal(handler);

      expect(router._handlers).to.include.keys(handler);
    });

  });
});
