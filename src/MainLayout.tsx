import { Outlet } from "react-router-dom";
import NavBar from "./components/navbar";
import Footer from "./components/footer";
import { CookieConsent } from "react-cookie-consent";
import { CSSProperties } from "react";
import { theme } from "./theme/theme.ts";

const MainLayout = () => {
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
