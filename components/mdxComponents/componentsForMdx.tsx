import MdxWrapper from "./mdxWrapper";
import Typography from "@mui/material/Typography";
import { default as NextLink } from "next/link";
import { default as MUILink } from "@mui/material/Link";
import Divider from "@mui/material/Divider";
import LinkIcon from "@mui/icons-material/Link";
import MdxImage from "./mdxImage";

const componentsForMdx = {
  wrapper: MdxWrapper,

  a: (props) => (
    <NextLink href={props.href} passHref>
      <MUILink
        href={props.href}
        variant="body1"
        sx={{ color: (theme) => theme.palette.text.primary }}
      >
        {props.children}
      </MUILink>
    </NextLink>
  ),
  em: ({ children }) => (
    <Typography
      variant="body1"
      sx={{
        px: "0.25rem",
        fontStyle: "italic",
      }}
      component="span"
    >
      {children}
    </Typography>
  ),
  h1: ({ children }) => (
    <>
      <Typography
        variant="h1"
        id={`${encodeURIComponent(children)}`}
        sx={{ position: "relative" }}
      >
        {children}
      </Typography>
      <a
        title={children}
        href={`#${encodeURIComponent(children)}`}
        style={{ position: "absolute", left: "-1.5rem", bottom: "-0.5rem" }}
      >
        <LinkIcon></LinkIcon>
      </a>

      <Divider sx={{ my: "1rem" }}></Divider>
    </>
  ),
  h2: ({ children }) => (
    <Typography variant="h2" id={`${encodeURIComponent(children)}`}>
      {children}{" "}
    </Typography>
  ),
  h3: ({ children }) => (
    <Typography variant="h3" id={`${encodeURIComponent(children)}`}>
      {children}{" "}
    </Typography>
  ),
  h4: ({ children }) => (
    <Typography variant="h4" id={`${encodeURIComponent(children)}`}>
      {children}{" "}
    </Typography>
  ),
  h5: ({ children }) => (
    <Typography variant="h5" id={`${encodeURIComponent(children)}`}>
      {children}{" "}
    </Typography>
  ),
  h6: ({ children }) => (
    <Typography variant="h6" id={`${encodeURIComponent(children)}`}>
      {children}{" "}
    </Typography>
  ),
  strong: ({ children }) => (
    <Typography
      variant="body1"
      sx={{
        fontWeight: "bold",
        px: "0.25rem",
      }}
      component="span"
    >
      {children}{" "}
    </Typography>
  ),
  img: MdxImage,
};
export default componentsForMdx;
