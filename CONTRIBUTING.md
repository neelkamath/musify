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
- Each page must have a `min-height` of `100%` so that footers appear at the bottom of the page instead of below wherever the content ends, and the background color doesn't half-way through the screen. For example, [`HomeLayout.tsx`](../src/components/HomeLayout.tsx) has a `style={{ minHeight: '100%' }}` on its component.

## Style Guide

- Never use dynamic version ranges for dependencies because packages often break in newer versions. For example, when `npm install`ing a dependency, remove the caret from the version number it saved to `package.json`.
- TypeScript interfaces which specify Ant Design form fields (e.g., [`interface ResetPasswordFormData`](src/components/sign-in-page/ResetPasswordSection.tsx)) must be named using the format `<FORM>FormData`, where `<FORM>` is the name of the form.
- Name TypeScript files having a main `export` the same as the export (e.g., [`logOut.ts`](../src/logOut.ts), [`App.tsx`](../src/components/App.tsx)). Name other TypeScript files using _camelCase_.
- Name directories and non-TypeScript files using _kebab-case_.
- Directories in [`src/components/`](../src/components) have a file named after the directory (e.g., [`src/components/chat-page`](../src/components/chat-page) contains [`ChatPage.tsx`](../src/component/chat-page/ChatPage.tsx)) which exports the only file needed outside its directory. The rest of the directory's files are only used within the directory.

## Support

This app supports the latest version of Chrome, Firefox, Safari, and Edge on desktop.
