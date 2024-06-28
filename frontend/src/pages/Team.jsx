import {
  Alert,
  Box,
  Button,
  Divider,
  Snackbar,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import axios from "axios";
import { DOMAIN_NAME } from "../constants";
// Todo : Delete Fn , Edit fn according to Api
// Contact to umar
const Team = () => {
  //for Toast
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
  // Mode change and Show Error
  const [modeEditORSave, setModeEditORSave] = useState(false);
  const [status, setStatus] = useState("");
  // Team or Main Data
  const [teamName, setTeamName] = useState("");
  const [teamNameId, setTeamNameId] = useState("");
  const [listTeam, setListTeam] = useState([]);
  // for Only set State name
  const handleTeam = (event) => {
    setTeamName(event.target.value);
  };
  // *----------Api Calling------------*
  // *Get List of Team
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
  }, []);
  // Create New Team
  const handleCreateTeam = async () => {
    if (teamName.trim() === "") {
      return;
    }
    try {
      const response = await axios.post(DOMAIN_NAME + "/api/teams", {
        teamName,
      });
      if (response.data) setTeamName("");
      setStatus(response.data.teamName + " is Created Successfully!");
      handleClick();
      // Update list of Player Team Name
      setListTeam([...listTeam, response.data]);
      // fetchTeams();
    } catch (error) {
      console.error("Error creating team:", error);
    }
  };
  // Update Team Data
  const handleUpdateTeam = async () => {
    // teamName
    // i use same teamName for state for create and Update
    if (teamName.trim() === "") {
      return;
    }
    try {
      const response = await axios.put(
        `${DOMAIN_NAME}/api/teams/${teamNameId}`,
        { teamName }
      );
      setListTeam(
        listTeam.map((team) => (team._id === teamNameId ? response.data : team))
      );
      // reset state
      setStatus(response.data.teamName + " is Update Successfully!");
      handleClick();
      setModeEditORSave(false);
      setTeamName("");
      setTeamNameId("");
    } catch (error) {
      console.error("Error updating team:", error);
    }
  };
  // Update button and State
  const handleEditTeamBtn = (_id, name) => {
    setModeEditORSave(true);
    setTeamName(name);
    setTeamNameId(_id);
  };
  // Delete Team
  const handleDeleteTeam = async (id) => {
    try {
      await axios.delete(`${DOMAIN_NAME}/api/teams/${id}`);
      setListTeam(listTeam.filter((listTeam) => listTeam._id !== id));
      setStatus("Team is Delete Successfully!");
      handleClick();
    } catch (error) {
      console.error("Error deleting team:", error);
    }
  };

  return (
    <>
      {/* Create */}
      <Box sx={{ height: "45vh" }}>
        <Typography variant="h4" fontWeight={700}>
          Create New Team
        </Typography>
        <Box
          sx={{ display: "flex", justifyContent: "space-between", py: 2 }}
          gap={2}
        >
          <TextField
            label="Team Name"
            variant="outlined"
            fullWidth
            type="text"
            color="primary"
            value={teamName}
            onChange={handleTeam}
            autoFocus
          />
          {modeEditORSave ? (
            <Button
              variant="contained"
              size="small"
              sx={{ whiteSpace: "nowrap" }}
              color="primary"
              onClick={handleUpdateTeam}
            >
              Edit Team
            </Button>
          ) : (
            <Button
              variant="contained"
              size="small"
              sx={{ whiteSpace: "nowrap" }}
              color="primary"
              onClick={handleCreateTeam}
            >
              Create Team
            </Button>
          )}
        </Box>
      </Box>
      {/* Show and Edit */}
      <Divider />
      <Box sx={{ height: "50vh", width: "100%", mt: 2 }}>
        <Typography variant="h4" fontWeight={700}>
          List of Team
        </Typography>
        {listTeam.length === 0 ? (
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "50vh",
            }}
          >
            <Typography variant="h4" fontWeight={700} fontStyle={"oblique"}>No Team Found</Typography>
          </Box>
        ) : (
          <Table sx={{ border: "1px solid rgba(224, 224, 224, 1)", mt: 1 }}>
            <TableHead>
              <TableRow>
                <TableCell
                  align="center"
                  sx={{ fontWeight: 700, fontSize: 16 }}
                >
                  ID
                </TableCell>
                <TableCell
                  align="center"
                  sx={{ fontWeight: 700, fontSize: 16 }}
                >
                  Name
                </TableCell>
                <TableCell
                  align="center"
                  sx={{ fontWeight: 700, fontSize: 16 }}
                >
                  Action
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {listTeam.map((list, index) => (
                <TableRow key={index}>
                  <TableCell align="center">{index + 1}</TableCell>
                  <TableCell align="center">{list.teamName}</TableCell>
                  <TableCell align="center">
                    <Button
                      size="small"
                      variant="outlined"
                      onClick={() => handleEditTeamBtn(list._id, list.teamName)}
                    >
                      Edit
                    </Button>
                    &nbsp; &nbsp;
                    <Button
                      size="small"
                      variant="outlined"
                      onClick={() => handleDeleteTeam(list._id)}
                    >
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </Box>
      {/* Toast For Error or Status Update Message */}
      <Snackbar
        open={open}
        autoHideDuration={1000}
        onClose={handleClose}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert onClose={handleClose} severity="success" sx={{ width: "100%" }}>
          {status}
        </Alert>
      </Snackbar>
    </>
  );
};

export default Team;
