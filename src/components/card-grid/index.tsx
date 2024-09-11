import styled from "styled-components";
import { Link } from "react-router-dom";

const CardGrid = ({
  content,
}: {
  content: {
    img: string;
    title: string;
    description?: string;
    to?: string;
    comingSoon?: boolean;
    fullWidth?: boolean;
  }[];
}) => {
  return (
    <GridContainer>
      {content.map((item) => (
        <Card key={item.title} {...item} />
      ))}
    </GridContainer>
  );
};

export default CardGrid;

const GridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  gap: 1rem;

  @media (min-width: 640px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (min-width: 1024px) {
    grid-template-columns: repeat(3, 1fr);
  }
`;

const Card = ({
  img,
  title,
  description,
  to,
  comingSoon,
}: {
  img: string;
  title: string;
  description?: string;
  to?: string;
  comingSoon?: boolean;
}) => {
  const content = (
    <CardContainer>
      <CardImage src={img} alt={title} loading="eager" />
      <CardContent>
        <h3>{title}</h3>
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

const CardContainer = styled.div`
  background-color: white;
  border-radius: 0.5rem;
  box-shadow: 0 0.25rem 0.5rem rgba(0, 0, 0, 0.1);
  position: relative;

  &:hover {
    box-shadow: 0 0.5rem 0.75rem rgba(0, 0, 0, 0.1);

    img {
      filter: brightness(0.8);
    }
  }
`;

const CardImage = styled.img`
  border-top-left-radius: 0.5rem;
  border-top-right-radius: 0.5rem;
  width: 100%;
  height: 15rem;
  object-fit: cover;
`;

const CardContent = styled.div`
  padding: 1rem;
`;

const CardDescription = styled.p`
  color: ${(props) => props.theme.colors.gray};
  margin-top: 0.5rem;
  font-size: 0.875rem;
`;

const ComingSoonPill = styled.div`
  background-color: gold;
  color: ${(props) => props.theme.colors.gray};
  font-size: 0.75rem;
  padding: 0.25rem 0.5rem;
  width: fit-content;
  border-radius: 0.25rem;
  position: absolute;
  top: 0;
  left: 0;
`;
