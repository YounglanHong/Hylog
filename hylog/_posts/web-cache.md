---
title: 웹 캐시 정리하기
slug: web-cache
date: "2021-06-19"
description: cache and web cache
tag: [CS]
---

스크립트나 스타일 변경 후 새롭게 배포한 웹 사이트를 크롬 브라우저에서 확인할 때 작업한 내용이 반영이 되지 않아 당황한 적이 있습니다. 이는 기존 웹사이트가 **캐싱** 되었기 때문에 생기는 문제로 **캐시 비우기 및 강력 새로고침**을 통해 브라우저의 캐시를 초기화하는 것으로 해결할 수 있습니다. 캐시와 웹 캐시에 대해서 정리해봅니다.

<figure>
<img src="../images/chrome-cache.png" alt="chrome clear cache and hard refresh" width="350" height="110" />
<figcaption>Chrome clear cache and hard refresh</figcaption>
</figure>

## 캐시(Cache)

**캐시**(Cache)는 '임시 저장소'라는 의미를 가지며 최근 사용한 또는 자주 사용하는 데이터를 기록합니다. 캐시에 데이터를 저장하면 데이터를 빠른 속도로 가져올 수 있습니다. 캐시로부터 필요한 데이터를 가져오는 것을 _'cache hit'_, 캐시에 데이터가 없으면 _'cache miss'_ 라고 합니다.

```js
// pseudo-code
// cache: hash table
// request: hash table key

// cache hit
if request in cache:
	 return cache[request]

// cache miss
else
	 // get data from DB
   result = getDataFromDB()
	// store result
	 cache[request] = result
   return result
```

레포트를 쓰기위해 필요한 책이나 논문과 같은 자료를 도서관에서 찾아보는 상황을 가정해봅시다. 필요한 자료를 매번 도서관에 가서 참고할 수 있지만 대부분은 자료를 빌려서 책상 옆에 두고 참고합니다. 이러한 방법은 간단히 이야기 하면 캐싱하는 것입니다.

<figure>
<img src="../images/cache-ex.png" alt="cache example" width="580" height="250" />
</figure>

캐싱을 이용하면 자료에 빠르게 접근할 수 있지만 공간이 제한적이라는 한계도 존재합니다. 따라서 캐시를 적절히 **삭제(eviction)** 하는 전략이 필요합니다. **Least Recently Used(LRU)** 는 데이터와 함께 최근 접속 시간을 캐시에 저장하고 캐시가 최대 사용량에 도달하면 가장 예전에 접속한 캐시 데이터부터 삭제하는 전략입니다. **Random Replacement** 는 캐시가 최대 사용량에 도달하면 무작위로 캐시 데이터를 삭제하는 전략으로 LRU보다 간단한게 적용할 수 있다는 특징이 있습니다.

---

## 웹 캐시(Web cache)

<figure>
<img src="https://www.keycdn.com/img/support/web-cache-md@2x.webp" alt="web cache" width="600" height="300" />
<figcaption>Web Cache (<a href="https://www.keycdn.com/support/web-cache">keycdn</a>)</figcaption>
</figure>

**웹 캐시**(Web cache) 또는 **HTTP 캐시**(HTTP cache)는 서버 지연을 줄이기 위해 html 문서, 이미지, 동영상 등 리소스를 임시 저장하는 캐시입니다. 웹 캐시는 서버로부터 응답받은 리소스들의 사본을 저장하여 이후 동일한 요청이 발생했을 때 저장한 리소스를 반환합니다. 웹 캐시는 클라이언트 측과 서버 측 모두 활용할 수 있습니다. **클라이언트 측 웹 캐시**에는 이전에 방문한 웹 콘텐츠의 정적 데이터를 캐싱하는 **브라우저 캐시**가 있습니다. **서버 측 웹 캐시**에는 웹 서버의 응답 데이터를 기록하는 **웹 프록시**가 있습니다.

### 1. 브라우저 캐시(Browser Cache)

웹 브라우저는 자주 방문하는 사이트를 캐싱합니다. 유튜브를 처음 방문하면 브라우저는 유튜브라는 사이트에 대해 정보를 가지고 있지 않습니다. 브라우저는 로고, 아이콘, 폰트, 스크립트, 썸네일 등을 캐싱합니다. 다음 방문 시에는 썸네일 같이 새롭게 변경된 콘텐츠만 서버로부터 다운받고 캐싱한 리소스와 함께 렌더링하기 때문에 훨씬 로딩 속도가 빠릅니다. **브라우저 캐시**는 인터넷 리소스를 로컬 디렉토리(Mac: `../Library/Cache`)에 저장하기 때문에 리소스를 SSD나 하드 디스크에서 불러오는 것보다 훨씬 속도가 빠릅니다.

<figure>
<img src="../images/youtube-cached.png" alt="youtube cached data" width="600" height="300" />
</figure>

### 2. 캐싱 프록시(Caching Proxy)

[**캐싱 프록시**](https://hylog.vercel.app/posts/what-is-proxy)는 클라이언트와 원격 서버 사이에 위치하여 클라이언트에서 자주 요청받는 내용을 **프록시 서버**에 저장하고 다음 클라이언트 요청시에는 원격 서버와의 통신없이 프록시 서버에 캐싱한 데이터로 응답합니다. 프록시 서버는 캐시 데이터가 최신 상태가 아니라고 판단하면 클라이언트에 응답을 보내기 전에 원격 서버와 통신하여 해당 캐시를 업데이트합니다. 캐싱 프록시를 활용하면 로드 및 대기 시간을 효과적으로 줄일 수 있습니다.

<figure>
<img src="https://docs.oracle.com/cd/E19438-01/819-3161/images/doc-retrieval.gif" alt="proxy server" width="650" height="250" />
<figcaption>Proxy Server (<a href="https://docs.oracle.com/cd/E19438-01/819-3161/agcache.html">Oracle</a>)</figcaption>
</figure>

---

### 🔗 Reference

[캐싱이란 무엇이고 어떻게 작동합니까 | AWS](https://aws.amazon.com/ko/caching/)

[💵 캐시가 동작하는 아주 구체적인 원리](https://parksb.github.io/article/29.html)

[Love your cache ❤️](https://web.dev/love-your-cache/)

[웹 캐시 - 위키백과](https://ko.wikipedia.org/wiki/%EC%9B%B9_%EC%BA%90%EC%8B%9C)

[Web Caching Explained by Buying Milk at the Supermarket](https://blog.codeanalogies.com/2018/06/11/web-caching-explained-by-buying-milk-at-the-supermarket/)

[The hidden components of Web Caching](https://www.freecodecamp.org/news/the-hidden-components-of-web-caching-970854fe2c49/)
