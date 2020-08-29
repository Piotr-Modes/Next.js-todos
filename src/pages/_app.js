import "../styles/globals.css";
import Loader from "../components/utilities/Loader";
import { RecoilRoot } from "recoil";
import { useState } from "react";
import { useRouter } from "next/router";
import { ThemeProvider } from "theme-ui";
import theme from "@rebass/preset";
import { useEffect } from "react";

function MyApp({ Component, pageProps }) {
  const router = useRouter();

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    router.events.on("routeChangeStart", () => setLoading(true));
    router.events.on("routeChangeComplete", () => setLoading(false));
  });
  return (
    <RecoilRoot>
      <ThemeProvider theme={theme}>
        {loading && <Loader />}
        {!loading && <Component {...pageProps} />}
      </ThemeProvider>
    </RecoilRoot>
  );
}

export default MyApp;
