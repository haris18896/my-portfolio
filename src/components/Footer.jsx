import { Box, Container, Typography, Link } from "@mui/material";
import React from "react";
import GitHubIcon from "@mui/icons-material/GitHub";
import LinkedInIcon from "@mui/icons-material/LinkedIn";

function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        width: "100%",
        py: 2,
        px: { xs: 1, sm: 4 },
        backgroundColor: "background.dark",
        color: "text.primary",
        display: "flex",
        justifyContent: "flex-start",
        alignItems: "flex-start",
      }}
    >
      <Container
        maxWidth="xl"
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Typography variant="body2">
          &copy; {new Date().getFullYear()}{" "}
          {process.env.NEXT_PUBLIC_AUTHOR_NAME}
        </Typography>
        <Box>
          <Link
            href={`https://github.com/${process.env.NEXT_PUBLIC_GITHUB_USERNAME}`}
            target="_blank"
            rel="noopener"
            sx={{ mx: 1 }}
          >
            <GitHubIcon sx={{ color: "text.primary" }} />
          </Link>
          <Link
            href={`https://linkedin.com/in/${process.env.NEXT_PUBLIC_LINKEDIN_USERNAME}`}
            target="_blank"
            rel="noopener"
            sx={{ mx: 1 }}
          >
            <LinkedInIcon sx={{ color: "text.primary" }} />
          </Link>
        </Box>
      </Container>
    </Box>
  );
}

export default Footer;
