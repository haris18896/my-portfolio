"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

// ** MUI
import {
  Box,
  Container,
  Typography,
  Grid,
  Paper,
  alpha,
  useMediaQuery,
} from "@mui/material";
import {
  Code as CodeIcon,
  Storage as StorageIcon,
  Devices as DevicesIcon,
  CloudQueue as CloudIcon,
  Payments as PaymentsIcon,
  ShoppingCart as ShoppingCartIcon,
  BarChart as BarChartIcon,
  GraphicEq as GraphicEqIcon,
} from "@mui/icons-material";

// ** Utils
import { useTheme } from "@/utils/themeToggler";

// Animation variants
const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.5,
    },
  },
};

// Skill category definition with icons
const skillCategories = [
  {
    name: "Frontend",
    icon: <DevicesIcon sx={{ fontSize: 36 }} />,
    color: "#2196f3",
  },
  {
    name: "Backend",
    icon: <CodeIcon sx={{ fontSize: 36 }} />,
    color: "#9c27b0",
  },
  {
    name: "Database",
    icon: <StorageIcon sx={{ fontSize: 36 }} />,
    color: "#4caf50",
  },
  {
    name: "Integration",
    icon: <PaymentsIcon sx={{ fontSize: 36 }} />,
    color: "#f44336",
  },
  {
    name: "Cloud & DevOps",
    icon: <CloudIcon sx={{ fontSize: 36 }} />,
    color: "#ff9800",
  },
];

// Expertise bullets component
const ExpertiseBullet = ({ text, icon }) => {
  const { mode } = useTheme();
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: -20 }}
      animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
      transition={{ duration: 0.5 }}
    >
      <Box
        sx={{
          mb: 2,
          gap: 2,
          display: "flex",
          alignItems: "flex-start",
          justifyContent: "center",
        }}
      >
        <Box
          sx={{
            color: mode === "dark" ? "primary.main" : "primary.dark",
            mt: 0.5,
          }}
        >
          {icon}
        </Box>
        <Typography
          variant="body1"
          sx={{
            color: mode === "dark" ? "grey.300" : "text.primary",
            fontSize: { xs: "1rem", md: "1.1rem" },
            lineHeight: 1.6,
            textAlign: "center",
          }}
        >
          {text}
        </Typography>
      </Box>
    </motion.div>
  );
};

// Skill Card Component
const SkillCard = ({ skill, category }) => {
  const { mode } = useTheme();
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const getLevelColor = (level) => {
    const levels = {
      Beginner: "#64b5f6",
      Novice: "#4db6ac",
      Intermediate: "#4caf50",
      Competent: "#8bc34a",
      Proficient: "#ffd54f",
      Advanced: "#ff9800",
      Expert: "#f44336",
      Master: "#9c27b0",
    };
    return levels[level] || "#64b5f6";
  };

  const getLevelPercentage = (level) => {
    const percentages = {
      Beginner: "20%",
      Novice: "30%",
      Intermediate: "37%",
      Competent: "55%",
      Proficient: "67%",
      Advanced: "73%",
      Expert: "86%",
      Master: "97%",
    };
    return percentages[level] || "20%";
  };

  const getCategoryColor = (categoryName) => {
    const category = skillCategories.find((cat) => cat.name === categoryName);
    return category ? category.color : "#2196f3";
  };

  return (
    <motion.div
      ref={ref}
      variants={itemVariants}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      whileHover={{ y: -5, transition: { duration: 0.2 } }}
    >
      <Paper
        elevation={2}
        sx={{
          py: 2,
          pl: 2,
          pr: 4,
          height: "100%",
          bgcolor:
            mode === "dark" ? "rgba(30,30,30,0.8)" : "rgba(255,255,255,0.8)",
          backdropFilter: "blur(8px)",
          borderRadius: 2,
          transition: "all 0.3s ease",
          "&:hover": {
            boxShadow: `0 8px 16px ${alpha(getCategoryColor(category), 0.3)}`,
            transform: "translateY(-4px)",
          },
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", mb: 1.5, gap: 1 }}>
          {skill.skill_logo && (
            <Box
              sx={{
                width: 36,
                height: 36,
                borderRadius: "8px",
                overflow: "hidden",
                flexShrink: 0,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: "background.paper",
              }}
            >
              <img
                src={skill.skill_logo}
                alt={skill.skill}
                style={{ width: "100%", height: "100%", objectFit: "contain" }}
                loading="lazy"
              />
            </Box>
          )}
          <Typography variant="h6" fontWeight="medium" noWrap>
            {skill.skill}
          </Typography>
        </Box>

        <Box sx={{ mb: 1.5 }}>
          <Typography
            variant="caption"
            color="text.secondary"
            sx={{ display: "block", mb: 0.5 }}
          >
            Proficiency
          </Typography>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <Box
              sx={{
                height: 8,
                width: "100%",
                bgcolor:
                  mode === "dark" ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.1)",
                borderRadius: 5,
                overflow: "hidden",
              }}
            >
              <Box
                sx={{
                  height: "100%",
                  width: getLevelPercentage(skill.level),
                  bgcolor: getLevelColor(skill.level),
                  borderRadius: 5,
                }}
              />
            </Box>
            <Typography
              variant="caption"
              color="text.secondary"
              sx={{ minWidth: 30 }}
            >
              {skill.level}
            </Typography>
          </Box>
        </Box>

        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Typography
            variant="caption"
            color="text.secondary"
            sx={{ fontStyle: "italic" }}
          >
            {skill.experience} {skill.experience === 1 ? "year" : "years"}
          </Typography>
          <Box
            sx={{
              px: 1,
              py: 0.5,
              bgcolor: alpha(getCategoryColor(category), 0.1),
              color: getCategoryColor(category),
              borderRadius: 1,
              fontSize: "0.7rem",
              fontWeight: "medium",
            }}
          >
            {category}
          </Box>
        </Box>
      </Paper>
    </motion.div>
  );
};

// Category Section Component
const CategorySection = ({ title, icon, skills, color }) => {
  const { mode } = useTheme();
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const isXs = useMediaQuery((theme) => theme.breakpoints.only("xs"));
  const isSm = useMediaQuery((theme) => theme.breakpoints.only("sm"));
  const isMd = useMediaQuery((theme) => theme.breakpoints.only("md"));

  const cardsToShow = isXs ? 1 : isSm ? 2 : isMd ? 3 : 4;
  const animationDuration = isXs ? 15 : isSm ? 25 : isMd ? 30 : 40;
  const cardWidth = `${90 / cardsToShow}%`;

  return (
    <Box sx={{ mb: 6 }}>
      <Box
        component={motion.div}
        ref={ref}
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ duration: 0.5 }}
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 2,
          mb: 3,
        }}
      >
        <Box
          sx={{
            width: 45,
            height: 45,
            borderRadius: "50%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: color,
            bgcolor: alpha(color, 0.1),
          }}
        >
          {icon}
        </Box>
        <Typography
          variant="h5"
          sx={{
            fontWeight: "bold",
            color: mode === "dark" ? "white" : "text.primary",
            position: "relative",
            "&::after": {
              content: '""',
              position: "absolute",
              bottom: -8,
              left: 0,
              width: 60,
              height: 4,
              bgcolor: color,
              borderRadius: 2,
            },
          }}
        >
          {title}
        </Typography>
      </Box>

      {/* Marquee Container */}
      <Box
        sx={{
          position: "relative",
          overflow: "hidden",
          width: "100%",
          pb: 2,
        }}
      >
        <Box
          sx={{
            display: "flex",
            gap: 3,
            animation:
              skills.length > cardsToShow
                ? `marquee ${animationDuration}s linear infinite`
                : "none",
            "@keyframes marquee": {
              "0%": { transform: "translateX(0)" },
              "100%": { transform: `translateX(-${skills.length * 100}%)` },
            },
            "& > div": {
              minWidth: cardWidth,
              flexShrink: 0,
            },
            justifyContent:
              skills.length <= cardsToShow ? "center" : "flex-start",
          }}
        >
          {skills.map((skill, index) => (
            <Box key={`first-${skill._id || index}`}>
              <SkillCard skill={skill} category={title} />
            </Box>
          ))}
        </Box>
      </Box>
    </Box>
  );
};

// Main Skills Component
const Skills = ({ skills }) => {
  const { mode } = useTheme();
  const isMobile = useMediaQuery((theme) => theme.breakpoints.down("sm"));
  const [organizedSkills, setOrganizedSkills] = useState({});
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  // Organize skills by category (this would need to be customized based on your actual skills)
  useEffect(() => {
    if (!skills) return;
    const categorizeSkill = (skill) => {
      const skillName = skill.skill.toLowerCase();

      // Frontend technologies
      if (
        skillName.includes("react") ||
        skillName.includes("next") ||
        skillName.includes("javascript") ||
        skillName.includes("typescript") ||
        skillName.includes("html") ||
        skillName.includes("css") ||
        skillName.includes("tailwind") ||
        skillName.includes("mui") ||
        skillName.includes("material") ||
        skillName.includes("redux") ||
        skillName.includes("bootstrap")
      ) {
        return "Frontend";
      }

      // Backend technologies
      if (
        skillName.includes("node") ||
        skillName.includes("express") ||
        skillName.includes("django") ||
        skillName.includes("python") ||
        skillName.includes("git") ||
        skillName.includes("github")
      ) {
        return "Backend";
      }

      // Database technologies
      if (
        skillName.includes("sql") ||
        skillName.includes("postgres") ||
        skillName.includes("mysql") ||
        skillName.includes("mongo") ||
        skillName.includes("firebase") ||
        skillName.includes("sanity")
      ) {
        return "Database";
      }

      // Cloud & DevOps
      if (
        skillName.includes("aws") ||
        skillName.includes("GCP") ||
        skillName.includes("cloud") ||
        skillName.includes("docker") ||
        skillName.includes("CI/CD") ||
        skillName.includes("linux")
      ) {
        return "Cloud & DevOps";
      }

      // Integration
      if (
        skillName.includes("stripe") ||
        skillName.includes("paypal") ||
        skillName.includes("firebase") ||
        skillName.includes("auth") ||
        skillName.includes("google") ||
        skillName.includes("map")
      ) {
        return "Integration";
      }

      // Default category for uncategorized skills
      return "Frontend";
    };

    const categorized = {};

    // Initialize categories
    skillCategories.forEach((category) => {
      categorized[category.name] = [];
    });

    // Sort skills into categories
    skills.forEach((skill) => {
      const category = categorizeSkill(skill);
      if (categorized[category]) {
        categorized[category].push(skill);
      } else {
        categorized["Frontend"].push(skill);
      }
    });

    setOrganizedSkills(categorized);
  }, [skills]);

  // The expertise statements
  const expertiseStatements = [
    {
      text: "Developing highly interactive and responsive front-end applications using React, Next.js, and React Native.",
      icon: <DevicesIcon sx={{ fontSize: 22 }} />,
    },
    {
      text: "Building robust and scalable backend systems with Django REST Framework and Node.js.",
      icon: <CodeIcon sx={{ fontSize: 22 }} />,
    },

    {
      text: "Implementing real-time communication using WebSockets, Django ASGI, and Socket.io.",
      icon: <CloudIcon sx={{ fontSize: 22 }} />,
    },
    {
      text: "Integrating third-party services such as Firebase, Stripe, PayPal, and Twilio for seamless functionality.",
      icon: <PaymentsIcon sx={{ fontSize: 22 }} />,
    },
    {
      text: "Containerizing applications with Docker and setting up CI/CD pipelines using GitHub Actions.",
      icon: <ShoppingCartIcon sx={{ fontSize: 22 }} />,
    },
    {
      text: "Enhancing data analytics with Pandas, NumPy, Seaborn, and Matplotlib.",
      icon: <BarChartIcon sx={{ fontSize: 22 }} />,
    },
    {
      text: "Developing audio processing and signal analysis solutions using Python and React Native.",
      icon: <GraphicEqIcon sx={{ fontSize: 22 }} />,
    },
    {
      text: "Designing and optimizing custom databases with PostgreSQL, MySQL, and MongoDB, including DB normalization and ER diagrams.",
      icon: <StorageIcon sx={{ fontSize: 22 }} />,
    },
  ];

  return (
    <Box
      component="section"
      id="skills"
      sx={{
        py: { xs: 8, md: 12 },
        position: "relative",
        overflow: "hidden",
        background:
          mode === "dark"
            ? "linear-gradient(to bottom, #0a0f1f, #102030)"
            : "linear-gradient(to bottom, #f8f9fa, #e9ecef)",
      }}
    >
      {/* Background decorative elements */}
      <Box
        sx={{
          position: "absolute",
          top: { xs: "-5rem", lg: "-10rem" },
          left: { xs: "-5rem", lg: "-10rem" },
          width: { xs: "15rem", lg: "25rem" },
          height: { xs: "15rem", lg: "25rem" },
          borderRadius: "50%",
          background: `radial-gradient(circle, ${alpha("#2196f3", 0.1)} 0%, transparent 70%)`,
          pointerEvents: "none",
        }}
      />

      <Box
        sx={{
          position: "absolute",
          bottom: { xs: "-8rem", lg: "-15rem" },
          right: { xs: "-8rem", lg: "-15rem" },
          width: { xs: "20rem", lg: "35rem" },
          height: { xs: "20rem", lg: "35rem" },
          borderRadius: "50%",
          background: `radial-gradient(circle, ${alpha("#9c27b0", 0.1)} 0%, transparent 70%)`,
          pointerEvents: "none",
        }}
      />

      <Container maxWidth="lg">
        <Box
          component={motion.div}
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6 }}
          sx={{ textAlign: "center", mb: 8 }}
        >
          <Typography
            variant="h6"
            component="p"
            color="primary"
            fontWeight="medium"
            sx={{ mb: 2 }}
          >
            WHAT I DO
          </Typography>

          <Typography
            variant="h2"
            component="h2"
            fontWeight="bold"
            sx={{
              mb: 3,
              color: mode === "dark" ? "white" : "text.primary",
              fontSize: { xs: "2rem", sm: "2.5rem", md: "3rem" },
            }}
          >
            I&apos;M A FULL STACK WEB & MOBILE <br />
            APP DEVELOPER WHO WANTS TO EXPLORE
          </Typography>

          <Box
            sx={{
              width: { xs: 60, md: 80 },
              height: 4,
              bgcolor: "primary.main",
              borderRadius: 2,
              mx: "auto",
              mb: 4,
            }}
          />

          {/* Expertise statements */}
          <Box
            sx={{
              mx: "auto",
              mt: 6,
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
            }}
          >
            {expertiseStatements.map((statement, index) => (
              <ExpertiseBullet
                key={index}
                text={statement.text}
                icon={statement.icon}
              />
            ))}
          </Box>
        </Box>

        {/* Skill categories */}
        {skillCategories.map((category, index) =>
          organizedSkills[category.name] &&
          organizedSkills[category.name].length > 0 ? (
            <CategorySection
              key={category.name}
              title={category.name}
              icon={category.icon}
              skills={organizedSkills[category.name]}
              color={category.color}
            />
          ) : null
        )}
      </Container>
    </Box>
  );
};

export default Skills;
