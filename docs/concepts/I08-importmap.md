---
title: Importmaps
description: Using importmaps for sharing dependencies.
section: Internals
---

# Importmaps

Importmaps are an emerging web standard that is supposed to bring convenience and performance benefits to web applications. Its main purpose are the aliasing of dependencies. In Piral importmaps can be used as a built-time construct to tell the `piral-cli` what dependencies should be reused.

In general Piral distinguishes between three types of dependencies:

- non-shared dependencies, i.e., dependencies that are bundled and can be optimized, e.g., by removing things that are not needed / referenced in the current build process
- centrally shared dependencies, i.e., dependencies that are already bundled with an app shell, but otherwise not optimized
- distributed shared dependencies, i.e., dependencies that are shipped (not bundled) unoptimized with a pilet - such that other pilets can use them, too

Besides the standard `imports` key of the importmaps specification the `piral-cli` also allows a new key called `inherit`. This one can be used to specify packages coming with an importmap.

## Piral Instance Importmaps

A Piral instance can use importmaps to define what dependencies are centrally shared. Either place an `importmap` key in the *package.json* like

```json
{
  "importmap": {
    "imports": {}
  }
}
```

or use a separate file that you define in the *package.json*:

```json
{
  "importmap": "importmap.json"
}
```

The content of the file should be the importmaps JSON:

```json
{
  "imports": {}
}
```

The content defines the (centrally) shared dependencies, e.g., if you want to share something like `preact` you can use:

```json
{
  "imports": {
    "preact": "."
  }
}
```

This will use the version of `preact` that is available from the current workspace. You can also be explicit about this:

```json
{
  "imports": {
    "preact": "preact"
  }
}
```

Or even use a specific directory as entry point for the shared dependency:

```json
{
  "imports": {
    "preact": "./node_modules/preact/lib/index.js"
  }
}
```

Usually, you don't want to start with your shared dependencies from scratch. You can use existing importmaps to actually make up an importmap that works for you:

```json
{
  "imports": {},
  "inherit": ["piral-base", "piral-core"]
}
```

Here, you inherit the importmap defined in `piral-base` (sharing `tslib`), as well as the importmap from `piral-core` (sharing `react`, `react-dom`, `react-router`, `react-router-dom`).

This way, you can either create re-usable packages containing importmaps or easily remove existing dependencies by not inhering from the parent importmaps. As an example, if you don't want to share `react-dom` then just change the previous importmaps definition to:

```json
{
  "imports": {
    "react": ".",
    "react-router": ".",
    "react-router-dom": "."
  },
  "inherit": ["piral-base"]
}
```

## Pilet Importmaps

For pilets the story is similar, but not exactly the same. As with a Piral instance you can define a key `importmap` in the *package.json* of the pilet. Likewise, you can either have an importmap definition in there, such as

```json
{
  "importmap": {
    "imports": {}
  }
}
```

or use a separate file that you define in the *package.json*:

```json
{
  "importmap": "importmap.json"
}
```

Either way is fine. The content defines the shared dependencies, e.g., if you want to share something like `emojis-list` you can use:

```json
{
  "imports": {
    "emojis-list": "."
  }
}
```

This will use the version of `emojis-list` that is available from the current workspace. You can also be explicit about this:

```json
{
  "imports": {
    "emojis-list": "emojis-list"
  }
}
```

Or even use a specific directory as entry point for the shared dependency:

```json
{
  "imports": {
    "emojis-list": "./node_modules/emojis-list/index.js"
  }
}
```

This notation will introduce `emojis-list` as a shared dependency, however, instead of bundling the dependency with the pilet it will be put in a side-bundle. This way, the dependencies code will only be loaded from the current pilet if the same dependency has not yet been resolved from another pilet.

The `inherit` key can also be used by the pilet, but this will exclusively be taken as centrally shared dependencies. Therefore, dependencies that appear in the inheritance chain are marked as external and not (side) bundled at all.

Consequently, the following

```json
{
  "imports": {
    "emojis-list": "./node_modules/emojis-list/index.js"
  },
  "inherit": ["my-app-shell"]
}
```

will add `emojis-list` as a distributed dependency (adding a side-bundle for the dependency to the assets) and treat any dependency exposed by the `my-app-shell` as a centrally shared dependency.

## Importmap Notation

The importmap notation also allows some special syntax that can be used to set up some rules for the dependency. For instance,

```json
{
  "imports": {
    "emojis-list@3.x": "."
  }
}
```

will actually accept *any* version 3 of `emojis-list`. By default, the version that is available in the current workspace will be qualified. For instance, if `emojis-list` would have been installed in `3.1.2` then the default qualifier would be:

```json
{
  "imports": {
    "emojis-list@3.1.2": "."
  }
}
```

Note, that whatever you specify cannot violate the currently available version. Therefore, specifying

```json
{
  "imports": {
    "emojis-list@2.x": "."
  }
}
```

would not work if only a 3.x version is available. However,

```json
{
  "imports": {
    "emojis-list@>=2.x": "."
  }
}
```

would work.

Another possibility is that remote packages can be added:

```json
{
  "imports": {
    "emojis-list": "https://mycdn.com/js/emojis-list.js"
  }
}
```

In case of remote packages no side-bundle is created. Instead, the given URL will be used as a side-bundle. Remote packages will give you a neat way to restrict shared dependencies to a pre-defined pool, which is then re-used consistently.
