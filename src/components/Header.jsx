"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

// ** Utils
import { ThemeToggle, useTheme } from "../utils/themeToggler";

// ** Third Party Packages
import {
  Box,
  List,
  Stack,
  Slide,
  Drawer,
  AppBar,
  Avatar,
  Button,
  Divider,
  Toolbar,
  ListItem,
  Container,
  IconButton,
  Typography,
  ListItemText,
  ListItemIcon,
  useMediaQuery,
  useTheme as useMuiTheme,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import CodeIcon from "@mui/icons-material/Code";
import WorkIcon from "@mui/icons-material/Work";
import EmailIcon from "@mui/icons-material/Email";
import SchoolIcon from "@mui/icons-material/School";
import GitHubIcon from "@mui/icons-material/GitHub";

const navItems = [
  { name: "Skills", icon: <CodeIcon />, path: "#skills" },
  { name: "Work Experiences", icon: <WorkIcon />, path: "#experience" },
  { name: "Projects", icon: <CodeIcon />, path: "#projects" },
  { name: "GitHub", icon: <GitHubIcon />, path: "#github" },
  { name: "Contact Me", icon: <EmailIcon />, path: "#contact" },
];

const Header = () => {
  const { mode } = useTheme();
  const muiTheme = useMuiTheme();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const isMobile = useMediaQuery(muiTheme.breakpoints.down("md"));

  // Auto-close drawer when transitioning from mobile to desktop
  useEffect(() => {
    if (!isMobile && drawerOpen) {
      setDrawerOpen(false);
    }
  }, [isMobile, drawerOpen]);

  const toggleDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };

  const drawer = (
    <Slide direction="right" in={drawerOpen} mountOnEnter unmountOnExit>
      <Box
        sx={{
          width: 280,
          height: "100%",
          display: "flex",
          flexDirection: "column",
          bgcolor: muiTheme.palette.background.paper,
          boxShadow: 3,
          overflow: "auto",
          transition: "all 0.3s ease-in-out",
        }}
      >
        <Box sx={{ p: 2.5, pt: 4 }}>
          <Stack direction="row" spacing={2} alignItems="center" sx={{ mb: 3 }}>
            <Avatar
              src={process.env.NEXT_PUBLIC_AUTHOR_IMAGE}
              alt={process.env.NEXT_PUBLIC_AUTHOR_NAME}
              sx={{
                width: 70,
                height: 70,
                boxShadow: 2,
                transition: "transform 0.3s ease-in-out",
                "&:hover": {
                  transform: "scale(1.05)",
                },
              }}
            />
            <Box>
              <Typography
                variant="h6"
                sx={{
                  fontFamily: '"Pacifico", cursive',
                  fontWeight: 600,
                  letterSpacing: "0.5px",
                }}
              >
                {process.env.NEXT_PUBLIC_AUTHOR_NAME}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {process.env.NEXT_PUBLIC_RECIPIENT_EMAIL}
              </Typography>
              <Typography
                variant="caption"
                color="primary.main"
                sx={{
                  fontWeight: 600,
                  display: "block",
                  mt: 0.5,
                }}
              >
                Sr. Software Engineer
              </Typography>
            </Box>
          </Stack>
        </Box>

        <Divider sx={{ mb: 2 }} />

        <List sx={{ px: 1, mr: 2 }}>
          {navItems.map((item) => (
            <ListItem
              key={item.name}
              component={Link}
              href={item.path}
              onClick={toggleDrawer}
              disableRipple
              sx={{
                borderRadius: 2,
                mb: 0.5,
                "&:hover": {
                  bgcolor:
                    mode === "light"
                      ? "rgba(0, 0, 0, 0.04)"
                      : "rgba(255, 255, 255, 0.08)",
                  transform: "translateX(5px)",
                  transition: "transform 0.2s ease-in-out",
                },
                "&:active": {
                  bgcolor:
                    mode === "light"
                      ? "rgba(0, 0, 0, 0.08)"
                      : "rgba(255, 255, 255, 0.12)",
                },
                ".MuiTouchRipple-root": {
                  color:
                    mode === "light"
                      ? "rgba(0, 0, 0, 0.1)"
                      : "rgba(255, 255, 255, 0.1)",
                },
              }}
            >
              <ListItemIcon
                sx={{ minWidth: 40, color: muiTheme.palette.text.secondary }}
              >
                {item.icon}
              </ListItemIcon>
              <ListItemText
                primary={item.name}
                primaryTypographyProps={{
                  fontWeight: 500,
                  fontFamily: "var(--font-montserrat)",
                  color: "text.secondary",
                }}
              />
            </ListItem>
          ))}
        </List>

        <Box sx={{ flexGrow: 1 }} />
      </Box>
    </Slide>
  );

  return (
    <>
      <AppBar
        position="fixed"
        color="default"
        elevation={0}
        sx={{
          backgroundColor: muiTheme.palette.background.dark,
          backdropFilter: "blur(8px)",
          transition: "all 0.3s",
        }}
      >
        <Container maxWidth="xl">
          <Toolbar>
            {isMobile && (
              <IconButton
                color="inherit"
                aria-label="open drawer"
                edge="start"
                onClick={toggleDrawer}
                sx={{ mr: 2 }}
              >
                <MenuIcon />
              </IconButton>
            )}

            <Typography
              variant="h6"
              component={Link}
              href="#hero"
              sx={{
                flexGrow: isMobile ? 1 : 0,
                mr: isMobile ? 0 : 4,
                fontFamily: '"Pacifico", cursive',
                fontWeight: 600,
                color: "inherit",
                textDecoration: "none",
                letterSpacing: "0.5px",
                transition: "color 0.3s",
                "&:hover": {
                  color: muiTheme.palette.primary.main,
                },
              }}
            >
              {process.env.NEXT_PUBLIC_AUTHOR_NAME}
            </Typography>

            <Box
              sx={{ flexGrow: 1, display: "flex", justifyContent: "flex-end" }}
            >
              {!isMobile && (
                <Box
                  sx={{
                    flexGrow: 1,
                    display: "flex",
                    justifyContent: "flex-end",
                    marginRight: "15px",
                  }}
                >
                  {navItems.map((item) => (
                    <Button
                      key={item.name}
                      component={Link}
                      href={item.path}
                      sx={{
                        mx: 1,
                        color: "text.primary",
                        display: "flex",
                        alignItems: "center",
                        fontFamily: "var(--font-montserrat)",
                        fontWeight: 500,
                        letterSpacing: "0.3px",
                        position: "relative",
                        "&::after": {
                          content: '""',
                          position: "absolute",
                          width: "0%",
                          height: "2px",
                          bottom: 5,
                          left: "50%",
                          transform: "translateX(-50%)",
                          backgroundColor: muiTheme.palette.primary.main,
                          transition: "width 0.3s ease",
                        },
                        "&:hover::after": {
                          width: "70%",
                        },
                        "&:hover": {
                          backgroundColor: "transparent",
                        },
                      }}
                    >
                      {item.name}
                    </Button>
                  ))}
                </Box>
              )}
              <ThemeToggle />
            </Box>
          </Toolbar>
        </Container>
      </AppBar>

      {/* Add toolbar spacing */}

      <Toolbar />

      {/* Mobile Drawer */}
      <Drawer
        variant="temporary"
        open={drawerOpen}
        onClose={toggleDrawer}
        ModalProps={{
          keepMounted: true,
        }}
        sx={{
          display: "block",
          "& .MuiDrawer-paper": {
            boxSizing: "border-box",
            width: 280,
          },
        }}
      >
        {drawer}
      </Drawer>
    </>
  );
};

export default Header;
