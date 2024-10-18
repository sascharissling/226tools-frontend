import CardGrid from "../../../components/card-grid";
import HeaderGroup from "../../../components/header-group";

const articles = [
  {
    title: "How to train for an ironman with kids",
    slug: "how-to-train-for-an-ironman-with-kids",
    image: "https://picsum.photos/600/800",
    teaser:
      "Let me say it right from the start. My Ironman PB is 12 hours and 13 minutes. Six weeks after doing another full distance. The point is to not overshoot, communicate with your partner and be realistic with how much time you have to train and then cut that expected time in half. I only average between 5 and 8 hours of...",
  },
];

const BlogList = () => {
  return (
    <main>
      <HeaderGroup
        as="h1"
        headline="Blog"
        subHeadline={
          "Read my latest articles on triathlon training, nutrition, and more."
        }
      />
      <CardGrid
        content={articles.map((article) => ({
          img: article.image,
          title: article.title,
          to: `/blog/${article.slug}`,
          description: article.teaser,
        }))}
        orientation="vertical"
      />
    </main>
  );
};

export default BlogList;
