import { Button, Link } from "@mui/material";
import React, { useState, useRef } from "react";

export const DownloadTemplate = () => {
  return (
    <Link href="/template.csv" download>
      Download csv template of teams and juries
    </Link>
  );
};
