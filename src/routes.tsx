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

export const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<MainLayout />}>
        <Route path="/" element={<Home />} />
        <Route
          path={"/nutrition-calculator"}
          element={<NutritionCalculator />}
        />
        <Route path={"/pace-calculator"} element={<PaceCalculator />} />
        <Route path={"/events-map"} element={<EventsMap />} />
        <Route
          path={"/imprint"}
          element={
            <>
              Impressum Angaben gemäß § 5 TMG Sascha Rissling Siegburger Str.
              349 51105 Köln Kontakt Telefon: 01737074781 E-Mail:
              sascha.rissling@gmail.com Haftung für Inhalte Als Diensteanbieter
              sind wir gemäß § 7 Abs.1 TMG für eigene Inhalte auf diesen Seiten
              nach den allgemeinen Gesetzen verantwortlich. Nach §§ 8 bis 10 TMG
              sind wir als Diensteanbieter jedoch nicht verpflichtet,
              übermittelte oder gespeicherte fremde Informationen zu überwachen
              oder nach Umständen zu forschen, die auf eine rechtswidrige
              Tätigkeit hinweisen. Verpflichtungen zur Entfernung oder Sperrung
              der Nutzung von Informationen nach den allgemeinen Gesetzen
              bleiben hiervon unberührt. Eine diesbezügliche Haftung ist jedoch
              erst ab dem Zeitpunkt der Kenntnis einer konkreten
              Rechtsverletzung möglich. Bei Bekanntwerden von entsprechenden
              Rechtsverletzungen werden wir diese Inhalte umgehend entfernen.
              Haftung für Links Unser Angebot enthält Links zu externen Websites
              Dritter, auf deren Inhalte wir keinen Einfluss haben. Deshalb
              können wir für diese fremden Inhalte auch keine Gewähr übernehmen.
              Für die Inhalte der verlinkten Seiten ist stets der jeweilige
              Anbieter oder Betreiber der Seiten verantwortlich. Die verlinkten
              Seiten wurden zum Zeitpunkt der Verlinkung auf mögliche
              Rechtsverstöße überprüft. Rechtswidrige Inhalte waren zum
              Zeitpunkt der Verlinkung nicht erkennbar. Eine permanente
              inhaltliche Kontrolle der verlinkten Seiten ist jedoch ohne
              konkrete Anhaltspunkte einer Rechtsverletzung nicht zumutbar. Bei
              Bekanntwerden von Rechtsverletzungen werden wir derartige Links
              umgehend entfernen. Urheberrecht Die durch die Seitenbetreiber
              erstellten Inhalte und Werke auf diesen Seiten unterliegen dem
              deutschen Urheberrecht. Die Vervielfältigung, Bearbeitung,
              Verbreitung und jede Art der Verwertung außerhalb der Grenzen des
              Urheberrechtes bedürfen der schriftlichen Zustimmung des
              jeweiligen Autors bzw. Erstellers. Downloads und Kopien dieser
              Seite sind nur für den privaten, nicht kommerziellen Gebrauch
              gestattet. Soweit die Inhalte auf dieser Seite nicht vom Betreiber
              erstellt wurden, werden die Urheberrechte Dritter beachtet.
              Insbesondere werden Inhalte Dritter als solche gekennzeichnet.
              Sollten Sie trotzdem auf eine Urheberrechtsverletzung aufmerksam
              werden, bitten wir um einen entsprechenden Hinweis. Bei
              Bekanntwerden von Rechtsverletzungen werden wir derartige Inhalte
              umgehend entfernen. Quelle: https://www.e-recht24.de
            </>
          }
        />
      </Route>
    </>,
  ),
);
