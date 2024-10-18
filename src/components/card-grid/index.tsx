import styled, { css } from "styled-components";
import { Link } from "react-router-dom";

const CardGrid = ({
  content,
  orientation = "wrap",
}: {
  content: {
    img: string;
    title: string;
    description?: string;
    to?: string;
    comingSoon?: boolean;
    fullWidth?: boolean;
  }[];
  orientation?: "wrap" | "vertical";
}) => {
  return (
    <GridContainer $orientation={orientation}>
      {content.map((item) => (
        <Card key={item.title} {...item} orientation={orientation} />
      ))}
    </GridContainer>
  );
};

export default CardGrid;

const GridContainer = styled.div<{ $orientation: "wrap" | "vertical" }>`
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  gap: 1rem;

  ${({ $orientation }) =>
    $orientation === "wrap" &&
    css`
      @media (min-width: 640px) {
        grid-template-columns: repeat(2, 1fr);
      }

      @media (min-width: 1024px) {
        grid-template-columns: repeat(3, 1fr);
      }
    `}
`;

export const Card = ({
  img,
  title,
  description,
  to,
  comingSoon,
  orientation,
}: {
  img: string;
  title: string;
  description?: string;
  to?: string;
  comingSoon?: boolean;
  orientation: "wrap" | "vertical";
}) => {
  const content = (
    <CardContainer>
      <CardImage
        src={img}
        alt={title}
        loading="eager"
        $orientation={orientation}
      />
      <CardContent>
        <CardHeader>{title}</CardHeader>
        <CardDescription>{description}</CardDescription>
      </CardContent>
      {comingSoon && <ComingSoonPill>Coming Soon</ComingSoonPill>}
    </CardContainer>
  );

  if (to) {
    return <Link to={to}>{content}</Link>;
  }
  return content;
};

const CardHeader = styled.h3`
  font-size: 1.25rem;
  margin: 0;
  color: ${(props) => props.theme.colors.primary};
  font-weight: 700;
`;

const CardContainer = styled.div`
  border-radius: 0.75rem;
  position: relative;
  background: ${(props) => props.theme.colors.white};
  border: 1px solid ${(props) => props.theme.colors.lightgray};

  &:hover {
    img {
      filter: brightness(0.8);
    }
  }
`;

const CardImage = styled.img<{ $orientation: "wrap" | "vertical" }>`
  border-top-left-radius: 0.5rem;
  border-top-right-radius: 0.5rem;
  width: 100%;
  object-fit: cover;
  ${({ $orientation }) =>
    $orientation === "wrap"
      ? css`
          height: 15rem;
        `
      : css`
          height: 30rem;
        `}
`;

const CardContent = styled.div`
  padding: 1rem;
`;

const CardDescription = styled.p`
  color: ${(props) => props.theme.colors.darkGray};
  margin-top: 0.5rem;
  font-size: 0.875rem;
`;

const ComingSoonPill = styled.div`
  background-color: ${(props) => props.theme.colors.primary};
  color: ${(props) => props.theme.colors.white};
  text-transform: uppercase;
  font-size: 0.75rem;
  padding: 0.25rem 0.5rem;
  width: fit-content;
  border-radius: 0.25rem;
  position: absolute;
  top: 0;
  left: 0;
`;
