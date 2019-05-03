import { expect } from "chai";
import get from 'lodash/get';

import WebMidiRouter from "../src/";

describe("WebMidiRouter", () => {
  it("should create an instance", () => {
    const router = new WebMidiRouter();

    expect(router).to.be.an.instanceOf(WebMidiRouter);
  });

  it("should return promise when enabled", () => {
    const router = new WebMidiRouter();

    router.enable()
      .then(res => {
        expect(res).to.be.true;
      });
  });

  it('should create the correct route mapping when adding a new route', async () => {
    const router = new WebMidiRouter();

    const portName = 'portName';
    const chan = 1;
    const type = 'controlchange';
    const note = 1;
    const value = 1;
    const functionName = 'functionName';
    const config ={
      portName,
      chan,
      type,
      note,
      value,
      functionName,
    };

    await router.enable();

    router.addRoute(config);
    expect(get(router.routes, `[${portName}][${chan}][${type}][${note}][${value}]`))
      .to.equal(functionName);

  });

});
