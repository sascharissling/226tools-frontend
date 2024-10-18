import CardGrid from "../../../components/card-grid";
import saschaFrankfurtMarathon from "../../../assets/sascha-frankfurt-marathon.jpeg";

const articles = [
  {
    title: "How To Train For An Ironman With Kids",
    slug: "how-to-train-for-an-ironman-with-kids",
    image: saschaFrankfurtMarathon,
    teaser:
      "Let me say it right from the start. My Ironman PB is 12 hours and 13 minutes. Six weeks after doing another full distance. The point is to not overshoot, communicate with your partner and be realistic with how much time you have to train and then cut that expected time in half. I only average between 5 and 8 hours of...",
  },
];

const BlogList = () => {
  return (
    <CardGrid
      content={articles.map((article) => ({
        img: article.image,
        title: article.title,
        to: `/blog/${article.slug}`,
        description: article.teaser,
      }))}
      orientation="vertical"
    />
  );
};

export default BlogList;
