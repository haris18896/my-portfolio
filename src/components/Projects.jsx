"use client";
import React from "react";
import { motion } from "framer-motion";
import { Typography, Box } from "@mui/material";

const Projects = () => {
  return (
    <Box sx={{ textAlign: "center", mt: 8 }}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        <Typography variant="h4" sx={{ mb: 2 }}>
          Projects
        </Typography>
        <Typography variant="h6" color="text.secondary">
          Coming Soon!
        </Typography>
      </motion.div>
    </Box>
  );
};

export default Projects;
