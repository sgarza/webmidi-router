# WebMIDI Router

Bind functions to specific MIDI events.

## Getting started

With `npm`

```bash
npm i -S webmidi-router
```

## Usage Example

```javascript
import WebMidiRouter from 'webmidi-router';

const router = new WebMidiRouter();

await router.enable()
  .then(() => {
    console.log(router.inputs, router.outputs);
  })
  .catch((err) => {
    console.log(err);
  });


const portName = router.inputs[0];
const chan = 1;
const type = 'controlchange';
const note = 1;
const handler = (channel, data) => {};

const config = {
  portName,
  chan,
  type,
  note,
  handler
};

router.addRoute(config);

router.enableRoutes();

```

## License

[MIT](LICENSE).
