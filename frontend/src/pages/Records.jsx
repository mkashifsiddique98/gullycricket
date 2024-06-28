import React, { useState } from "react";
import axios from "axios";
import { Grid, Paper, Box } from "@mui/material";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import TextField from "@mui/material/TextField";
//  import {data} from '../data';
import { paper } from "../styles";
import { DOMAIN_NAME } from "../constants";
// Search on top






const TeamSearch = ({ teams, onSearch }) => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = (event) => {
    const value = event.target.value;
    setSearchTerm(value);
    onSearch(value);
  };

  return (
    <TextField
      label="Search by Name"
      fullWidth
      variant="outlined"
      value={searchTerm}
      onChange={handleSearch}
      sx={{ mb: 4 }}
    />
  );
};

// Players card
const PlayerCard = ({ player }) => {
  return (
    <Card sx={paper}>
      <CardContent>
        <h2>{player.name}</h2>
        
        <p>4s: {player.fours}</p>
        <p>6s: {player.sixs}</p>
        <p>Wickets: {player.wickets}</p>
        <p>100s: {player.centuries}</p>
        <p>50s: {player.fiftys}</p>
        <p>Strike Rate: {player.sRate}</p>
      </CardContent>
    </Card>
  );
};

// Main
const Records = () => {
  
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = React.useState([]);
  const [filteredPlayers, setFilteredPlayers] = useState(data);
  const fetchPlayer = async () => {
    try {
      const response = await axios.get(DOMAIN_NAME + "/api/player/");
      
  setData(response.data); 
  setFilteredPlayers(response.data);
  
    } catch (error) {
      console.error("Error fetching teams:", error);
    } finally {
      setIsLoading(false);
       
    }
  };

  React.useEffect(() => {
    fetchPlayer();
  }, []);


  
  const handleSearch = (teamName) => {
     
    if (teamName) {
      const filtered = data.filter((player) =>
        player.name.toLowerCase().includes(teamName.toLowerCase())
      );
      setFilteredPlayers(filtered);
    } else {
      setFilteredPlayers(data);
    }
  };
  if (isLoading) {
     
    return <div>Loading...</div>;
  }
   
  return (
   
    <Box>
      <div>
        <TeamSearch
          teams={data.map((player) => player.name)}
          onSearch={handleSearch}
        />
        <Grid container spacing={5}>
          {filteredPlayers.map((player) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={player.id}>
              <PlayerCard key={player.id} player={player} />
            </Grid>
          ))}
        </Grid>
      </div>
    </Box>
  );
};

export default Records;
