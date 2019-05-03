import webmidi from "webmidi";
import set from 'lodash/set';
class WebMidiRouter {
  constructor(routes) {
    this.inputs = webmidi.inputs;
    this.outputs = webmidi.outputs;
    this.backend = webmidi;

    this.routes = routes || {};
  }

  enable() {
    return new Promise((res, rej) => {
      webmidi.enable(err => {
        if (err) rej(err);
        res(true);
      });
    });
  }

  addRoute({ portName, chan, type, note, value, functionName }) {
    if (value) {
      set(this.routes, `[${portName}][${chan}][${type}][${note}][${value}]`, functionName);
    } else {
      set(this.routes, `[${portName}][${chan}][${type}][${note}]`, functionName);
    }
  }
}

export default WebMidiRouter;
