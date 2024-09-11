import { Text } from "../../components/text";
import styled from "styled-components";
import HeaderGroup from "../../components/header-group";
import CardGrid from "../../components/card-grid";
import transitionImageUrl from "../../assets/im-transition.webp";
import nutritionItems from "../../assets/nutrition-items.webp";
import australiaImg from "../../assets/australia.webp";

const Home = () => {
  return (
    <main>
      <Wrapper>
        <HeaderGroup
          as="h1"
          headline="226tools.com"
          subHeadline="Tools for long distance triathletes"
          align="center"
        />
        <CardGrid
          content={[
            {
              img: transitionImageUrl,
              title: "Pace Calculator",
              to: "/pace-calculator",
              description:
                "Optimize Your Ironman, Half Ironman, Olympic, and Sprint Triathlon Strategy",
            },
            {
              img: nutritionItems,
              title: "Nutrition Calculator",
              description:
                "Nail your Race Day Nutrition with our sophisticated Nutrition calculator",
              comingSoon: true,
            },
            {
              img: australiaImg,
              title: "Race Map",
              description: "Filter and find races on the globe",
              comingSoon: true,
            },
          ]}
        />
        <Text
          $color="olivine"
          $paddingTop={4}
          $size={"extraSmall"}
          $align="center"
        >
          Swim · Bike · Run
        </Text>
      </Wrapper>
    </main>
  );
};

export default Home;

const Wrapper = styled.section`
  display: grid;
  gap: 2rem;
  padding: 1rem;
`;
