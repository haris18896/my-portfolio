"use client";
import React, { useRef, useEffect, useState } from "react";
import dynamic from "next/dynamic";

// ** Third Party Components
import emailjs from "@emailjs/browser";
import { motion } from "framer-motion";
import toast, { Toaster } from "react-hot-toast";

// ** MUI Components
import {
  Grid,
  Box,
  Button,
  Container,
  TextField,
  Typography,
} from "@mui/material";
import { ArrowOutward } from "@mui/icons-material";
import { useTheme } from "@/utils/themeToggler";

// ** Animation
import contactFormAnimation from "../../public/assets/lottie/contactForm.json";

// Dynamically import Lottie with SSR disabled
const Lottie = dynamic(
  () => import("lottie-react").then((mod) => mod.default),
  { ssr: false }
);

function EmailForm() {
  const { mode } = useTheme();

  // ** Refs
  const lottieRef = useRef(null);
  const formRef = useRef(null);

  // ** States
  const [isLoading, setIsLoading] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });

  useEffect(() => {
    emailjs.init(process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY);
  }, []);

  // ** Handlers
  const handleChange = ({ target: { name, value } }) => {
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    // Loading toast
    const loadingToast = toast.loading("Sending your message...");

    try {
      await emailjs.send(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID,
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID,
        {
          from_name: form.name,
          from_email: form.email,
          message: form.message,
          to_name: "Haris Ahmad",
          to_email: "haris18896@gmail.com",
        },
        process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY
      );

      setIsLoading(false);
      setForm({
        name: "",
        email: "",
        message: "",
      });

      // Success toast
      toast.success("Message sent successfully!", {
        id: loadingToast,
        duration: 5000,
        icon: "🎉",
      });
    } catch (err) {
      console.error("EmailJS Error:", err);
      setIsLoading(false);

      // Error toast
      toast.error("Failed to send message. Please try again.", {
        id: loadingToast,
        duration: 5000,
      });
    }
  };

  return (
    <Container id="contact" maxWidth="md" sx={{ px: 3 }}>
      <Toaster
        position="top-right"
        toastOptions={{
          style: {
            background: mode === "dark" ? "#333" : "#fff",
            color: mode === "dark" ? "#fff" : "#333",
          },
          success: {
            duration: 5000,
            theme: {
              primary: "green",
              secondary: "black",
            },
          },
          error: {
            duration: 5000,
            theme: {
              primary: "red",
              secondary: "black",
            },
          },
        }}
      />
      <Box
        sx={{
          mb: 3,
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
              <Lottie animationData={contactFormAnimation} loop={false} />
            </Box>
          </Box>
          <Box sx={{ px: 2 }}>
            <form
              noValidate
              ref={formRef}
              autoComplete="off"
              onSubmit={handleSubmit}
            >
              <TextField
                fullWidth
                label="Name"
                name="name"
                variant="outlined"
                margin="normal"
                required
                value={form.name}
                onChange={handleChange}
                placeholder="John Doe"
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
                name="email"
                variant="outlined"
                margin="normal"
                required
                type="email"
                value={form.email}
                onChange={handleChange}
                placeholder="john.doe@example.com"
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
                name="message"
                variant="outlined"
                margin="normal"
                required
                multiline
                rows={4}
                value={form.message}
                onChange={handleChange}
                placeholder="Hi, I'm interested in your services. Can you help me with my project?"
                sx={{
                  "& .MuiOutlinedInput-root": {
                    "& fieldset": {
                      borderRadius: "10px",
                    },
                  },
                }}
              />
              <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 3 }}>
                <Button
                  variant="contained"
                  color="primary"
                  type="submit"
                  disabled={isLoading}
                >
                  {isLoading ? "Sending..." : "Send Message"}
                  {!isLoading && <ArrowOutward sx={{ ml: 1 }} />}
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
