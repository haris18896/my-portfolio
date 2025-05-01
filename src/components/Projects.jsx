"use client";
import React, { useState, useCallback, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Box,
  Container,
  Typography,
  Chip,
  Button,
  alpha,
  useMediaQuery,
  Card,
  CardMedia,
  CardContent,
  Grid,
  Link,
  IconButton,
  Tab,
  Tabs,
} from "@mui/material";
import {
  GitHub as GitHubIcon,
  Launch as LaunchIcon,
  ChevronLeft as ChevronLeftIcon,
  ChevronRight as ChevronRightIcon,
} from "@mui/icons-material";
import { useTheme as useMuiTheme } from "@mui/material/styles";
import { useTheme } from "@/utils/themeToggler";

// Project categories with their user-friendly display names
const PROJECT_CATEGORIES = [
  { value: "all", label: "All Projects" },
  { value: "frontend", label: "Frontend" },
  { value: "backend", label: "Backend" },
  { value: "fullstack", label: "Full Stack" },
  { value: "mobile", label: "Mobile" },
  { value: "datascience", label: "Data Science" },
  { value: "devops", label: "DevOps" },
  { value: "other", label: "Other" },
];

const Projects = ({ projects }) => {
  const { mode } = useTheme();
  const muiTheme = useMuiTheme();
  const [activeProject, setActiveProject] = useState(0);
  const isSmallScreen = useMediaQuery((theme) => theme.breakpoints.down("md"));
  const [isClient, setIsClient] = useState(false);
  const [activeCategory, setActiveCategory] = useState("all");
  const [filteredProjects, setFilteredProjects] = useState([]);

  // Set isClient to true once component is mounted
  useEffect(() => {
    setIsClient(true);
  }, []);

  // Filter projects based on selected category
  useEffect(() => {
    if (!projects || projects.length === 0) {
      setFilteredProjects([]);
      return;
    }

    if (activeCategory === "all") {
      setFilteredProjects(projects);
    } else {
      const filtered = projects.filter(
        (project) => project.category === activeCategory
      );
      setFilteredProjects(filtered);
    }

    // Reset active project to the first one when category changes
    setActiveProject(0);
  }, [activeCategory, projects]);

  const handleCategoryChange = (event, newValue) => {
    setActiveCategory(newValue);
  };

  const handlePrevProject = useCallback(() => {
    if (filteredProjects && filteredProjects.length > 0) {
      setActiveProject(
        (prev) => (prev - 1 + filteredProjects.length) % filteredProjects.length
      );
    }
  }, [filteredProjects]);

  const handleNextProject = useCallback(() => {
    if (filteredProjects && filteredProjects.length > 0) {
      setActiveProject((prev) => (prev + 1) % filteredProjects.length);
    }
  }, [filteredProjects]);

  const handleDotClick = useCallback((index) => {
    setActiveProject(index);
  }, []);

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
            !isClient || mode === "dark"
              ? "linear-gradient(135deg, #0f172a 0%, #1e293b 100%)"
              : "linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)",
          position: "relative",
          overflow: "hidden",
          transition: "all 0.3s ease-in-out",
        }}
      >
        {/* Meteors background */}
        <Box sx={{ position: "absolute", inset: 0, overflow: "hidden" }}>
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
                background: `linear-gradient(to bottom, ${alpha(mode === "dark" ? "#ffffff" : "#000000", 0.8)}, transparent)`,
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                transform: `rotate(${Math.random() * 90 + 45}deg)`,
                animation: `meteor ${Math.random() * 5 + 5}s linear infinite ${Math.random() * 5}s`,
                "@keyframes meteor": {
                  "0%": {
                    transform: "translateY(0) rotate(45deg)",
                    opacity: 0,
                  },
                  "10%": { opacity: 1 },
                  "100%": {
                    transform: "translateY(1000px) rotate(45deg)",
                    opacity: 0,
                  },
                },
              }}
            />
          ))}
        </Box>

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
              position: "relative",
              zIndex: 1,
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
              position: "relative",
              zIndex: 1,
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
      sx={{
        minHeight: "100vh",
        position: "relative",
        background:
          !isClient || mode === "dark"
            ? "linear-gradient(135deg, #0f172a 0%, #1e293b 100%)"
            : "linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)",
        py: 8,
        overflow: "hidden",
        transition: "all 0.3s ease-in-out",
      }}
    >
      {/* Meteors background */}
      <Box sx={{ position: "absolute", inset: 0, overflow: "hidden" }}>
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
              background: `linear-gradient(to bottom, ${alpha(mode === "dark" ? "#ffffff" : "#000000", 0.8)}, transparent)`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              transform: `rotate(${Math.random() * 90 + 45}deg)`,
              animation: `meteor ${Math.random() * 5 + 5}s linear infinite ${Math.random() * 5}s`,
              "@keyframes meteor": {
                "0%": { transform: "translateY(0) rotate(45deg)", opacity: 0 },
                "10%": { opacity: 1 },
                "100%": {
                  transform: "translateY(1000px) rotate(45deg)",
                  opacity: 0,
                },
              },
              zIndex: 0,
            }}
          />
        ))}
      </Box>

      <Container maxWidth="lg" sx={{ position: "relative", zIndex: 1 }}>
        {/* Header */}
        <Box sx={{ mb: 6, textAlign: "center" }}>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <Typography
              variant="h2"
              component="h2"
              sx={{
                color: mode === "dark" ? "white" : "text.primary",
                fontWeight: 800,
                fontSize: { xs: "2rem", sm: "2.5rem", md: "3rem" },
                position: "relative",
                display: "inline-block",
                mb: 2,
              }}
            >
              Featured Projects
              <Box
                sx={{
                  position: "absolute",
                  bottom: -10,
                  left: "50%",
                  width: "40%",
                  height: 4,
                  bgcolor: "primary.main",
                  borderRadius: 2,
                  transform: "translateX(-50%)",
                }}
              />
            </Typography>
            <Typography
              variant="body1"
              color={mode === "dark" ? "grey.400" : "text.secondary"}
              sx={{ maxWidth: 600, mx: "auto", mb: 4 }}
            >
              A collection of my most significant work, showcasing skills and
              passion for creating meaningful solutions
            </Typography>
          </motion.div>
        </Box>

        {/* Category Tabs */}
        <Box sx={{ mb: 5, px: 1 }}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <Tabs
              value={activeCategory}
              onChange={handleCategoryChange}
              variant="scrollable"
              scrollButtons="auto"
              allowScrollButtonsMobile
              centered={!isSmallScreen}
              sx={{
                "& .MuiTabs-indicator": {
                  backgroundColor: muiTheme.palette.primary.main,
                  height: 3,
                  borderRadius: 1.5,
                },
                "& .MuiTabs-flexContainer": {
                  justifyContent: isSmallScreen ? "flex-start" : "center",
                },
                "& .MuiTabs-root": {
                  display: "flex",
                  justifyContent: "center",
                },
                "& .MuiTab-root": {
                  textTransform: "none",
                  fontWeight: 600,
                  minWidth: 100,
                  color: mode === "dark" ? "grey.400" : "grey.700",
                  "&.Mui-selected": {
                    color:
                      mode === "dark"
                        ? muiTheme.palette.primary.light
                        : muiTheme.palette.primary.main,
                  },
                  "&:hover": {
                    color:
                      mode === "dark"
                        ? muiTheme.palette.primary.light
                        : muiTheme.palette.primary.main,
                    opacity: 0.8,
                  },
                },
              }}
            >
              {PROJECT_CATEGORIES.map((category) => (
                <Tab
                  key={category.value}
                  label={category.label}
                  value={category.value}
                  disableRipple
                />
              ))}
            </Tabs>
          </motion.div>
        </Box>

        {/* Empty state for filtered projects */}
        {filteredProjects.length === 0 && (
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              minHeight: "300px",
              my: 4,
              px: 2,
              py: 4,
              borderRadius: 4,
              backgroundColor: alpha(
                mode === "dark" ? "#1a2334" : "#ffffff",
                0.7
              ),
              backdropFilter: "blur(10px)",
              boxShadow: `0 8px 32px ${alpha("#000000", mode === "dark" ? 0.3 : 0.1)}`,
              border: `1px solid ${alpha("#ffffff", 0.1)}`,
            }}
          >
            <Typography
              variant="h5"
              sx={{
                color: mode === "dark" ? "grey.200" : "text.primary",
                fontWeight: 600,
                mb: 2,
                textAlign: "center",
              }}
            >
              No projects in this category yet
            </Typography>
            <Typography
              variant="body1"
              sx={{
                color: mode === "dark" ? "grey.400" : "text.secondary",
                textAlign: "center",
                maxWidth: 400,
              }}
            >
              I'm working on adding more projects to this category. Please check
              back later or explore other categories.
            </Typography>
            <Button
              variant="outlined"
              color="primary"
              onClick={() => setActiveCategory("all")}
              sx={{
                mt: 3,
                borderRadius: 2,
                textTransform: "none",
                fontWeight: 600,
                px: 3,
              }}
            >
              View All Projects
            </Button>
          </Box>
        )}

        {filteredProjects.length > 0 && (
          <>
            {/* Navigation Controls */}
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                gap: 2,
                mb: 4,
              }}
            >
              <IconButton
                onClick={handlePrevProject}
                aria-label="Previous project"
                sx={{
                  bgcolor: alpha(mode === "dark" ? "#1e293b" : "#ffffff", 0.8),
                  color: mode === "dark" ? "grey.300" : "grey.700",
                  boxShadow: "0 4px 8px rgba(0,0,0,0.15)",
                  backdropFilter: "blur(4px)",
                  width: { xs: 40, sm: 46, md: 50 },
                  height: { xs: 40, sm: 46, md: 50 },
                  "&:hover": {
                    bgcolor: alpha(
                      mode === "dark" ? "#334155" : "#f1f5f9",
                      0.9
                    ),
                    color: muiTheme.palette.primary.main,
                  },
                  transition: "all 0.2s ease",
                }}
              >
                <ChevronLeftIcon
                  sx={{ fontSize: { xs: 24, sm: 28, md: 30 } }}
                />
              </IconButton>

              <Typography
                variant="body2"
                sx={{
                  color: mode === "dark" ? "grey.400" : "grey.600",
                  fontSize: "0.95rem",
                  fontWeight: 500,
                  minWidth: "70px",
                  textAlign: "center",
                }}
              >
                {activeProject + 1} / {filteredProjects.length}
              </Typography>

              <IconButton
                onClick={handleNextProject}
                aria-label="Next project"
                sx={{
                  bgcolor: alpha(mode === "dark" ? "#1e293b" : "#ffffff", 0.8),
                  color: mode === "dark" ? "grey.300" : "grey.700",
                  boxShadow: "0 4px 8px rgba(0,0,0,0.15)",
                  backdropFilter: "blur(4px)",
                  width: { xs: 40, sm: 46, md: 50 },
                  height: { xs: 40, sm: 46, md: 50 },
                  "&:hover": {
                    bgcolor: alpha(
                      mode === "dark" ? "#334155" : "#f1f5f9",
                      0.9
                    ),
                    color: muiTheme.palette.primary.main,
                  },
                  transition: "all 0.2s ease",
                }}
              >
                <ChevronRightIcon
                  sx={{ fontSize: { xs: 24, sm: 28, md: 30 } }}
                />
              </IconButton>
            </Box>

            {/* Project Carousel */}
            <Box
              sx={{
                position: "relative",
                width: "100%",
                height: isSmallScreen ? "auto" : 480,
                mb: 6,
              }}
            >
              <AnimatePresence mode="wait">
                {filteredProjects.map(
                  (project, index) =>
                    index === activeProject && (
                      <motion.div
                        key={project._id || index}
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        transition={{ duration: 0.5, ease: "easeInOut" }}
                        style={{
                          width: "100%",
                          height: "100%",
                        }}
                      >
                        <Card
                          elevation={8}
                          sx={{
                            overflow: "hidden",
                            borderRadius: { xs: 3, md: 6 },
                            background: alpha(
                              mode === "dark" ? "#1a2234" : "#ffffff",
                              mode === "dark" ? 0.75 : 0.85
                            ),
                            backdropFilter: "blur(12px)",
                            height: "100%",
                            position: "relative",
                            transition:
                              "all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)",
                            border: `1px solid ${alpha(
                              mode === "dark" ? "#ffffff" : "#000000",
                              0.05
                            )}`,
                            "&:hover": {
                              boxShadow: `0 30px 60px ${alpha(
                                mode === "dark" ? "#000000" : "#0f172a",
                                mode === "dark" ? 0.4 : 0.15
                              )}`,
                            },
                            "&:before": {
                              content: '""',
                              position: "absolute",
                              inset: 0,
                              borderRadius: "inherit",
                              padding: "1px",
                              background: `linear-gradient(to bottom right, ${alpha(
                                muiTheme.palette.primary.main,
                                0.2
                              )}, transparent)`,
                              WebkitMask:
                                "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
                              WebkitMaskComposite: "xor",
                              maskComposite: "exclude",
                              pointerEvents: "none",
                            },
                          }}
                        >
                          <Grid container sx={{ height: "100%" }}>
                            {/* Project Image Section - Clickable */}
                            <Grid
                              item
                              xs={12}
                              md={6}
                              sx={{
                                height: isSmallScreen ? 300 : "100%",
                                cursor: "pointer",
                                position: "relative",
                                overflow: "hidden",
                              }}
                              component={Link}
                              href={
                                project.project_url || project.github_url || "#"
                              }
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              <Box
                                sx={{
                                  height: "100%",
                                  width: "100%",
                                  position: "relative",
                                  overflow: "hidden",
                                  background:
                                    mode === "dark"
                                      ? "linear-gradient(120deg, #0f172a, #293548)"
                                      : "linear-gradient(120deg, #f1f5f9, #e2e8f0)",
                                  display: "flex",
                                  alignItems: "center",
                                  justifyContent: "center",
                                }}
                              >
                                {/* Accent diagonal border in bottom-right corner */}
                                <Box
                                  sx={{
                                    position: "absolute",
                                    bottom: 0,
                                    right: 0,
                                    width: "35%",
                                    height: 4,
                                    background: `linear-gradient(to left, ${muiTheme.palette.primary.main}, ${alpha(muiTheme.palette.primary.main, 0)})`,
                                    borderBottomLeftRadius: 2,
                                    zIndex: 2,
                                  }}
                                />
                                {/* Add vertical accent component */}
                                <Box
                                  sx={{
                                    position: "absolute",
                                    bottom: 0,
                                    right: 0,
                                    width: 4,
                                    height: "25%",
                                    background: `linear-gradient(to top, ${muiTheme.palette.primary.main}, ${alpha(muiTheme.palette.primary.main, 0)})`,
                                    borderTopLeftRadius: 2,
                                    zIndex: 2,
                                  }}
                                />

                                {project.project_logo && (
                                  <Box
                                    component="img"
                                    src={
                                      project.project_logo.asset
                                        ? project.project_logo.asset.url
                                        : project.project_logo
                                    }
                                    alt={project.project_name}
                                    sx={{
                                      maxWidth: "85%",
                                      maxHeight: "85%",
                                      width: "auto",
                                      height: "auto",
                                      borderRadius: "10px",
                                      objectFit: "contain",
                                      transition:
                                        "all 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275)",
                                      filter: `drop-shadow(0 8px 16px ${alpha(
                                        "#000000",
                                        mode === "dark" ? 0.35 : 0.15
                                      )})`,
                                      "&:hover": {
                                        transform:
                                          "scale(1.08) translateY(-5px)",
                                        filter: `drop-shadow(0 15px 25px ${alpha(
                                          "#000000",
                                          mode === "dark" ? 0.5 : 0.25
                                        )})`,
                                      },
                                    }}
                                  />
                                )}

                                {/* Enhanced shine effect */}
                                <Box
                                  sx={{
                                    position: "absolute",
                                    inset: 0,
                                    background: `
                                      linear-gradient(
                                        45deg,
                                        ${alpha(muiTheme.palette.primary.main, 0)} 40%, 
                                        ${alpha(muiTheme.palette.primary.main, 0.15)} 50%,
                                        ${alpha(muiTheme.palette.primary.main, 0)} 60%
                                      )
                                    `,
                                    backgroundSize: "300% 300%",
                                    animation: "shine 3s infinite linear",
                                    pointerEvents: "none",
                                    "@keyframes shine": {
                                      "0%": { backgroundPosition: "100% 100%" },
                                      "100%": { backgroundPosition: "0% 0%" },
                                    },
                                    opacity: 0.7,
                                  }}
                                />

                                {/* Improved clickable hint */}
                                <Box
                                  sx={{
                                    position: "absolute",
                                    bottom: 20,
                                    right: 20,
                                    background: alpha(
                                      mode === "dark"
                                        ? muiTheme.palette.primary.dark
                                        : muiTheme.palette.primary.light,
                                      0.9
                                    ),
                                    backdropFilter: "blur(8px)",
                                    borderRadius: "50%",
                                    width: 48,
                                    height: 48,
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    color: mode === "dark" ? "white" : "black",
                                    boxShadow: `0 8px 16px ${alpha("#000000", 0.25)}`,
                                    transition: "all 0.3s ease",
                                    border: `1px solid ${alpha("#ffffff", 0.1)}`,
                                    opacity: 0.9,
                                    "&:hover": {
                                      transform: "scale(1.1) translateY(-3px)",
                                      opacity: 1,
                                    },
                                  }}
                                >
                                  <LaunchIcon
                                    sx={{
                                      fontSize: 22,
                                      filter: `drop-shadow(0 2px 3px ${alpha("#000000", 0.3)})`,
                                    }}
                                  />
                                </Box>
                              </Box>
                            </Grid>

                            {/* Project Details Section */}
                            <Grid item xs={12} md={6}>
                              <Box
                                sx={{
                                  height: "100%",
                                  display: "flex",
                                  flexDirection: "column",
                                  p: { xs: 3.5, md: 4.5 },
                                  position: "relative",
                                  background:
                                    mode === "dark"
                                      ? `linear-gradient(135deg, ${alpha("#1a2234", 0.7)}, ${alpha("#111827", 0.7)})`
                                      : `linear-gradient(135deg, ${alpha("#ffffff", 0.9)}, ${alpha("#f8fafc", 0.9)})`,
                                  backdropFilter: "blur(8px)",
                                }}
                              >
                                {/* Accent line */}
                                <Box
                                  sx={{
                                    position: "absolute",
                                    top: 0,
                                    left: 0,
                                    width: "35%",
                                    height: 4,
                                    background: `linear-gradient(to right, ${muiTheme.palette.primary.main}, ${alpha(muiTheme.palette.primary.main, 0)})`,
                                    borderTopRightRadius: 2,
                                  }}
                                />

                                {/* Category Chip */}
                                {project.category && (
                                  <Chip
                                    label={
                                      PROJECT_CATEGORIES.find(
                                        (cat) => cat.value === project.category
                                      )?.label || project.category
                                    }
                                    size="small"
                                    sx={{
                                      alignSelf: "flex-start",
                                      mb: 2,
                                      fontWeight: 600,
                                      borderRadius: "12px",
                                      backgroundColor: alpha(
                                        muiTheme.palette.primary.main,
                                        mode === "dark" ? 0.15 : 0.1
                                      ),
                                      color:
                                        mode === "dark"
                                          ? muiTheme.palette.primary.light
                                          : muiTheme.palette.primary.dark,
                                      border: `1px solid ${alpha(
                                        muiTheme.palette.primary.main,
                                        0.2
                                      )}`,
                                    }}
                                  />
                                )}

                                <Typography
                                  variant="h3"
                                  component={Link}
                                  href={
                                    project.project_url ||
                                    project.github_url ||
                                    "#"
                                  }
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  sx={{
                                    fontWeight: 700,
                                    color:
                                      mode === "dark"
                                        ? "white"
                                        : "text.primary",
                                    fontSize: { xs: "1.8rem", md: "2.2rem" },
                                    mb: 2,
                                    textDecoration: "none",
                                    transition: "all 0.3s ease",
                                    display: "inline-block",
                                    "&:hover": {
                                      color: muiTheme.palette.primary.main,
                                      transform: "translateX(3px)",
                                    },
                                    cursor: "pointer",
                                    textShadow:
                                      mode === "dark"
                                        ? "0 2px 4px rgba(0,0,0,0.3)"
                                        : "none",
                                  }}
                                >
                                  {project.project_name}
                                </Typography>

                                <Typography
                                  variant="body1"
                                  sx={{
                                    color:
                                      mode === "dark"
                                        ? "grey.300"
                                        : "text.secondary",
                                    mb: 3.5,
                                    lineHeight: 1.8,
                                    maxHeight: { xs: "auto", md: "150px" },
                                    overflow: "auto",
                                    scrollbarWidth: "thin",
                                    letterSpacing: "0.015em",
                                    fontSize: { xs: "0.95rem", md: "1rem" },
                                    "&::-webkit-scrollbar": {
                                      width: "6px",
                                    },
                                    "&::-webkit-scrollbar-track": {
                                      background: alpha(
                                        muiTheme.palette.grey[500],
                                        0.1
                                      ),
                                    },
                                    "&::-webkit-scrollbar-thumb": {
                                      background: alpha(
                                        muiTheme.palette.primary.main,
                                        0.3
                                      ),
                                      borderRadius: "3px",
                                      "&:hover": {
                                        background: alpha(
                                          muiTheme.palette.primary.main,
                                          0.5
                                        ),
                                      },
                                    },
                                  }}
                                >
                                  {project.project_description}
                                </Typography>

                                {/* Skills */}
                                <Box sx={{ mb: "auto" }}>
                                  <Typography
                                    variant="subtitle1"
                                    sx={{
                                      mb: 1.5,
                                      color:
                                        mode === "dark"
                                          ? alpha(
                                              muiTheme.palette.primary.light,
                                              0.9
                                            )
                                          : alpha(
                                              muiTheme.palette.primary.dark,
                                              0.9
                                            ),
                                      fontWeight: 600,
                                      letterSpacing: "0.05em",
                                      fontSize: "0.95rem",
                                      textTransform: "uppercase",
                                    }}
                                  >
                                    Technologies
                                  </Typography>
                                  <Box
                                    sx={{
                                      display: "flex",
                                      flexWrap: "wrap",
                                      gap: 1,
                                      maxHeight: "110px",
                                      overflow: "auto",
                                      pr: 1,
                                      scrollbarWidth: "thin",
                                      "&::-webkit-scrollbar": {
                                        width: "4px",
                                      },
                                      "&::-webkit-scrollbar-track": {
                                        background: "transparent",
                                      },
                                      "&::-webkit-scrollbar-thumb": {
                                        background: alpha(
                                          muiTheme.palette.primary.main,
                                          0.3
                                        ),
                                        borderRadius: "2px",
                                      },
                                    }}
                                  >
                                    {project.skills &&
                                      project.skills.map((skill, i) => (
                                        <Chip
                                          key={i}
                                          label={skill.skill}
                                          size="small"
                                          sx={{
                                            backgroundColor: alpha(
                                              muiTheme.palette.primary.main,
                                              mode === "dark" ? 0.15 : 0.1
                                            ),
                                            color:
                                              mode === "dark"
                                                ? muiTheme.palette.primary.light
                                                : muiTheme.palette.primary.dark,
                                            fontWeight: 500,
                                            borderRadius: "12px",
                                            transition: "all 0.3s ease",
                                            border: `1px solid ${alpha(
                                              muiTheme.palette.primary.main,
                                              0.15
                                            )}`,
                                            px: 1,
                                            "&:hover": {
                                              backgroundColor: alpha(
                                                muiTheme.palette.primary.main,
                                                mode === "dark" ? 0.25 : 0.2
                                              ),
                                              transform:
                                                "translateY(-3px) scale(1.05)",
                                              boxShadow: `0 5px 10px ${alpha(
                                                "#000000",
                                                0.15
                                              )}`,
                                            },
                                          }}
                                        />
                                      ))}
                                  </Box>
                                </Box>

                                {/* Project Links */}
                                <Box
                                  sx={{
                                    display: "flex",
                                    flexWrap: { xs: "wrap", md: "nowrap" },
                                    gap: 2,
                                    mt: 3.5,
                                    "& button": {
                                      minWidth: { xs: "100%", sm: "auto" },
                                      flex: { xs: "1 0 100%", sm: "0 1 auto" },
                                      mb: { xs: 1, sm: 0 },
                                    },
                                  }}
                                >
                                  {project.github_url && (
                                    <Button
                                      variant="outlined"
                                      size="medium"
                                      startIcon={<GitHubIcon />}
                                      href={project.github_url}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      sx={{
                                        borderRadius: "12px",
                                        px: 3,
                                        py: 1.25,
                                        fontWeight: 600,
                                        textTransform: "none",
                                        borderColor:
                                          mode === "dark"
                                            ? alpha(
                                                muiTheme.palette.primary.main,
                                                0.5
                                              )
                                            : muiTheme.palette.primary.main,
                                        color:
                                          mode === "dark"
                                            ? muiTheme.palette.primary.light
                                            : muiTheme.palette.primary.dark,
                                        transition:
                                          "all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)",
                                        "&:hover": {
                                          borderColor:
                                            muiTheme.palette.primary.main,
                                          backgroundColor: alpha(
                                            muiTheme.palette.primary.main,
                                            0.05
                                          ),
                                          boxShadow: `0 8px 20px ${alpha(
                                            muiTheme.palette.primary.main,
                                            0.15
                                          )}`,
                                        },
                                      }}
                                    >
                                      Source Code
                                    </Button>
                                  )}
                                </Box>
                              </Box>
                            </Grid>
                          </Grid>
                        </Card>
                      </motion.div>
                    )
                )}
              </AnimatePresence>
            </Box>

            {/* Swipe Instruction for Mobile - Only visible on small screens */}
            {isSmallScreen && (
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  mb: 2,
                  color: mode === "dark" ? "grey.400" : "grey.600",
                  fontSize: "0.8rem",
                }}
              >
                <Typography
                  variant="caption"
                  sx={{ display: "flex", alignItems: "center", gap: 0.5 }}
                >
                  <ChevronLeftIcon fontSize="small" /> Use arrows or dots to
                  navigate projects <ChevronRightIcon fontSize="small" />
                </Typography>
              </Box>
            )}

            {/* Dot Indicators */}
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                gap: 1.5,
                mt: isSmallScreen ? 1 : 3,
                mb: 2,
                px: 2,
                pt: 2,
                overflow: "auto",
                maxWidth: "100%",
                scrollbarWidth: "none",
                "&::-webkit-scrollbar": {
                  display: "none",
                },
                "& > *": {
                  flexShrink: 0,
                },
              }}
            >
              {filteredProjects.map((_, index) => (
                <Box
                  key={index}
                  onClick={() => handleDotClick(index)}
                  sx={{
                    width: index === activeProject ? 28 : 10,
                    height: 10,
                    borderRadius: 5,
                    bgcolor:
                      index === activeProject
                        ? muiTheme.palette.primary.main
                        : alpha(muiTheme.palette.primary.main, 0.3),
                    transition: "all 0.3s ease",
                    cursor: "pointer",
                    "&:hover": {
                      bgcolor:
                        index === activeProject
                          ? muiTheme.palette.primary.main
                          : alpha(muiTheme.palette.primary.main, 0.5),
                      transform: "translateY(-2px)",
                    },
                    boxShadow:
                      index === activeProject
                        ? `0 3px 8px ${alpha(muiTheme.palette.primary.main, 0.5)}`
                        : "none",
                  }}
                />
              ))}
            </Box>
          </>
        )}
      </Container>
    </Box>
  );
};

export default Projects;
