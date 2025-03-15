import { Box, Container, Typography, Link } from "@mui/material";
import React from "react";
import GitHubIcon from "@mui/icons-material/GitHub";
import LinkedInIcon from "@mui/icons-material/LinkedIn";

function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        width: "100vw",
        py: 2,
        px: { xs: 1, sm: 4 },
        backgroundColor: "background.paper",
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
          &copy; {new Date().getFullYear()} Haris Ahmad
        </Typography>
        <Box>
          <Link
            href="https://github.com/haris18896"
            target="_blank"
            rel="noopener"
            sx={{ mx: 1 }}
          >
            <GitHubIcon sx={{ color: "text.primary" }} />
          </Link>
          <Link
            href="https://linkedin.com/in/haris18896"
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
