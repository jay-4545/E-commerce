import { Button, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import React from "react";
import Add from "@mui/icons-material/Add";
import { Link } from "react-router-dom";

const TitleTypography = styled(Typography)(({ theme }) => {
  return {
    fontSize: "1.75rem",
    color: theme.palette.text.main,
  };
});

function AdminTitlePage({ text, hasBtn, btnText, btnLink }) {
  return (
    <div className="flex items-center justify-between mb-8">
      <TitleTypography variant="h2">{text}</TitleTypography>
      {hasBtn && (
        <Button
          component={Link}
          to={btnLink}
          variant="contained"
          startIcon={<Add />}
        >
          {btnText}
        </Button>
      )}
    </div>
  );
}

export default AdminTitlePage;
