import styled from "styled-components";
import { Text } from "../text";

interface Props {
  faqs: {
    question: string;
    answer: string;
  }[];
}

const FAQ = ({ faqs }: Props) => {
  return (
    <Section>
      <h3 style={{ paddingBottom: "1rem" }}>FAQ</h3>
      {faqs.map((faq) => (
        <>
          <CollapsibleItem key={faq.question} faq={faq} />
        </>
      ))}
    </Section>
  );
};
export default FAQ;

const CollapsibleItem = ({
  faq,
}: {
  faq: { question: string; answer: string };
}) => {
  return (
    <Wrapper>
      <Question>{faq.question}</Question>
      <Text $size="extraSmall">{faq.answer}</Text>
    </Wrapper>
  );
};

const Section = styled.section`
  padding: 1rem;
  border-radius: 0.5rem;

  border: 1px solid ${(props) => props.theme.colors.lightgray};
`;

const Question = styled.h4`
  cursor: pointer;
  font-weight: 500;
  display: flex;
  justify-content: space-between;
  color: ${(props) => props.theme.colors.darkGray};
`;

const Wrapper = styled.div`
  padding-bottom: 1rem;
`;
