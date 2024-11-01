import { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import ReactMarkdown from "react-markdown";
import { useParams } from "react-router-dom";

const Article = () => {
  const { articleSlug } = useParams<{ articleSlug: string }>();
  const [content, setContent] = useState("");

  useEffect(() => {
    const fetchContent = async () => {
      try {
        const response = await fetch(`/blog-content/${articleSlug}.md`);
        const text = await response.text();
        setContent(text);
      } catch (error) {
        console.error("Error fetching blog content:", error);
      }
    };

    fetchContent();
  }, [articleSlug]);

  return (
    <main>
      <Helmet>
        <title>{`${articleSlug?.replace(/-/g, " ")} - 226tools`}</title>
        <meta
          name="description"
          content={`Read our article on ${articleSlug?.replace(/-/g, " ")}`}
        />
      </Helmet>
      <ReactMarkdown>{content}</ReactMarkdown>
    </main>
  );
};

export default Article;
