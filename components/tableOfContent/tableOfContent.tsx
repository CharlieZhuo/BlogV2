import Paper from "@mui/material/Paper";
import List from "@mui/material/List";
import { useEffect, useState } from "react";
import TocListItem from "./tocListItem";
import Container from "@mui/material/Container";
import TocFabPopover from "./tocFabPopover";
export type TOCConfig = {
  HighestNode: "H1" | "H2" | "H3" | "H4" | "H5";
  LowestNode: "H2" | "H3" | "H4" | "H5" | "H6";
};

export type headingTreeNode = {
  id: string;
  title: string;
  type: string;
  children?: headingTreeNode[];
};

export default function TableOfContent(config: TOCConfig) {
  const GenerateTocTree = (headingArray: Element[], highestLevel: number) => {
    const nodeArray: Array<headingTreeNode> = [];

    const rootNode: headingTreeNode = {
      id: "root",
      title: "root",
      type: "root",
      children: [],
    };

    //convert element array to node array.
    for (let i = 0; i !== headingArray.length; ++i) {
      let item = headingArray[i];
      let node = {
        id: item.id,
        title: item.textContent,
        type: item.nodeName,
        children: [],
      };
      nodeArray.push(node);
    }

    console.log(nodeArray);

    //Add children to each node
    for (let i = 0; i !== nodeArray.length; ++i) {
      const currentNode = nodeArray[i];
      const currentLevel = +currentNode.type.charAt(1);
      //add all highestLevel nodes as children of root node
      if (currentLevel === highestLevel) rootNode.children.push(currentNode);
      //find children
      for (let j = i + 1; j !== nodeArray.length; ++j)
        inner: {
          const childNode = nodeArray[j];
          const childLevel = +childNode.type.charAt(1);
          console.log(
            `node:${currentNode.type},child:${childNode.type},currentLevel:${currentLevel},childLevel:${childLevel}`
          );
          if (currentLevel === childLevel - 1)
            currentNode.children.push(childNode);
          //break inner loop if encounter node at equal or higher level.
          else if (currentLevel >= childLevel) {
            break inner;
          }
        }
    }
    return rootNode;
  };
  const useHeadingsData = () => {
    const [headingTree, setHeadingTree] = useState<headingTreeNode>();

    useEffect(() => {
      //generate seletorString based on config
      let seletorString = "";
      let highestLevel = Number.parseInt(config.HighestNode.charAt(1));
      let lowestLevel = Number.parseInt(config.LowestNode.charAt(1));
      if (highestLevel < lowestLevel) {
        for (let i = highestLevel; i <= lowestLevel; ++i) {
          seletorString = seletorString.concat(`H${i},`);
        }
        seletorString = seletorString.substring(0, seletorString.length - 1);

        //get desired elements using DOM api.
        const headingsArray = Array.from(
          document.querySelectorAll(seletorString)
        );

        const rootNode = GenerateTocTree(headingsArray, highestLevel);

        setHeadingTree(rootNode);
      } else {
        setHeadingTree(null);
      }
    }, []);

    return headingTree;
  };

  const tree = useHeadingsData();

  const list = (
    <Paper elevation={3}>
      <List dense>
        {tree?.children.map((child) => (
          <TocListItem node={child} key={child.id} />
        ))}
      </List>
    </Paper>
  );

  return (
    <>
      <TocFabPopover>{list}</TocFabPopover>
      <Container
        disableGutters
        sx={{
          display: { xs: "none", lg: "block" },
          position: "fixed",
          right: "0vw",
          top: "15vh",
          width: "15rem",
        }}
      >
        {list}
      </Container>
    </>
  );
}
