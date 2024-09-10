import { Helmet } from "react-helmet";

const Meta = () => {
  return (
    <Helmet>
      <meta charSet="utf-8" />
      <title>
        Triathlon Pace Calculator | How to Pace for Ironman, Half Ironman,
        Olympic Distance, and Sprint Triathlons
      </title>
      <meta
        name="description"
        content="Free triathlon pace calculator for Ironman, Half Ironman, Olympic, and Sprint triathlons. Calculate swim, bike, and run splits to plan the perfect race strategy. Ideal for beginners and experienced triathletes."
      />
    </Helmet>
  );
};

export default Meta;
