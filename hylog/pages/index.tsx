import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import styles from "../styles/Home.module.scss";
import { GetStaticProps } from "next";

interface Post {
  id: string;
  title: string;
  slug: string;
  date: string;
  description: string;
}

const Home = ({ posts }) => {
  posts.sort((a: Post, b: Post) => +new Date(b.date) - +new Date(a.date));

  return (
    <div className="container">
      <Head>
        <title>Hylog</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta property="og:title" content="Hylog" key="title" />
        <meta
          property="og:image"
          content="https://hylog.vercel.app/_next/image?url=%2Fprofile.png&w=384&q=75"
        />
      </Head>
      <header className={styles.header}>
        <h1>Hylog</h1>
        <Image
          src="/profile.png"
          alt="Profile image of hylog"
          width={180}
          height={180}
        />
        <p>
          배운 내용을 아는 만큼 기록합니다
          <br />
          새롭게 배운 내용을 계속해서 추가합니다
        </p>
      </header>
      <nav></nav>
      <main>
        {posts.map((post: Post, idx: number) => {
          return (
            <article key={post.id} className={styles.posts}>
              <Link href={`/posts/${post.slug}`}>
                <a className={styles.title}>{post.title}</a>
              </Link>
              <p>
                <time dateTime={post.date} className={styles.date}>
                  {post.date}
                </time>
              </p>
              <p className={styles.desc}>{post.description}</p>
            </article>
          );
        })}
      </main>
      <footer className={styles.footer}>
        <div>
          <a
            target="_blank"
            rel="noopener noreferrer"
            href="mailto:yong2401@gmail.com"
          >
            <i className="ic-mail4" aria-label="이메일주소"></i>
          </a>
          <a
            target="_blank"
            rel="noopener noreferrer"
            href="https://github.com/YounglanHong"
          >
            <i className="ic-github" aria-label="깃헙주소"></i>
          </a>
        </div>
        <p>
          <small>
            Copyright &copy; {new Date().getFullYear()} YounglanHong. All rights
            reserved
          </small>
        </p>
      </footer>
    </div>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const fs = require("fs");
  const matter = require("gray-matter");
  const { v4: uuid } = require("uuid");

  const files = fs.readdirSync(`${process.cwd()}/_posts`, "utf-8");

  const posts = files
    .filter((fn: string) => fn.endsWith(".md"))
    .map((fn: string) => {
      const path = `${process.cwd()}/_posts/${fn}`;
      const rawContent = fs.readFileSync(path, {
        encoding: "utf-8",
      });

      const { data } = matter(rawContent);

      return { ...data, id: uuid() };
    });

  return {
    props: { posts },
  };
};

export default Home;
