import {
  createContext,
  Context,
  PropsWithChildren,
  useContext,
  useState,
} from "react";

export interface FooterContextInterface {
  shouldPlaceAtBottom: boolean;
  setShouldPlaceAtBottom: (shouldPlaceAtBottom: boolean) => void;
}

export const FooterContext: Context<FooterContextInterface> = createContext(
  {} as FooterContextInterface,
);

export const useFooterContext = (): FooterContextInterface =>
  useContext(FooterContext);

const FooterContextProvider = ({ children }: PropsWithChildren) => {
  const [shouldPlaceAtBottom, setShouldPlaceAtBottom] = useState(false);

  return (
    <FooterContext.Provider
      value={{ shouldPlaceAtBottom, setShouldPlaceAtBottom }}
    >
      {children}
    </FooterContext.Provider>
  );
};

export default FooterContextProvider;
