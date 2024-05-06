import React, { useState } from "react";
import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  Modal,
  Typography,
  FormGroup,
  FormControl,
} from "@mui/material";

const PreferencesSettingsModal = ({ open, onClose }) => {
  const [notificationPref, setNotificationPref] = useState(false);
  const [languageSettings, setLanguageSettings] = useState(false);
  const [privacyConsent, setPrivacyConsent] = useState(false);
  const [allChecked, setAllChecked] = useState(false);

  const handleCheckboxChange = (event) => {
    const { name, checked } = event.target;
    if (name === "notificationPref") setNotificationPref(checked);
    else if (name === "languageSettings") setLanguageSettings(checked);
    else if (name === "privacyConsent") setPrivacyConsent(checked);
  };

  const checkAllChecked = () => {
    setAllChecked(notificationPref && languageSettings && privacyConsent);
  };

  const handleDone = () => {
    if (allChecked) {
      console.log("All checkboxes are checked");
      onClose();
    } else {
      console.log("Please check all checkboxes");
    }
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 400,
          bgcolor: "background.paper",
          boxShadow: 24,
          p: 4,
        }}
      >
        <Typography variant="h5" sx={{ mb: 3 }}>
          Preferences & Settings
        </Typography>
        <FormControl component="fieldset" sx={{ mb: 3 }}>
          <FormGroup>
            <FormControlLabel
              control={
                <Checkbox
                  checked={notificationPref}
                  onChange={handleCheckboxChange}
                  name="notificationPref"
                />
              }
              label="Notification preferences"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={languageSettings}
                  onChange={handleCheckboxChange}
                  name="languageSettings"
                />
              }
              label="Language and regional settings"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={privacyConsent}
                  onChange={handleCheckboxChange}
                  name="privacyConsent"
                />
              }
              label="Consent to the platform's privacy policy"
            />
          </FormGroup>
        </FormControl>
        <Button
          variant="contained"
          color="primary"
          disabled={!allChecked}
          onClick={handleDone}
        >
          Done
        </Button>
      </Box>
    </Modal>
  );
};

export default PreferencesSettingsModal;
