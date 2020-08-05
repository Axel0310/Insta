import React, { useState, useEffect } from "react";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import CloudUploadIcon from "@material-ui/icons/CloudUpload";
import ImageCropping from "./ImageCropping";
import EditIcon from "@material-ui/icons/Edit";

const useStyles = makeStyles({
  input: {
    display: "none",
  },
  imageInputWrapper: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  imageMini: {
    maxWidth: "100%",
    maxHeight: "50vh",
  },
  hidden: {
    display: "none",
  },
});

export default function ImageInput({
  clbkUpload,
  clbkCrop,
  tempUrl,
  tempUrlCropped,
  isDisabled,
}) {
  const classes = useStyles();
  const [cropToolDisplayed, setCropToolDisplayed] = useState(false);

  useEffect(() => {
    if (tempUrl !== "") setCropToolDisplayed(true);
  }, [tempUrl]);

  useEffect(() => {
    if (tempUrlCropped !== "") setCropToolDisplayed(false);
  }, [tempUrlCropped]);

  const diplayCroppingTool = () => {
    setCropToolDisplayed(true);
  };

  return (
    <div className={classes.imageInputWrapper}>
      <input
        accept="image/*"
        className={classes.input}
        id="contained-button-file"
        multiple
        type="file"
        onChange={clbkUpload}
        required
      />
      <label
        htmlFor="contained-button-file"
        className={isDisabled ? classes.hidden : undefined}
      >
        <Button
          variant="contained"
          color="primary"
          component="span"
          startIcon={<CloudUploadIcon />}
        >
          Upload
        </Button>
      </label>
      {tempUrlCropped !== "" && !cropToolDisplayed && (
        <React.Fragment>
          <EditIcon onClick={diplayCroppingTool} />
          <img
            src={tempUrlCropped}
            alt="Upload"
            className={classes.imageMini}
          />
        </React.Fragment>
      )}
      {cropToolDisplayed && (
        <ImageCropping imgUrl={tempUrl} clbkCrop={clbkCrop} />
      )}
    </div>
  );
}
