import { Box, Grid, Paper, Stack, Typography } from "@mui/material";
import { titleCard, paper, paperBox, bodyCard, bodyCardCap } from "../styles";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { DOMAIN_NAME } from "../constants";
import { dateFormate } from "../util";


const Home = () => {
  const [matchDetails, setMatchDetails] = useState([]);
  const handleMatchDetails = async () => {
    try {
      const response1 = await axios.get(`${DOMAIN_NAME}/api/matches`);
      setMatchDetails(response1.data);
    } catch (error) {
      console.log("Error fetching team details:", error);
    }
  };
  useEffect(() => {
    handleMatchDetails();
  }, []);
  return (
    <div>
      <Box>
        <Typography variant="h4" fontWeight={700} sx={{ mb: 2 }}>
          History of Previous Matches
        </Typography>
        <Grid container spacing={2}>
          {matchDetails.length === 0 ? (
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                height: "100vh",
                width: "100vw",
              }}
            >
              <Typography variant="h4" fontStyle={"italic"}>
                No Match Details Found
              </Typography>
            </Box>
          ) : (
            <React.Fragment>
              {matchDetails.map((match) => (
                <Grid key={match._id} item lg={4} md={6} sm={12}>
                  <Paper sx={paper}>
                    <Box sx={paperBox}>
                      <Typography sx={titleCard}>{match.matchName}</Typography>
                      <Typography sx={titleCard}>{match.location}</Typography>
                      <Typography sx={titleCard}>
                        {dateFormate(match.date)}
                      </Typography>
                    </Box>
                    <Stack spacing={2} m={2}>
                      <Stack
                        direction={"row"}
                        spacing={6}
                        justifyContent={"center"}
                      >
                        <Typography sx={bodyCard}>Team - 1</Typography>
                        <Typography sx={bodyCardCap}>{match.team1name}</Typography>
                      </Stack>
                      <Stack
                        direction={"row"}
                        spacing={6}
                        justifyContent={"center"}
                      >
                        <Typography sx={bodyCard}>Team - 2</Typography>
                        <Typography sx={bodyCardCap}>{match.team2name}</Typography>
                      </Stack>
                      <Stack
                        direction={"row"}
                        spacing={6}
                        justifyContent={"center"}
                      >
                        <Typography sx={bodyCard}>No. Overs</Typography>
                        <Typography sx={bodyCardCap}>
                          {match.overs}
                        </Typography>
                      </Stack>
                      <Stack
                        direction={"row"}
                        spacing={6}
                        justifyContent={"center"}
                      >
                        <Typography sx={bodyCard}>Winner</Typography>
                        <Typography sx={bodyCardCap}>
                          {match.winnerTeamName}
                        </Typography>
                      </Stack>
                    </Stack>
                    <Box></Box>
                  </Paper>

                </Grid>
              ))}
            </React.Fragment>
          )}
        </Grid>
      </Box>
    </div>
  );
};

export default Home;
