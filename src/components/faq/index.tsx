import styled from "styled-components";
import { useState } from "react";
import { Text } from "../text";

interface Props {
  faqs: {
    question: string;
    answer: string;
  }[];
}

const FAQ = ({ faqs }: Props) => {
  return (
    <Section $hasBackground $hasBorder>
      <h2 style={{ paddingBottom: "1rem" }}>FAQs</h2>
      {faqs.map((faq, index) => (
        <>
          <CollapsibleItem key={index} faq={faq} />
          <HR />
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
  const [isOpen, setIsOpen] = useState(false);

  const toggleOpen = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div>
      <Question onClick={toggleOpen}>{faq.question}</Question>
      {isOpen && (
        <Text paddingBottom={1} size="extraSmall">
          {faq.answer}
        </Text>
      )}
    </div>
  );
};

const Section = styled.section<{
  $hasBackground?: boolean;
  $hasBorder?: boolean;
}>`
  margin: 1rem;
  padding: 1rem;
  border-radius: 0.5rem;

  ${(props) =>
    props.$hasBackground &&
    `
    background-color: ${props.theme.colors.whiteLighter};
  `}

  ${(props) =>
    props.$hasBorder &&
    `
        border: 1px solid ${props.theme.colors.lightgray};
    `}
`;

const Question = styled.h4`
  cursor: pointer;
  margin: 0 0 1rem 0;
  font-weight: 500;
`;

const HR = styled.hr`
  margin: 0.5remrem 0;
`;
