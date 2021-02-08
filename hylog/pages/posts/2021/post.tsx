import Head from "next/head";

const Post = () => {
  return (
    <div>
      <Head>
        <title>Post | Hylog</title>
        <meta property="og:title" content="Post title" key="title" />
      </Head>
      Post
    </div>
  );
};

export default Post;
