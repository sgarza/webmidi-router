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

router.enable()
  .then(() => {
    console.log(router.inputs, router.outputs);
  })
  .catch((err) => {
    console.log(err);
  });

```

## License

[MIT](LICENSE).
