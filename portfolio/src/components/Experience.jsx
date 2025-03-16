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
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
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
              justifyContent: "center",
              mt: 2,
            }}
          >
            <Typography
              variant="h4"
              align="center"
              sx={{
                mt: 2,
                fontWeight: "bold",
                background: `linear-gradient(135deg, #FFA500, #0d6efd)`,
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Professional Journey
            </Typography>
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
