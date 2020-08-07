import React, { useState, useEffect } from "react";
import apiHandler from "../../api/apiHandler";
import TextField from "@material-ui/core/TextField";
import ImageInput from "../ImageInput";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import DoneIcon from "@material-ui/icons/Done";
import Backdrop from "../Backdrop";

const useStyles = makeStyles({
  root: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "flex-start",
    marginTop: "20px",
    "& > *": {
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
  const [tempUrlCropped, setTempUrlCropped] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);

  const mode = props.match.params.mode;
  const imageId = props.match.params.id;

  useEffect(() => {
    if (mode === "edit") {
      apiHandler
        .getImage(imageId)
        .then((image) => {
          setTempUrl(image.url);
          setTempUrlCropped(image.url);
          setDescription(image.description);
        })
        .catch((error) => {
          console.log(error.message);
        });
    }
    return () => {
      setLoading(false);
    }
  },);

  const handleUpload = (evt) => {
    setTempUrl(URL.createObjectURL(evt.target.files[0]));
  };

  const handleCropValidation = (croppedImage) => {
    setTempUrlCropped(URL.createObjectURL(croppedImage));
    setImage(croppedImage);
  };

  const handleSubmit = (evt) => {
    evt.preventDefault();
    
    setLoading(true);

    if (mode === "upload") {
      const fd = new FormData();
      fd.append("description", description);
      fd.append("image", image);
      apiHandler
        .uploadImage(fd)
        .then((image) => {
          props.history.push("/home");
        })
        .catch((error) => {
          console.log(error.message);
        });
    } else if (mode === "edit") {
      apiHandler
        .updateImage(imageId, { description: description })
        .then((image) => {
          props.history.push("/home");
        })
        .catch((error) => {
          console.log(error.message);
        });
    }
  };

  const displayValidation = (image !== null || mode === "edit");

  return (
    <React.Fragment>
      {loading && <Backdrop loading={loading} />}
      <form className={classes.root}>
        <h2 className={classes.formTitle}>
          {mode === "upload" ? "Upload an image" : "Edit image"}
        </h2>
        <ImageInput
          tempUrl={tempUrl}
          tempUrlCropped={tempUrlCropped}
          clbkUpload={handleUpload}
          clbkCrop={handleCropValidation}
          isDisabled={mode === "edit"}
        />
        {displayValidation && (
          <React.Fragment>
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
              Validate
            </Button>
          </React.Fragment>
        )}
      </form>
    </React.Fragment>
  );
};

export default ImageForm;
