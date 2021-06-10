---
title: 자바스크립트의 비동기 처리 방식
slug: asynchronous-javascript
date: "2021-06-10"
description: callback, promise, async/await
---

# 비동기 처리란?

- **동기 처리**는 한 작업이 완료될 때까지 기다렸다가 다음 작업을 실행하는 방식입니다. 반면에 **비동기 처리**는 한 작업이 완료되기 전에 다음 작업을 실행하는 방식입니다.
- 비동기 처리는 서버에서 데이터를 가져오는 경우 주로 사용됩니다. 아래의 예시는 서버에서 데이터를 fetch 해오는 상황을 가정해본 것입니다. 비동기 처리 결과는 비동기 함수 바깥에선 접근하거나 상위 스코프의 변수에 할당할 수 없습니다. (1️⃣)

  ```js
  const foo = () => {
    console.log("foo");
  };

  let res;

  const fetchData = (userId) => {
    setTimeout(() => {
      const fakeData = {
        id: userId,
        name: "UnKnown",
      };
      // 500ms 이후에 data fetch
    }, 500);

    res = fakeData; // Reference Error(1️⃣)
  };

  console.log(res); // undefined(1️⃣)

  fetchData(1);
  foo();
  ```

---

# 비동기 처리 방식: Callback, Promise, Async/await

## Callback

- 비동기로 가져온 데이터는 비동기 함수 내부에서 처리해야 합니다. **콜백(callback) 함수**를 사용하면 비동기 처리 시 필요한 동작을 실행할 수 있습니다.

  ```js
  const foo = () => {
    console.log("foo");
  };

  const fetchData = (userId, callback) => {
    setTimeout(() => {
      const fakeData = {
        id: userId,
        name: "UnKnown",
      };
      callback(fakeData);
      // 500ms 이후에 data fetch
    }, 500);
  };

  const callback = (data) => {
    console.log(`id: ${data.id}, name: ${data.name}`);
  };

  fetchData(1, callback);
  foo();

  /*
    foo
    ...
    id: 1, name: UnKnown
  */
  ```

- 비동기 처리 결과(가져온 데이터)를 가지고 다시 비동기 함수를 호출해야 한다면 콜백이 중첩되는 **콜백 헬**(callback hell)이 발생할 수 있습니다. 이와 같은 코드는 가독성이 떨어지고 에러 처리도 힘들다는 문제점이 있습니다.

  ```js
  const callback = ({ id, name }) => {
    console.log(id, name);
    const anotherCallback = (id, name) => {
      console.log("유저의 아이디는 ", id);
      const theOtherCallback = (name) => {
        console.log("유저의 이름은 ", name);
        // 계속해서 이어질 수 있습니다...
      };
    };
  };
  ```

## Promise

- ES6에서 도입된 `Promise` 는 비동기 처리의 결과를 **값**으로 나타내는 객체입니다. 프로미스는 세 가지 상태를 가집니다.

  <figure>
  <img src="../images/promise.png" alt="promise object" width="400" height="200" />
  <figcaption>Promise 객체</figcaption>
  </figure>

  - `new` 키워드로 `Promise` 를 생성하면 프로미스는 **대기**(pending) 상태가 됩니다.
  - `Promise` 생성자 함수는 `resolve` 와 `reject` 를 인자로 받는 콜백 함수 내부에서 비동기 처리를 수행합니다.
  - 비동기 작업이 성공하면 `resolve` 를 호출해 프로미스를 **이행**(fulfilled) 상태로 만들고, 실패하면 `reject` 를 호출해 **거부**(rejected) 상태로 만듭니다.

  ```js
  const fetchData = (userId, callback) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (userId < 0) {
          // 실패
          reject("userId is not valid!");
        }

        const fakeData = {
          id: userId,
          name: "UnKnown",
        };
        // 성공
        resolve(fakeData);
        // 500ms 이후에 data fetch
      }, 500);
    });
  };
  ```

- `then`은 프로미스가 **이행**(fulfilled) 상태 일 때 , `catch`는 프로미스가 **거부**(rejected) 상태 일 때 사용되는 메서드입니다. `then`, `catch` 를 통해서 비동기 처리 결과를 성공과 실패로 나누어 작업할 수 있습니다.

  ```js
  fetchData(1)
    .then(user => {
      // 성공
      console.log("유저 아이디는 ", user.id);
    })
    .catch(err => {
      // 실패
      console.error(err);
    }
  ```

### 🔗 Reference

[Introducing asynchronous JavaScript - Web 개발 학습하기 | MDN](https://developer.mozilla.org/ko/docs/Learn/JavaScript/Asynchronous/Introducing)

[Introducing asynchronous JavaScript - Web 개발 학습하기 | MDN](https://developer.mozilla.org/ko/docs/Learn/JavaScript/Asynchronous/Introducing)

[자바스크립트 비동기 처리와 콜백 함수](https://joshua1988.github.io/web-development/javascript/javascript-asynchronous-operation/)
