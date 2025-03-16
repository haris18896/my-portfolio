"use client";

import React from "react";

// ** Third Party Packages
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

// ** MUI
import { styled, useTheme } from "@mui/material/styles";
import { Box, Container, Typography } from "@mui/material";

// ** Utils
import { containerVariants } from "@/utils/utils";

const Experience = ({ experiences }) => {
  const theme = useTheme();
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });
  const [isHovered, setIsHovered] = React.useState(false);

  return (
    <Box
      component="div"
      sx={{
        width: "100vw",
        py: 2,
        px: { xs: 1, sm: 4 },

        display: "flex",
      }}
    >
      <Container id="github" maxWidth="lg" sx={{ my: 3, px: { xs: 0, sm: 2 } }}>
        <motion.div
          ref={ref}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          variants={containerVariants}
          style={{ width: "100%" }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                mt: 2,
              }}
            >
              <Typography
                variant="h3"
                component="h2"
                align="center"
                gutterBottom
                sx={{
                  fontWeight: "bold",
                  background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                Professional Journey
              </Typography>
            </Box>
            <Typography
              sx={{ textAlign: "center", px: 2 }}
              variant="h6"
              color="text.secondary"
            >
              My professional journey through my work experiences
            </Typography>
          </Box>
        </motion.div>
      </Container>
    </Box>
  );
};

export default Experience;
