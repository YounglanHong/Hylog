---
title: 하드디스크와 메모리(RAM) 비교
slug: hdd-ram
date: "2021-06-04"
description: Hard disk and Memory(RAM)
---

### `저장장치(Storage)`는 데이터를 일시적 또는 긴 기간 저장하기 위해 사용하는 장치

- 컴퓨터는 다양한 저장장치를 사용하여 **효율적으로** 작업을 처리합니다.

---

## 1. 하드 디스크(Hard Disk, Hard Drive, HDD)

<figure>
  <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/f/f8/Laptop-hard-drive-exposed.jpg/1920px-Laptop-hard-drive-exposed.jpg" alt="hard disk" width="250" height="200" />
<figcaption>Hard disk (<a href="https://upload.wikimedia.org/wikipedia/commons/thumb/f/f8/Laptop-hard-drive-exposed.jpg/1920px-Laptop-hard-drive-exposed.jpg">wikipedia</a>)</figcaption>
</figure>

- 컴퓨너의 `보조기억장치`로 데이터 접근 속도가 비교적 느립니다.
- 오래 보관할 데이터를 저장하기 위해 사용합니다.
- 컴퓨터 전원이 공급되지 않아도 저장한 데이터가 사라지지 않습니다.(`비휘발성`)

## 2. 메모리(Random Access Memory, RAM)

<figure>
  <img src="https://upload.wikimedia.org/wikipedia/commons/d/d3/RAM_n.jpg" alt="random access memory" width="250" height="250" />
<figcaption>RAM (<a href="https://upload.wikimedia.org/wikipedia/commons/d/d3/RAM_n.jpg">wikipedia</a>)</figcaption>
</figure>

- 컴퓨터의 `주기억장치`로 데이터 접근 속도가 HDD보다 빨라 성능이 좋습니다.
- 컴퓨터 전원이 꺼지면 저장한 데이터가 사라집니다.(`휘발성`)

<blockquote>
<h4>☑️ CPU는 처리할 데이터를 <strong>하드디스크</strong>에서 가져와서 메모리(RAM)에 올려놓고 일을 처리합니다.</h4>

- 텍스트 편집기로 작성 중인 글은 RAM에 올려져 있습니다. 텍스트 편집기 창을 닫을 때
  - '저장 안함'을 선택하면 하드 디스크에 저장되지 않고 프로그램이 종료됩니다.
  - '저장'하면 작성하던 글이 하드디스크에 저장됩니다.

<figure align="center">
<img src="https://github.com/YounglanHong/Hylog/blob/master/hylog/public/images/save.png?raw=true" alt="save example" width="500" height="300" />
</figure>
</blockquote>

<blockquote>
<h4>☑️ RAM이 하드디스크보다 비싼 이유는?</h4>

- RAM은 반도체로 인해 매우 비싼 반면 하드드라이브는 마그네틱 테이프 사용으로 인해 가격이 저렴합니다.
- RAM은 **속도**를 높이는 데 사용되고 하드 디스크는 **저장 공간**을 늘리는 데 사용됩니다.

  - RAM 크기는 보통 `4 ~ 32GB`, 반면 하드디스크는 `1 ~ 3TB`
  - 처리 속도는 CPU > 레지스터 > 캐시 > 메모리(RAM) > 하드디스크 순서로 빠릅니다.
  <figure align="center">
  <img src="https://upload.wikimedia.org/wikipedia/commons/c/c6/%EB%A9%94%EB%AA%A8%EB%A6%AC%EA%B3%84%EC%B8%B5%EA%B5%AC%EC%A1%B0%EA%B7%B8%EB%A6%BC1.png" alt="memory hierarchy" width="250" height="200" />
  <figcaption>메모리 계층구조 (<a href="https://upload.wikimedia.org/wikipedia/commons/c/c6/%EB%A9%94%EB%AA%A8%EB%A6%AC%EA%B3%84%EC%B8%B5%EA%B5%AC%EC%A1%B0%EA%B7%B8%EB%A6%BC1.png">wikipedia</a>)
  </figcaption>
  </figure>
  </blockquote>

<blockquote className="summary">
<h2>💡정리</h2>

- 용도에 따라 RAM은 **주기억장치**, 하드디스크는 **보조기억장치**로 분류합니다.
- RAM은 **휘발성 메모리**, 하드디스크는 **비 휘발성 메모리**입니다.
</blockquote>

<!-- ## 💡정리

| 특징   |                  | 예시                           |
| ------ | ---------------- | ------------------------------ |
| 용도   | 주기억장치       | RAM, ROM                       |
|        | 보조기억장치     | HDD(하드디스크), SSD, DVD, USB |
| 휘발성 | 휘발성 메모리    | RAM                            |
|        | 비 휘발성 메모리 | HDD, SSD, ROM                  | -->

### 🔗Reference

[Hard Drive vs. RAM](https://www.educba.com/hard-drive-vs-ram/)

[RAM vs. HDD | geeksforgeeks](https://www.geeksforgeeks.org/difference-between-random-access-memory-ram-and-hard-disk-drive-hdd/)

[Memory vs. Storage](https://www.enterprisestorageforum.com/hardware/memory-vs-storage/)

[메모리 계층구조](https://diveintosystems.org/antora/diveintosystems/1.0/MemHierarchy/mem_hierarchy.html)
