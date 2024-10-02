import {
  createRoutesFromElements,
  createBrowserRouter,
  Route,
} from "react-router-dom";
import Home from "./pages/home";
import NutritionCalculator from "./pages/nutrition-calculator";
import PaceCalculator from "./pages/pace-calculator";
import EventsMap from "./pages/events-map";
import MainLayout from "./MainLayout.tsx";
import Imprint from "./pages/imprint";
import RaceTracePage from "./pages/race-trace";
import PrivacyPolicy from "./pages/privacy-policy";
import Blog from "./pages/blog/index.tsx";
import Article from "./pages/blog/components/Article.tsx";

export const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<MainLayout />}>
        <Route path="/" element={<Home />} />
        <Route path={"/pace-calculator"} element={<PaceCalculator />} />
        <Route path={"/imprint"} element={<Imprint />} />
        <Route path={"/privacy-policy"} element={<PrivacyPolicy />} />
        <Route path={"/events-map"} element={<EventsMap />} />
        {process.env.NODE_ENV === "development" && (
          <>
            <Route path={"/blog"} element={<Blog />} />
            <Route path="/blog" element={<Blog />}>
              <Route path=":articleSlug" element={<Article />} />
            </Route>
            <Route path={"/race-trace"} element={<RaceTracePage />} />
            <Route
              path={"/nutrition-calculator"}
              element={<NutritionCalculator />}
            />
            <Route path={"/events-map"} element={<EventsMap />} />
            <Route path={"/race-trace"} element={<RaceTracePage />} />
          </>
        )}
      </Route>
    </>,
  ),
);
