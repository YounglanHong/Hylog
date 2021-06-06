import "../styles/globals.scss";
import "../styles/main.scss";
import { AppProps } from "next/app";
import "prismjs/themes/prism-tomorrow.css";

function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}

export default MyApp;
