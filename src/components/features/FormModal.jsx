import React, { useEffect, useReducer, useState } from "react";
import {
  Modal,
  Box,
  TextField,
  Checkbox,
  FormControlLabel,
  Button,
  FormGroup,
  IconButton,
  Typography,
  Grid,
  CircularProgress,
} from "@mui/material";
import { fieldValuesObj, formatDate } from "../../constants/extra";
import CloseIcon from "@mui/icons-material/Close";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import { Label } from "@mui/icons-material";
import {
  useOnBoardUserMutation,
  updateUser,
  useGetAllUsersQuery,
  setUser,
  updateUserIsKYCDone,
} from "../../redux/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { updateKyc, useOnBoardKYCMutation } from "../../redux/kycSlice";
import { updateList, useAddListingMutation } from "../../redux/listSlice";
import { updateMaterial, useAddMaterialMutation } from "../../redux/materialSlice";

const FormModal = ({ open, onClose, keyName, userId }) => {
  const formFields = fieldValuesObj[keyName]?.formFields;
  const users = useSelector((state) => state.user);

  const [emailError, setEmailError] = useState("");
  const [unsavedChanges, setUnsavedChanges] = useState(false);
  const [isEmailVerifiedClicked, setIsEmailVerifiedClicked] = useState(false);
  const [isPhoneVerifiedClicked, setIsPhoneVerifiedClicked] = useState(false);
  const [emailLoading, setEmailLoading] = useState(false);
  const [phoneLoading, setPhoneLoading] = useState(false);
  const [isEmailVerified, setIsEmailVerified] = useState(false);
  const [isPhoneVerified, setIsPhoneVerified] = useState(false);
  const [formData, setFormData] = useState({});
  const [selectedFile, setSelectedFile] = useState(null);
  const [otp, setOtp] = useState("");
  const [otpError, setOtpError] = useState("");
  const [onBoardUser] = useOnBoardUserMutation();
  const [onBoardKyc] = useOnBoardKYCMutation();
  const dispatch = useDispatch();
  const [validationErrors, setValidationErrors] = useState({});
  const [inputValues, setInputValues] = useState({});
  const [addListing]= useAddListingMutation()
  const [addMaterial] = useAddMaterialMutation();
  const handleClose = (val) => {
    if (unsavedChanges && !val) {
      const confirmClose = window.confirm(
        "You have unsaved changes. Are you sure you want to close?"
      );
      if (!confirmClose) return;
    }
    const otpSuccessElements =
      document.getElementsByClassName("otp-successfull");
    if (otpSuccessElements && otpSuccessElements.length) {
      Array.from(otpSuccessElements).forEach((element) => {
        element.classList.remove("otp-successfull");
      });
    }
    onClose();
  };

  const sendOtp = async (val) => {
    const url = "http://localhost:2001/otp/sendOTP";
    const data = {
      email: formData["email"],
      verificationMode: val,
      phoneNumber: formData["phoneNumber"],
    };

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok.");
      }

      const responseData = await response.json();
      console.log("Response:", responseData);
      // Handle the response data as needed
    } catch (error) {
      console.error("Error:", error);
    }
  };
  const handleOtpChange = (event) => {
    const { value } = event.target;
    if (value && /^\d{6}$/.test(value)) {
      setOtp(value);
      setOtpError("");
    } else {
      setOtpError("Please enter valid otp");
    }
  };
  const verifyOtp = async (val) => {
    if (val == "email") {
      setEmailLoading(!emailLoading);
    }
    if (val == "phoneNumber") {
      setPhoneLoading(!phoneLoading);
    }

    const url = "http://localhost:2001/otp/verifyOTP";
    const data = {
      otpCode: otp,
      email: formData["email"],
      phoneNumber: formData["phoneNumber"],
      verificationMode: val.includes("phone") ? "phone" : val,
    };

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok.");
      }

      const responseData = await response.json();
      console.log("Response:", responseData.message);
      if (
        val == "email" &&
        responseData.message == "OTP verified successfully"
      ) {
        setEmailLoading((prev) => !prev);
        setIsEmailVerifiedClicked(!isEmailVerifiedClicked);
        setOtp("");
        setIsEmailVerified(!isEmailVerified);
      }
      if (
        val == "phoneNumber" &&
        responseData.message == "OTP verified successfully"
      ) {
        setPhoneLoading((prev) => !prev);
        setIsPhoneVerifiedClicked(!isPhoneVerifiedClicked);
        setOtp("");
        setIsPhoneVerified(!isPhoneVerified);
      }
    } catch (error) {
      alert("Error:", error);
      setEmailLoading(false);
      setIsEmailVerifiedClicked(false);
      setPhoneLoading(false);
      setIsPhoneVerifiedClicked(false);
      setOtp("");
    }
  };

  const handleSubmit = async (event) => {
    try {
      event.preventDefault();
      let isDataValid = false;
      const formDataCopy = { ...formData };
      for (const field of formFields) {
        if (!formDataCopy[field.dbField]) {
          isDataValid = true;
          alert("All fields are required !!"+ " "+field.field);
          break;
        }
      }
      if (isDataValid) {
        return;
      }

      setUnsavedChanges((prev) => !prev);

      if (keyName === "user") {
        if (!isEmailVerified && !isPhoneVerified) {
            console.log("All fields are required.");

            alert("Please verify email/phone");
            return;
          }

        const res = await onBoardUser(formDataCopy);
        if (res.error && res.error.data.error) {
          alert(`Error: ${res.error.data.error}`);
          return;
        }
        dispatch(updateUser(res?.data));
      }
      if (keyName == "kyc") {
        formDataCopy.userId = userId;
        const res = await onBoardKyc(formDataCopy);
        if (res.error && res.error.data.error) {
          alert(`Error: ${res.error.data.error}`);
          return;
        }

        dispatch(updateUserIsKYCDone({ id: userId, isKYCDone: true }));
        dispatch(updateKyc(res?.data));
      }
      if(keyName == "listing"){
        const res = await addListing(formDataCopy);
        if (res.error && res.error.data.error) {
          alert(`Error: ${res.error.data.error}`);
          return;
        }
        dispatch(updateList(res?.data));

      }
      if(keyName== "material"){
        formDataCopy.listing = userId;
        const res = await addMaterial(formDataCopy);
        if (res.error || res?.error?.data?.error) {
          alert(`Error: ${res.error.data.error} ${res.error.data}`);
          return;
        }

        dispatch(updateMaterial(res?.data));
      }

      handleClose(true);
    } catch (error) {
      alert("Error:", error);
    }
  };

  const handleInputChange = (event, field) => {
    const { name, value, checked } = event.target; 
    const updatedValues = { ...inputValues, [name]: value };
    setInputValues(updatedValues);

    if (field && field.type === 'number' && field.extra === 'decimal') {
      const decimalPattern = /^\d+(\.\d{1,2})?$/;

      const isValid = decimalPattern.test(value);
      setValidationErrors((prevErrors) => ({
        ...prevErrors,
        [name]: isValid ? '' : 'Please enter a valid number with up to two decimal places.',
      }));
    }
    // setValidationErrors({});

    setUnsavedChanges(true);
    setFormData((prevData) => ({
      ...prevData,
      [name]: checked || value, // Update the form data with the new field value
    }));
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = () => {
      const imageBlob = reader.result;
      setSelectedFile(imageBlob);
      setFormData((prevData) => ({
        ...prevData,
        [event.target.name]: imageBlob,
      }));
    };
    if (file) {
      reader.readAsDataURL(file);
    }
  };
  const handleEmailChange = (event) => {
    const { name, value } = event.target;
    if (value && !validateEmail(value)) {
      setEmailError("Please enter a valid email address");
    } else {
      setEmailError("");
    }
    // Update form data on input change
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };
  const handleVerifyOtp = (value) => {
    if (value === "email") {
      if (validateEmail(formData["email"])) {
        setIsEmailVerifiedClicked(!isEmailVerifiedClicked);
        setIsPhoneVerifiedClicked(false);
        sendOtp("email");
      } else {
        alert("Enter email first");
      }
    } else if (value === "phoneNumber") {
      if (formData["phoneNumber"] && formData["phoneNumber"].length == 10) {
        setIsPhoneVerifiedClicked(!isPhoneVerifiedClicked);
        setIsEmailVerifiedClicked(false);
        sendOtp("phone");
      } else {
        alert("Enter phone number first");
      }
    }
  };

  return (
    <Modal open={open} onClose={handleClose}>
      <Box className="form-modal-container">
        <div className="modal-header">
          <IconButton onClick={handleClose} aria-label="close">
            <CloseIcon />
          </IconButton>
        </div>
        <form onSubmit={handleSubmit} className="form">
          <Grid container spacing={2}>
            {formFields &&
              formFields.map((field) => (
                <Grid item xs={12} sm={6} key={field.field}>
                  <FormGroup>
                    {field.type === "Checkbox" ? (
                      <FormControlLabel
                        control={<Checkbox />}
                        label={field.field}
                        name={field.dbField}
                        onChange={handleInputChange}
                      />
                    ) : field.type === "dropdown" ? (
                      <TextField
                        select
                        label={field.field}
                        name={field.dbField}
                        variant="outlined"
                        fullWidth
                        SelectProps={{
                          native: true,
                        }}
                        onChange={handleInputChange}
                      >
                        <option value="" disabled selected hidden></option>
                        {field.options.map((option) => (
                          <option key={option} value={option}>
                            {option}
                          </option>
                        ))}
                      </TextField>
                    ) : field.type === "upload" ? ( // Handle file upload type
                      <div
                        className={
                          keyName == "user" && !field?.class 
                            ? " file-upload"
                            : "file-upload" 
                        }
                      >
                        <span>{field.field}</span>
                        <input
                          type="file"
                          name={field.dbField}
                          onChange={handleFileChange}
                        />
                      </div>
                    ) : (
                      <div className="text-box-field">
                        <TextField
                          label={field.type !== "date" && field.field}
                          name={field.dbField}
                          variant="outlined"
                          fullWidth
                          type={field.type === "richtext" ? "text" : field.type}
                          multiline={field.type === "richtext"}
                          rows={field.type === "richtext" ? 4 : 1}
                          inputProps={{
                            maxLength: field.type === "phoneNumber" ? 10 : null,
                            pattern:
                              field.type === "phoneNumber" ? "[0-9]{10}" : null,
                            title:
                              field.type === "phoneNumber"
                                ? "Please enter a 10-digit number"
                                : null,
                            onChange: (e) => handleInputChange(e, field),
                            step:
                              field.extra === "decimal" &&
                              field.type === "number"
                                ? "0.01"
                                : null,
                            min:
                              field.extra === "decimal" &&
                              field.type === "number"
                                ? "0.01"
                                : null,
                          }}
                          error={field.type === "email" ?!!emailError:(field.type == 'number' && field?.extra =="decimal"?!!validationErrors[field.dbField]:null)}
                          helperText={field.type === "email" ?emailError:(field.type == 'number' && field?.extra =="decimal"?validationErrors[field.dbField]:null)}
                        />
                       
                        {(field.type === "email" ||
                          field.type === "phoneNumber") && (
                          <div className="verify-otp">
                            <Button
                              className={`${field.type}-verify ${
                                field.type === "email" &&
                                isEmailVerified &&
                                "otp-successfull"
                              } ${
                                field.type === "phoneNumber" &&
                                isPhoneVerified &&
                                "otp-successfull"
                              }`}
                              variant="contained"
                              color="primary"
                              onClick={() =>
                                otp.length < 6
                                  ? handleVerifyOtp(field.type)
                                  : verifyOtp(field.type)
                              }
                              disabled={
                                (field.type === "email" && emailLoading) ||
                                (field.type === "phoneNumber" && phoneLoading)
                              }
                            >
                              {field.type === "email" ? (
                                emailLoading ? (
                                  <CircularProgress size={24} color="inherit" />
                                ) : isEmailVerified ? (
                                  <CheckCircleOutlineIcon
                                    style={{ color: "green" }}
                                  />
                                ) : !isEmailVerifiedClicked ? (
                                  "Send otp"
                                ) : (
                                  "Verify"
                                )
                              ) : phoneLoading ? (
                                <CircularProgress size={24} color="inherit" />
                              ) : isPhoneVerified ? (
                                <CheckCircleOutlineIcon
                                  style={{ color: "green" }}
                                />
                              ) : !isPhoneVerifiedClicked ? (
                                "Send otp"
                              ) : (
                                "Verify"
                              )}
                            </Button>
                            {field.type === "email" &&
                              isEmailVerifiedClicked && (
                                <TextField
                                  className="otp-text"
                                  type="number"
                                  inputmode="numeric"
                                  pattern="[0-9]*"
                                  label="Enter OTP"
                                  onChange={handleOtpChange}
                                  error={field.type === "email" && !!otpError}
                                />
                              )}
                            {field.type === "phoneNumber" &&
                              isPhoneVerifiedClicked && (
                                <TextField
                                  className="otp-text"
                                  type="number"
                                  inputmode="numeric"
                                  pattern="[0-9]*"
                                  label="Enter OTP"
                                  onChange={handleOtpChange}
                                  error={field.type === "email" && !!otpError}
                                />
                              )}
                          </div>
                        )}
                      </div>
                    )}
                  </FormGroup>
                </Grid>
              ))}
          </Grid>
          <div className="centered-container">
            <Button type="submit" variant="contained" color="primary">
              Submit
            </Button>
          </div>
        </form>
      </Box>
    </Modal>
  );
};

export default FormModal;
