"use client";
import React, { useState, useEffect, useRef } from "react";

// ** Third Party
import Prism from "prismjs";
import { motion } from "framer-motion";
import { toast } from "react-hot-toast";

// ** Styles
import "prismjs/components/prism-javascript";

// ** MUI
import {
  Box,
  Grid,
  Paper,
  alpha,
  Button,
  Tooltip,
  Container,
  Typography,
  IconButton,
  useMediaQuery,
} from "@mui/material";
import {
  Code as CodeIcon,
  Mouse as MouseIcon,
  GitHub as GitHubIcon,
  Rocket as RocketIcon,
  LinkedIn as LinkedInIcon,
  Download as DownloadIcon,
  Lightbulb as LightbulbIcon,
  AutoFixHigh as AutoFixHighIcon,
  ArrowForward as ArrowForwardIcon,
  KeyboardArrowDown as KeyboardArrowDownIcon,
} from "@mui/icons-material";

// ** Utils
import { useTheme } from "@/utils/themeToggler";

// Meteor Animation Component
const Meteors = ({ number }) => {
  const [meteors, setMeteors] = useState([]);

  // Only run this on the client side to prevent hydration errors
  useEffect(() => {
    const meteorData = [...Array(number)].map((_, index) => ({
      id: index,
      size: Math.floor(Math.random() * 20) + 10,
      duration: Math.floor(Math.random() * 10) + 5,
      delay: Math.random() * 20,
      initialLeft: Math.random() * 100,
      initialTop: Math.random() * 100,
    }));

    setMeteors(meteorData);
  }, [number]);

  if (meteors.length === 0) return null;

  return (
    <Box
      sx={{
        position: "absolute",
        inset: 0,
        overflow: "hidden",
        pointerEvents: "none",
      }}
    >
      {meteors.map((meteor) => (
        <Box
          key={meteor.id}
          component={motion.div}
          sx={{
            position: "absolute",
            width: `${meteor.size}px`,
            height: `${meteor.size}px`,
            backgroundColor: (theme) => theme.palette.primary.main,
            borderRadius: "50%",
            filter: "blur(4px)",
            left: `${meteor.initialLeft}%`,
            top: `${meteor.initialTop}%`,
            zIndex: 1,
          }}
          initial={{ opacity: 0, scale: 0 }}
          animate={{
            opacity: [0, 1, 0],
            scale: [0, 1, 0],
            x: [0, Math.random() > 0.5 ? 100 : -100],
            y: [0, Math.random() > 0.5 ? 100 : -100],
          }}
          transition={{
            duration: meteor.duration,
            delay: meteor.delay,
            repeat: Infinity,
            repeatDelay: Math.random() * 10,
          }}
        />
      ))}
    </Box>
  );
};

// Animated Grid Component
const AnimatedGrid = () => {
  const { mode } = useTheme();
  const [isClient, setIsClient] = useState(false);

  // Only render on client-side to prevent hydration errors
  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) return null;

  return (
    <Box
      sx={{
        position: "absolute",
        inset: 0,
        overflow: "hidden",
        pointerEvents: "none",
        opacity: 0.2,
        maskImage: "radial-gradient(ellipse at center, transparent 20%, black)",
        WebkitMaskImage:
          "radial-gradient(ellipse at center, transparent 20%, black)",
      }}
    >
      <Box sx={{ position: "relative", width: "100%", height: "100%" }}>
        <Grid container spacing={0} sx={{ position: "absolute", inset: 0 }}>
          {[...Array(40)].map((_, i) => (
            <Grid item xs={12 / 40} key={`v-${i}`}>
              <Box
                component={motion.div}
                sx={{
                  position: "relative",
                  height: "100%",
                  width: "100%",
                  borderRight: 1,
                  borderColor: (theme) =>
                    `${alpha(theme.palette.primary.main, 0.1)}`,
                }}
                animate={{
                  opacity: [0.1, 0.2, 0.1],
                }}
                transition={{
                  duration: 2 + (i % 3),
                  repeat: Infinity,
                  repeatType: "reverse",
                  delay: (i % 5) * 0.1,
                }}
              />
            </Grid>
          ))}
        </Grid>
        <Grid
          container
          direction="column"
          spacing={0}
          sx={{ position: "absolute", inset: 0 }}
        >
          {[...Array(40)].map((_, i) => (
            <Grid item xs={12 / 40} key={`h-${i}`}>
              <Box
                component={motion.div}
                sx={{
                  position: "relative",
                  width: "100%",
                  height: "100%",
                  borderBottom: 1,
                  borderColor: (theme) =>
                    `${alpha(theme.palette.primary.main, 0.1)}`,
                }}
                animate={{
                  opacity: [0.1, 0.2, 0.1],
                }}
                transition={{
                  duration: 2 + (i % 4),
                  repeat: Infinity,
                  repeatType: "reverse",
                  delay: (i % 6) * 0.15,
                }}
              />
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  );
};

// Add a client-side wrapper component
const ClientOnly = ({ children }) => {
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  if (!hasMounted) {
    return null;
  }

  return children;
};

// SparklesText Component
const SparklesText = ({ text }) => {
  return (
    <Box
      component={motion.div}
      sx={{
        display: "inline-block",
        position: "relative",
        mr: 1,
        background: "linear-gradient(45deg, #FFA500, #FF4500)",
        backgroundClip: "text",
        WebkitBackgroundClip: "text",
        color: "transparent",
      }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {text}
    </Box>
  );
};

// FlipWords Component
const FlipWords = ({ words }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [prevWord, setPrevWord] = useState(words[0]);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsAnimating(true);
      setPrevWord(words[currentIndex]);
      setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % words.length);
        setIsAnimating(false);
      }, 500);
    }, 3000);

    return () => clearInterval(interval);
  }, [words.length, currentIndex, words]);

  return (
    <Box
      sx={{
        position: "relative",
        display: "inline-block",
        minHeight: "1.5em",
        minWidth: "220px",
      }}
    >
      {isAnimating && (
        <Box
          component={motion.div}
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            opacity: 0,
          }}
          initial={{ opacity: 1, y: 0 }}
          animate={{ opacity: 0, y: -20, x: 20, filter: "blur(8px)" }}
          transition={{ duration: 0.5 }}
        >
          <Typography
            variant="inherit"
            sx={{
              background: "linear-gradient(45deg, #0d6efd, #00bfff)",
              backgroundClip: "text",
              WebkitBackgroundClip: "text",
              color: "transparent",
              fontWeight: "medium",
            }}
          >
            {prevWord}
          </Typography>
        </Box>
      )}

      <Box
        component={motion.div}
        sx={{
          position: "relative",
          visibility: isAnimating ? "hidden" : "visible",
        }}
      >
        <Typography
          variant="inherit"
          sx={{
            background: "linear-gradient(45deg, #0d6efd, #00bfff)",
            backgroundClip: "text",
            WebkitBackgroundClip: "text",
            color: "transparent",
            fontWeight: "medium",
          }}
        >
          {words[currentIndex]}
        </Typography>
      </Box>
    </Box>
  );
};

// Code Window Component
const CodeWindow = ({ code }) => {
  const { mode } = useTheme();

  return (
    <Box
      sx={{
        position: "relative",
        borderRadius: "12px",
        padding: "2px",
        background: (theme) =>
          `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
        boxShadow:
          mode === "dark"
            ? "0 8px 32px rgba(0,0,0,0.3)"
            : "0 8px 32px rgba(0,0,0,0.1)",
        "&::before": {
          content: '""',
          position: "absolute",
          inset: 0,
          borderRadius: "inherit",
          background:
            mode === "dark"
              ? "linear-gradient(45deg, #0d1117, #161b22)"
              : "linear-gradient(45deg, #f1f1f1, #ffffff)",
          margin: "2px",
          zIndex: 0,
        },
      }}
    >
      {/* Code Window */}
      <Paper
        elevation={0}
        sx={{
          position: "relative",
          zIndex: 1,
          borderRadius: "10px",
          overflow: "hidden",
          bgcolor: mode === "dark" ? "#2d2a2e" : "#2b2b2b", // Dark background for both modes
        }}
      >
        {/* Window Header */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            px: 2,
            py: 1.5,
            bgcolor: mode === "dark" ? "#403e41" : "#3a3a3a", // Dark header for both modes
            borderBottom: 1,
            borderColor: "rgba(255,255,255,0.1)",
          }}
        >
          {/* Window Dots */}
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1,
            }}
          >
            <Box
              sx={{
                width: 12,
                height: 12,
                borderRadius: "50%",
                bgcolor: "#ff5f56",
              }}
            />
            <Box
              sx={{
                width: 12,
                height: 12,
                borderRadius: "50%",
                bgcolor: "#ffbd2e",
              }}
            />
            <Box
              sx={{
                width: 12,
                height: 12,
                borderRadius: "50%",
                bgcolor: "#27c93f",
              }}
            />
          </Box>

          {/* File Name */}
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              ml: 2,
              gap: 0.75,
            }}
          >
            <CodeIcon
              fontSize="small"
              sx={{
                color: "rgba(255,255,255,0.7)",
              }}
            />
            <Typography
              variant="caption"
              sx={{
                color: "rgba(255,255,255,0.7)",
                fontFamily:
                  "'JetBrains Mono', 'Fira Code', 'SF Mono', Menlo, Monaco, 'Courier New', monospace",
                fontWeight: 500,
              }}
            >
              developer.js
            </Typography>
          </Box>
        </Box>

        {/* Code Content */}
        <Box
          sx={{
            px: 3,
            fontFamily:
              "'JetBrains Mono', 'Fira Code', 'SF Mono', Menlo, Monaco, 'Courier New', monospace",
            fontSize: "0.85rem",
            lineHeight: 1.7,
            letterSpacing: "-0.01em",
            position: "relative",
            height: "auto",
            overflowX: "auto",
            overflowY: "hidden",
            whiteSpace: "pre",
            color: "#fcfcfa", // Always light text
            // Monokai Pro inspired syntax highlighting (same for both themes)
            "& .token.punctuation": {
              color: "#939293",
            },
            "& .token.keyword": {
              color: "#ff6188",
            },
            "& .token.string": {
              color: "#ffd866",
            },
            "& .token.number": {
              color: "#ab9df2",
            },
            "& .token.function": {
              color: "#a9dc76",
            },
            "& .token.boolean": {
              color: "#ff6188",
            },
            "& .token.operator": {
              color: "#78dce8",
            },
            "& .token.comment": {
              color: "#727072",
              fontStyle: "italic",
            },
            "& .token.property": {
              color: "#78dce8",
            },
            "& .language-javascript": {
              color: "#fcfcfa", // Base text color always light
            },
            "& pre": {
              margin: 0,
            },
            "& code": {
              display: "inline-block",
              minWidth: "100%",
            },
          }}
        >
          <pre className="language-javascript">
            <code className="language-javascript">{code}</code>
          </pre>
        </Box>
      </Paper>
    </Box>
  );
};

const Hero = () => {
  const { mode } = useTheme();
  const isLgScreen = useMediaQuery((theme) => theme.breakpoints.up("lg"));
  const isMdScreen = useMediaQuery((theme) => theme.breakpoints.up("md"));
  const isSmScreen = useMediaQuery((theme) => theme.breakpoints.up("sm"));

  const [code] = useState(`
const profile = {
    name: 'Haris Ahmad',
    title: 'Full-Stack Developer | Mobile & Web Developer | Data Analyst',
    skills: [
        'Reac Native', 'NextJS', 'React JS', 'Redux',  'Express',
        'MySQL', 'MongoDB', 'Docker', 'PostgreSQL', 'TypeScript',
        'Material UI', 'Tailwind CSS', 'Google Map', 'SASS',
        'Python', 'Django', 'Matplotlib', 'Seaborn', 'Pandas',
        'Sanity', 'GraphQL', 'Git', 'Firebase', 'Stripe', 'Paypal'
    ],
    
    hardWorker: true,
    quickLearner: true,
    problemSolver: true,
    yearsOfExperience: 5, 
    hireable: function() {
        return (
            this.hardWorker &&
            this.problemSolver &&
            this.skills.length >= 5 &&
            this.yearsOfExperience >= 5
        );
    }
};`);

  const words = [
    "Full-Stack Developer",
    "React & NextJS Developer",
    "Front-end & Back-end Specialist",
    "Mobile & Web Development Expert",
  ];

  useEffect(() => {
    Prism.highlightAll();
  }, [code]);

  // Handler for resume download
  const handleResumeDownload = () => {
    try {
      // Path to your resume file - place your PDF in the public folder
      const resumeUrl = "/Haris_Ahmad_Resume.pdf";

      // Create a temporary anchor element
      const link = document.createElement("a");
      link.href = resumeUrl;
      link.setAttribute("download", "Haris_Ahmad_Resume.pdf");

      // Append to the document temporarily
      document.body.appendChild(link);

      // Trigger click event
      link.click();

      // Clean up
      document.body.removeChild(link);

      // Show success toast
      toast.success("Resume download started!", {
        icon: "📄",
        style: {
          borderRadius: "10px",
          background: mode === "dark" ? "#333" : "#fff",
          color: mode === "dark" ? "#fff" : "#333",
        },
      });
    } catch (error) {
      // Show error toast if download fails
      toast.error("Download failed. Please try again.", {
        style: {
          borderRadius: "10px",
          background: mode === "dark" ? "#333" : "#fff",
          color: mode === "dark" ? "#fff" : "#333",
        },
      });
      console.error("Resume download error:", error);
    }
  };

  return (
    <Box
      component="section"
      id="hero"
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        position: "relative",
        pt: { xs: 10, lg: 0 },
        pb: 3,
        px: { xs: 2, sm: 3 },
        overflow: "hidden",
        background:
          mode === "dark"
            ? "linear-gradient(to bottom, #161d2e, #121725, #0a0f1f)"
            : "linear-gradient(to bottom, #f5f5f5, #eaeaea, #ffffff)",
      }}
    >
      {/* Background Effects */}
      <ClientOnly>
        <AnimatedGrid />
        <Meteors number={isSmScreen ? 10 : 5} />
      </ClientOnly>

      {/* Gradient Overlay */}
      <Box
        sx={{
          position: "absolute",
          inset: 0,
          background:
            mode === "dark"
              ? "linear-gradient(to bottom, transparent, rgba(0,0,0,0.3))"
              : "linear-gradient(to bottom, transparent, rgba(0,0,0,0.05))",
        }}
      />

      <Container maxWidth="lg" sx={{ position: "relative", zIndex: 2 }}>
        <Grid container spacing={{ xs: 3, md: 4 }} alignItems="center">
          {/* Left Column - Text Content */}
          <Grid
            item
            xs={12}
            lg={6}
            component={motion.div}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            {/* Decorative blurs */}
            <Box
              sx={{
                position: "absolute",
                top: { xs: "5rem", lg: "-5rem" },
                left: { xs: "0", lg: "-5rem" },
                width: { xs: "8rem", md: "12rem", lg: "16rem" },
                height: { xs: "8rem", md: "12rem", lg: "16rem" },
                bgcolor: (theme) => alpha(theme.palette.primary.main, 0.1),
                borderRadius: "50%",
                filter: "blur(60px)",
                display: "block",
              }}
            />
            <Box
              sx={{
                position: "absolute",
                top: { xs: "15rem", lg: "10rem" },
                right: { xs: "0", lg: "-5rem" },
                width: { xs: "8rem", md: "12rem", lg: "16rem" },
                height: { xs: "8rem", md: "12rem", lg: "16rem" },
                bgcolor: (theme) => alpha(theme.palette.secondary.main, 0.1),
                borderRadius: "50%",
                filter: "blur(60px)",
                display: "block",
              }}
            />

            {/* Welcome Badge */}
            <Box
              component={motion.div}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              sx={{
                display: "inline-flex",
                alignItems: "center",
                mb: 3,
                py: 1,
                px: 2,
                borderRadius: 5,
                backdropFilter: "blur(10px)",
                backgroundColor: alpha(
                  mode === "dark" ? "#1a1a1a" : "#ffffff",
                  0.1
                ),
                border: 1,
                borderColor: alpha(
                  mode === "dark" ? "#ffffff" : "#000000",
                  0.1
                ),
              }}
            >
              <Box
                sx={{
                  width: 8,
                  height: 8,
                  borderRadius: "50%",
                  bgcolor: "primary.main",
                  mr: 1,
                  animation: "pulse 2s infinite",
                  "@keyframes pulse": {
                    "0%": { opacity: 0.5, transform: "scale(0.8)" },
                    "50%": { opacity: 1, transform: "scale(1.1)" },
                    "100%": { opacity: 0.5, transform: "scale(0.8)" },
                  },
                }}
              />
              <Typography variant="body2" color="text.secondary">
                Welcome to my universe
              </Typography>
            </Box>

            {/* Name Section */}
            <Box sx={{ position: "relative", mb: 3 }}>
              <Typography
                variant="h2"
                component="h1"
                fontWeight="bold"
                gutterBottom
                sx={{
                  fontSize: { xs: "2rem", sm: "2.5rem", md: "3rem" },
                }}
              >
                <SparklesText text="Hello," /> I'm{" "}
                <Box
                  component="span"
                  sx={{
                    position: "relative",
                    display: "inline-block",
                    background: "linear-gradient(45deg, #FFA500, #FF4500)",
                    backgroundClip: "text",
                    WebkitBackgroundClip: "text",
                    color: "transparent",
                  }}
                >
                  Haris Ahmad
                </Box>
              </Typography>
              <Box
                sx={{
                  position: "absolute",
                  top: "50%",
                  left: "25%",
                  width: { xs: 60, md: 100 },
                  height: { xs: 60, md: 100 },
                  bgcolor: (theme) => alpha(theme.palette.primary.main, 0.2),
                  borderRadius: "50%",
                  filter: "blur(30px)",
                  transform: "translate(-50%, -50%)",
                  zIndex: -1,
                  animation: "pulse 4s infinite",
                }}
              />
            </Box>

            {/* Role Badge */}
            <Box
              component={motion.div}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              sx={{
                display: "inline-flex",
                alignItems: "center",
                gap: 1,
                py: 1.5,
                px: 3,
                mb: 4,
                minWidth: "280px",
                borderRadius: 3,
                backdropFilter: "blur(10px)",
                background: (theme) =>
                  `linear-gradient(to right, ${alpha(theme.palette.primary.main, 0.1)}, ${alpha(theme.palette.secondary.main, 0.1)})`,
                border: 1,
                borderColor: alpha(
                  mode === "dark" ? "#ffffff" : "#000000",
                  0.1
                ),
              }}
            >
              <RocketIcon
                color="primary"
                sx={{ animation: "bounce 2s infinite" }}
              />
              <FlipWords words={words} />
            </Box>

            {/* Description */}
            <Box sx={{ mb: 4, maxWidth: 500 }}>
              <Typography
                variant="body1"
                color="text.secondary"
                sx={{ lineHeight: 1.8 }}
              >
                🚀 JavaScript & Python Enthusiast | Full-Stack & Mobile
                Developer 🔧 | 💻 Crafting Scalable Web & Mobile Experiences
                with React, Django & Next.js ✨ | 📊 Data Analyst | Turning Data
                into Insights with Pandas, Seaborn & Matplotlib 📈
              </Typography>
            </Box>

            {/* CTA Buttons */}
            <Box
              component={motion.div}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.9 }}
              sx={{
                display: "flex",
                flexDirection: { xs: "column", sm: "row" },
                gap: 2,
              }}
            >
              {/* Resume Button */}
              <Button
                variant="outlined"
                size="large"
                endIcon={<DownloadIcon />}
                onClick={handleResumeDownload}
                sx={{
                  position: "relative",
                  py: 1.5,
                  px: 3,
                  borderRadius: 3,
                  borderColor: alpha(
                    mode === "dark" ? "#ffffff" : "#000000",
                    0.2
                  ),
                  transition: "all 0.3s",
                  "&:hover": {
                    transform: "translateY(-3px)",
                    borderColor: "primary.main",
                  },
                }}
              >
                Get Resume
              </Button>

              <Box
                sx={{
                  display: "flex",
                  gap: 1,
                  justifyContent: { xs: "center", sm: "flex-start" },
                }}
              >
                <Tooltip title="Visit GitHub Profile">
                  <IconButton
                    component="a"
                    href="https://github.com/haris18896"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="GitHub"
                    sx={{
                      borderRadius: "50%",
                      border: 1,
                      borderColor: alpha(
                        mode === "dark" ? "#ffffff" : "#000000",
                        0.2
                      ),
                      color: "text.primary",
                      transition: "all 0.3s",
                      p: 2,
                      "&:hover": {
                        transform: "translateY(-3px)",
                        borderColor: "primary.main",
                        bgcolor: alpha(
                          mode === "dark" ? "#ffffff" : "#000000",
                          0.05
                        ),
                      },
                    }}
                  >
                    <GitHubIcon />
                  </IconButton>
                </Tooltip>

                <Tooltip title="Connect on LinkedIn">
                  <IconButton
                    component="a"
                    href="https://www.linkedin.com/in/haris18896"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="LinkedIn"
                    sx={{
                      borderRadius: "50%",
                      border: 1,
                      borderColor: alpha(
                        mode === "dark" ? "#ffffff" : "#000000",
                        0.2
                      ),
                      color: "text.primary",
                      transition: "all 0.3s",
                      p: 2,
                      "&:hover": {
                        transform: "translateY(-3px)",
                        borderColor: "#0077b5", // LinkedIn blue
                        color: "#0077b5",
                        bgcolor: alpha("#0077b5", 0.05),
                      },
                    }}
                  >
                    <LinkedInIcon />
                  </IconButton>
                </Tooltip>
              </Box>
            </Box>

            {/* Floating badges - visible on all screen sizes */}

            <Box
              component={motion.div}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 1.2 }}
              sx={{
                position: "absolute",
                left: { xs: "5.5rem", lg: "5.5rem" },
                top: { xs: "-2rem", lg: "2.3rem" },
                px: 2,
                py: 1,
                borderRadius: 2,
                backdropFilter: "blur(10px)",
                bgcolor: alpha("#9c27b0", 0.1),
                border: 1,
                borderColor: alpha("#9c27b0", 0.2),
                color: "#b039c8",
                animation: "float 4s ease-in-out infinite",
                "@keyframes float": {
                  "0%, 100%": { transform: "translateY(0)" },
                  "50%": { transform: "translateY(-10px)" },
                },
              }}
            >
              <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                <AutoFixHighIcon fontSize="small" />
                <Typography variant="body2">UI Magic</Typography>
              </Box>
            </Box>

            <Box
              component={motion.div}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 1.8 }}
              sx={{
                position: "absolute",
                left: { xs: "60%", sm: "60%", md: "60%", lg: "25rem" },
                top: { xs: "26rem", sm: "22rem", md: "20rem", lg: "16.6rem" },
                px: 2,
                py: 1,
                borderRadius: 2,
                backdropFilter: "blur(10px)",
                bgcolor: alpha("#ff9800", 0.1),
                border: 1,
                borderColor: alpha("#ff9800", 0.2),
                color: "#ffb74d",
                animation: "float 6s ease-in-out infinite",
                animationDelay: "2s",
              }}
            >
              <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                <LightbulbIcon fontSize="small" />
                <Typography variant="body2">Innovation</Typography>
              </Box>
            </Box>

            <Box
              component={motion.div}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 1.5 }}
              sx={{
                position: "absolute",
                left: { xs: "55%", sm: "75%", md: "75%", lg: "22rem" },
                top: { xs: "4rem", sm: "6rem", md: "7rem", lg: "34.6rem" },
                px: 2,
                py: 1,
                borderRadius: 2,
                backdropFilter: "blur(10px)",
                bgcolor: alpha("#2196f3", 0.1),
                border: 1,
                borderColor: alpha("#2196f3", 0.2),
                color: "#42a5f5",
                animation: "float 5s ease-in-out infinite",
                animationDelay: "1s",
              }}
            >
              <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                <CodeIcon fontSize="small" />
                <Typography variant="body2">Clean Code</Typography>
              </Box>
            </Box>
          </Grid>

          {/* Right Column - Code Window */}
          <Grid
            item
            xs={12}
            lg={6}
            component={motion.div}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <CodeWindow code={code} />
          </Grid>
        </Grid>
      </Container>

      {/* Scroll indicator */}
      <Box
        component={motion.div}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 2 }}
        sx={{
          position: "absolute",
          bottom: 20,
          left: "50%",
          transform: "translateX(-50%)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          animation: "bounce 2s infinite",
          "@keyframes bounce": {
            "0%, 100%": { transform: "translateY(0) translateX(-50%)" },
            "50%": { transform: "translateY(-10px) translateX(-50%)" },
          },
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1 }}>
          <MouseIcon color="primary" fontSize="small" />
          <Typography variant="caption" color="text.secondary">
            Scroll to explore
          </Typography>
        </Box>
        <KeyboardArrowDownIcon color="primary" />
      </Box>
    </Box>
  );
};

export default Hero;
