## lineui component library (Svelte)

WARNING: this library is written primarily for me, and can change as I please.

Requirements: modern browser ([baseline 2023](https://caniuse.com/?search=css%20nesting)).

[Components list](./src/lib/lineui).

### Dev

Install deps: `npm install`

Edit / or create components in [lineui dir](./src/lib/lineui). If you created new component, dont forget to export it in [index.ts](./src/lib/index.ts). More info in [SvelteKit docs](https://kit.svelte.dev/docs/packaging).

Build to ./dist: `npm run build`
