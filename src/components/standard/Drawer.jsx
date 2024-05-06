import React, { useEffect, useState } from "react";
import Drawer from "@mui/material/Drawer";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ViewHeadlineIcon from "@mui/icons-material/ViewHeadline";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import { Link, useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { pagesInfo } from "../../constants/extra";
import { Slide } from "@mui/material";

function Drawer_pfc(props) {
  const [open, setOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState("Dashboard");
  const navigate = useNavigate();
  const params = useLocation();
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    if (params && params.pathname) {
      const path = params.pathname.split("/")[1];
      console.log(path);
      let currentPage = pagesInfo.find((item) => item.link == path);
      if (currentPage !== undefined) setSelectedOption(currentPage?.text);
    }
  }, []);

  const handleToggle = () => {
    setOpen(!open);
    setSelectedOption("Dashboard");
  };

  const handleOptionClick = (text) => {
    setSelectedOption(text);
    navigate("/");
  };
  useEffect(() => {
    const container = document.querySelector(".drawer-container");

    const handleMouseEnter = () => {
      setOpen(true);
    };

    const handleMouseLeave = () => {
      setOpen(false);
    };

    container.addEventListener("mouseenter", handleMouseEnter);
    container.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      container.removeEventListener("mouseenter", handleMouseEnter);
      container.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  return (
    <Box className={`drawer-container `}>
      <Drawer
        className={open ? "drawer-open" : "normal-width"}
        variant="permanent"
        open={open}
        TransitionComponent={Slide}
        transitionDuration={500}
      >
        <Link to={"/"} className="link-custom-style">
          <ListItem
            selected={selectedOption == "Dashboard" ? true : false}
            className="custom-default"
            onClick={() => handleOptionClick("Dashboard")}
          >
            <ListItemIcon
              sx={{ minWidth: 0, ml: 2, mr: 2, justifyContent: "center" }}
              onClick={handleToggle}
            >
              {open ? <CloseOutlinedIcon /> : <ViewHeadlineIcon />}
            </ListItemIcon>
            <ListItemText
              primary={"Dashboard"}
              sx={{
                opacity: open ? 1 : 0,
                display: open ? "flex" : "none",
                color: "black",
              }}
            />
          </ListItem>
        </Link>
        <Divider />
        <List>
          {pagesInfo.map((item, index) => (
            <Link to={item.link} key={item.text} className="link-custom-style">
              <ListItem
                className="list-container"
                disablePadding
                selected={selectedOption === item.text}
                onClick={() => handleOptionClick(item.text)}
                sx={{ display: "block" }}
              >
                <ListItemButton
                  sx={{
                    minHeight: 48,
                    minWidth: 0,
                    justifyContent: open ? "initial" : "center",
                    px: 2.5,
                  }}
                >
                  <ListItemIcon
                    sx={{
                      minWidth: 0,
                      mr: open ? 3 : "auto",
                      justifyContent: "center",
                    }}
                  >
                    <item.icon />
                  </ListItemIcon>
                  <ListItemText
                    primary={item.text}
                    sx={{
                      opacity: open ? 1 : 0,
                      display: open ? "block" : "none",
                    }}
                  />
                </ListItemButton>
                <Divider />
              </ListItem>
            </Link>
          ))}
        </List>
      </Drawer>
    </Box>
  );
}

export default Drawer_pfc;
