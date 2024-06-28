import theme from "./theme";

export const mainBox = {
  display: "flex",
  justifyContent: "center",
  flexDirection:"column",
  alignItems: "center",
  height: "100vh",
  width: "100vw",
};

export const subPaper = {
  p: 4,
  display: "flex",
  flexDirection: "column",
  gap: 2,
  boxShadow: theme.shadows[0],
  width: "400px",
  "&:hover": {
    boxShadow: theme.shadows[6],
  },
};
export const typTitle = {
  fontWeight: "700",
  textAlign: "center",
};
