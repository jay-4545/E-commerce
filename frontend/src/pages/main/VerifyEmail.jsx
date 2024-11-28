import React, { useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { verifyEmail } from "../../services/apiServices";
import { Button } from "@mui/material";

function VerifyEmail() {
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    verifyEmail(searchParams.get("userId"), searchParams.get("token"));
  }, []);

  return (
    <div>
      <p>You email has been verified!</p>
      <Button LinkComponent={Link} variant="contained" to="/signin">
        Go To Login
      </Button>
    </div>
  );
}

export default VerifyEmail;
