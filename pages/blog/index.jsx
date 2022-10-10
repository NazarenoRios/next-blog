import axios from "axios";
import Layout from "../../components/Layout";
import Link from "next/link";

export default function index({ data }) {

  return (
    <Layout title="Blog" description="description page">
      <h1>Blogs</h1>
      {data.map((post) => (
        <div key={post.id}>
          <h3>
            <Link href={`/blog/${post.id}`}>
              <a>
                {post.id} - {post.title}
              </a>
            </Link>
          </h3>
          <p>{post.body}</p>
        </div>
      ))}
    </Layout>
  );
}

export async function getStaticProps() {
  try {
    const res = await axios.get("https://jsonplaceholder.typicode.com/posts");
    const data = await res.data;

    return {
      props: {
        data: data,
      },
    };
  } catch (e) {
    console.log(e);
  }
}
