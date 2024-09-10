import { Outlet } from "react-router-dom";
import NavBar from "./components/navbar";
import Footer from "./components/footer";
import { CookieConsent, getCookieConsentValue } from "react-cookie-consent";
import ReactGA from "react-ga4";
import { useEffect } from "react";

const MainLayout = () => {
  const cookieConsent =
    getCookieConsentValue("226toolsCookieAccepted") === "true";

  useEffect(() => {
    ReactGA.initialize(import.meta.env.VITE_GA_ID);
    ReactGA.send({ hitType: "pageview", page: window.location.pathname });
  }, []);

  return (
    <>
      <NavBar />
      <Outlet />
      <Footer />
      <CookieConsent
        enableDeclineButton
        cookieName="226toolsCookieAccepted"
        onDecline={() => {
          alert("nay!");
        }}
      >
        This website uses cookies to enhance the user experience.
      </CookieConsent>
    </>
  );
};
export default MainLayout;
