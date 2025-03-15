"use client";
import React, { useRef, useEffect } from "react";

// ** Third Party Components
import { motion } from "framer-motion";
import { useLottie } from "lottie-react";

// ** MUI Components
import {
  Grid,
  Box,
  Button,
  Container,
  TextField,
  Typography,
} from "@mui/material";
import { useTheme } from "@/utils/themeToggler";

// ** Animation
import contactFormAnimation from "../../public/assets/lottie/contactForm.json";

function EmailForm() {
  const { mode } = useTheme();

  const defaultLottieOptions = {
    animationData: contactFormAnimation,
    loop: false,
  };

  const { View, play, stop } = useLottie(defaultLottieOptions);
  const lottieRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          play(); // Play the animation when it enters the viewport
        } else {
          stop(); // Optionally stop the animation when it leaves the viewport
        }
      },
      {
        threshold: 0.1, // Adjust this threshold as needed
      }
    );

    if (lottieRef.current) {
      observer.observe(lottieRef.current);
    }

    return () => {
      if (lottieRef.current) {
        observer.unobserve(lottieRef.current);
      }
    };
  }, [play, stop]);

  return (
    <Container id="contact" maxWidth="md">
      <Box
        sx={{
          my: 3,
          pb: 3,
          backgroundColor:
            mode === "dark" ? "background.paper" : "background.default",
          borderRadius: 2,
          boxShadow: 3,
          overflow: "hidden",
        }}
      >
        <Box
          sx={{
            py: 3,
            px: 2,
            width: "100%",
            display: "flex",
            alignItems: "center",
            backgroundColor: "background.dark",
          }}
        >
          <Box
            sx={{
              width: "12px",
              height: "12px",
              backgroundColor: "error.main",
              borderRadius: "50%",
            }}
          />
          <Box
            sx={{
              width: "12px",
              height: "12px",
              backgroundColor: "warning.main",
              borderRadius: "50%",
              mx: 1,
            }}
          />
          <Box
            sx={{
              width: "12px",
              height: "12px",
              backgroundColor: "success.main",
              borderRadius: "50%",
            }}
          />
        </Box>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: { xs: "column", md: "row" },
              justifyContent: "space-between",
              alignItems: "center",
              my: 3,
              px: 2,
            }}
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
                justifyContent: "flex-start",
              }}
            >
              <Typography variant="h4" color="text.primary">
                Contact Me
              </Typography>
              <Typography variant="h6" color="text.secondary">
                Get in touch with me
              </Typography>
            </Box>

            <Box
              ref={lottieRef}
              sx={{
                width: "100%",
                maxWidth: "200px",
                aspectRatio: "4 / 3",
                height: "auto",
              }}
            >
              {View}
            </Box>
          </Box>
          <Box sx={{ px: { xs: 1, sm: 2 } }}>
            <form noValidate autoComplete="off">
              <TextField
                fullWidth
                label="Name"
                variant="outlined"
                margin="normal"
                required
                placeholder="Enter your name"
                sx={{
                  "& .MuiOutlinedInput-root": {
                    "& fieldset": {
                      borderRadius: "10px",
                    },
                  },
                }}
              />
              <TextField
                fullWidth
                label="Email"
                variant="outlined"
                margin="normal"
                required
                type="email"
                placeholder="Enter your email"
                sx={{
                  "& .MuiOutlinedInput-root": {
                    "& fieldset": {
                      borderRadius: "10px",
                    },
                  },
                }}
              />
              <TextField
                fullWidth
                label="Message"
                variant="outlined"
                margin="normal"
                required
                multiline
                rows={4}
                placeholder="Enter your message"
                sx={{
                  "& .MuiOutlinedInput-root": {
                    "& fieldset": {
                      borderRadius: "10px",
                    },
                  },
                }}
              />
              <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 3 }}>
                <Button variant="contained" color="primary" type="submit">
                  Send Message
                </Button>
              </Box>
            </form>
          </Box>
        </motion.div>
      </Box>
    </Container>
  );
}

export default EmailForm;
