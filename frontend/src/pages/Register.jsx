import { useState } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {
  Alert,
  Box,
  Button,
  IconButton,
  InputAdornment,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { mainBox, subPaper, typTitle } from "../styles/login";
import { DOMAIN_NAME, projectTitle } from "../constants";

const validationSchema = yup.object({
  name: yup.string("Enter your Name").required("Name is required"),
  email: yup
    .string("Enter your email")
    .email("Enter a valid email")
    .required("Email is required"),
  password: yup
    .string("Enter your password")
    .min(8, "Password should be of minimum 8 characters length")
    .required("Password is required"),
});
const Register = () => {
  // Routes
  const Routes = useNavigate();
  // Setting State
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      try {
        const config = {
          headers: {
            "Content-type": "application/json",
            "Access-Control-Allow-Origin": "*",
          },
        };
        const { data } = await axios.post(
          DOMAIN_NAME + "/api/users/register",
          { name: values.name, email: values.email, password: values.password },
          config
        );
        localStorage.setItem("userInfo", JSON.stringify(data));
        Routes("/login");
        console.log(data);
      } catch (error) {
        if (error.response && error.response.data.message)
          setError(error.response.data.message);
      }
    },
  });
  return (
    <Box sx={mainBox}>
      <Typography variant="h4" fontWeight={700} my={4}>
        {projectTitle}
      </Typography>
      <Paper sx={subPaper}>
        <Typography variant="h3" sx={typTitle}>
          Register
        </Typography>
        <form onSubmit={formik.handleSubmit}>
          <Stack spacing={4}>
            <TextField
              variant="outlined"
              fullWidth
              id="name"
              name="name"
              label="Name"
              value={formik.values.name}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.name && Boolean(formik.errors.name)}
              helperText={formik.touched.name && formik.errors.name}
            />
            <TextField
              variant="outlined"
              fullWidth
              id="email"
              name="email"
              label="Email"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.email && Boolean(formik.errors.email)}
              helperText={formik.touched.email && formik.errors.email}
            />
            <TextField
              fullWidth
              variant="outlined"
              id="password"
              name="password"
              label="Password"
              type={showPassword ? "text" : "password"}
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.password && Boolean(formik.errors.password)}
              helperText={formik.touched.password && formik.errors.password}
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
            />
            {error && (
              <Alert variant="outlined" severity="error">
                {error}
              </Alert>
            )}

            <Button color="primary" variant="contained" fullWidth type="submit">
              Register
            </Button>
          </Stack>
        </form>
      </Paper>
    </Box>
  );
};

export default Register;
