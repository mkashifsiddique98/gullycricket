import React, { useEffect, useState } from "react";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import {
  Alert,
  Box,
  Button,
  Divider,
  FormControl,
  IconButton,
  InputAdornment,
  Snackbar,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { DOMAIN_NAME } from "../constants";

const validationSchema = Yup.object({
  oldPassword: Yup.string("Enter your password")
    .min(8, "Password should be of minimum 8 characters length")
    .required("Password is required"),
  newPassword: Yup.string("Enter your password")
    .min(8, "Password should be of minimum 8 characters length")
    .required("Password is required"),
});
const Setting = () => {
  // Toast
  const [open, setOpen] = useState(false);
  const handleClick = () => {
    setOpen(true);
  };
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };
  //End Toast
  const [Name, setName] = useState("");
  const [Email, setEmail] = useState("");
  const [status, setStatus] = useState("");
  const [statusError, setStatusError] = useState(false);
  const [showPassword, setShowPassword] = React.useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const formik = useFormik({
    initialValues: {
      oldPassword: "",
      newPassword: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values, Action) => {
      const storedData = localStorage.getItem("userInfo");
      const data = JSON.parse(storedData);

      try {
        const response = await axios.post(
          DOMAIN_NAME + "/api/users/change-password",
          {
            currentPassword: values.oldPassword,
            newPassword: values.newPassword,
            id: data._id,
          }
        );

        console.log(response.data.message);

        if (response.data.status) {
          setStatus(response.data.message);
          Action.resetForm();
          handleClick();
          setStatusError(false);
        } else {
          setStatus(response.data.message);
          setStatusError(true);
          handleClick();
        }
      } catch (err) {
        console.log("error :", err.message);
      }
    },
  });
  useEffect(() => {
    // Session data Use
    const storedData = localStorage.getItem("userInfo");

    if (storedData) {
      const data = JSON.parse(storedData);
      setName(data.name);
      setEmail(data.email);
    }
  }, []);

  return (
    <>
      <Box>
        <Typography variant="h4" fontWeight={700} sx={{ mb: 2 }}>
          Setting
        </Typography>
        <Divider />
        <Typography variant="h6" my={2} fontWeight={600}>
          Change Password
        </Typography>
        <Box
          component={"form"}
          onSubmit={formik.handleSubmit}
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            px: 6,
          }}
          gap={4}
        >
          <Stack
            direction={"row"}
            alignItems={"center"}
            spacing={2}
            justifyContent={"space-around"}
          >
            <Typography variant="body" fontWeight={600}>
              {Name}
            </Typography>
            <Typography variant="body" fontWeight={600}>
              {Email}
            </Typography>
          </Stack>
          <Stack
            direction="row"
            alignItems={"center"}
            spacing={2}
            justifyContent={"center"}
          >
            <Typography variant="body" fontWeight={600}>
              Old Password :
            </Typography>
            <FormControl sx={{ m: 1, width: "25ch" }} variant="outlined">
              <TextField
                id="oldPassword"
                name="oldPassword"
                type={showPassword ? "text" : "password"}
                value={formik.values.oldPassword}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={
                  formik.touched.oldPassword &&
                  Boolean(formik.errors.oldPassword)
                }
                helperText={
                  formik.touched.oldPassword && formik.errors.oldPassword
                }
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        edge="end"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
                label="Password"
              />
            </FormControl>
          </Stack>
          <Stack
            direction="row"
            alignItems={"center"}
            spacing={2}
            justifyContent={"center"}
          >
            <Typography variant="body" fontWeight={600}>
              New Password :
            </Typography>
            <FormControl sx={{ m: 1, width: "25ch" }} variant="outlined">
              <TextField
                id="newPassword"
                name="newPassword"
                type={showPassword ? "text" : "password"}
                value={formik.values.newPassword}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={
                  formik.touched.newPassword &&
                  Boolean(formik.errors.newPassword)
                }
                helperText={
                  formik.touched.newPassword && formik.errors.newPassword
                }
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        edge="end"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
                label="Password"
              />
            </FormControl>
          </Stack>
          <Button type="submit" variant="contained">
            Save
          </Button>
        </Box>
      </Box>
      <Snackbar
        open={open}
        autoHideDuration={1000}
        onClose={handleClose}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert
          onClose={handleClose}
          severity={statusError ? "error" : "success"}
          sx={{ width: "100%" }}
        >
          {status}
        </Alert>
      </Snackbar>
    </>
  );
};

export default Setting;
