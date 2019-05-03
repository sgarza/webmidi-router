import { expect } from "chai";
import get from 'lodash/get';

import WebMidiRouter from "../src/";

describe("WebMidiRouter", () => {
  const router = new WebMidiRouter();

  describe('when instantiating', () => {
    it("should create an instance", () => {

      expect(router).to.be.an.instanceOf(WebMidiRouter);
    });

    it("should return promise when enabled", () => {
      router.enable()
        .then(res => {
          expect(res).to.be.true;
        });
    });
  });

  describe('when adding a route with a new function handler', () => {
    it('should create the correct route mappings', async () => {
      const portName = 'portName';
      const chan = 1;
      const type = 'controlchange';
      const note = 1;
      const value = 1;
      const handler = () => {};
      const config ={
        portName,
        chan,
        type,
        note,
        value,
        handler,
      };

      router.addRoute(config);

      expect(get(router._routes, `[${portName}][${chan}][${type}][${note}][${value}]`))
        .to.equal(handler.name);

      expect(router._handlers).to.include.keys(handler.name);
      expect(router._handlers[handler.name]).to.equal(handler);
    });
  });

  describe('when adding a route with an exisiting function handler', () => {
    it('should create the correct route mappings', async () => {

      const portName = 'portName';
      const chan = 2;
      const type = 'controlchange';
      const note = 1;
      const value = 1;
      const handler = 'handler';
      const config ={
        portName,
        chan,
        type,
        note,
        value,
        handler,
      };

      router.addRoute(config);

      expect(get(router._routes, `[${portName}][${chan}][${type}][${note}][${value}]`))
        .to.equal(handler);

      expect(router._handlers).to.include.keys(handler);
    });
  });
});
