import Head from "next/head";
import Link from "next/link";
import styles from "../../styles/Post.module.scss";
import { GetStaticProps, GetStaticPaths } from "next";
import { useEffect } from "react";
const prism = require("prismjs");

const Post = ({ post }) => {
  // console.log(post);
  useEffect(() => {
    prism.highlightAll();
  }, []);
  return (
    <div className="container">
      <Head>
        <title>Hylog | {post.title}</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <Head>
        <meta
          name="description"
          content={post.description ? post.description : "post description"}
        />
      </Head>
      <header className={styles.header}>
        <h1>
          <Link href={`/`}>
            <a href="">Hylog</a>
          </Link>
        </h1>
      </header>
      <div className={styles.article}>
        <h1 className={styles.title}>{post.title}</h1>
        <p>
          <time dateTime={post.date} className={styles.date}>
            {post.date}
          </time>
        </p>
        <section dangerouslySetInnerHTML={{ __html: post.content }}></section>
      </div>
    </div>
  );
};

export const getStaticProps: GetStaticProps = async (context) => {
  // console.log("context", context);
  const fs = require("fs");
  const html = require("remark-html");
  // const highlight = require("remark-highlight.js");
  const unified = require("unified");
  const markdown = require("remark-parse");
  const matter = require("gray-matter");

  const slug = context.params.slug;
  const path = `${process.cwd()}/_posts/${slug}.md`;

  const rawContent = fs.readFileSync(path, {
    encoding: "utf-8",
  });

  const { data, content } = matter(rawContent);

  const result = await unified()
    .use(html)
    .use(markdown)
    // .use(highlight)
    .process(content);

  return {
    props: {
      post: {
        ...data,
        content: result.toString(),
      },
    },
  };
};

export const getStaticPaths: GetStaticPaths = async (context) => {
  const fs = require("fs");

  const path = `${process.cwd()}/_posts`;
  const files = fs.readdirSync(path, "utf-8");

  const fileTypes = files
    .filter((fn: string) => fn.endsWith(".md"))
    .map((fn: string) => fn.replace(".md", ""));

  return {
    paths: fileTypes.map((fileType) => {
      return {
        params: {
          slug: fileType,
        },
      };
    }),
    fallback: false,
  };
};

export default Post;
