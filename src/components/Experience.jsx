"use client";

import React, { useState, useRef, useEffect } from "react";
import ColorThief from "colorthief";

// ** Third Party Packages
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

// ** MUI
import { styled, useTheme } from "@mui/material/styles";
import { Box, Container, Typography, Grid } from "@mui/material";

// ** Utils
import { containerVariants } from "@/utils/utils";

const ExperienceCard = ({ experience, isDark, skills }) => {
  const [colorArrays, setColorArrays] = useState([]);
  const imgRef = useRef(null);

  const descriptionPoints = experience?.company_description
    ? experience.company_description.split("-").filter((point) => point.trim())
    : [];

  const getSkillLogo = (skillName) => {
    const skillData = skills?.find((s) => s.skill === skillName);
    return skillData?.skill_logo;
  };

  useEffect(() => {
    const loadImage = () => {
      try {
        if (imgRef.current && imgRef.current.complete) {
          const colorThief = new ColorThief();
          const color = colorThief.getColor(imgRef.current);
          setColorArrays(color);
        }
      } catch (error) {
        console.error("Error extracting color:", error);
      }
    };
    loadImage();
    const currentImg = imgRef.current;
    if (currentImg) {
      currentImg.addEventListener("load", loadImage);
    }

    return () => {
      if (currentImg) {
        currentImg.removeEventListener("load", loadImage);
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
        bgcolor: isDark ? "#171c28" : "rgb(255, 255, 255)",
        boxShadow: "rgba(0, 0, 0, 0.2) 0px 10px 30px -15px",
        borderRadius: "10px",
        border: "1px solid rgba(211, 211, 211, 0.397)",
        transition: "box-shadow 0.3s ease-in-out",
        "&:hover": {
          boxShadow: isDark
            ? "rgba(211, 211, 211, 0.2) 0px 20px 30px -10px"
            : "rgba(0, 0, 0, 0.2) 0px 20px 30px -10px",
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
        }}
      >
        <Box
          sx={{
            position: "absolute",

            height: "11rem",
            top: 0,
            left: 0,
            width: "100%",
            borderRadius: "10px 10px 0 0",
          }}
        />

        <Box
          sx={{
            position: "absolute",
            background: "transparent",
            height: "9rem",
            top: 0,
            left: 0,
            width: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
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
            }}
          >
            {experience.company_name}
          </Typography>
        </Box>

        <Box
          sx={{
            position: "absolute",
            width: { xs: "6.5rem", md: "8rem" },
            height: { xs: "6.5rem", md: "8rem" },
            top: "7rem",
            left: 0,
            right: 0,
            marginLeft: "auto",
            marginRight: "auto",
            borderRadius: "50%",
            overflow: "hidden",
            boxShadow: "0 0.5rem 1rem rgba(0, 0, 0, 0.3)",
          }}
        >
          <img
            crossOrigin="anonymous"
            ref={imgRef}
            src={experience.company_logo}
            alt={experience.company_name}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
            }}
          />
        </Box>
      </Box>

      <Box sx={{ padding: 2, mt: 2 }}>
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

        <Box sx={{ px: 2 }}>
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
                  width: 25,
                  height: 25,
                  position: "relative",
                  transition: "transform 0.2s ease-in-out",
                  "&:hover": {
                    transform: "scale(1.1)",
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
                />
                <Box
                  sx={{
                    position: "absolute",
                    bottom: -25,
                    left: "50%",
                    transform: "translateX(-50%)",
                    backgroundColor: isDark
                      ? "rgba(0, 0, 0, 0.8)"
                      : "rgba(255, 255, 255, 0.9)",
                    padding: "2px 6px",
                    borderRadius: "4px",
                    visibility: "hidden",
                    opacity: 0,
                    transition: "all 0.2s ease-in-out",
                    whiteSpace: "nowrap",
                    boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
                    zIndex: 1,
                    "& span": {
                      fontSize: "0.75rem",
                      color: isDark ? "white" : "black",
                    },
                  }}
                >
                  <span>{skill.skill}</span>
                </Box>
                <style jsx global>{`
                  ${Box}:hover > Box:last-child {
                    visibility: visible;
                    opacity: 1;
                  }
                `}</style>
              </Box>
            ) : null;
          })}
        </Box>
      </Box>
    </Box>
  );
};

const Experience = ({ experiences, skills }) => {
  const theme = useTheme();
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <Box
      id="Work Experiences"
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
                gridTemplateColumns: "repeat(auto-fit, minmax(290px, 1fr))",
                gap: "1rem",
              }}
            >
              {experiences?.map((experience, key) => (
                <Grid item key={key}>
                  <ExperienceCard
                    experience={experience}
                    isDark={theme.palette.mode === "dark"}
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
