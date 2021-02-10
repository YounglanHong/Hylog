import { GetStaticProps, GetStaticPaths } from "next";

const Post = ({ post }) => {
  // console.log(post);
  return (
    <div>
      <h1>{post.title}</h1>
      <p>
        <time dateTime={post.date}>{post.date}</time>
      </p>
      <section dangerouslySetInnerHTML={{ __html: post.content }}></section>
    </div>
  );
};

export const getStaticProps: GetStaticProps = async (context) => {
  // console.log("context", context);
  const fs = require("fs");
  const html = require("remark-html");
  const highlight = require("remark-highlight.js");
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
    .use(markdown)
    .use(highlight)
    .use(html)
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
