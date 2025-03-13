import Header from "../components/Header";
import { Box, Container, Typography } from "@mui/material";

export default function Home() {
  return (
    <main>
      <Header />
      <Box
        component="section"
        sx={{
          minHeight: "100vh",
          pt: { xs: 10, md: 12 }, // Add padding top to account for the fixed header
          pb: 5,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
        }}
      >
        <Container maxWidth="md">
          <Typography
            variant="h3"
            component="h1"
            gutterBottom
            fontWeight="bold"
          >
            Welcome to my portfolio
          </Typography>
          <Typography variant="h5" color="text.secondary" paragraph>
            Try toggling the theme using the button in the header!
          </Typography>
          <Typography variant="body1" paragraph>
            Explore my skills, education, work experience, and projects using
            the navigation menu.
          </Typography>
        </Container>
      </Box>
    </main>
  );
}
