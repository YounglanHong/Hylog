---
title: 문자열 인코딩에 대해 알아보기
slug: what-is-character-encoding
date: "2021-06-05"
description: ASCII, EUC-KR and Unicode
---

🔑 문자열 인코딩은 컴퓨터가 문자를 **2진수**로 표현하는 방식입니다.

ex) `ASCII`, `EUC-KR`, `Unicode`(`UTF-8`, `UTF-16`, `UTF-32`)

> ### 💡글자가 깨지거나 보이지 않는 문제가 발생하는 이유?
>
> - 초기 컴퓨터는 영어와 일부 특수 문자만 지원했습니다. 따라서 국가별 언어를 표현하는 독자적 규칙이 형성되었습니다.
> - 컴퓨터가 발전하면서 등장한 다양한 운영체제, 개발 환경에 따른 문자열 인코딩 방식이 달라 호환되지 않는 문제가 발생했습니다.

## 1. ASCII Code(아스키 코드, American Standard Code for Information Interchange)

처음으로 정립한 표준으로 **영문 알파벳**을 사용하는 대표적인 문자 인코딩 방식입니다.
대문자, 소문자, 아라비아 숫자, 공백 및 특수 문자를 **0 ~ 127**(총 128자)의 숫자로 표현할 수 있습니다.

<figure align="center">
<img src="https://upload.wikimedia.org/wikipedia/commons/thumb/1/1b/ASCII-Table-wide.svg/1600px-ASCII-Table-wide.svg.png" alt="ASCII table" width="500" height="300" />
<figcaption className="cap">ASCII Table (wikipedia)</figcaption>
</figure>

```js
let str = "hello";

for (let idx in str) {
  console.log(str.charCodeAt(idx));
}
// 104 101 108 108 111
```

## 2. EUC-KR(CP949)

**한글**을 표현하기 위해 등장한 문자열 인코딩 방식입니다. **16bit(2byte)** 를 고정적으로 사용합니다. 모든 글자가 완성된 형태로 존재하는 **완성형 코드**입니다.

> 현재는 UTF-8로 변경이 권장됩니다.

## 3. Unicode(유니코드)

- 국제 표준화 기구(ISO)에서 만든 **동일한 규칙**으로 모든 언어 표현하는 문자열 인코딩 방식입니다.

### 3-1. UTF-8

- **8bit(1byte)** 로 인코딩하고, ASCII 코드와 완벽히 호환됩니다. **1 ~ 6byte**까지 사용할 수 있습니다.

  > 대부분의 환경에서 호환되지만 `JSON`은 UTF-8 인코딩만 지원합니다.

### 3-2. UTF-16(Multi-Byte)

- **16bit** (일반 문자 **2byte** 또는 특수 문자 **4byte**)로 인코딩됩니다. ASCII 코드와 호환되지 않습니다.

  > Java, Window 환경에서 호환되어 사용합니다.

### 3-2. UTF-32

- 32bit(4byte) 고정적으로 사용

  > 반드시 사용해야 하는 환경 아니면 사용을 권장하지 않고, HTML5에서는 사용이 금지되었습니다.

---

### 🔗 Reference

[Character encoding: Essential concepts | W3](https://www.w3.org/International/articles/definitions-characters/)

[Character encoding | Wiki](https://ko.wikipedia.org/wiki/%EB%AC%B8%EC%9E%90_%EC%9D%B8%EC%BD%94%EB%94%A9)

[한글 인코딩의 이해 | d2](https://d2.naver.com/helloworld/19187)
