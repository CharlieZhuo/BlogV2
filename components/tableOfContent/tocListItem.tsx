import { headingTreeNode } from "./tableOfContent";
import ListItem from "@mui/material/ListItem";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Collapse from "@mui/material/Collapse";
import Divider from "@mui/material/Divider";
import Stack from "@mui/material/Stack";

export default function TocListItem({ node }: { node: headingTreeNode }) {
  const children =
    node?.children?.length > 0 ? (
      <Collapse in={true}>
        <List
          dense
          sx={{
            paddingInlineStart: "1.5rem",
            //  borderLeft: "1px solid white"
          }}
        >
          {node.children.map((child) => (
            <TocListItem key={child.id} node={child}></TocListItem>
          ))}
        </List>
      </Collapse>
    ) : null;

  return (
    <>
      <ListItem>
        <ListItemButton component="a" href={`#${node.id}`}>
          <ListItemText primary={node.title} />
        </ListItemButton>
      </ListItem>
      {/* <Divider variant="middle"></Divider> */}
      {children}
    </>
  );
}
