// we will import our custom remark plugin
const frontmatterRemarkPlugin = require("./removeFrontMatterForDisplay");

const withMDX = require("@next/mdx")({
  extension: /\.mdx?$/,
  options: {
    remarkPlugins: [frontmatterRemarkPlugin],
    rehypePlugins: [],
    // If you use `MDXProvider`, uncomment the following line.
    providerImportSource: "@mdx-js/react",
  },
});

module.exports = withMDX({
  pageExtensions: ["js", "jsx", "ts", "tsx", "md", "mdx"],
  reactStrictMode: true,
});
