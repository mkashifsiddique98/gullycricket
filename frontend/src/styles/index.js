import theme from "./theme"
export const radioGroupBoxStyle = {
  position: "absolute",
  top: "61%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 340,
  backgroundColor: "background.paper",
  border: "2px solid #3f51b5",
  boxShadow: 24,
  p: "4px",
};
//* Home Page  Style
export const paper = {
  height: 230,
  width: 300,
  boxShadow: theme.shadows[2], 
    transition: 'box-shadow 0.3s ease', 
    '&:hover': {
      boxShadow: theme.shadows[8],
      cursor:"pointer"
    }
};
export const paperBox = {
  display: "flex",
  justifyContent: "space-between",
  backgroundColor: "#556cd6",
  p: 2,
};
export const titleCard = {
  fontSize: 16,
  fontWeight: 700,
  color: "white",
};
export const bodyCard = {
  fontSize: 16,
  fontWeight: 600,
  textAlign: "left"
};
export const bodyCardCap = {
  fontSize: 16,
  fontWeight: 600,
  textTransform: "capitalize",
  textAlign: "right"
};