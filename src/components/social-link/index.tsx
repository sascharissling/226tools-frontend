import styled from "styled-components";
import githubSvg from "../../assets/github.svg";
import instagramSvg from "../../assets/instagram.svg";

interface Props {
  type: "github" | "instagram";
}

const links = {
  github: {
    href: "https://github.com/sascharissling",
    src: githubSvg,
    alt: "Github",
  },
  instagram: {
    href: "https://instagram.com/430legsup",
    src: instagramSvg,
    alt: "Instagram",
  },
};

const SocialLink = ({ type }: Props) => {
  return (
    <Link href={links[type].href} target="_blank">
      <SocialImage src={links[type].src} alt={links[type].alt} />
    </Link>
  );
};

export default SocialLink;

const Link = styled.a`
  width: 1rem;
  height: 1rem;

  &:hover {
    opacity: 0.7;
  }
`;

const SocialImage = styled.img`
  width: 1rem;
  height: 1rem;
`;
