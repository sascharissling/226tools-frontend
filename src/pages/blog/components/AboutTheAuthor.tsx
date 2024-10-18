import sascha from "../../../assets/sascha-cut.png";
import styled from "styled-components";
import SocialLink from "../../../components/social-link";

const AboutTheAuthor = () => {
  return (
    <Wrapper>
      <Avatar src={sascha} />
      <h3>About the Author</h3>
      <strong>Sascha Rissling</strong>
      <p>
        Dad of two, triathlete, and initiator of 226tools. I write about
        triathlon training, nutrition, and gear.
      </p>
      <SocialLink type="instagram" />
    </Wrapper>
  );
};

export default AboutTheAuthor;

const Avatar = styled.img`
  border-radius: 50%;
  width: 7rem;
  height: 7rem;
  background: ${(props) => props.theme.colors.primary};
`;

const Wrapper = styled.div`
  display: grid;
  gap: 1rem;
  border: 1px solid ${(props) => props.theme.colors.lightgray};
  padding: 1rem;
  border-radius: 0.75rem;
  color: ${(props) => props.theme.colors.darkGray};
`;
