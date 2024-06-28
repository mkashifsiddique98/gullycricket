/* eslint-disable react/prop-types */
import * as React from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {
  Typography,
  Button,
  StepLabel,
  Step,
  Stepper,
  Box,
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  TextField,
  MenuItem,
  Divider,
} from "@mui/material";
import { DOMAIN_NAME } from "../constants";
// Validation
const initialValues = {
  matchName: "",
  location: "",
  team1: "",
  team2: "",
  maxOver: "",
  batting: "",
};
const validationSchema = [
  Yup.object().shape({
    matchName: Yup.string().required("Match Name is required"),
    location: Yup.string().required("Location is required"),
  }),
  Yup.object().shape({
    team1: Yup.string().required("Team Name is required"),
    team2: Yup.string().required("Team Name is required"),
  }),
  Yup.object().shape({
    maxOver: Yup.string().required("Over is required"),
  }),
  Yup.object().shape({
    batting: Yup.string().required("Please choose who is Batting"),
  }),
];
//*  Components  for Form Stepper
const Matches = ({ touched, errors, values, handleChange, handleBlur }) => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        p: 1,
      }}
      gap={4}
    >
      <Typography fontSize={20} fontWeight={700}>
        Please provide the name of the match and its location.
      </Typography>
      <TextField
        label="Match Name"
        id="matchName"
        name="matchName"
        value={values?.matchName}
        onChange={handleChange}
        onBlur={handleBlur}
        helperText={
          errors?.matchName && touched?.matchName && errors?.matchName
        }
        error={errors?.matchName && touched?.matchName}
      />
      <TextField
        label="Location"
        id="location"
        name="location"
        value={values?.location}
        onChange={handleChange}
        onBlur={handleBlur}
        helperText={errors?.location && touched?.location && errors?.location}
        error={errors?.location && touched?.location}
      />
    </Box>
  );
};
const Team = ({ touched, errors, values, handleChange, handleBlur }) => {
  const [listTeam, setListTeam] = React.useState([]);
  const [scheduleMatrix, setScheduleMatrix] = React.useState([]);
  const [show, setHide] = React.useState(true);
  const handleShowHidde = () => {
    setHide(!show);
  };
  const fetchTeams = async () => {
    try {
      const response = await axios.get(DOMAIN_NAME + "/api/teams");
      setListTeam(response.data);
    } catch (error) {
      console.error("Error fetching teams:", error);
    }
  };
  React.useEffect(() => {
    const savedData = localStorage.getItem("scheduleMatch");
    if (savedData) {
      const parsedData = JSON.parse(savedData);
      setScheduleMatrix(parsedData.scheduleMatrix);
    }
    fetchTeams();
  }, []);
  return (
    <Box sx={{ display: "flex", justifyContent: "space-between" }} gap={2}>
      {scheduleMatrix.length !== 0 && (
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Button variant="outlined" onClick={handleShowHidde}>
            {show ? "hide" : "show"} Schedule
          </Button>
        </Box>
      )}

      {show && scheduleMatrix.length !== 0 && (
        <>
          {" "} 
          <hr />
          <Box sx={{ overflow: "hidden", flex: 1 }}>
            <Typography variant="h5" fontWeight={600} align="center" mb={1}>
              Schedule Match
            </Typography>
            {
              scheduleMatrix.map((scheduleTeam, roundIndex) => (
                <Box
                  key={roundIndex}
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "flex-start",
                  }}
                >
                  <Typography variant="h6" fontWeight={600}>
                    Round {roundIndex + 1}
                  </Typography>

                  {scheduleTeam.map((match, matchIndex) => (
                    <Box key={matchIndex} display="flex" gap={1}>
                      <Typography variant="h6" fontWeight={500}>
                        {match}
                      </Typography>
                    </Box>
                  ))}
                </Box>
              ))}
          </Box>
          <hr />
        </>
      )}
      
      <Box
        component="form"
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          p: 1,
          "& .MuiTextField-root": { m: 1, width: "25ch" },
        }}
        gap={4}
      >
        <Typography fontSize={20} fontWeight={700}>
          Select The Name of Teams for Match!
        </Typography>
        <TextField
          label="Team-1"
          id="team1"
          name="team1"
          value={values?.team1}
          onChange={handleChange}
          onBlur={handleBlur}
          helperText={errors?.team1 && touched?.team1 && errors?.team1}
          error={errors?.team1 && touched?.team1}
          select
        >
          {listTeam.map((option, index) => (
            <MenuItem key={index + 3} value={option.teamName}>
              {option.teamName}
            </MenuItem>
          ))}
        </TextField>
        <Typography fontWeight={900} fontStyle={"italic"}>
          VS
        </Typography>
        <TextField
          label="Team-2"
          id="team2"
          name="team2"
          value={values.team2}
          onChange={handleChange}
          onBlur={handleBlur}
          helperText={errors.team2 && touched.team2 && errors.team2}
          error={errors.team2 && touched.team2}
          select
        >
          {listTeam.map((option, index) => (
            <MenuItem key={index + 2} value={option.teamName}>
              {option.teamName}
            </MenuItem>
          ))}
        </TextField>
      </Box>
    </Box>
  );
};
const Overs = ({ touched, errors, values, handleChange, handleBlur }) => {
  return (
    <Box sx={{ display: "flex", flexDirection: "column" }} gap={2}>
      <Typography fontSize={20} fontWeight={700}>
        How Many Overs?
      </Typography>
      <TextField
        variant="outlined"
        label="Overs"
        id="maxOver"
        name="maxOver"
        type="number"
        placeholder="between 1 to 50"
        value={values?.maxOver}
        onChange={handleChange}
        onBlur={handleBlur}
        helperText={errors?.maxOver && touched?.maxOver && errors?.maxOver}
        error={errors?.maxOver && touched?.maxOver}
      />
    </Box>
  );
};
const Batting = ({ values, setFieldValue }) => {
  return (
    <Box
      sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}
      gap={2}
    >
      <Typography fontSize={20} fontWeight={700}>
        Who is Batting First ?
      </Typography>
      <FormControl>
        <FormLabel id="batting-first">Please Select the Team </FormLabel>
        <RadioGroup
          aria-labelledby="batting-first"
          name="batting"
          value={values.batting.toString()}
          onChange={(event) => {
            setFieldValue("batting", event.currentTarget.value);
          }}
        >
          <FormControlLabel
            value={values.team1}
            control={<Radio />}
            label={values.team1}
          />
          <FormControlLabel
            value={values.team2}
            control={<Radio />}
            label={values.team2}
          />
        </RadioGroup>
      </FormControl>
    </Box>
  );
};

//*
//* Main Function of this Page
const steps = ["Match", "Teams", "Overs", "Batting"];

export default function FormStepper() {
  // form Stepper state

  const history = useNavigate();
  const [activeStep, setActiveStep] = React.useState(0);
  const [isSubmitting, setSubmitting] = React.useState(false);
  // form Stepper fn

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };
  function isLastStep() {
    return activeStep === steps.length - 1;
  }
  // end form Stepper state
  // Validation state
  const currentValidationSchema = validationSchema[activeStep];
  // *==============================
  // Create match
  const handleCreationMatch = async (values) => {
    try {
      const response = await axios.post(DOMAIN_NAME + "/api/matches/", {
        values,
      });
      console.log("Match created:", response.data._id);
      return response.data._id;
      // You can handle the response here (e.g., show a success message or redirect to another page).
    } catch (error) {
      console.error("Error creating Match:", error);
      // Handle errors (e.g., show an error message).
    }
  };
  return (
    <Box sx={{ width: "100%", my: 2 }}>
      <Stepper activeStep={activeStep}>
        {steps.map((label) => {
          const stepProps = {};
          const labelProps = {};

          return (
            <Step key={label} {...stepProps}>
              <StepLabel {...labelProps}>{label}</StepLabel>
            </Step>
          );
        })}
      </Stepper>
      <React.Fragment>
        <Formik
          enableReinitialize
          validationSchema={currentValidationSchema}
          initialValues={initialValues}
          onSubmit={async (values, actions) => {
            handleNext();
            actions.setTouched({});
            actions.setSubmitting(false);

            if (isLastStep()) {
              const id = await handleCreationMatch(values);
              setSubmitting(true);
              const data = JSON.stringify(values);
              localStorage.setItem("data", data);
              history("/live-match/" + id);
              console.log(values);
              setSubmitting(false);
            }
          }}
        >
          {({
            values,
            touched,
            errors,
            handleChange,
            handleBlur,
            handleSubmit,
            setFieldValue,
          }) => {
            return (
              <form onSubmit={handleSubmit}>
                <Box
                  sx={{
                    minHeight: "65vh",
                    border: "4px solid #ebebeb",
                    m: 2,
                    borderRadius: "10px",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  {activeStep === 0 && (
                    <Matches
                      touched={touched}
                      errors={errors}
                      values={values}
                      handleChange={handleChange}
                      handleBlur={handleBlur}
                    />
                  )}
                  {activeStep === 1 && (
                    <Team
                      touched={touched}
                      errors={errors}
                      values={values}
                      handleChange={handleChange}
                      handleBlur={handleBlur}
                    />
                  )}
                  {activeStep === 2 && (
                    <Overs
                      touched={touched}
                      errors={errors}
                      values={values}
                      handleChange={handleChange}
                      handleBlur={handleBlur}
                    />
                  )}
                  {activeStep === 3 && (
                    <Batting values={values} setFieldValue={setFieldValue} />
                  )}
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                    pt: 2,
                  }}
                >
                  <Button
                    color="inherit"
                    variant="contained"
                    disabled={activeStep === 0}
                    onClick={handleBack}
                    sx={{ mr: 1 }}
                  >
                    Back
                  </Button>
                  {/* <Box sx={{ flex: "1 1 auto" }} /> */}

                  <Button
                    variant="contained"
                    id="submit"
                    type="submit"
                    disabled={isSubmitting}
                  >
                    {isLastStep() ? "Start Game" : "Next"}
                  </Button>
                </Box>
              </form>
            );
          }}
        </Formik>
      </React.Fragment>
    </Box>
  );
}
