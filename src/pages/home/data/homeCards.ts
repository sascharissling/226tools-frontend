import transitionImageUrl from "../../../assets/im-transition.webp";
import nutritionItems from "../../../assets/nutrition-items.webp";
import australiaImg from "../../../assets/australia.webp";

export const homeCards = [
  {
    img: transitionImageUrl,
    title: "Pace Calculator",
    to: "/pace-calculator",
    description:
      "Calculate your next race outcome with your current or desired training numbers",
  },
  {
    img: australiaImg,
    title: "Race Map",
    to: "/events-map",
    description: "Filter and find races on the globe",
  },
  {
    img: nutritionItems,
    title: "Nutrition Calculator",
    description:
      "Nail your Race Day Nutrition with our sophisticated Nutrition calculator",
    comingSoon: true,
  },
];
