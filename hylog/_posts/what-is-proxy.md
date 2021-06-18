---
title: 프록시 서버
slug: what-is-proxy
date: "2021-06-18"
description: Proxy server, Forward and Reverse proxy
---

## Proxy

<figure>
<img src="../images/proxy.png" alt="proxy" width="720" height="200" />
<figcaption>Proxy</figcaption>
</figure>

프록시(Proxy)는 "대리"라는 뜻입니다. **프록시 서버**(Proxy Server)는 클라이언트(웹 브라우저)와 서버 중간에서 통신을 대리하는 서버입니다. 프록시 서버를 경유하는 경우 아래의 순서로 웹에 접속합니다.

<figure>
<img src="../images/proxy-server.png" alt="proxy server" width="750" height="300" />
<figcaption>Proxy Server</figcaption>
</figure>

1. 클라이언트에서 웹 브라우저에 URL을 입력하면 프록시 서버로 HTTP 요청을 보냅니다.
2. 프록시 서버에서 1.의 URL로 웹 서버에 HTTP 요청(request)을 보냅니다.
3. 웹 서버에서 프록시 서버로 HTTP 응답(response)을 합니다.
4. 프록시 서버에서 클라이언트의 웹 브라우저로 HTTP 응답을 합니다.

---

## Proxy의 역할

프록시(Proxy)는 놓이는 위치에 따라 클라이언트를 대리하는 **포워드 프록시**(Forward Proxy)와 서버를 대리하는 **리버스 프록시**(Reverse Proxy)로 나눌 수 있습니다.

<figure>
<img src="../images/forward-proxy.png" alt="forward proxy" width="750" height="300" />
<figcaption>Forward Proxy</figcaption>
</figure>

**포워드 프록시**는 클라이언트 가까이에 위치해 클라이언트 대신 서버에 요청을 보내는 역할을 합니다. 로컬 네트워크와 인터넷 사이에 오가는 트래픽을 제어할 수 있습니다. 예를 들어 기업은 기업 네트워크에 포워드 프록시를 도입하여 직원들이 업무 시간에 불필요하거나 부적절한 웹 사이트에 접근하는 것을 막을 수 있습니다.

<figure>
<img src="../images/reverse-proxy.png" alt="reverse proxy" width="750" height="300" />
<figcaption>Reverse Proxy</figcaption>
</figure>

**리버스 프록시**는 서버 가까이에 위치해 서버 대신에 클라이언트에 응답을 보내는 역할을 합니다. 리버스 프록시는 클라이언트에서 서버로 향하는 부적절한 요청을 차단해서 서버를 보호하고 보안 공격을 방어 하는 방화벽(Firewall)의 기능을 합니다.

### 🔗 Reference

[프록시 | 정보통신기술용어](http://www.ktword.co.kr/test/view/view.php?nav=2&no=1829&sh=%ED%94%84%EB%A1%9D%EC%8B%9C)

[What is a Reverse Proxy Server? | NGINX](https://www.nginx.com/resources/glossary/reverse-proxy-server/)

[CORS 와 Webpack DevServer Proxy](https://react.vlpt.us/redux-middleware/09-cors-and-proxy.html)
