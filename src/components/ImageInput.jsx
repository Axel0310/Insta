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
    width: "100vw"
  },
  imageMini: {
    width: "100%",
    marginTop: "20px",
  },
  hidden: {
    display: "none",
  },
  btnWrapper: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "60%",
  },
  editBtn: {
    marginLeft: "20px",
  }
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
      <div className={classes.btnWrapper}>
        <label
          htmlFor="contained-button-file"
          className={isDisabled ? classes.hidden : undefined, classes.uploadBtn}
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
        {tempUrlCropped !== "" &&
          !cropToolDisplayed &&
          tempUrlCropped !== tempUrl && (
            <EditIcon onClick={diplayCroppingTool} className={classes.editBtn} />
          )}
      </div>
      {tempUrlCropped !== "" && !cropToolDisplayed && (
        <img src={tempUrlCropped} alt="Upload" className={classes.imageMini} />
      )}
      {cropToolDisplayed && (
        <ImageCropping imgUrl={tempUrl} clbkCrop={clbkCrop} />
      )}
    </div>
  );
}
