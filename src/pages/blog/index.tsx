import { Link, Outlet } from "react-router-dom";
import styled from "styled-components";

const articles = [
  {
    title: "The Ultimate Guide to Triathlon Pacing Strategies",
    slug: "triathlon-pacing-strategies",
  },
  {
    title: "Top 5 Tools Every Long-Distance Triathlete Needs",
    slug: "tools-long-distance-triathlete",
  },
];

const Blog = () => {
  return (
    <BlogWrapper>
      <main>
        <Outlet />
      </main>
      <aside>
        <h1>Blog</h1>
        <ul>
          {articles.map((article, index) => (
            <li key={index}>
              <Link to={`/blog/${article.slug}`}>{article.title}</Link>
            </li>
          ))}
        </ul>
      </aside>
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
