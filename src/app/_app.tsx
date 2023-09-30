import { AppProps } from "next/app";
import "globals.css"; // or any global styles you have

function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}

export default MyApp;
