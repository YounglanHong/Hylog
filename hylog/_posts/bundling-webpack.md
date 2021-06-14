---
title: 번들링과 모듈 번들러 그리고 웹팩
slug: bundling-webpack
date: "2021-06-14"
description: Bundling, Module bundler and Webpack
---

## 번들링(Bundling)과 모듈(Module)

웹 애플리케이션을 구성하는 각각의 파일(**모듈**)들을 하나의 파일로 합치는 것을 **번들링**(bundling)이라고 합니다. **빌드**(build)도 유사한 의미로 사용됩니다.

웹 애플리케이션의 크기가 커지면 유지 보수가 쉽도록 한 파일을 여러 개로 분리해야 합니다. 이때 분리된 파일 각각을 **모듈**(module)이라고 하고 파일을 모듈로 나누어 관리하는 것을 **모듈 시스템**이라고 합니다.

자바스크립트는 기본적으로 모듈 시스템을 지원하지 않습니다. 다시 말하면, 자바스크립트는 `파일 스코프`와 `import`, `export`를 지원하지 않습니다. 자바스크립트에서는 `<script>` 태그를 사용하여 외부의 자바스크립트 파일을 로드할 수 있지만 분리된 자바스크립트 파일들은 모두 하나의 자바스크립트 파일 내에 있는 것처럼 동작합니다. 따라서 분리된 자바스크립트 파일들의 전역 변수가 중복되는 문제가 발생할 수 있습니다. 이러한 한계를 극복하기 위해 webpack등의 **모듈 번들러**가 등장합니다.

```html
<!-- index.html -->
<!DOCTYPE html>
<script src="foo.js"></script>
<script src="bar.js"></script>
```

```js
// foo.js
const user = "foo";
console.log(user);

// bar.js
const user = "bar";
console.log(user); // ERROR
```

### 💡 번들링이 필요한 이유?

나눠놓은 파일을 다시 합쳐야 하는 이유는 **_웹 애플리케이션의 로딩 속도와 성능 문제_** 때문입니다. 웹 페이지가 복잡해질수록 html, css, js 파일 이외에 웹 폰트, favicon 이미지, JSON 데이터 등 많은 파일을 요청하고 응답 받습니다. 받아와야 하는 파일의 개수가 늘어나면 초기 웹 페이지 로딩 속도가 느려지고 사용자가 페이지를 떠날 확률이 높아집니다. 따라서 번들링을 통해 파일을 압축하고 병합하는 작업을 진행하여 파일 개수를 줄이는 것입니다.

---

## 모듈 번들러(Module Bundler)

**모듈 번들러**는 여러 자바스크립트 파일을 하나의 큰 파일로 결합하는 번들링을 합니다. 번들러는 모든 것을 결합하는 방법을 추적하는 종속성(dependency) 그래프를 만듭니다. 웹팩에 `entry point`를 명시하면 `import`과 `dependency`를 가지고 모든 것을 하나의 자바스크립트 파일로 결합합니다.

```js
// Add dependencies(package.json)
npm init -y

// Install Lodash
npm install lodash

// Install webpack
npm install --save-dev webpack webpack-cli

// package.json
"scripts": {
  "build": "webpack",
  "dev": "webpack serve"
}
// Build and Compile index.js to dist/main.js
npm run build
```

```js
// src/index.js
import { camelCase } from "lodash";

console.log(camelCase("hello world"));
```

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <!-- ... -->
  </head>
  <body>
    <!-- <script src="../src/index.js"></script> -->
    <script src="../dist/main.js"></script>
  </body>
</html>
```

### 웹팩(Webpack)

모듈 번들러의 종류로는 webpack, [roll up](https://rollupjs.org/guide/en/), [parcel](https://ko.parceljs.org/), [snowpack](https://www.snowpack.dev/guides/optimize-and-bundle)이 있지만 그 중 가장 많이 사용되는 것은 [**webpack**](https://webpack.js.org/)입니다.

<figure>
<img src="../images/webpack_module-bundler.png" alt="webpack" width="700" height="300" />
<figcaption>Webpack</figcaption>
</figure>

### 웹팩 구성파일

```js
// Customize behavior of webpack
// webpack.config.js

const path = require("path"); // Consistent path name
const BundleAnalyzerPlugin =
  require("webpack-bundle-analyzer").BundleAnalyzerPlugin;

module.exports = {
  // Entry Points
  entry: "src/index.js", // Entry point
  entry: {
    foo: "foo.js", // Entry object(code splitting)
    bar: "bar.js",
  },

  // Output
  output: {
    filename: "main.js", // Filename to compile
    path: path.resolve(__dirname, "dist"), // File location
  },

  // Loaders
  module: {
    // Match files to loaders(css, style, sass-loader)
    rules: [
      {
        test: /\.scss$/,
        use: ["style-loader", "css-loader", "sass-loader"],
      },
    ],
  },

  // Plugins
  // webpack-bundle-analyzer
  plugins: [new BundleAnalyzerPlugin()],

  // Dev Server(watch and serve files)
  // webpack-dev-server
  devServer: {
    contentBase: path.join(__dirname, "public"),
    port: 9000,
  },
};
```

### 🔗 Reference

[모듈 소개](https://ko.javascript.info/modules-intro)

[TOAST UI](https://ui.toast.com/fe-guide/ko_BUNDLER)

[Module Bundlers Explained... Webpack, Rollup, Parcel, and Snowpack](https://www.youtube.com/watch?v=5IG4UmULyoA)

[What is bundling with webpack?](https://www.dottedsquirrel.com/bundling-javascript/)

[웹팩이란? | 웹팩 핸드북](https://joshua1988.github.io/webpack-guide/webpack/what-is-webpack.html#%EC%9B%B9%ED%8C%A9%EC%97%90%EC%84%9C%EC%9D%98-%EB%AA%A8%EB%93%88)
