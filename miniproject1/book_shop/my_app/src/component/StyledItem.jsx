// src/component/StyledItem.jsx
import { Paper } from "@mui/material";
import { styled } from "@mui/system";

const StyledItem = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2),
  borderRadius: "16px",
  backgroundColor: "#ffffff",
  boxShadow: "0px 8px 20px rgba(0, 0, 0, 0.05)",
  transition: "all 0.3s ease",
  "&:hover": {
    boxShadow: "0px 12px 24px rgba(0, 0, 0, 0.1)",
  },
}));

export default StyledItem;
