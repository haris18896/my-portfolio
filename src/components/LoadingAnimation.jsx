"use client";

import { Box, CircularProgress, Typography } from "@mui/material";
import { motion } from "framer-motion";
import DownloadingIcon from "@mui/icons-material/Downloading";

const LoadingAnimation = () => {
  return (
    <Box
      sx={{
        position: "fixed",
        inset: 0,
        zIndex: 9999,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "rgba(0, 0, 0, 0.8)",
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            padding: 4,
            borderRadius: 2,
            background: "rgba(30, 30, 30, 0.8)",
            backdropFilter: "blur(8px)",
            boxShadow: "0 8px 32px rgba(0, 0, 0, 0.2)",
          }}
        >
          <Box
            sx={{
              position: "relative",
              display: "flex",
              justifyContent: "center",
              mb: 2,
            }}
          >
            <CircularProgress
              size={60}
              thickness={4}
              sx={{
                color: "primary.main",
              }}
            />
            <Box
              sx={{
                position: "absolute",
                top: 0,
                left: 0,
                bottom: 0,
                right: 0,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <DownloadingIcon
                sx={{
                  fontSize: 30,
                  color: "white",
                }}
              />
            </Box>
          </Box>
          <Typography
            variant="body1"
            color="white"
            sx={{
              mt: 1,
              fontWeight: "medium",
              textAlign: "center",
            }}
          >
            Loading Please Wait...
          </Typography>
        </Box>
      </motion.div>
    </Box>
  );
};

export default LoadingAnimation;
