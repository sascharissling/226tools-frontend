import { Link, Outlet } from "react-router-dom";
import styled from "styled-components";

const articles = [
  {
    title: "How to train for an ironman with kids",
    slug: "how-to-train-for-an-ironman-with-kids",
  },
];

const Blog = () => {
  return (
    <BlogWrapper>
      <main>
        <Outlet />
      </main>
      <Aside>
        <h1>Blog</h1>
        <ul>
          {articles.map((article, index) => (
            <li key={index}>
              <Link to={`/blog/${article.slug}`}>{article.title}</Link>
            </li>
          ))}
        </ul>
      </Aside>
    </BlogWrapper>
  );
};

export default Blog;

const BlogWrapper = styled.div`
  display: grid;
  grid-template-columns: auto auto;
  max-width: 70vw;
  margin: auto auto;
`;

const Aside = styled.aside`
  padding-top: 1em;
`;
