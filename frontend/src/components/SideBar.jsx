/* eslint-disable react/prop-types */
import {
  Box,
  Divider,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
} from "@mui/material";
import SettingsIcon from "@mui/icons-material/Settings";
import Diversity3Icon from "@mui/icons-material/Diversity3";
import HailIcon from "@mui/icons-material/Hail";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import HomeIcon from "@mui/icons-material/Home";
import SportsCricketIcon from "@mui/icons-material/SportsCricket";
import { Link } from "react-router-dom";
import PendingActionsIcon from '@mui/icons-material/PendingActions';
const drawerWidth = 240;
const SideBar = ({ SidebarOpen }) => {
  return (
    <Drawer
      variant={SidebarOpen ? "temporary" : "permanent"}
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        boxShadow: 4,
        [`& .MuiDrawer-paper`]: { width: drawerWidth },
      }}
    >
      <Toolbar />
      <Box sx={{ overflow: "auto" }}>
        <List>
          <Link to={"/"}>
            <ListItem disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  <HomeIcon />
                </ListItemIcon>
                <ListItemText primary={"Home"} />
              </ListItemButton>
            </ListItem>
          </Link>
          <Link to={"/team"}>
            <ListItem disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  <Diversity3Icon />
                </ListItemIcon>
                <ListItemText primary={"Teams"} />
              </ListItemButton>
            </ListItem>
          </Link>
          <Link to={"/player"}>
            <ListItem disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  <HailIcon />
                </ListItemIcon>
                <ListItemText primary={"Players"} />
              </ListItemButton>
            </ListItem>
          </Link>
          <Link to="/match-schedule">
            <ListItem disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  <PendingActionsIcon />
                </ListItemIcon>
                <ListItemText primary={"Schedule"} />
              </ListItemButton>
            </ListItem>
          </Link>
          <Link to={"/match"}>
            <ListItem disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  <SportsCricketIcon />
                </ListItemIcon>
                <ListItemText primary={"Matches"} />
              </ListItemButton>
            </ListItem>
          </Link>
          <Link to="/records">
            <ListItem disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  <EmojiEventsIcon />
                </ListItemIcon>
                <ListItemText primary={"Records"} />
              </ListItemButton>
            </ListItem>
          </Link>
          
        </List>

        <Divider />
        <Link to="/setting">
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <SettingsIcon />
              </ListItemIcon>
              <ListItemText primary={"Setting"} />
            </ListItemButton>
          </ListItem>
        </Link>
      </Box>
    </Drawer>
  );
};
export default SideBar;
