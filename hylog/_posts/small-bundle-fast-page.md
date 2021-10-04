---
title: [번역] 작은 번들, 빠른 페이지 - 과도한 자바스크립트 다루는 법
slug: small-bundle-fast-page
date: "2021-10-04"
description: Minimising the amount of javascript and bundle size
tag: [Javascript]
---

> Ben Schwarz가 작성한 [Small Bundles, Fast Pages: What To Do With Too Much JavaScript](https://calibreapp.com/blog/bundle-size-optimization?utm_campaign=Mastering%20JS%20Weekly&utm_medium=email&utm_source=Revue%20newsletter)를 번역한 글입니다.

---

빠른 사용자 경험(UX)을 위해서는 웹 페이지에서 불러오는 자바스크립트의 양을 최소화하는 것이 핵심입니다. 이 게시글에서는 번들 크기가 중요한 이유에 대해 설명하고 JS 번들을 모니터링, 시각화 및 최소화하기 위해 필요한 도구와 방법을 추천합니다.

## 번들 크기는 성능에 어떤 영향을 미치는지

많은 양의 자바스크립트는 다음 두 단계에서 사이트 속도에 부정적 영향을 준다.

1. **페이지 로드 시**: 크기가 큰 번들은 다운로드 속도가 오래 걸린다.
2. **파싱과 컴파일 과정에서**: 크기가 큰 번들은 기계어로 변환되는데 오래 걸리며, 이는 JS 초기화(initialization)를 지연시킨다.

만약 사용자가 속도가 느리고 연결이 불안정한 네트워크 환경에 있거나, 배터리가 거의 없는 장치 또는 잘 작동되지 않는 안드로이드를 사용하는 경우 **큰 번들 크기로 인해 로딩, 렌더링, 사용자 상호작용 또는 페이지 스크롤에서 지연이 발생**할 수 있다.

물론 사용자가 수준 이하의 경험을 하는 이유가 오래된 기계나 속도가 느린 네트워크 때문만은 아니다. 리소스를 캐싱(caching), 압축(compressing), 최소화(minifying)하는 것이 큰 번들의 영향을 부분적으로 완화할 수 있지만, 번들 크기를 줄이는 것이 빠른 페이지를 보장하는 유일한 방법이다.

페이지를 가능한 한 가볍게 유지함으로써, 모든 방문자가 훌륭한 사용자 경험을 할 수 있는 최고의 기회를 얻도록 할 수 있다.

## 번들 크기에 어떤 성능 측정 항목이 영향을 받는지

요약하면, 대부분이다! 많은 양의 스크립트를 갖는 페이지 때문에 LCP([Largest Contentful Paint](https://calibreapp.com/docs/metrics/largest-contentful-paint), [최대 콘텐츠풀 페인트](https://web.dev/i18n/ko/lcp/))가 지연되거나, CLS(Cumulative Layout Shift, [누적 레이아웃 이동](https://web.dev/i18n/ko/cls/))이 발생하고, FID(First Input Delay, [최초 입력 지연](https://web.dev/i18n/ko/fid/))와 TBT([Total Blocking Time](https://calibreapp.com/docs/metrics/total-blocking-time), [총 차단 시간](https://web.dev/i18n/ko/tbt/)), TTI([Time to Interactive](https://calibreapp.com/docs/metrics/time-to-interactive), [상호 작용까지의 시간](https://web.dev/i18n/ko/tti/)) 이 증가할 수 있다.

성능 측정에서 느린 판독값은 좋지 않은 사용자 경험을 정량화하고 [SEO 순위](https://calibreapp.com/blog/site-speed-search-ranking-complete-guide)에서 불이익을 초래할 수 있다.

## 과도한 자바스크립트는 어느 정도인지

성능(performance)에 대해 이야기할 때, 대개 압축된(compressed) 리소스 크기에 주목한다. 그러나 일단 압축이 해제된 리소스는 2~3배 더 커질 것이다.

예를 들어, 300KB의 압축된 스크립트가 있는 페이지는 압축 해제 시 용량이 900KB ~ 1.3MB가 될 수 있다.

CPU가 제한된 장치의 경우 멀티-메가바이트 페이로드는 특히 성능에 불리한 영향을 줄 수 있다.

웹 페이지의 스크립트는 압축 시 최대 300KB로 제한하는 것을 권장한다. 가능하면 코드 분할(code splitting)을 통해 코드를 50KB 이하의 작은 덩어리로 분할한다. 그렇게 하면 브라우저는 JS 리소스를 병렬로 다운로드 하여 HTTP 2 멀티플렉싱을 최대한 활용할 수 있다.

> 새로운 글로벌 기준선은 압축 시 HTML/CSS/폰트는 최대 100KB, 자바스크립트는 300 ~ 350KB의 용량을 권장한다. - Alex Russell

## 빠른 코드 성능을 유지하는 도구 및 자동화

### 에디터를 설정을 변경

[Sublime](https://packagecontrol.io/packages/Import%20Cost) 또는 [VSCode](https://marketplace.visualstudio.com/items?itemName=wix.vscode-import-cost) 에디터에서 import cost plugin을 사용하면 서드파티 라이브러리를 불러올 때 해당 라이브러리의 크기를 알려준다.

`import cost` 라이브러리를 사용하면 패키지 크기의 기준값을 설정할 수 있다. 디폴트 값보다 과감한 기준을 세우는 것이 좋다.

```jsx
// Upper size limit, in KB, that will count a package as a small package
"importCost.smallPackageSize": 15,

  // Upper size limit, in KB, that will count a package as a medium package
"importCost.mediumPackageSize": 50,
```

> `import cost` 라이브러리는 번들 코드 내의 공통 의존성을 가진 두 라이브러리의 비용 절감을 계산할 수는 없다.

### 번들에 포함된 내용을 시각화

[Bundle Buddy](https://www.bundle-buddy.com/), [source-map-explorer](https://github.com/danvk/source-map-explorer#readme) 및  [webpack-bundle-analyzer](https://github.com/webpack-contrib/webpack-bundle-analyzer#readme) 와 같은 도구를 사용하여 인터랙티브한 번들 트리맵을 생성한다.

트리맵에서 블록 크기는 파일 크기와 비례하기 때문에 큰 import를 빠르게 발견할 수 있다.

위와 같은 도구를 사용하여 번들을 시각적으로 탐색하면 예상보다 큰 모듈을 식별할 수 있다.

### 더 작고 대체할 수 있는 서드파티 라이브러리 탐색

종종 우리는 라이브러리를 선택하고 그것을 영원히 쓴다. 하지만 당신이 모르는 더 가벼운 대안들이 있을 수 있다.

[BundlePhobia.com](http://bundlephobia.com/) 를 통해 프로젝트의 `package.json` 를 스캔하거나 npm 패키지를 탐색할 수 있다.

"트리 쉐이킹"이 가능한 라이브러리의 경우 webpack, rollup, esbuild와 같은 번들러 도구를 사용하여 빌드 중에 사용하지 않은 코드는 제거할 수 있다. 되도록 트리 쉐이킹이 가능한 라이브러리를 선택하는 것이 좋다.

> 가끔 라이브러리가 이전 브라우저를 지원하지 않기 때문에 크기가 작은 경우가 있다. 엣지 케이스를 면밀히 테스트하는 것이 좋다.

### 선택한 패키지가 사용되지 않도록 차단

패키지 선택 이유를 두고 팀이나 회사에서 의사소통하는 것을 어려울 수 있다. 이에 대응하기 위해 ESLint 의 `[no-restricted-import](https://eslint.org/docs/rules/no-restricted-imports)`를 사용하여 제한된 패키지가 포함될 때 경고 또는 오류를 표시할 수 있다.

다음 예에서 ESLint는 `moment` 패키지가 포함된 경우 빌드를 실패하고 `date-fns`를 대체재로 추천한다.

```json
{
  "rules": {
    "no-restricted-imports": [
      "error",
      {
        "paths": [
          {
            "name": "moment",
            "message": "Use date-fns instead. See https://bundlephobia.com/package/moment"
          }
        ]
      }
    ]
  }
}
```

## 컴포넌드와 의존성의 동적 로딩

[Webpack](https://webpack.js.org/guides/code-splitting/), [ESBuild](https://esbuild.github.io/api/#splitting), [Rollup](https://rollupjs.org/guide/en/#code-splitting) 또는 [Parcel](https://parceljs.org/features/code-splitting/) 과 같은 대부분의 유명한 번들러를 사용하면 코드와 의존성을 코드 분할(code-split)할 수 있다. 코드 스플리팅은 필요에 따라 애플리케이션의 일부를 레이지 로드(lazy load)할 수 있어 번들 크기가 작아지고 초기 로딩이 빨라진다.

[React](https://reactjs.org/docs/code-splitting.html#reactlazy), [Next](https://nextjs.org/docs/advanced-features/dynamic-import), [Angular](https://angular.io/guide/lazy-loading-ngmodules) 그리고 [Vue](https://router.vuejs.org/guide/advanced/lazy-loading.html) 모두 레이지 로딩 컴포넌트를 간단하게 만들 수 있는 유틸리티를 제공한다. 아래는 React 예시이다:

```jsx
import React, { Fragment, Suspense } from "react";
import Skeleton from "./Skeleton";

// Lazy loading React import
const Dashboard = React.lazy(() => import("./Dashboard"));

function Page() {
  return (
    <Fragment>
      <Suspense fallback={<Skeleton message="Loading" />}>
        <Dashboard />
      </Suspense>
    </Fragment>
  );
}
```

레이지 로딩(lazy-loading)은 많은 장점이 있다.

- 로드할 초기 스트립트가 적다.
- 많은 수의 작은 요청이 병렬로 로드된다.
- 정기적으로 변경되지 않는 코드는 장기적으로 캐시할 수 있다.([cached long-term](https://web.dev/uses-long-cache-ttl/))

레이지 로딩은 다음의 경우 효과적이다.

- 라우트/ 네비게이션 기반 레이지 로딩: 각 페이지에 필요한 스크립트를 분할한다.
- 상호작용 기반 레이지 로딩: 필요에 따라 종속성(dependency)을 로드한다. (예: 뷰어가 패널을 열 때)

## 주요 콘텐츠는 서버사이드 렌더링을 선호

최종 사용자든 SEO 스파이더든 상관없이 기본 콘텐츠를 최대한 빨리 렌더링해야 한다.

콘텐츠 기반 페이지의 경우, SPA(Single Page Applications, 싱글 페이지 애플리케이션)보다 SSR(Server-side rendering, 서버 사이드 렌더링)을 추천한다. 싱글 페이지 애플리케이션은 세션 시간이 길거나 매끄럽게 전환되면서 콘텐츠를 빨리 보여줘야하는 인터페이스(예: 장바구니)에 적합하다. 이외의 경우 가능하면 서버사이드로 렌더링해라.
