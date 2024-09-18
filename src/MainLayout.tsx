import { Outlet } from "react-router-dom";
import NavBar from "./components/navbar";
import Footer from "./components/footer";
import { CookieConsent, getCookieConsentValue } from "react-cookie-consent";
import ReactGA from "react-ga4";
import { CSSProperties, useEffect } from "react";
import { theme } from "./theme/theme.ts";
import { useEnv } from "./hooks/useEnv.ts";

const MainLayout = () => {
  const { isDev } = useEnv();
  const cookieConsent =
    getCookieConsentValue("226toolsCookieAccepted") === "true";

  useEffect(() => {
    if (!cookieConsent || isDev) {
      // @ts-expect-error TODO: How to fix this?
      window[`ga-disable-${import.meta.env.VITE_GA_ID}`] = true;
      return;
    }

    ReactGA.initialize(import.meta.env.VITE_GA_ID);
    ReactGA.send("pageview");

    // @ts-expect-error TODO: How to fix this?
    window[`ga-disable-${import.meta.env.VITE_GA_ID}`] = false;
    ReactGA.event({
      category: "cooke consent",
      action: "consent",
    });
  }, [cookieConsent, isDev]);

  return (
    <>
      <NavBar />
      <Outlet />
      <Footer />
      <CookieConsent
        buttonStyle={{
          background: "#fff",
          color: theme.colors.beaver,
        }}
        declineButtonStyle={{ background: theme.colors.beaver, color: "#fff" }}
        style={cookieConsentStyle}
        enableDeclineButton
        cookieName="226toolsCookieAccepted"
        onDecline={() =>
          // @ts-expect-error TODO: How to fix this?
          (window[`ga-disable-${import.meta.env.VITE_GA_ID}`] = true)
        }
      >
        This website uses cookies to enhance the user experience.
      </CookieConsent>
    </>
  );
};
export default MainLayout;

const cookieConsentStyle: CSSProperties = {
  background: theme.colors.beaver,
  color: "#fff",
  fontSize: "14px",
  padding: "1rem",
  zIndex: 999,
};
