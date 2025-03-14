"use client";

import React, { useEffect, useState } from "react";

// ** Third Party Packages
import { motion } from "framer-motion";
import { Octokit } from "@octokit/rest";
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

function GitHub() {
  // ** Theme
  const { mode } = useTheme();

  const [pinnedRepos, setPinnedRepos] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  useEffect(() => {
    const fetchPinnedRepos = async () => {
      try {
        setIsLoading(true);

        // Use GitHub's GraphQL API to fetch pinned repositories
        const graphqlWithAuth = graphql.defaults({
          headers: {
            authorization: `bearer ${process.env.NEXT_PUBLIC_GITHUB_TOKEN || ""}`,
          },
        });

        const query = `
          {
            user(login: "haris18896") {
              pinnedItems(first: 6, types: REPOSITORY) {
                nodes {
                  ... on Repository {
                    name
                    description
                    url
                    primaryLanguage {
                      name
                      color
                    }
                    stargazerCount
                    forkCount
                  }
                }
              }
            }
          }
        `;

        const { user } = await graphqlWithAuth(query);

        // Transform the data to match the format expected by the component
        const transformedData = user.pinnedItems.nodes.map((repo) => ({
          name: repo.name,
          description: repo.description,
          html_url: repo.url,
          language: repo.primaryLanguage ? repo.primaryLanguage.name : null,
          languageColor: repo.primaryLanguage
            ? repo.primaryLanguage.color
            : null,
          stargazers_count: repo.stargazerCount,
          forks_count: repo.forkCount,
        }));

        setPinnedRepos(transformedData);
      } catch (error) {
        console.error("Error fetching pinned repositories:", error);

        // Fallback to REST API if GraphQL fails (usually due to missing token)
        const octokit = new Octokit();
        const { data } = await octokit.repos.listForUser({
          username: "haris18896",
          sort: "updated",
          per_page: 6,
        });
        setPinnedRepos(data);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPinnedRepos();
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
    },
  };

  return (
    <Container
      id="github"
      maxWidth="lg"
      sx={{ mt: 4, px: { xs: 2, sm: 3, md: 4 } }}
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
          }}
        >
          <Typography variant="h4" color="text.primary">
            GitHub
          </Typography>
          <Typography sx={{ mt: 1 }} variant="h6" color="text.secondary">
            My open source contributions and projects
          </Typography>
        </Box>

        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            my: 4,
            width: "100%",
            overflow: "hidden",
          }}
        >
          <GitHubCalendar
            username="haris18896"
            colorScheme={mode === "light" ? "light" : "dark"}
            fontSize={12}
            blockSize={12}
          />
        </Box>

        <Grid
          container
          spacing={2}
          sx={{
            mt: 4,
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
                      backgroundColor: "background.paper",
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
                                bgcolor: "primary.main",
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
                          sx={{ display: "flex", alignItems: "center", mb: 1 }}
                        >
                          <StarIcon
                            sx={{
                              fontSize: 14,
                              mr: 0.5,
                              color: "primary.main",
                            }}
                          />
                          <Typography variant="caption" color="text.secondary">
                            {repo.stargazers_count}
                          </Typography>
                        </Box>
                        <Box
                          sx={{ display: "flex", alignItems: "center", mb: 1 }}
                        >
                          <ForkRightIcon
                            sx={{
                              fontSize: 14,
                              mr: 0.5,
                              color: "text.secondary",
                            }}
                          />
                          <Typography variant="caption" color="text.secondary">
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
  );
}

export default GitHub;
