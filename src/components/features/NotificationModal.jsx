import React, { useEffect, useState } from "react";
import {
  Modal,
  Box,
  Button,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";

const NotificationModal = ({
  open,
  handleSelection,
  options,
  onClose,
  keyName,
}) => {
  const [selectedValue, setSelectedValue] = useState("");
  const [isChanged, setIsChanged] = useState("");
  const handleSelectChange = (event) => {
    setSelectedValue(event.target.value);
  };

  const handleConfirm = () => {
    handleSelection(selectedValue);
    if (!selectedValue) {
      alert(`Select a ${keyName} for kyc`);
      return;
    }
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box className="notification-box">
        <Typography variant="h6">{`Select a ${keyName}`}</Typography>
        <FormControl variant="standard" fullWidth sx={{ mt: 2 }}>
          <InputLabel id="select-label">options</InputLabel>
          <Select
            labelId="select-label"
            id="select"
            className="dropdown-list"
            value={selectedValue}
            onChange={(e) => handleSelectChange(e)}
            MenuProps={{
              PaperProps: {
                style: {
                  maxHeight: 400,
                  width: 250,
                },
              },
            }}
          >
            {options.length > 0 ? (
              options.map((user) => (
                <MenuItem
                  className="menu-item"
                  key={user.id}
                  value={user.id}
                  name={user.name || user.materialType}
                  data-name={user.name || user.materialType}
                >
                  {user.materialQualityImage && (
                    <div className="img-container">
                      <img
                        className="user-img"
                        src={`${user.materialQualityImage}`}
                        alt={user.name || user.materialType}
                      />
                    </div>
                  )}
                  {user.name || user.materialType}
                </MenuItem>
              ))
            ) : (
              <MenuItem disabled>No option available</MenuItem>
            )}
          </Select>
        </FormControl>
        <Box sx={{ mt: 2, textAlign: "right" }}>
          <Button
            variant="outlined"
            onClick={() => handleSelection("close")}
            sx={{ mr: 1 }}
          >
            Cancel
          </Button>
          <Button
            variant="contained"
            color="primary"
            sx={{
              backgroundColor: "#1F3555 ",
              color: "#fff",
              "&:hover": {
                backgroundColor: "#1F3555 ",
              },
            }}
            onClick={handleConfirm}
          >
            Confirm
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default NotificationModal;
