import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";

export default function BlockQuote({ children }) {
  return (
    <Container>
      <Card>
        <Container>
          <Typography variant="subtitle1">{children} </Typography>
        </Container>
      </Card>
    </Container>
  );
}
