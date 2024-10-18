import styled from "styled-components";
import AboutTheAuthor from "./components/AboutTheAuthor.tsx";
import { devices } from "../../theme/theme.ts";
import { Outlet, useParams } from "react-router-dom";
import HeaderGroup from "../../components/header-group";

const Blog = () => {
  const { articleSlug } = useParams<{ articleSlug: string | undefined }>();

  return (
    <BlogMain>
      {!articleSlug && (
        <HeaderGroup
          as="h1"
          headline="Blog"
          subHeadline={
            "Read my latest articles on triathlon training, nutrition, and more."
          }
        />
      )}
      <BlogContent>
        <Outlet />
      </BlogContent>

      <Aside>
        <AboutTheAuthor />
      </Aside>
    </BlogMain>
  );
};

export default Blog;

const BlogMain = styled.main`
  display: grid;
  grid-template-areas:
    "header"
    "content"
    "aside";
  grid-template-rows: max-content max-content max-content;
  grid-template-columns: 1fr;
  gap: 2rem;
  padding: 1rem;

  @media ${devices.md} {
    grid-template-areas:
      "header header"
      "content aside";
    grid-template-rows: max-content max-content;
    grid-template-columns: auto 15rem;
  }
`;

const BlogContent = styled.section`
  grid-area: content;
`;

const Aside = styled.aside`
  grid-area: aside;
`;
