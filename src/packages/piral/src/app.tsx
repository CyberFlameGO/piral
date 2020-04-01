import { PiralConfiguration } from 'piral-core';
import { createPiral } from './api';
import { createInstanceElement } from './utils';
import { PiralRenderBaseOptions } from './types';

/**
 * Gets a new instantiated Piral instance using the provided options.
 * Very useful for server-side rendering.
 * @param config The configuration for creating the Piral instance.
 * @param options The options to use when rendering the Piral instance.
 * @example
```ts
import { render } from 'react-dom';
import { getAppInstance } from 'piral';

const { app } = getAppInstance();
render(app, document.querySelector('#app'));
```
 */
export function getAppInstance(config: PiralConfiguration = {}, options: PiralRenderBaseOptions = {}) {
  const { settings, layout, errors } = options;
  const instance = createPiral(config, settings);
  const app = createInstanceElement(instance, layout, errors);
  return { instance, app };
}
