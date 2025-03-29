"use client";
import React, { useRef, useEffect, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useInView } from "react-intersection-observer";
import {
  Box,
  Container,
  Typography,
  Chip,
  Button,
  alpha,
  useMediaQuery,
} from "@mui/material";
import {
  GitHub as GitHubIcon,
  Launch as LaunchIcon,
} from "@mui/icons-material";
import { useTheme } from "@/utils/themeToggler";

const Projects = ({ projects }) => {
  const { mode } = useTheme();
  const containerRef = useRef(null);
  const [activeProject, setActiveProject] = useState(0);
  const isSmallScreen = useMediaQuery((theme) => theme.breakpoints.down("md"));

  // Set the container height to standard (no longer need extra scroll space)
  useEffect(() => {
    // Clean up any scroll event listeners if needed
  }, [projects]);

  // Calculate which project to show based on scroll position - no longer needed
  // Use manual navigation instead

  // Handle navigation between projects
  const nextProject = () => {
    if (projects && projects.length > 0) {
      setActiveProject((prev) => (prev + 1) % projects.length);
    }
  };

  const prevProject = () => {
    if (projects && projects.length > 0) {
      setActiveProject(
        (prev) => (prev - 1 + projects.length) % projects.length
      );
    }
  };

  if (!projects || projects.length === 0) {
    return (
      <Box
        component="section"
        id="projects"
        sx={{
          height: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background:
            mode === "dark"
              ? "linear-gradient(to bottom, #102030, #0a0f1f)"
              : "linear-gradient(to bottom, #e9ecef, #f8f9fa)",
        }}
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <Typography
            variant="h3"
            sx={{
              textAlign: "center",
              color: mode === "dark" ? "white" : "text.primary",
              fontWeight: "bold",
            }}
          >
            Projects Coming Soon
          </Typography>
          <Box
            sx={{
              width: 100,
              height: 4,
              bgcolor: "primary.main",
              mx: "auto",
              mt: 2,
              borderRadius: 2,
            }}
          />
        </motion.div>
      </Box>
    );
  }

  return (
    <Box
      component="section"
      id="projects"
      ref={containerRef}
      sx={{
        minHeight: "100vh",
        position: "relative",
        overflow: "hidden",
        background:
          mode === "dark"
            ? "linear-gradient(to bottom, #102030, #0a0f1f)"
            : "linear-gradient(to bottom, #e9ecef, #f8f9fa)",
        py: 8,
      }}
    >
      <Container maxWidth="lg">
        <Typography
          variant="h2"
          component="h2"
          sx={{
            textAlign: "center",
            mb: 6,
            color: mode === "dark" ? "white" : "text.primary",
            fontWeight: "bold",
            fontSize: { xs: "2rem", sm: "3rem", md: "3.5rem" },
          }}
        >
          Featured Projects
        </Typography>

        {/* Navigation buttons */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            gap: 2,
            mb: 4,
          }}
        >
          <Button
            variant="outlined"
            onClick={prevProject}
            sx={{
              borderColor: mode === "dark" ? "grey.700" : "grey.300",
              color: mode === "dark" ? "grey.300" : "text.secondary",
            }}
          >
            Previous
          </Button>
          <Button
            variant="outlined"
            onClick={nextProject}
            sx={{
              borderColor: mode === "dark" ? "grey.700" : "grey.300",
              color: mode === "dark" ? "grey.300" : "text.secondary",
            }}
          >
            Next
          </Button>
        </Box>

        {/* Display current project */}
        <Box sx={{ position: "relative", minHeight: "60vh" }}>
          {projects.map((project, index) => (
            <ProjectDisplay
              key={project._id || index}
              project={project}
              isActive={index === activeProject}
              mode={mode}
              isSmallScreen={isSmallScreen}
            />
          ))}
        </Box>

        {/* Project indicators */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            gap: 1,
            mt: 4,
          }}
        >
          {Array.from({ length: projects.length }).map((_, i) => (
            <Box
              key={i}
              onClick={() => setActiveProject(i)}
              sx={{
                width: i === activeProject ? 24 : 8,
                height: 8,
                borderRadius: 4,
                transition: "all 0.3s ease",
                bgcolor:
                  i === activeProject
                    ? "primary.main"
                    : (theme) => alpha(theme.palette.primary.main, 0.3),
                cursor: "pointer",
              }}
            />
          ))}
        </Box>
      </Container>
    </Box>
  );
};

// New component for project display
const ProjectDisplay = ({ project, isActive, mode, isSmallScreen }) => {
  const hasLogo = project.project_logo && project.project_logo.asset;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={
        isActive
          ? { opacity: 1, scale: 1, display: "block" }
          : { opacity: 0, scale: 0.9, display: "none" }
      }
      transition={{ duration: 0.5 }}
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
      }}
    >
      <Box
        sx={{
          position: "relative",
          width: "100%",
          height: "100%",
          overflow: "hidden",
          borderRadius: 4,
        }}
      >
        {/* Background with parallax effect removed */}
        <Box
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            zIndex: 0,
          }}
        >
          {hasLogo ? (
            <Box
              sx={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                backgroundImage: `url(${project.project_logo.asset.url})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                filter: `blur(8px) brightness(${mode === "dark" ? 0.3 : 0.8})`,
                opacity: 0.6,
              }}
            />
          ) : (
            <Box
              sx={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                overflow: "hidden",
              }}
            >
              {/* Animated meteors/particles when there's no logo */}
              {Array.from({ length: 20 }).map((_, i) => (
                <Box
                  key={i}
                  sx={{
                    position: "absolute",
                    width: { xs: "2px", md: "3px" },
                    height: {
                      xs: `${Math.random() * 80 + 20}px`,
                      md: `${Math.random() * 150 + 50}px`,
                    },
                    background: `linear-gradient(to bottom, ${alpha(
                      "#ffffff",
                      0.8
                    )}, transparent)`,
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`,
                    transform: `rotate(${Math.random() * 90 + 45}deg)`,
                    animation: `meteor ${
                      Math.random() * 5 + 5
                    }s linear infinite ${Math.random() * 5}s`,
                    "@keyframes meteor": {
                      "0%": {
                        transform: "translateY(0) rotate(45deg)",
                        opacity: 0,
                      },
                      "10%": {
                        opacity: 1,
                      },
                      "100%": {
                        transform: "translateY(1000px) rotate(45deg)",
                        opacity: 0,
                      },
                    },
                  }}
                />
              ))}
            </Box>
          )}
        </Box>

        {/* Content container */}
        <Box
          sx={{
            position: "relative",
            zIndex: 2,
            p: 2,
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: isSmallScreen ? "column" : "row",
              alignItems: "center",
              gap: 4,
              borderRadius: 4,
              p: 4,
              backgroundColor: alpha(
                mode === "dark" ? "#0a0f1f" : "#ffffff",
                mode === "dark" ? 0.6 : 0.8
              ),
              backdropFilter: "blur(10px)",
              boxShadow: "0 8px 32px rgba(0, 0, 0, 0.2)",
            }}
          >
            {/* Project logo/image */}
            <Box
              sx={{
                width: isSmallScreen ? "100%" : "40%",
                height: isSmallScreen ? 200 : 300,
                borderRadius: 4,
                overflow: "hidden",
                boxShadow: "0 8px 24px rgba(0, 0, 0, 0.2)",
                border: `1px solid ${alpha(
                  mode === "dark" ? "#ffffff" : "#000000",
                  0.1
                )}`,
              }}
            >
              {hasLogo ? (
                <Box
                  component="img"
                  src={project.project_logo.asset.url}
                  alt={project.project_name}
                  sx={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                  }}
                />
              ) : (
                <Box
                  sx={{
                    width: "100%",
                    height: "100%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    backgroundColor: alpha(
                      mode === "dark" ? "#1a2035" : "#f0f2f5",
                      0.7
                    ),
                  }}
                >
                  <Typography variant="h4" color="primary.main">
                    {project.project_name.substring(0, 1)}
                  </Typography>
                </Box>
              )}
            </Box>

            {/* Project details */}
            <Box
              sx={{
                width: isSmallScreen ? "100%" : "60%",
                display: "flex",
                flexDirection: "column",
                gap: 2,
              }}
            >
              <Typography
                variant="h3"
                sx={{
                  fontWeight: "bold",
                  color: mode === "dark" ? "white" : "text.primary",
                  fontSize: { xs: "1.8rem", sm: "2.2rem", md: "2.5rem" },
                }}
              >
                {project.project_name}
              </Typography>

              <Typography
                variant="body1"
                sx={{
                  color: mode === "dark" ? "grey.300" : "text.secondary",
                  mb: 2,
                  fontSize: { xs: "0.9rem", md: "1rem" },
                  lineHeight: 1.7,
                }}
              >
                {project.project_description}
              </Typography>

              {/* Skills/technologies used */}
              <Box sx={{ mb: 3 }}>
                <Typography
                  variant="subtitle2"
                  sx={{ mb: 1, color: "text.secondary" }}
                >
                  Technologies:
                </Typography>
                <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
                  {project.skills &&
                    project.skills.map((skill, i) => (
                      <Chip
                        key={i}
                        label={skill.skill}
                        size="small"
                        sx={{
                          backgroundColor: alpha(
                            mode === "dark" ? "#4caf50" : "#81c784",
                            0.15
                          ),
                          color: mode === "dark" ? "#81c784" : "#2e7d32",
                          fontWeight: "medium",
                          "& .MuiChip-label": { px: 1.5 },
                        }}
                      />
                    ))}
                </Box>
              </Box>

              {/* Project links */}
              <Box sx={{ display: "flex", gap: 2 }}>
                {project.project_url && (
                  <Button
                    variant="contained"
                    color="primary"
                    size="small"
                    startIcon={<LaunchIcon />}
                    href={project.project_url}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Live Demo
                  </Button>
                )}
                {project.github_url && (
                  <Button
                    variant="outlined"
                    size="small"
                    startIcon={<GitHubIcon />}
                    href={project.github_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    sx={{
                      borderColor: mode === "dark" ? "grey.700" : "grey.300",
                      color: mode === "dark" ? "grey.300" : "text.secondary",
                    }}
                  >
                    Source Code
                  </Button>
                )}
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
    </motion.div>
  );
};

export default Projects;
