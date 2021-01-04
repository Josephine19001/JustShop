import React from "react";
import AddIcon from "@material-ui/icons/Add";
import { Fab, Button } from "@material-ui/core";

const UploadImage = () => {
  return (
    <label htmlFor="upload-photo">
      <input
        style={{ display: "none" }}
        id="upload-photo"
        name="upload-photo"
        type="file"
      />
      <Fab
        color="secondary"
        size="small"
        component="span"
        aria-label="add"
        variant="extended"
      >
        <AddIcon /> Upload photo
      </Fab>
    </label>
  );
};

export default UploadImage;
