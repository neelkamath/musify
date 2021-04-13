# Contributing

## [Installation](installation.md)

## Development

```
npm run dev
```

Open http://localhost:1234 in your browser.

## Linting

- Check: `npm run lint`
- Check and fix: `npm run fix`

## Production

Here's how to test the production build:

1. Save a production build to `dist/`: `npm run build`
1. Serve the website which has been saved to `dist/`.

## Design

- The theme color is `#177DDC`.
- Only use Ant Design components (i.e., don't use components from other design systems, or vanilla HTML components such as `<span>`).
- Only use icons from [Ant Design](https://ant.design/components/icon/).
- Padding from the edges of the screen, and between elements is `16px`.

## Style Guide

- Never use dynamic version ranges for dependencies because packages often break in newer versions. For example, when `npm install`ing a dependency, remove the caret from the version number it saved to `package.json`.
- Name TypeScript files having a main `export` the same as the export. Name other TypeScript files using _camelCase_.
- Name directories and non-TypeScript files using _kebab-case_.

## Support

This app supports the latest version of Chrome, Firefox, Safari, and Edge on desktop.
