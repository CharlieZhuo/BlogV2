import "../styles/globals.css";
import { MDXProvider } from "@mdx-js/react";

import componentsForMdx from "../components/mdxComponents/componentsForMdx";

function MyApp({ Component, pageProps }) {
  return (
    <MDXProvider components={componentsForMdx}>
      <Component {...pageProps} />
    </MDXProvider>
  );
}

export default MyApp;
