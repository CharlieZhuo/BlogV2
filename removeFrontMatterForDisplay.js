module.exports = () => (tree, file) => {
  // now we need to remove the frontmatter from the tree
  // because it has already been processed by mdx and nodes
  // have beed created for it assuming it was a markdown content
  //
  // remove the thematicBreak "<hr />" to first heading
  // --- => thematicBreak
  // title: this
  // date: 2020-12-12 => becomes heading
  // ---
  if (tree.children[0].type === "thematicBreak") {
    const firstHeadingIndex = tree.children.findIndex(
      (t) => t.type === "heading"
    );
    if (firstHeadingIndex !== -1) {
      // we will mutate the tree.children by removing these nodes
      tree.children.splice(0, firstHeadingIndex + 1);
    }
  }
};
