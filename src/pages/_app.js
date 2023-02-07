import { ThemeProvider } from "next-themes";
import "../styles/globals.css";
import "normalize.css";

export default function App({ Component, pageProps }) {
  return (
    <ThemeProvider>
      <Component {...pageProps} />
    </ThemeProvider>
  );
}
