import axios from "axios";
import Layout from "../../components/Layout";

export default function posts({data}) {
  return (
    <Layout>
      <h1>{data.id} - {data.title}</h1>
      <p>{data.body}</p>
    </Layout>
  );
}

export async function getStaticPaths() {
  try {
    const res = await axios.get("https://jsonplaceholder.typicode.com/posts");
    const data = await res.data;
    const paths = data.map((post) => ({ params: { id: `${post.id}` } }));
    return {
      paths,
      fallback: false
    }
  } catch (e) {
    console.log(e);
  }
}

export async function getStaticProps ({params}) {
  try {
    const res = await axios.get("https://jsonplaceholder.typicode.com/posts/" + params.id);
    const data = await res.data;

    return {
      props: {
        data: data
      }
    }

  } catch (e) {
    console.log(e)
  }
}