import React from "react";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import CloudUploadIcon from "@material-ui/icons/CloudUpload";

const useStyles = makeStyles((theme) => ({
  input: {
    display: "none",
  },
  imageInputWrapper: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },
  imageMini: {
      maxWidth: "100%",
      maxHeight: "50vh"
  },
  hidden:{
    display: "none"
  }
}));

export default function ImageInput({ clbk, tempUrl, isDisabled }) {
  const classes = useStyles();
  return (
    <div className={classes.imageInputWrapper}>
      <input
        accept="image/*"
        className={classes.input}
        id="contained-button-file"
        multiple
        type="file"
        onChange={clbk}
        required
      />
      <label htmlFor="contained-button-file" className={isDisabled ? classes.hidden : undefined}>
        <Button
          variant="contained"
          color="primary"
          component="span"
          startIcon={<CloudUploadIcon />}
        >
          Upload
        </Button>
      </label>
      {tempUrl && <img src={tempUrl} alt="Upload" className={classes.imageMini} />}
    </div>
  );
}
