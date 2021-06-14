---
title: 프로세스와 스레드 비교
slug: what-is-the-diff-process-thread
date: "2021-06-13"
description: Program, Process and Thread
---

<figure align="center">
<img src="../images/javascript-single-thread.png" alt="JavaScript single threaded" width="720" height="200" />
<figcaption>JavaScript is single-threaded (MDN)</figcaption>
</figure>

🔑 자바스크립트를 공부하다 보면 **싱글 스레드** 라는 개념이 나옵니다.
스레드(thread)를 이해하기 위해서는 프로그램(program)과 프로세스(process)의 개념부터 이해해야 합니다. 각각에 대해 차근차근 알아봅니다.

---

## 프로그램(program)

**프로그램**은 특정 작업을 컴퓨터에서 실행하기 위한 _명령어의 집합_ 또는 하드디스크에 저장된 _실행 가능한 파일_(executable file)을 의미합니다. 컴퓨터 프로그램은 프로그래밍 언어로 소스 코드가 작성되어, 보통 비휘발성 메모리인 하드디스크에 `binary` 형태로 저장됩니다. 오피스 워드, 크롬 브라우저와 같은 소프트웨어를 응용 프로그램 또는 애플리케이션이라고 합니다.

## 프로세스(process)

프로그램이 실행되어 생긴 [인스턴스](http://www.ktword.co.kr/abbr_view.php?m_temp1=2654)가 **프로세스** 입니다. 간단히 말하면 _실행 중인 프로그램_(program in execution) 입니다.

프로그램을 실행하려면 하드디스크에 `binary` 형태로 저장된 프로그램을 메모리 및 다양한 운영 체제의 리소스와 함께 메모리에 `load`(올려주는) 하는 과정이 필요합니다. **프로세스**는 실행하기 위해 필요한 모든 리소스와 함께 휘발성 메모리인 RAM에 올라간 프로그램입니다. 활성상태보기(mac) 또는 작업 관리자(window) 창에서 실행 중인 프로세스를 확인할 수 있습니다.

<figure align="center">
<img src="../images/activity-monitor_cpu.png" alt="activity monitor in mac OS CPU" width="500" height="370" />
<figcaption>Activity monitor in mac OS - CPU</figcaption>
</figure>

<figure align="center">
<img src="../images/activity-monitor_memory.png" alt="activity monitor in mac OS Memory" width="500" height="370" />
<figcaption>Activity monitor in mac OS - Memory</figcaption>
</figure>

메모장 프로그램은 하나지만 메모장 창을 여러 개 실행할 수 있는 것처럼 하드디스크의 실행 파일인 프로그램은 하나지만, 메모리에 여러 개의 프로세스를 만들 수 있습니다.

mac OS, 윈도우 같은 운영체제는 프로그램을 실행하기 위해 메모리에 프로그램을 올려주고 메모리에 올라가 있는 프로세스를 관리하는 역할을 합니다. 여러 개의 프로세스가 실행될 수 있기 때문에 프로세스들이 공평하게 CPU를 사용할 수 있도록 [스케줄링](<https://ko.wikipedia.org/wiki/%EC%8A%A4%EC%BC%80%EC%A4%84%EB%A7%81_(%EC%BB%B4%ED%93%A8%ED%8C%85)>) 합니다.

<figure align="center">
<img src="https://www.backblaze.com/blog/wp-content/uploads/2017/08/diagram-thread-codestack.png" alt="process" width="650" height="350" />
</figure>

### 프로세스의 독립성

각각의 프로세스에는 별도의 메모리 주소 공간(주소 [레지스터](https://ko.wikipedia.org/wiki/%ED%94%84%EB%A1%9C%EC%84%B8%EC%84%9C_%EB%A0%88%EC%A7%80%EC%8A%A4%ED%84%B0))이 있기 때문에 프로세스는 독립적으로 실행되고 다른 프로세스로부터 격리되어 다른 프로세스에서는 공유 데이터에 직접 접근할 수 없습니다. 프로세스를 분리하여 프로세스의 독립성을 유지하는 것은 한 프로세스의 문제가 생겼을 때 다른 프로세스의 영향을 주지 않는다는 점에서 중요합니다. 예를 들어 구글 크롬 브라우저는 각 탭마다 별도의 프로세스가 존재하여 하나의 탭에 문제가 생겨도 전체 브라우저가 종료되지는 않습니다.

<figure align="center">
<img src="https://developers.google.cn/web/updates/images/inside-browser/part1/tabs.png" alt="process isolation" width="600" height="370" />
<figcaption>Process Isolation (google web)</figcaption>
</figure>

## 스레드(Thread)

<figure align="center">
<img src="https://www.backblaze.com/blog/wp-content/uploads/2017/08/diagram-thread-process-1.png" alt="thread in process" width="700" height="330" />
<figcaption>Thread in Process</figcaption>
</figure>

**스레드**는 _프로세스 안의 실행단위_(the unit of execution within process)입니다. 하나의 프로세스는 여러 개의 스레드를 가질 수 있습니다. 프로세스가 시작되면 메모리 및 리소스가 할당됩니다. 이 때 프로세스의 각 스레드는 힙, 코드, 데이터 영역을 공유하고 레지스터와 스택만 따로 가지고 있습니다.

<figure align="center">
<img src="https://www.backblaze.com/blog/wp-content/uploads/2017/08/diagram-threads.png" alt="single and multi thread" width="600" height="530" />
<figcaption>Single and Multi Thread</figcaption>
</figure>

## 멀티 프로세스(Multi Process)와 멀티 스레드(Multi Thread)

**멀티 프로세스**와 **멀티 스레드**는 하나의 애플리케이션에 대한 *멀티 태스킹 처리 방식*을 말합니다. **멀티 태스킹**(Multi Tasking)은 컴퓨터가 한 번에 여러 작업을 할 수 있도록 하는 기술을 의미합니다. 예전 컴퓨터는 한 번에 하나의 작업만 실행했지만 컴퓨터가 발전하면서 한 번에 여러 개의 작업을 할 수 있게 되었습니다.

멀티 프로세스는 애플리케이션 단위의 멀티 태스킹으로 여러 개의 프로세스가 병렬(parallelism)로 실행됩니다. 워드로 문서 작업을 하면서 동시에 크롬 브라우저로 검색을 할 수 있는 것을 예로 들 수 있습니다.

멀티 스레드는 프로세스 단위의 멀티 태스킹으로 여러 개의 스레드가 하나의 프로세스에 포함되는 방식입니다. 멀티 스레드는 **동시성**과 가깝고, 멀티 프로세스는 **병렬 처리**에 가깝습니다.

<figure align="center">
<img src="https://www.backblaze.com/blog/wp-content/uploads/2017/08/diagram-thread-concurrency.png" alt="Concurrency and Parallelism" width="600" height="400" />
<figcaption>Concurrency and Parallelism</figcaption>
</figure>

---

### 🔗 Reference

[Threads vs. Processes: A Look At How They Work Within Your Program](https://www.backblaze.com/blog/whats-the-diff-programs-processes-and-threads/)

[Inside look at modern web browser (part 1) | Web | Google Developers](https://developers.google.cn/web/updates/2018/09/inside-browser-part1)

[Thread vs Process 컴퓨터공학 기본](https://www.youtube.com/watch?v=RrfASw-jfZ4&list=PL1iR1v6eNy5PhmaTHDUOrFVfta20oEVsj)
