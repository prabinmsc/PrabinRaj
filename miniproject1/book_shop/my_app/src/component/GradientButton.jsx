// src/component/GradientButton.jsx
import React from "react";
import { Button } from "@mui/material";

const GradientButton = ({ children, sx, ...props }) => {
  return (
    <Button
      variant="contained"
      {...props}
      sx={{
        background: 'linear-gradient(90deg, #191654, #43c6ac)',
        color: "#fff",
        fontWeight: "bold",
        borderRadius: "50px",
        textTransform: "none",
        boxShadow: "0 3px 5px 2px rgba(33, 203, 243, .3)",
        "&:hover": {
          background: 'linear-gradient(90deg, #43c6ac, #191654)'
        },
        ...sx
      }}
    >
      {children}
    </Button>
  );
};

export default GradientButton;
