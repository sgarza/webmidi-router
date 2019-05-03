import webmidi from "webmidi";
import set from 'lodash/set';
import isFunction from 'lodash/isFunction';
class WebMidiRouter {
  constructor(routes) {
    this.inputs = webmidi.inputs;
    this.outputs = webmidi.outputs;
    this.backend = webmidi;

    this._routes = routes || {};
    this._handlers = {};
  }

  enable() {
    return new Promise((res, rej) => {
      webmidi.enable(err => {
        if (err) rej(err);
        res(true);
      });
    });
  }

  getHandlerByName(name) {
    return this._handlers[name];
  }

  addHandler(handler) {
    this._handlers[handler.name] = handler;
  }

  addRoute({ portName, chan, type, note, value, handler }) {
    const handlerName = isFunction(handler) ? handler.name : handler;

    if (isFunction(handler)) {
      this.addHandler(handler);
    } else {
    }

    if (value) {
      set(this._routes, `[${portName}][${chan}][${type}][${note}][${value}]`, handlerName);
    } else {
      set(this._routes, `[${portName}][${chan}][${type}][${note}]`, handlerName);
    }
  }
}

export default WebMidiRouter;
