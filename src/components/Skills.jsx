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
    name: "Cloud & DevOps",
    icon: <CloudIcon sx={{ fontSize: 36 }} />,
    color: "#ff9800",
  },
  {
    name: "Integration",
    icon: <PaymentsIcon sx={{ fontSize: 36 }} />,
    color: "#f44336",
  },
  {
    name: "Data Analysis",
    icon: <BarChartIcon sx={{ fontSize: 36 }} />,
    color: "#3f51b5",
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
  const [isHovered, setIsHovered] = useState(false);
  const isMobile = useMediaQuery((theme) => theme.breakpoints.down("sm"));

  const getCategoryColor = (categoryName) => {
    const category = skillCategories.find((cat) => cat.name === categoryName);
    return category ? category.color : "#2196f3";
  };

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
      Intermediate: "45%",
      Competent: "60%",
      Proficient: "75%",
      Advanced: "85%",
      Expert: "92%",
      Master: "98%",
    };
    return percentages[level] || "20%";
  };

  // Compact mobile design
  if (isMobile) {
    return (
      <Box
        sx={{
          position: "relative",
          borderRadius: 1.5,
          bgcolor: mode === "dark" ? alpha("#1a1a1a", 0.7) : alpha("#fff", 0.8),
          backdropFilter: "blur(8px)",
          overflow: "hidden",
          display: "flex",
          alignItems: "center",
          border: `1px solid ${alpha(getCategoryColor(category), 0.15)}`,
          boxShadow: `0 2px 4px ${alpha("#000", 0.1)}`,
          transition: "all 0.2s ease",
          "&:hover": {
            boxShadow: `0 4px 8px ${alpha("#000", 0.15)}`,
          },
          "&::before": {
            content: '""',
            position: "absolute",
            left: 0,
            top: 0,
            bottom: 0,
            width: "3px",
            background: getLevelColor(skill.level),
          },
        }}
        onTouchStart={() => setIsHovered(true)}
        onTouchEnd={() => setIsHovered(false)}
      >
        {/* Logo */}
        {skill.skill_logo && (
          <Box
            sx={{
              ml: 1,
              width: 28,
              height: 28,
              borderRadius: "8px",
              overflow: "hidden",
              flexShrink: 0,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              backgroundColor:
                mode === "dark" ? alpha("#fff", 0.05) : alpha("#000", 0.03),
            }}
          >
            <img
              src={skill.skill_logo}
              alt={skill.skill}
              style={{ width: "80%", height: "80%", objectFit: "contain" }}
              loading="lazy"
            />
          </Box>
        )}

        {/* Skill name */}
        <Typography
          variant="body2"
          fontWeight="medium"
          noWrap
          sx={{
            ml: 1,
            flex: 1,
          }}
        >
          {skill.skill}
        </Typography>

        {/* Experience */}
        <Typography
          variant="caption"
          sx={{
            color: mode === "dark" ? "grey.400" : "text.secondary",
            mx: 1,
            fontSize: "0.65rem",
          }}
        >
          {skill.experience}y
        </Typography>

        {/* Level text */}
        <Typography
          variant="caption"
          sx={{
            color: getLevelColor(skill.level),
            fontWeight: 600,
            mr: 1,
            fontSize: "0.65rem",
          }}
        >
          {skill.level}
        </Typography>

        {/* Level indicator */}
        <Box
          sx={{
            width: 5,
            height: 36,
            backgroundColor: alpha(getLevelColor(skill.level), 0.2),
            position: "relative",
            mr: 0.5,
          }}
        >
          <Box
            sx={{
              position: "absolute",
              bottom: 0,
              left: 0,
              width: "100%",
              height: getLevelPercentage(skill.level),
              backgroundColor: getLevelColor(skill.level),
            }}
          />
        </Box>
      </Box>
    );
  }

  // New compact desktop design (horizontal layout similar to mobile but with more info)
  return (
    <Box
      sx={{
        position: "relative",
        borderRadius: 2,
        bgcolor: mode === "dark" ? alpha("#1a1a1a", 0.7) : alpha("#fff", 0.8),
        backdropFilter: "blur(8px)",
        overflow: "hidden",
        display: "flex",
        alignItems: "center",
        border: `1px solid ${alpha(getCategoryColor(category), 0.15)}`,
        boxShadow: isHovered
          ? `0 8px 16px ${alpha(getCategoryColor(category), 0.2)}`
          : `0 2px 4px ${alpha("#000", 0.1)}`,
        transition: "all 0.3s ease",
        transform: isHovered ? "translateY(-3px)" : "none",
        height: "100%",
        "&:hover": {
          borderColor: alpha(getCategoryColor(category), 0.3),
        },
        "&::before": {
          content: '""',
          position: "absolute",
          left: 0,
          top: 0,
          bottom: 0,
          width: "4px",
          background: getLevelColor(skill.level),
        },
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Logo */}
      {skill.skill_logo && (
        <Box
          sx={{
            ml: 2,
            width: 42,
            height: 42,
            borderRadius: "8px",
            overflow: "hidden",
            flexShrink: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor:
              mode === "dark" ? alpha("#fff", 0.05) : alpha("#000", 0.03),
            border: `1px solid ${alpha(getCategoryColor(category), 0.1)}`,
          }}
        >
          <img
            src={skill.skill_logo}
            alt={skill.skill}
            style={{ width: "80%", height: "80%", objectFit: "contain" }}
            loading="lazy"
          />
        </Box>
      )}

      {/* Skill name and level */}
      <Box sx={{ ml: 2, flex: 1 }}>
        <Typography
          variant="h6"
          fontWeight="medium"
          sx={{
            fontSize: { sm: "0.95rem", md: "1rem" },
            color: mode === "dark" ? "white" : "text.primary",
          }}
        >
          {skill.skill}
        </Typography>

        <Box sx={{ display: "flex", alignItems: "center", mt: 0.5 }}>
          <Typography
            variant="caption"
            sx={{
              color: mode === "dark" ? "grey.400" : "text.secondary",
              mr: 1,
            }}
          >
            {skill.experience} {skill.experience === 1 ? "year" : "years"}
          </Typography>
          <Typography
            variant="caption"
            sx={{
              color: getLevelColor(skill.level),
              fontWeight: 600,
              display: "flex",
              alignItems: "center",
            }}
          >
            • {skill.level}
          </Typography>
        </Box>
      </Box>

      {/* Progress bar */}
      <Box sx={{ width: "30%", px: 2, mr: 2 }}>
        <Box
          sx={{
            height: 6,
            width: "100%",
            bgcolor: mode === "dark" ? alpha("#fff", 0.1) : alpha("#000", 0.05),
            borderRadius: 3,
            overflow: "hidden",
          }}
        >
          <Box
            sx={{
              height: "100%",
              width: getLevelPercentage(skill.level),
              bgcolor: getLevelColor(skill.level),
              borderRadius: 3,
              transition: "width 0.5s ease-in-out",
            }}
          />
        </Box>
      </Box>
    </Box>
  );
};

// Category Section Component
const CategorySection = ({ title, icon, skills, color }) => {
  const { mode } = useTheme();
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });
  const isMobile = useMediaQuery((theme) => theme.breakpoints.down("sm"));

  return (
    <Box sx={{ mb: 5 }}>
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

      {/* Grid layout for skills */}
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: {
            xs: "repeat(1, 1fr)",
            sm: "repeat(1, 1fr)",
            md: "repeat(2, 1fr)",
            lg: "repeat(3, 1fr)",
          },
          gap: 2,
        }}
      >
        {skills.map((skill, index) => (
          <motion.div
            key={skill._id || index}
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: {
                opacity: 1,
                y: 0,
                transition: {
                  duration: 0.5,
                  delay: index * 0.1,
                },
              },
            }}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
          >
            <SkillCard skill={skill} category={title} />
          </motion.div>
        ))}
      </Box>
    </Box>
  );
};

// Main Skills Component
const Skills = ({ skills }) => {
  const { mode } = useTheme();
  const isMobile = useMediaQuery((theme) => theme.breakpoints.down("sm"));
  const [organizedSkills, setOrganizedSkills] = useState({});
  const [isClient, setIsClient] = useState(false);
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  // Set isClient to true once component is mounted
  useEffect(() => {
    setIsClient(true);
  }, []);

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
        skillName.includes("electron js") ||
        skillName.includes("html") ||
        skillName.includes("css") ||
        skillName.includes("tailwind") ||
        skillName.includes("mui") ||
        skillName.includes("material") ||
        skillName.includes("redux") ||
        skillName.includes("bootstrap") ||
        skillName.includes("sass") ||
        skillName.includes("google map") ||
        skillName.includes("sanity")
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
        skillName.includes("github") ||
        skillName.includes("socket") ||
        skillName.includes("redis") ||
        skillName.includes("rabbitmq") ||
        skillName.includes("mongoose") ||
        skillName.includes("prisma") ||
        skillName.includes("nest") ||
        skillName.includes("bun") ||
        skillName.includes("hono") ||
        skillName.includes("graphql")
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
        skillName.includes("sanity") ||
        skillName.includes("neon")
      ) {
        return "Database";
      }

      // Cloud & DevOps
      if (
        skillName.includes("aws") ||
        skillName.includes("gcp") ||
        skillName.includes("cloud") ||
        skillName.includes("docker") ||
        skillName.includes("vercel") ||
        skillName.includes("ci/cd") ||
        skillName.includes("linux") ||
        skillName.includes("prometheus") ||
        skillName.includes("grafana") ||
        skillName.includes("git") ||
        skillName.includes("app store") ||
        skillName.includes("play store")
      ) {
        return "Cloud & DevOps";
      }

      // Integration & Data Analysis
      if (
        skillName.includes("stripe") ||
        skillName.includes("paypal") ||
        skillName.includes("firebase") ||
        skillName.includes("auth") ||
        skillName.includes("google") ||
        skillName.includes("zoom sdk") ||
        skillName.includes("map")
      ) {
        return "Integration";
      }

      // Data Analysis
      if (
        skillName.includes("pandas") ||
        skillName.includes("seaborn") ||
        skillName.includes("matplotllib") ||
        skillName.includes("numpy") ||
        skillName.includes("scipy") ||
        skillName.includes("data analytics") ||
        skillName.includes("data analysis")
      ) {
        return "Data Analysis";
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
      text: "Building robust and scalable backend systems with Node.js, Express, Django, and GraphQL.",
      icon: <CodeIcon sx={{ fontSize: 22 }} />,
    },
    {
      text: "Implementing real-time communication using WebSockets, Socket.io, and integration with Redis/RabbitMQ.",
      icon: <CloudIcon sx={{ fontSize: 22 }} />,
    },
    {
      text: "Integrating third-party services such as Firebase, Stripe, PayPal, and Google Maps for enhanced functionality.",
      icon: <PaymentsIcon sx={{ fontSize: 22 }} />,
    },
    {
      text: "DevOps expertise with Docker, Prometheus, Grafana, and CI/CD pipelines using GitHub Actions.",
      icon: <CloudIcon sx={{ fontSize: 22 }} />,
    },
    {
      text: "Data analysis and visualization with Pandas, NumPy, Seaborn, and Matplotlib.",
      icon: <BarChartIcon sx={{ fontSize: 22 }} />,
    },
    {
      text: "Advanced database design and optimization with MongoDB, PostgreSQL, MySQL, and modern solutions like Neon.",
      icon: <StorageIcon sx={{ fontSize: 22 }} />,
    },
    {
      text: "Mobile app development and deployment to Apple App Store and Google Play Store.",
      icon: <DevicesIcon sx={{ fontSize: 22 }} />,
    },
  ];

  return (
    <Box
      id="skills"
      ref={ref}
      sx={{
        background:
          !isClient || mode === "dark"
            ? "linear-gradient(to bottom, #0a0f1f, #102030)"
            : "linear-gradient(to bottom, #f8f9fa, #e9ecef)",
        color: mode === "dark" ? "#fff" : "#121212",
        padding: { xs: "60px 16px", md: "80px 24px" },
        position: "relative",
        overflow: "hidden",
        transition: "all 0.3s ease-in-out",
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
        {/* Header Section */}
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

        {/* Skills Categories Section */}
        <Box
          component={motion.div}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          sx={{
            px: { xs: 1, sm: 2 },
            py: 4,
            borderRadius: 4,
            backdropFilter: "blur(8px)",
            backgroundColor: alpha(mode === "dark" ? "#0a0f1f" : "#fff", 0.05),
            boxShadow: `0 10px 40px ${alpha(mode === "dark" ? "#000" : "#000", 0.1)}`,
            border: `1px solid ${alpha(mode === "dark" ? "#fff" : "#000", 0.05)}`,
          }}
        >
          <Typography
            variant="h4"
            component="h3"
            fontWeight="bold"
            textAlign="center"
            sx={{
              mb: 5,
              background: `linear-gradient(45deg, ${skillCategories[0].color}, ${skillCategories[1].color})`,
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              position: "relative",
              "&::after": {
                content: '""',
                position: "absolute",
                bottom: -10,
                left: "50%",
                transform: "translateX(-50%)",
                width: "60px",
                height: "4px",
                borderRadius: "2px",
                background: `linear-gradient(45deg, ${skillCategories[0].color}, ${skillCategories[1].color})`,
              },
            }}
          >
            Technical Skills
          </Typography>

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
        </Box>
      </Container>
    </Box>
  );
};

export default Skills;
