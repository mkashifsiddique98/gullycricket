import React, { useState, useEffect } from "react";
import {
  Button,
  Box,
  Typography,
  List,
  ListItem,
  MenuItem,
  TextField,
} from "@mui/material";
import axios from "axios";
import { DOMAIN_NAME } from "../constants";

const MatchSchedule = () => {
  const listOfMatch = [
    "Quarter Final",
    "Semi Final",
    "Grand Final",
    "Regular Match",
  ];
  const [listTeam, setListTeam] = useState([]);
  const [teamNames, setTeamNames] = useState([]);
  const [newTeamName, setNewTeamName] = useState("");
  const [scheduleMatrix, setScheduleMatrix] = useState([]);
  const [selectedMatchType, setSelectedMatchType] = useState("");
  const [selectedDate, setSelectedDate] = useState("");

  const handleAddTeam = () => {
    // Check if the team name is not empty
    if (newTeamName.trim()) {
      // Find the team with the same name in the listTeam array
      const existingTeam = listTeam.find((team) => team.teamName === newTeamName);
  
      if (existingTeam) {
        // Check if the existing team has 11 players
        if (existingTeam.players.length === 11) {
          setTeamNames([...teamNames, newTeamName]);
          setNewTeamName("");
        } else {
          alert("Team is not ready for the match. It must have 11 players.");
        }
      } else {
        alert("Team is not in the list.");
      }
    } else {
      alert("Please enter a valid team name.");
    }
  };
  
  const handleDateChange = (event) => {
    setSelectedDate(event.target.value);
  };
  const selectTeamNameFn = (event) => {
    setNewTeamName(event.target.value);
  };
  const handleChangeMatchType = (event) => {
    setSelectedMatchType(event.target.value);
  };
  const generateSchedule = () => {
    // Function to generate the round-robin schedule matrix
    
    const numTeams = teamNames.length;
  
    if (numTeams < 2) {
      alert("At least two teams are required for scheduling matches!");
      return;
    }
  
    const newSchedule = [];
  
    for (let i = 0; i < numTeams; i++) {
      for (let j = i + 1; j < numTeams; j++) {
        const match = `${teamNames[i]} VS ${teamNames[j]}`;
        newSchedule.push([match]);
      }
    }
  
    setScheduleMatrix(newSchedule);
  };
  const handleClearSchedule = () => {
    setScheduleMatrix([]);
    setTeamNames([]);
    setSelectedDate("");
    setSelectedMatchType("");
    localStorage.removeItem("scheduleMatch");
  };
  const handleRemoveTeam = (teamNameToRemove) => {
    const updatedTeamNames = teamNames.filter(
      (name) => name !== teamNameToRemove
    );
    setTeamNames(updatedTeamNames);
  };
  const handleSaveMatch = () => {
    if (
      scheduleMatrix.length === 0 ||
      teamNames.length === 0 ||
      selectedMatchType === "" ||
      selectedDate === ""
    ) {
      alert(
        "Please fill in all fields before saving.\n 1. Type of Match \n 2. Date of Match \n 3. Generate schedule"
      );
      return;
    }

    const data = {
      scheduleMatrix: scheduleMatrix,
      teamNames: teamNames,
      selectedMatchType: selectedMatchType,
      selectedDate: selectedDate,
    };
    localStorage.setItem("scheduleMatch", JSON.stringify(data));
    alert("Match schedule saved!");
  };

  const fetchTeams = async () => {
    try {
      const response = await axios.get(DOMAIN_NAME + "/api/teams");
      setListTeam(response.data);
      
    } catch (error) {
      console.error("Error fetching teams:", error);
    }
  };

  useEffect(() => {
    fetchTeams();
    const savedData = localStorage.getItem("scheduleMatch");
    if (savedData) {
      const parsedData = JSON.parse(savedData);
      setScheduleMatrix(parsedData.scheduleMatrix);
      setTeamNames(parsedData.teamNames);
      setSelectedMatchType(parsedData.selectedMatchType);
      setSelectedDate(parsedData.selectedDate);
    }
  }, []);

  return (
    <Box>
      <Box sx={{ display: "flex", gap: 4 }}>
        <TextField
          label="Type of Match"
          select
          value={selectedMatchType}
          sx={{ width: "250px" }}
          onChange={handleChangeMatchType}
        >
          {listOfMatch.map((option, index) => (
            <MenuItem key={index} value={option}>
              {option}
            </MenuItem>
          ))}
        </TextField>
        <TextField
          label="Team Name"
          fullWidth
          select
          value={newTeamName}
          onChange={selectTeamNameFn}
        >
          {listTeam.map((option, index) => (
            <MenuItem key={index} value={option.teamName}>
              {option.teamName}
            </MenuItem>
          ))}
        </TextField>
        <Button variant="contained" onClick={handleAddTeam}>
          Add
        </Button>
      </Box>
      <Box sx={{ display: "flex", gap: 5, my: 2 }}>
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
          <Box
            sx={{
              height: "58vh",
              width: "250px",
              border: "1px solid #c4c4c4",
              borderRadius: "3px",
              padding: "10px",
              overflow:  'auto'
            }}
          >
            <Typography variant="h5" align="center">
              List of Teams
            </Typography>
            <List>
              {teamNames.map((team, index) => (
                <ListItem key={index} focusRipple>
                  {index + 1}. {team}
                  <Button
                    variant="outlined"
                    size="small"
                    onClick={() => handleRemoveTeam(team)}
                    sx={{ marginLeft: "auto" }}
                  >
                    x
                  </Button>
                </ListItem>
              ))}
            </List>
          </Box>
          <TextField
            type="date"
            label="Schedule Match"
            variant="outlined"
            value={selectedDate}
            onChange={handleDateChange}
            InputLabelProps={{
              shrink: true,
            }}
          />
        </Box>

        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 2,
            height: "70vh",
            width: "100%",
            border: "1px solid #c4c4c4",
            borderRadius: "3px",
            overflow: "auto",
            position: "relative",
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              p: 1,
              backgroundColor: "lightgray",
              borderBottom: "1px solid #c4c4c4",
            }}
          >
            <Typography variant="h5" fontWeight={600} color="white">
              {selectedMatchType} Schedule Match {selectedDate}
            </Typography>
          </Box>
          {scheduleMatrix.map((scheduleTeam, roundIndex) => (
            <Box
              key={roundIndex}
              pl={40}
              sx={{ display: "flex", flexDirection: "column", }}
            >
              <Typography variant="h6" fontWeight={600}>
                Round {roundIndex + 1}
              </Typography>

              {scheduleTeam.map((match, matchIndex) => (
                <Box
                  key={matchIndex}
                  display="flex"
                  // alignItems="center"
                  gap={2}
                  pl={-5}
                //  sx={{marginLeft:'100'}}
                >
                 
                 
                  <Typography variant="h6" fontWeight={500}>
                    {match}
                  </Typography>
                  
                </Box>
              ))}
            </Box>
          ))}
          {scheduleMatrix.length == 0 && (
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                height: "100%",
                width: "100%"
              }}
            >
              <Typography variant="h4" align="center">
                No Schedule of match Created!
              </Typography>
            </Box>
          )}
          <Box
            sx={{
              borderTop: "1px solid #c4c4c4",
              p: 1,
              display: "flex",
              justifyContent: "space-between",
              position:"absolute",
              width: "100%",
              bottom:0,
            }}
          >
            <Button
              variant="contained"
              color="warning"
              onClick={generateSchedule}
            >
              Generate Schedule
            </Button>
            <Button
              variant="contained"
              color="error"
              onClick={handleClearSchedule}
            >
              Clear Schedule
            </Button>
            <Button
              variant="contained"
              color="success"
              onClick={handleSaveMatch}
            >
              Save Match
            </Button>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default MatchSchedule;
