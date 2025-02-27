[![Piral Logo](https://github.com/smapiot/piral/raw/main/docs/assets/logo.png)](https://piral.io)

# [Piral single-spa](https://piral.io) &middot; [![GitHub License](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/smapiot/piral/blob/main/LICENSE) [![npm version](https://img.shields.io/npm/v/piral-single-spa.svg?style=flat)](https://www.npmjs.com/package/piral-single-spa) [![tested with jest](https://img.shields.io/badge/tested_with-jest-99424f.svg)](https://jestjs.io) [![Gitter Chat](https://badges.gitter.im/gitterHQ/gitter.png)](https://gitter.im/piral-io/community)

This is a plugin that only has a peer dependency to `piral-core`. What `piral-single-spa` brings to the table is a set of Pilet API extensions that can be used with `piral` or `piral-core`.

The set includes a single-spa converter for any component registration, as well as a `fromSingleSpa` shortcut.

By default, these API extensions are not integrated in `piral`, so you'd need to add them to your Piral instance.

## Documentation

The following functions are brought to the Pilet API.

### `fromSingleSpa()`

Transforms a standard single-spa component / microfrontend into a component that can be used in Piral, essentially wrapping it with a reference to the corresponding converter.

## Usage

::: summary: For pilet authors

You can use the `fromSingleSpa` function from the Pilet API to convert your single-spa components to components usable by your Piral instance.

Example use:

```ts
import { PiletApi } from '<name-of-piral-instance>';
import * as spaComponent from './root';

export function setup(piral: PiletApi) {
  piral.registerPage('/sample', piral.fromSingleSpa(spaComponent));
}
```

Alternatively, if `piral-single-spa` has not been added to the Piral instance you can install and use the package also from a pilet directly.

```ts
import { PiletApi } from '<name-of-piral-instance>';
import { fromSingleSpa } from 'piral-single-spa/convert';
import * as spaComponent from './root';

export function setup(piral: PiletApi) {
  piral.registerPage('/sample', fromSingleSpa(spaComponent));
}
```

:::

::: summary: For Piral instance developers

Using single-spa with Piral is as simple as installing `piral-single-spa`.

```ts
import { createSingleSpaApi } from 'piral-single-spa';
```

The integration looks like:

```ts
const instance = createInstance({
  // important part
  plugins: [createSingleSpaApi()],
  // ...
});
```

:::

## License

Piral is released using the MIT license. For more information see the [license file](./LICENSE).
