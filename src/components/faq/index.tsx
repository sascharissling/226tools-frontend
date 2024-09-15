import styled from "styled-components";
import { useState } from "react";
import { Text } from "../text";
import plusSvg from "../../assets/plus.svg";
import minusSvg from "../../assets/minus.svg";

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
      {faqs.map((faq) => (
        <>
          <CollapsibleItem key={faq.question} faq={faq} />
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
      <Question $isOpen={isOpen} onClick={toggleOpen}>
        {faq.question}
        <Image
          src={isOpen ? minusSvg : plusSvg}
          alt={isOpen ? "minus icon" : "plus icon"}
        />
      </Question>
      {isOpen && (
        <Text $paddingBottom={10} $size="extraSmall">
          {faq.answer}
        </Text>
      )}
    </div>
  );
};

const Image = styled.img`
  width: 1rem;
  height: 1rem;
  margin-left: 0.5rem;
`;

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

const Question = styled.h4<{ $isOpen?: boolean }>`
  cursor: pointer;
  font-weight: 500;
  display: flex;
  justify-content: space-between;

  ${(props) =>
    props.$isOpen &&
    `
    color: ${props.theme.colors.gray};
    padding-bottom: 0.5rem;
  `}
`;

const HR = styled.hr`
  border: 1px solid ${(props) => props.theme.colors.lightgray};
`;
