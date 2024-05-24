# React Crossword Docs - Editions

## History of the Repo

The codebase was originally created by a Guardian user. It's made up of plain javascript, React and SASS. After discussion with the user, the repository was forked and kept under the Guardian github organisation. It was then published to npm under the namespace `@guardian/react-crossword`.

This bundle is then being used in the Editions app to power the crosswords for the Daily Edition.

## Bundling

Previously, this repo used to bundle using Webpack 4. However, due to a large amount of vulnerabilities, and the reality was, the bundling that needed to happen was a very simple javascript module, it was then moved across to Parcel. Parcel offered what we needed - simple serving and bundling.

## How it integrates with Editions

### `Apps/crosswords`

The editions repo is a monorepo. Within than monorepo, is a yarn workspace (yes another monorepo) called `Apps` . One of the packages is called `crosswords`. This package is a simple React app that consumes the `@guardian/react-crossword` package as its top level component. Crossword data is loaded into the `window` object which is passed into this component which allows it to display.

The following package scripts are important:

- `watch` - which will serve the app mentioned above. This is run using parcel. This was previously run using Webpack.
- `build` - Which creates a local bundle into the `dist` folder. This was previously built using webpack.
- `html-update` - This calls a script in the `scripts` folder that takes the bundled `index.html` file and modifies it so that it can be run under the `file` protocol instead of the `http` protocol. Basically, running the app in a browser by opening the `index.html` file, and without serving it.

There is a script in the `scripts` folder called `bundle-html` which acts as the main point for bundling this app. It runs `yarn build` and then kicks off the `html-update`. We then move this code into the `Mallard` (react native app) after we have removed the previous bundle. We talk about this bundle next

### `html/crosswords.bundle`

This folder exists at the top level of `Mallard`. It contains the bundle files from `Apps/crosswords` that have been modified by the `html-update` script. This `crosswords.bundle` folder is imported into the iOS and Android projects and is built as part of it.

When running the app in dev mode, the watch script in `Apps/crossword` is run, creating a served version of the crossword which is then run in the webview. When the app is built for production, it uses these local files.

The crossword is served from this file in `Mallard` `src/components/article/types/crossword.tsx`. For development purposes, you can switch between prod and dev in the `getBundleUri` function called by this component. Please note, if you perform any builds, the apps need to be re-run again to contain the new crossword bundle.

## Recent issues

Not being able to publish `@guardian/react-crossword` to npm. This has now been resolved.

The latest version uses a Parcel bundle which currently doesn’t work in the setup above, within the App, where the previous Webpack 4 version did. It does run and bundle correctly within its own package.

I have also managed to get it to run correctly in `Apps/crossword` serving it locally, but not within the app.

## Next Steps

1. Update `Apps/crosswords` to use the `homepage` package JSON property to force the file protocol when bundling. This will remove the need for the `html-update` script. This should be tried with the `0.2.3` version of `@guardian/react-crossword` as we know that to work. This should simplify the process a little
2. Either update the bundling in `@guardian/react-crossword` or `Apps/crosswords` or both - to fix the issues of it running in the app.
