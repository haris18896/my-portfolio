"use client";
import React, { useRef, useEffect } from "react";
import dynamic from "next/dynamic";

// ** Third Party Components
import emailjs from "@emailjs/browser";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
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
  const [isLoading, setIsLoading] = React.useState(false);

  // ** Refs
  const lottieRef = useRef(null);
  const formRef = useRef(null);

  // ** Form Hook
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: "",
      email: "",
      message: "",
    },
  });

  useEffect(() => {
    emailjs.init(process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY);
  }, []);

  const onSubmit = async (data) => {
    setIsLoading(true);

    // Loading toast
    const loadingToast = toast.loading("Sending your message...");

    try {
      await emailjs.send(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID,
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID,
        {
          from_name: data.name,
          from_email: data.email,
          message: data.message,
          to_name: "Haris Ahmad",
          to_email: "haris18896@gmail.com",
        },
        process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY
      );

      setIsLoading(false);
      reset();

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
              onSubmit={handleSubmit(onSubmit)}
            >
              <TextField
                fullWidth
                label="Name"
                variant="outlined"
                margin="normal"
                required
                error={!!errors.name}
                helperText={errors.name?.message}
                {...register("name", {
                  required: "Name is required",
                  minLength: {
                    value: 4,
                    message: "Name must be at least 4 characters",
                  },
                })}
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
                error={!!errors.email}
                helperText={errors.email?.message}
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: "Invalid email address",
                  },
                })}
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
                error={!!errors.message}
                helperText={errors.message?.message}
                {...register("message", {
                  required: "Message is required",
                  minLength: {
                    value: 10,
                    message: "Message must be at least 10 characters",
                  },
                })}
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
