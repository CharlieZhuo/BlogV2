import Paper from "@mui/material/Paper";
import List from "@mui/material/List";
import Popover from "@mui/material/Popover";
import Fab from "@mui/material/Fab";
import TocIcon from "@mui/icons-material/Toc";

import { useEffect, useState } from "react";
import TocListItem from "./tocListItem";
import Container from "@mui/material/Container";
export type TOCConfig = {
  H1?: true;
  H2?: true;
  H3?: true;
  H4?: true;
  H5?: true;
  H6?: true;
};

export type headingTreeNode = {
  id: string;
  title: string;
  type: string;
  children?: headingTreeNode[];
};

export default function TableOfContent(config: TOCConfig) {
  const getHeadingTreeRoot = (headingArray: Element[]) => {
    const rootNode: headingTreeNode = {
      id: "",
      title: "",
      type: "root",
      children: [],
    };

    const rootHeadingElement = getSmallestHeadingElement(config);

    for (let i = 0; i !== headingArray.length; ++i) {
      let current = headingArray[i];
      let searchResult = SearchTree(rootNode, (node) =>
        IsValidParentElement(node.type, current.nodeName, rootHeadingElement)
      );
      if (searchResult) {
        searchResult.children.push({
          id: current.id,
          title: current.textContent,
          type: current.nodeName,
          children: [],
        });
      } else {
        //discard this node
      }
    }

    // headingArray.forEach((heading, index) => {
    //   const { textContent: title, id } = heading;
    //   if (heading.nodeName === "H2") {
    //     nestedHeadings.push({ id, title, items: [] });
    //   } else if (heading.nodeName === "H3" && nestedHeadings.length > 0) {
    //     nestedHeadings[nestedHeadings.length - 1].items.push({
    //       id,
    //       title,
    //     });
    //   }
    // });

    return rootNode;
  };
  const useHeadingsData = () => {
    const [headingTree, setHeadingTree] = useState<headingTreeNode>();

    useEffect(() => {
      //generate seletorString for h1-h6 present in config
      let seletorString = "";
      for (const key in config) {
        seletorString = seletorString.concat(`${key},`);
      }
      seletorString = seletorString.substring(0, seletorString.length - 1);

      const headingsArray = Array.from(
        document.querySelectorAll(seletorString)
      );

      const rootNode = getHeadingTreeRoot(headingsArray);
      setHeadingTree(rootNode);
    }, []);

    return headingTree;
  };

  const tree = useHeadingsData();

  const list = (
    <Paper>
      <List>
        {tree?.children.map((child) => (
          <TocListItem key={child.id} node={child} />
        ))}
      </List>
    </Paper>
  );

  const [popOpen, setPopOpen] = useState(false);

  const handleClick = () => {
    setPopOpen(!popOpen);
  };

  const handleClose = () => {
    setPopOpen(null);
  };
  return (
    <>
      <Fab
        color="default"
        aria-label="add"
        sx={{
          display: { lg: "none" },
          position: "fixed",
          left: "80vw",
          bottom: "10vh",
        }}
        onClick={handleClick}
      >
        <TocIcon />
      </Fab>
      <Popover
        open={popOpen}
        onClose={handleClose}
        sx={{
          display: { lg: "none" },
          position: "fixed",
          right: "20vw",
          top: "0rem",
          height: "60vh",
        }}
      >
        {list}
      </Popover>
      <Container
        sx={{
          display: { xs: "none", lg: "block" },
          position: "fixed",
          right: "0rem",
          top: "10vh",
          width: "20vw",
        }}
      >
        {list}
      </Container>
    </>
  );
}

//find heading element of most signaficance eg: h1 in [h1,h2,h3], h2 in[h2,h5,h6]
function getSmallestHeadingElement(config: TOCConfig) {
  return Object.keys(config).reduce((prev, curr) => {
    let previndex = Number.parseInt(prev[prev.search(/\d/)]);
    let currindex = Number.parseInt(curr[curr.search(/\d/)]);
    return previndex < currindex ? prev : curr;
  });
}
function IsValidParentElement(
  parent: string,
  child: string,
  RootHeadingElement: string
) {
  if (parent === "root" && child === RootHeadingElement) return true;
  else {
    let parentIndex = Number.parseInt(parent[parent.search(/\d/)]);
    let childIndex = Number.parseInt(child[child.search(/\d/)]);
    return parentIndex === childIndex - 1;
  }
}

function SearchTree(
  rootNode: headingTreeNode,
  predicate: (node: headingTreeNode) => boolean
): headingTreeNode | null {
  if (rootNode.children?.length > 0) {
    for (const child of rootNode.children) {
      let result = SearchTree(child, predicate);
      if (result) return result;
    }
  }
  if (predicate(rootNode)) return rootNode;
  else return null;
}
