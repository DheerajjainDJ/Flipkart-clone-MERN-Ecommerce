import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Menu, MenuItem, Typography } from "@mui/material";
import { PowerSettingsNew } from "@mui/icons-material";
import { loggingOutUser } from "../../service/api";

const Profile = ({ user, setUser }) => {
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();

  const handleClick = (event) => {
    setOpen(event.currentTarget);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const itemClose = async () => {
    dispatch(loggingOutUser());
    setUser(null);
    setOpen(false);
  };
  return (
    <>
      <Typography
        onClick={handleClick}
        sx={{ cursor: "pointer", fontWeight: 600 }}
      >
        {user.verifiedUser.name.split(" ")[0]}
      </Typography>
      <Menu
        anchorEl={open}
        open={Boolean(open)}
        onClose={handleClose}
        sx={{ mt: "10px" }}
      >
        <MenuItem onClick={itemClose}>
          <PowerSettingsNew color="primary" />
          <Typography sx={{ ml: "10px" }}>Log Out</Typography>
        </MenuItem>
      </Menu>
    </>
  );
};

export default Profile;
