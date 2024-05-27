import { Skeleton } from "@mui/material";
import React from "react";

function Loading({ items }) {
  return (
    <div className="loading-main">
      {Array.from({ length: items }, (_, index) => (
        <div key={index}>
          <Skeleton animation="wave" />
          <Skeleton animation="wave" />
          <Skeleton animation="wave" />
          <Skeleton animation="wave" />
          <Skeleton animation="wave" />
          <Skeleton animation="wave" />
        </div>
      ))}
    </div>
  );
}

export default Loading;
