import React, { useState, useEffect } from "react";
import apiHandler from "../../api/apiHandler";
import TextField from "@material-ui/core/TextField";
import ImageInput from "../ImageInput";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import DoneIcon from "@material-ui/icons/Done";

const useStyles = makeStyles({
  root: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "flex-start",
    "& *": {
      marginBottom: "10px",
    },
  },
  formTitle: {
    fontSize: "1.8em",
    fontWeight: "bolder",
  },
});

const ImageForm = (props) => {
  const classes = useStyles();

  const [tempUrl, setTempUrl] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");

  const mode = props.match.params.mode;
  const imageId = props.match.params.id;

  useEffect(() => {
    if (mode === "edit") {
      apiHandler
        .getImage(imageId)
        .then((image) => {
          setTempUrl(image.url);
          setDescription(image.description);
        })
        .catch((error) => {
          console.log(error.message);
        });
    }
  }, []);

  const handleUpload = (evt) => {
    setTempUrl(URL.createObjectURL(evt.target.files[0]));
    setImage(evt.target.files[0]);
  };

  const handleSubmit = (evt) => {
    evt.preventDefault();
    const fd = new FormData();
    fd.append("image", image);
    fd.append("description", description);

    apiHandler
      .uploadImage(fd)
      .then((image) => {
        console.log(image);
        props.history.push("/home");
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  return (
    <form className={classes.root}>
      <h2 className={classes.formTitle}>
        {mode === "upload" ? "Upload an image" : "Edit image"}
      </h2>
      <ImageInput tempUrl={tempUrl} clbk={handleUpload} />
      <TextField
        id="outlined-multiline-static"
        label="Description"
        multiline
        rows={4}
        variant="outlined"
        value={description}
        onChange={(evt) => setDescription(evt.target.value)}
      />
      <Button
        variant="contained"
        color="primary"
        className={classes.button}
        endIcon={<DoneIcon />}
        onClick={handleSubmit}
      >
        Send
      </Button>
    </form>
  );
};

export default ImageForm;
