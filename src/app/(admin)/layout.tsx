"use client";

import * as React from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MuiAppBar, { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import Container from "@mui/material/Container";
import { ChevronRight } from "@mui/icons-material";
// import moment from "moment";
import logo from "./../../../public/light_logo.png";
import Image from "next/image";
import { Sidebar } from "@/sections/Sidebar";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import ThemeSwitcher from "@/components/UI/ThemeSwitcher";
import Notification from "@/components/UI/Notification";
import Link from "next/link";
import { useTheme } from "next-themes";
import icon from "./../favicon.ico";

const drawerWidth: number = 240;

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})<AppBarProps>(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  boxShadow: "none",
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [open, setOpen] = React.useState(true);
  const [toggle, setToggle] = React.useState("");
  const { theme, setTheme } = useTheme();
  const toggleDrawer = () => {
    setOpen(!open);
  };

  return (
    <Box sx={{ display: "flex" }}>
      <AppBar
        className="!bg-light_bg dark:!bg-dark_bg"
        position="absolute"
        open={open}
      >
        <Toolbar
          style={{ padding: "0px 10px " }}
          sx={{
            pr: "8px", // keep right padding when drawer closed
          }}
        >
          <Link href="/">
            <Typography
              sx={{
                marginRight: "10px",
                ...(open && { display: "none" }),
              }}
            >
              {theme === "light" ? (
                <Image className="h-[50px] w-[50px]" alt="hero" src={icon} />
              ) : (
                <Image className="h-[50px] w-[50px]" alt="hero" src={icon} />
              )}
            </Typography>
          </Link>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="open drawer"
            onClick={toggleDrawer}
            sx={{
              marginLeft: "10px",
              ...(open && { display: "none" }),
            }}
          >
            <ChevronRight className="dark:text-dark_primary text-light_text hover:dark:text-dark_text hover:text-light_primary duration-300 border border-light_text hover:border-light_primary dark:hover:border-dark_text dark:border-dark_primary  rounded-full" />
          </IconButton>
          <Typography
            component="h1"
            variant="h6"
            color="inherit"
            noWrap
            sx={{ flexGrow: 1 }}
          >
            {/* You can write here */}
          </Typography>
          <Box display="flex">
            <IconButton>
              <ThemeSwitcher layout="admin" />
            </IconButton>
            <IconButton
              onClick={() => {
                setToggle("notification");
              }}
            >
              <NotificationsOutlinedIcon className="dark:text-dark_primary text-light_text hover:dark:text-dark_text hover:text-light_primary duration-300" />
            </IconButton>
            <IconButton
              onClick={() => {
                setToggle("userProfile");
              }}
            >
              <PersonOutlinedIcon className="dark:text-dark_primary text-light_text hover:dark:text-dark_text hover:text-light_primary duration-300" />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
      <Sidebar open={open} setOpen={setOpen} />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          height: "100vh",
          overflow: "auto",
        }}
      >
        <Toolbar />
        <Container
          style={{ padding: "15px" }}
          className="bg-light_secondary dark:bg-dark_secondary"
          maxWidth="xl"
        >
          <div
            style={{ height: `calc(100vh - 94px)` }}
            className="bg-light_bg dark:bg-dark_bg rounded-lg p-4 overflow-y-auto"
          >
            {children}
          </div>
        </Container>
        {toggle === "notification" && <Notification />}
      </Box>
    </Box>
  );
}
