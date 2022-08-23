## NOT READY (soon)!

<div align="center">
  <img src="./docs/preact-island.svg" align="center" />
</div>
<div align="center">
  <h1 align="center">🏝 Preact Island Starter</h1>
  <p align="center">
    Bootstraps a Preact Island project with no configuration.
  </p>

[![downloads][downloads-badge]][npmcharts]
[![version][version-badge]][package]
[![Supports Preact and React][preact-badge]][preact]
[![MIT License][license-badge]][license]

</div>

## Features

- 🚀 Multi entry point builds by default. Make all the islands you need!
- 🌲 Infinitely tree shakeable. Each entry point tree shakes both the JS and CSS.
- 🧩 First class web component support (including web component portals 🤯)
- 🧁 Zero runtime styles in Typescript thanks to [vanilla-extract](https://vanilla-extract.style/)
- ⛷️ Dev environment injects scripts just like you would use in production.
- 🐿️ Dynamic island build environment thanks to Webpack layers
- 🚢 Built in Netlify deployments
- 🙏 Environmental variable support
- 🐙 Jest and Preact testing library included
- 👔 Fully typed with TypeScript

## Stack

- ⚛️ Preact
- 👔 TypeScript
- 🌐 Webpack 5
- 🧁 Vanilla-Extract
- 🤡 Netlify
- 🐙 Jest and Preact Testing Library
-

## What's Preact Island?

Sometimes you need to embed a component onto someone else's website. This could be a Shopify widget, email sign up form, CMS comment list, social media share icon, etc. Creating these experiences are tedious and difficult because you aren't in control of the website your code will be executed on.

Preact Island helps you build these experiences by adding a lightweight layer on top of Preact. For <5kB, you get a React style workflow (with hooks!), and a framework for rendering your widget with reactive props.

Head on over [to the repo](https://github.com/mwood23/preact-island) for more details!

## Using the Template

No fancy CLI (yet), so to use the template we're going old school!

```sh
git clone git@github.com:mwood23/preact-island-starter.git <NAME OF YOUR PROJECT>

cd <NAME OF YOUR PROJECT>

# Remove the Git history from the repo
rm -rf .git

# Create a new Git history
git init
git add .
git commit -m "Initial commit"

#############################################################
# From here, create a new repo, hook up the remote and push #
#############################################################

# To run the app
npm install

npm run dev
```

## TODO: Document all the API stuffs

## Credits

Artwork by [vik4graphic](https://lottiefiles.com/vik4graphic)

## License

[MIT](LICENSE) - Copyright (c) [Marcus Wood](https://www.marcuswood.io/)

[version-badge]: https://img.shields.io/npm/v/preact-island.svg?style=flat-square
[package]: https://www.npmjs.com/package/preact-island
[downloads-badge]: https://img.shields.io/npm/dm/preact-island.svg?style=flat-square
[npmcharts]: http://npmcharts.com/compare/preact-island
[license-badge]: https://img.shields.io/npm/l/preact-island.svg?style=flat-square
[license]: https://github.com/mwood23/preact-island/blob/master/LICENSE
[preact-badge]: https://img.shields.io/badge/%E2%9A%9B%EF%B8%8F-preact-6F2FBF.svg?style=flat-square
[preact]: https://preactjs.com
[module-formats-badge]: https://img.shields.io/badge/module%20formats-umd%2C%20cjs%2C%20es-green.svg?style=flat-square
[github-star]: https://github.com/mwood23/preact-island/stargazers
