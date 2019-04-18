import webmidi from "webmidi";
class WebMidiRouter {
  constructor() {
    this.inputs = webmidi.inputs;
    this.outputs = webmidi.outputs;
    this.backend = webmidi;
  }

  enable() {
    return new Promise((res, rej) => {
      webmidi.enable(err => {
        if (err) rej(err);
        res(true);
      });
    });
  }
}

export default WebMidiRouter;
