import webmidi from "webmidi";
import set from "lodash/set";
import get from "lodash/get";
import isFunction from "lodash/isFunction";
class WebMidiRouter {
  constructor(routes) {
    this.backend = webmidi;
    this.inputs = this.backend.inputs;
    this.outputs = this.backend.outputs;

    this._routes = routes || {};
    this._handlers = {};
  }

  enable() {
    return new Promise((res, rej) => {
      this.backend.enable(err => {
        if (err) rej(err);
        this.inputs = this.backend.inputs;
        this.outputs = this.backend.outputs;
        res(true);
      });
    });
  }

  disable() {
    this.backend.disable();
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
    }

    if (value) {
      set(
        this._routes,
        `[${portName}][${chan}][${type}][${note}][${value}]`,
        handlerName
      );
    } else {
      set(
        this._routes,
        `[${portName}][${chan}][${type}][${note}]`,
        handlerName
      );
    }
  }

  enableRoutes() {
    const inputNames = Object.keys(this._routes);

    inputNames.forEach(name => {
      const input = this.backend.getInputByName(name);

      input.addListener(
        "controlchange",
        "all",
        this._onControlChange(name),
      );
    });
  }

  // Private

  _onControlChange(name) {
    return ({ channel, controller: { number }, value, data }) => {
      const handleName =
        get(this._routes, `[${name}][${channel}][controlchange][${number}][${value}]`) ||
        get(this._routes, `[${name}][${channel}][controlchange][${number}]`);

      if (!handleName) return;

      const handle = this.getHandlerByName(handleName);

      handle && handle(channel, data);
    }
  }
}

export default WebMidiRouter;
