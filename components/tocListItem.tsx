import { headingTreeNode } from "./tableOfContent";
import ListItem from "@mui/material/ListItem";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Collapse from "@mui/material/Collapse";
import { useState } from "react";
import ExpandMore from "@mui/icons-material/ExpandMore";
import ExpandLess from "@mui/icons-material/ExpandLess";

export default function TocListItem({ node }: { node: headingTreeNode }) {
  const [expandChildren, setExpandChildren] = useState(true);
  let item;
  if (node?.children?.length > 0)
    item = (
      <>
        <ListItem>
          <ListItemButton component="a" href={`#${node.id}`}>
            <ListItemText primary={node.title} />
          </ListItemButton>
          <ListItemButton
            onClick={() => setExpandChildren(!expandChildren)}
            sx={{ flexGrow: "0" }}
          >
            {expandChildren ? <ExpandLess /> : <ExpandMore />}
          </ListItemButton>
        </ListItem>

        <Collapse in={expandChildren}>
          <List sx={{ paddingInlineStart: "1.5rem" }}>
            {node.children.map((child) => (
              <TocListItem key={child.id} node={child}></TocListItem>
            ))}
          </List>
        </Collapse>
      </>
    );
  else
    item = (
      <ListItemButton component="a" href={`#${node.id}`}>
        <ListItemText primary={node.title} />
      </ListItemButton>
    );

  return item;
}
