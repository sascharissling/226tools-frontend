import { Outlet } from "react-router-dom";
import NavBar from "./components/navbar";
import Footer from "./components/footer";
//@ts-expect-error no types for react-google-analytics
import useGoogleAnalytics from "react-google-analytics";

const MainLayout = () => {
  useGoogleAnalytics(process.env.GA_ID);
  return (
    <>
      <NavBar />
      <Outlet />
      <Footer />
    </>
  );
};
export default MainLayout;
