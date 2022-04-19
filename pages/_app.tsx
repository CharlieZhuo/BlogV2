import "../styles/globals.css";
import { MDXProvider } from "@mdx-js/react";

import componentsForMdx from "../components/mdxComponents/componentsForMdx";
import MUIThemeProvider from "../components/muiThemeProvider";

function MyApp({ Component, pageProps }) {
  return (
    <MUIThemeProvider>
      <MDXProvider components={componentsForMdx}>
        <Component {...pageProps} />
      </MDXProvider>
    </MUIThemeProvider>
  );
}

export default MyApp;
