import { useEffect, useState } from "react";
import { Link, Outlet, useParams } from "react-router-dom";
import { Helmet } from "react-helmet";
import { Section } from "../../components/section";
import ReactMarkdown from "react-markdown";

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
  const { slug } = useParams();
  const [content, setContent] = useState("");

  useEffect(() => {
    const fetchContent = async () => {
      try {
        const response = await fetch(`/src/pages/blog/content/${slug}.md`);
        const text = await response.text();
        setContent(text);
      } catch (error) {
        console.error("Error fetching blog content:", error);
      }
    };

    fetchContent();
  }, [slug]);

  return (
    <main>
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
      <Outlet />
    </main>
  );
};

export default Blog;
