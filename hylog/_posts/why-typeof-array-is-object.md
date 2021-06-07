---
title: typeof [] === "object"?
slug: why-typeof-array-is-object
date: "2021-06-07"
description: 밀집 배열과 희소 배열
---

## typeof [] === "object"?

```js
typeof [] === "object"; // true
```

- 자바스크립트에 **배열**이라는 타입은 존재하지 않습니다. 배열은 객체 타입입니다.
- 자바스크립트의 **배열**은 배열의 특징을 가지는 객체입니다. 일반적인 배열은 객체와 달리 index로 데이터를 참조하여 순서가 있고 길이(length) 속성을 가진다는 특징이 있습니다.

### 일반적인 배열

*자료구조에서의 배열*은 같은 크기의 메모리 공간이 연속적으로 이어져 있습니다. 아래와 같이 배열의 요소는 같은 데이터 타입이 서로 연속적으로 연결되어 있습니다. 이러한 배열을 **밀집배열(dense array)** 이라고 합니다.

<figure>
<img src="https://poiemaweb.com/assets/fs-images/27-1.png" alt="dense array" width="500" height="200" />
<figcaption>밀집배열 ([poiemaweb](https://poiemaweb.com/js-array-is-not-arrray))</figcaption>
</figure>

```js
// 인덱스 1인 요소(8바이트)의 메모리 주소
배열의 시작 메모리 주소(1000) +  탐색 인덱스(1) * 요소의 바이트 수(8) = 1008
```

이와 같은 배열은 **인덱스**를 통해 임의의 요소에 `O(1)`의 시간 복잡도로 빠르게 접근할 수 있습니다. 만약 배열의 요소를 추가 또는 삭제하는 경우에는 배열의 연속성을 위해 요소를 이동해야 하기 때문에 `O(n)` 의 시간복잡도를 가집니다.

<figure>
<img src="https://poiemaweb.com/assets/fs-images/27-2.png" alt="Insert or Delete elements to dense array" width="500" height="500" />
<figcaption>밀집배열의 요소 추가 삭제 ([poiemaweb](https://poiemaweb.com/js-array-is-not-arrray))</figcaption>
</figure>

### 자바스크립트의 배열은 객체

*자바스크립트의 배열*은 일반적인 배열과 달리 배열의 요소가 연속적으로 연결되어 있지 않습니다. 이러한 배열을 **희소 배열(sparse array)** 이라고 합니다. 희소 배열의 경우 요소 개수보다 길이가 더 큰 값입니다.

```js
let array = [];
arr[100] = "array element";
arr.length; // 101
arr; // (101) [empty × 100, "array element"]
```

*자바스크립트의 배열*은 **해시 테이블**로 만들어져 객체의 `key`를 **인덱스**로 `value`를 **요소**로 가지는 객체입니다. 따라서 일반적인 배열보다 요소의 **탐색, 추가, 삭제**가 빠릅니다.

```js
let array = ["a", "b", "c"];
console.log(Object.getOwnPropertyDescriptors(array))

{
  0: {value: "a", writable: true, enumerable: true, configurable: true}
  1: {value: "b", writable: true, enumerable: true, configurable: true}
  2: {value: "c", writable: true, enumerable: true, configurable: true}
  length: {value: 3, writable: true, enumerable: false, configurable: false}
}
```

### 타입 체크

- 자바스크립트는 [동적 타입 언어](https://developer.mozilla.org/ko/docs/Web/JavaScript/Data_structures)(Dynamically-typed language)입니다.
- `typeof` 연산자를 통해서 원시 타입(Number, String, Booleam 등) 체크는 가능하지만 일반 객체를 제외한 Date, 정규표현식 등 대부분의 객체는 다른 방법으로 구분해야 합니다.
- 자바스크립트 배열의 타입 체크는 `Array.isArray()` 메서드 또는 [`Function.prototype.call`](http://function.prototype.call) 메서드를 사용합니다.

```js
Array.isArray([]); // true

Object.prototype.toString.call([]); // "[object Array]"
```

### 🔗 Reference

[Sparse Arrays vs Dense Arrays in JavaScript - Explained with Examples](https://www.freecodecamp.org/news/sparse-and-dense-arrays-in-javascript/)

[Type Checking | PoiemaWeb](https://poiemaweb.com/js-type-check)

[Data Structures: Objects and Arrays :: Eloquent JavaScript](https://eloquentjavascript.net/04_data.html)

[JavaScript: sparse arrays vs. dense arrays](https://2ality.com/2012/06/dense-arrays.html)

[Array | PoiemaWeb](https://poiemaweb.com/js-array-is-not-arrray)

[Object.getOwnPropertyDescriptor() - JavaScript | MDN](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Object/getOwnPropertyDescriptor)
