"use client";

import React from "react";

// ** Third Party Packages
import { motion } from "framer-motion";
import GitHubCalendar from "react-github-calendar";
import { useInView } from "react-intersection-observer";

// ** MUI
import {
  Box,
  Container,
  Typography,
  Card,
  CardContent,
  Link,
  Stack,
  Grid,
} from "@mui/material";
import StarIcon from "@mui/icons-material/Star";
import ForkRightIcon from "@mui/icons-material/ForkRight";

// ** Utils
import { useTheme } from "../utils/themeToggler";
import { containerVariants, itemVariants } from "@/utils/utils";

function GitHub({ pinnedRepos }) {
  // ** Theme
  const { mode } = useTheme();
  const [isClient, setIsClient] = React.useState(false);

  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  // Set isClient to true once component is mounted
  React.useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <Box
      component="div"
      sx={{
        width: "100vw",
        pb: 2,
        px: { xs: 1, sm: 4 },

        display: "flex",
      }}
    >
      <Container id="github" maxWidth="lg" sx={{ mb: 3, px: { xs: 0, sm: 2 } }}>
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
            }}
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
                GitHub
              </Typography>
            </Box>
            <Typography
              sx={{ textAlign: "center", px: 2 }}
              variant="h6"
              color="text.secondary"
            >
              My open source contributions and projects
            </Typography>
          </Box>

          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              my: 2,
              width: "100%",
              overflow: "hidden",
              px: { xs: 2, md: 0 },
            }}
          >
            <GitHubCalendar
              username="haris18896"
              colorScheme={!isClient || mode === "dark" ? "dark" : "light"}
              fontSize={12}
              blockSize={12}
            />
          </Box>

          <Grid
            container
            spacing={2}
            sx={{
              mt: 2,
              paddingRight: 2,
              width: "100%",
              mx: "auto",
            }}
          >
            {pinnedRepos.map((repo) => (
              <Grid item xs={12} md={6} lg={4} key={repo.name}>
                <motion.div variants={itemVariants} whileHover={{ y: -5 }}>
                  <Link
                    href={repo.html_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    underline="none"
                    sx={{ display: "block", width: "100%" }}
                  >
                    <Card
                      sx={{
                        height: "100%",
                        borderRadius: 4,
                        backgroundColor: "background.default",
                        transition: "all 0.3s ease",
                        "&:hover": {
                          boxShadow: 6,
                        },
                      }}
                    >
                      <CardContent>
                        <Typography
                          variant="h6"
                          color="text.primary"
                          gutterBottom
                          noWrap
                        >
                          {repo.name}
                        </Typography>
                        <Typography
                          variant="body2"
                          color="text.secondary"
                          sx={{
                            mb: 2,
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            display: "-webkit-box",
                            WebkitLineClamp: 2,
                            WebkitBoxOrient: "vertical",
                            height: "40px",
                          }}
                        >
                          {repo.description || "No description available"}
                        </Typography>
                        <Stack
                          direction="row"
                          spacing={2}
                          alignItems="center"
                          sx={{ flexWrap: "wrap" }}
                        >
                          {repo.language && (
                            <Box
                              sx={{
                                display: "flex",
                                alignItems: "center",
                                mb: 1,
                              }}
                            >
                              <Box
                                sx={{
                                  width: 10,
                                  height: 10,
                                  borderRadius: "50%",
                                  bgcolor: repo.languageColor || "primary.main",
                                  mr: 0.5,
                                }}
                              />
                              <Typography
                                variant="caption"
                                color="text.secondary"
                              >
                                {repo.language}
                              </Typography>
                            </Box>
                          )}
                          <Box
                            sx={{
                              display: "flex",
                              alignItems: "center",
                              mb: 1,
                            }}
                          >
                            <StarIcon
                              sx={{
                                fontSize: 14,
                                mr: 0.5,
                                color: "primary.main",
                              }}
                            />
                            <Typography
                              variant="caption"
                              color="text.secondary"
                            >
                              {repo.stargazers_count}
                            </Typography>
                          </Box>
                          <Box
                            sx={{
                              display: "flex",
                              alignItems: "center",
                              mb: 1,
                            }}
                          >
                            <ForkRightIcon
                              sx={{
                                fontSize: 14,
                                mr: 0.5,
                                color: "text.secondary",
                              }}
                            />
                            <Typography
                              variant="caption"
                              color="text.secondary"
                            >
                              {repo.forks_count}
                            </Typography>
                          </Box>
                        </Stack>
                      </CardContent>
                    </Card>
                  </Link>
                </motion.div>
              </Grid>
            ))}
          </Grid>
        </motion.div>
      </Container>
    </Box>
  );
}

export default GitHub;
