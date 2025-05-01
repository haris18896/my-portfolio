"use client";

import React, { useState, useRef, useEffect } from "react";
import ColorThief from "colorthief";

// ** Third Party Packages
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

// ** MUI
import { useTheme } from "@mui/material/styles";
import { Box, Container, Typography, Grid, alpha } from "@mui/material";

// ** Utils
import { containerVariants } from "@/utils/utils";

const ExperienceCard = ({ experience, isDark, skills }) => {
  const muiTheme = useTheme();
  const [colorArrays, setColorArrays] = useState([]);
  const imgRef = useRef(null);

  const descriptionPoints = experience?.company_description
    ? experience.company_description.split("-").filter((point) => point.trim())
    : [];

  const getSkillLogo = (skillName) => {
    try {
      const skillData = skills?.find((s) => s.skill === skillName);
      if (!skillData) return null;

      // Handle different possible formats of skill_logo
      if (typeof skillData.skill_logo === "string") return skillData.skill_logo;
      if (skillData.skill_logo?.asset?.url)
        return skillData.skill_logo.asset.url;
      return null;
    } catch (error) {
      console.error(`Error getting logo for skill ${skillName}:`, error);
      return null;
    }
  };

  // Helper function to properly handle image URLs
  const getImageUrl = (logo) => {
    if (!logo) return null;
    if (typeof logo === "string") return logo;
    if (logo.asset && logo.asset.url) return logo.asset.url;
    return null;
  };

  useEffect(() => {
    const loadImage = () => {
      try {
        if (imgRef.current && imgRef.current.complete) {
          const colorThief = new ColorThief();
          try {
            const color = colorThief.getColor(imgRef.current);
            setColorArrays(color);
          } catch (colorError) {
            console.warn("ColorThief error:", colorError);
            // Fallback colors when CORS prevents color extraction
            setColorArrays([47, 61, 86]); // Dark blue fallback
          }
        }
      } catch (error) {
        console.error("Error extracting color:", error);
        setColorArrays([47, 61, 86]); // Fallback color for dark mode
      }
    };

    const handleImageError = () => {
      console.warn("Image failed to load properly");
      setColorArrays([47, 61, 86]); // Fallback color
    };

    loadImage();
    const currentImg = imgRef.current;
    if (currentImg) {
      currentImg.addEventListener("load", loadImage);
      currentImg.addEventListener("error", handleImageError);
    }

    return () => {
      if (currentImg) {
        currentImg.removeEventListener("load", loadImage);
        currentImg.removeEventListener("error", handleImageError);
      }
    };
  }, [experience.company_logo]);

  function rgb(values) {
    return typeof values === "undefined" || !values.length
      ? "linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.5))"
      : `linear-gradient(rgba(${values.join(", ")}, 0.85), rgba(${values.join(", ")}, 0.95))`;
  }

  const formatDate = (date) => {
    if (!date) return "";
    const d = new Date(date);
    return d.toLocaleDateString("en-US", { month: "short", year: "numeric" });
  };

  return (
    <Box
      sx={{
        position: "relative",
        boxShadow: "rgba(0, 0, 0, 0.2) 0px 10px 30px -15px",
        borderRadius: "10px",
        border: "1px solid rgba(211, 211, 211, 0.397)",
        transition: "all 0.3s ease-in-out",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        "&:hover": {
          boxShadow: isDark
            ? "rgba(211, 211, 211, 0.2) 0px 20px 30px -10px"
            : "rgba(0, 0, 0, 0.2) 0px 20px 30px -10px",
          transform: "translateY(-5px)",
        },
      }}
    >
      <Box
        sx={{
          height: "11rem",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          backgroundSize: "150px",
          borderRadius: "10px 10px 0 0",
          display: "flex",
          alignItems: "flex-end",
          justifyContent: "center",
          position: "relative",
          width: "100%",
          background: rgb(colorArrays),
          overflow: "hidden",
        }}
      >
        {/* Background pattern for visual interest */}
        <Box
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            opacity: 0.05,
            backgroundImage: `radial-gradient(circle at 25px 25px, #ffffff 2%, transparent 0%), 
              radial-gradient(circle at 75px 75px, #ffffff 2%, transparent 0%)`,
            backgroundSize: "100px 100px",
            zIndex: 1,
          }}
        />

        <Box
          sx={{
            position: "absolute",
            backdropFilter: "blur(5px)",
            height: "9rem",
            top: 0,
            left: 0,
            width: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 2,
          }}
        >
          <Typography
            sx={{
              textAlign: "center",
              padding: "1.5rem",
              margin: 0,
              color: "#fff",
              fontSize: { xs: "22px", md: "25px" },
              fontWeight: 700,
              textOverflow: "ellipsis",
              overflow: "hidden",
              whiteSpace: "nowrap",
              textShadow: "0 2px 4px rgba(0,0,0,0.3)",
            }}
          >
            {experience.company_name}
          </Typography>
        </Box>
      </Box>
      {/* Company logo container - positioned to overlap the bottom of the header */}
      <Box
        sx={{
          position: "relative",
          width: "100%",
          display: "flex",
          justifyContent: "center",
          mt: "-4rem",
          mb: "1rem",
          zIndex: 10,
        }}
      >
        <Box
          sx={{
            width: { xs: "6.5rem", md: "8rem" },
            height: { xs: "6.5rem", md: "8rem" },
            borderRadius: "50%",
            overflow: "hidden",
            boxShadow: "0 0.5rem 1rem rgba(0, 0, 0, 0.3)",
            bgcolor: "grey.200", // Fallback background color
            border: `3px solid ${isDark ? "#171c28" : "#ffffff"}`,
            padding: "3px", // Creates a nice padding effect within the border
          }}
        >
          <img
            crossOrigin="anonymous"
            ref={imgRef}
            src={getImageUrl(experience.company_logo)}
            alt={experience.company_name}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              borderRadius: "50%",
              backgroundSize: "cover",
              backgroundPosition: "center",
              transition: "transform 0.5s ease",
            }}
            onError={(e) => {
              console.warn(
                "Company image failed to load:",
                experience.company_name
              );
              e.target.onerror = null; // Prevent infinite error loop

              // Create a canvas element for a fallback with company initials
              const canvas = document.createElement("canvas");
              canvas.width = 200;
              canvas.height = 200;
              const ctx = canvas.getContext("2d");

              // Set background color
              ctx.fillStyle = muiTheme.palette.primary.main;
              ctx.fillRect(0, 0, canvas.width, canvas.height);

              // Add text
              const initials = experience.company_name
                .split(" ")
                .map((word) => word[0])
                .join("")
                .substring(0, 2)
                .toUpperCase();

              ctx.fillStyle = "#FFFFFF";
              ctx.font = "bold 100px Arial";
              ctx.textAlign = "center";
              ctx.textBaseline = "middle";
              ctx.fillText(initials, canvas.width / 2, canvas.height / 2);

              // Replace the image source with the canvas data
              e.target.src = canvas.toDataURL("image/png");
            }}
          />
        </Box>
      </Box>

      <Box
        sx={{
          padding: 1,
          mt: 0,
          flexGrow: 1,
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Typography
          sx={{
            textAlign: "center",
            color: isDark ? "white" : "black",
            fontSize: { xs: "22px", md: "25px" },
            fontWeight: 700,
            margin: 0,
            marginTop: "1.7rem",
            paddingTop: { xs: "0.5rem", md: "1.5rem" },
            lineHeight: "normal",
          }}
        >
          {experience.my_role}
        </Typography>

        <Typography
          sx={{
            textAlign: "center",
            color: isDark ? "white" : "black",
            fontSize: { xs: "18px", md: "20px" },
            margin: 0,
            paddingTop: "1rem",
            fontWeight: 600,
            mb: 2,
          }}
        >
          {formatDate(experience.joining_date)} -{" "}
          {experience.current_company
            ? "Present"
            : formatDate(experience.exit_date)}
        </Typography>

        <Box sx={{ px: 2, flexGrow: 1 }}>
          {descriptionPoints.map((point, index) => (
            <Box
              key={index}
              sx={{
                display: "flex",
                alignItems: "flex-start",
                mb: 1,
                gap: 1,
              }}
            >
              <Typography
                component="span"
                sx={{
                  color: isDark ? "white" : "text.primary",
                  fontSize: { xs: "16px", md: "inherit" },
                  minWidth: "20px",
                }}
              >
                •
              </Typography>
              <Typography
                sx={{
                  color: isDark ? "white" : "text.primary",
                  fontSize: { xs: "16px", md: "inherit" },
                  textAlign: "left",
                }}
              >
                {point.trim()}
              </Typography>
            </Box>
          ))}
        </Box>

        <Box
          sx={{
            mt: 3,
            mb: 2,
            display: "flex",
            flexWrap: "wrap",
            gap: 1.5,
            justifyContent: "center",
          }}
        >
          {experience.skills?.map((skill, index) => {
            const skillLogo = getSkillLogo(skill.skill);
            return skillLogo ? (
              <Box
                key={index}
                sx={{
                  width: 30,
                  height: 30,
                  position: "relative",
                  transition: "transform 0.2s ease-in-out",
                  "&:hover": {
                    transform: "scale(1.2)",
                  },
                  "&:hover .skill-tooltip": {
                    visibility: "visible",
                    opacity: 1,
                    transform: "translateX(-50%) translateY(0)",
                  },
                }}
              >
                <Box
                  component="img"
                  src={skillLogo}
                  alt={skill.skill}
                  sx={{
                    width: "100%",
                    height: "100%",
                    objectFit: "contain",
                    filter: isDark ? "brightness(0.9)" : "none",
                  }}
                  onError={(e) => {
                    console.warn(
                      `Skill image failed to load for ${skill.skill}`
                    );
                    e.target.onerror = null; // Prevent infinite loops

                    // Create canvas for skill initial
                    const canvas = document.createElement("canvas");
                    canvas.width = 100;
                    canvas.height = 100;
                    const ctx = canvas.getContext("2d");

                    // Set background
                    ctx.fillStyle = isDark ? "#333" : "#ddd";
                    ctx.fillRect(0, 0, canvas.width, canvas.height);

                    // Add text
                    const initial = skill.skill.charAt(0).toUpperCase();
                    ctx.fillStyle = isDark ? "#fff" : "#333";
                    ctx.font = "bold 50px Arial";
                    ctx.textAlign = "center";
                    ctx.textBaseline = "middle";
                    ctx.fillText(initial, canvas.width / 2, canvas.height / 2);

                    e.target.src = canvas.toDataURL("image/png");
                  }}
                />
                <Box
                  className="skill-tooltip"
                  sx={{
                    position: "absolute",
                    bottom: "auto",
                    top: -35,
                    left: "50%",
                    transform: "translateX(-50%) translateY(0)",
                    backgroundColor: isDark
                      ? "rgba(0, 0, 0, 0.85)"
                      : "rgba(255, 255, 255, 0.95)",
                    padding: "3px 8px",
                    borderRadius: "4px",
                    visibility: "hidden",
                    opacity: 0,
                    transition:
                      "all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)",
                    whiteSpace: "nowrap",
                    boxShadow: "0 3px 8px rgba(0,0,0,0.15)",
                    zIndex: 10000,
                    pointerEvents: "none",
                    border: `1px solid ${alpha(muiTheme.palette.primary.main, 0.2)}`,
                    "& span": {
                      fontSize: "0.75rem",
                      color: isDark ? "white" : "black",
                      fontWeight: 500,
                    },
                    "&::after": {
                      content: '""',
                      position: "absolute",
                      top: "100%",
                      left: "50%",
                      transform: "translateX(-50%)",
                      border: "4px solid transparent",
                      borderTopColor: isDark
                        ? "rgba(0, 0, 0, 0.85)"
                        : "rgba(255, 255, 255, 0.95)",
                    },
                  }}
                >
                  <span>{skill.skill}</span>
                </Box>
              </Box>
            ) : null;
          })}
        </Box>
      </Box>

      {/* Add subtle accent line at the bottom */}
      <Box
        sx={{
          position: "absolute",
          bottom: 0,
          left: "50%",
          transform: "translateX(-50%)",
          width: "60%",
          height: 2,
          background: `linear-gradient(to right, ${alpha(
            muiTheme.palette.primary.main,
            0
          )}, ${alpha(muiTheme.palette.primary.main, 0.6)}, ${alpha(
            muiTheme.palette.primary.main,
            0
          )})`,
          borderRadius: 1,
        }}
      />
    </Box>
  );
};

const Experience = ({ experiences, skills }) => {
  const theme = useTheme();
  const [isClient, setIsClient] = useState(false);
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  // Set isClient to true once component is mounted
  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <Box
      id="Work Experiences"
      component="div"
      sx={{
        width: "100%",
        py: 2,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Container
        id="experience"
        maxWidth="lg"
        sx={{ my: 3, px: { xs: 2, sm: 3 } }}
      >
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
              width: "100%",
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
              sx={{ textAlign: "center", px: 2, mb: 4 }}
              variant="h6"
              color="text.secondary"
            >
              My professional journey through my work experiences
            </Typography>

            <Grid
              container
              spacing={2}
              sx={{
                display: "grid",
                gridTemplateColumns: {
                  xs: "repeat(auto-fit, minmax(290px, 1fr))",
                  md: "repeat(2, 1fr)",
                },
                gap: "1.5rem",
                width: "100%",
              }}
            >
              {experiences?.map((experience, key) => (
                <Grid item key={key} sx={{ height: "100%" }}>
                  <ExperienceCard
                    experience={experience}
                    isDark={!isClient || theme.palette.mode === "dark"}
                    skills={skills}
                  />
                </Grid>
              ))}
            </Grid>
          </Box>
        </motion.div>
      </Container>
    </Box>
  );
};

export default Experience;
