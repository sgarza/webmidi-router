import { expect } from "chai";

import WebMidiRouter from "../src/";

describe("WebMidiRouter", () => {
  it("should create an instance", () => {
    const router = new WebMidiRouter();

    expect(router).to.be.an.instanceOf(WebMidiRouter);
  });

  describe("enabled()", () => {
    it("should return promise", () => {
      const router = new WebMidiRouter();

      router.enable().then(res => {
        expect(res).to.be.true;
      });
    });
  });
});
