import React, { useState, useEffect } from "react";
import apiHandler from "../../api/apiHandler";
import { withUser } from "../../components/Auth/withUser";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import InputAdornment from "@material-ui/core/InputAdornment";
import FormControl from "@material-ui/core/FormControl";
import TextField from "@material-ui/core/TextField";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import IconButton from "@material-ui/core/IconButton";
import Button from "@material-ui/core/Button";
import CircularProgress from "@material-ui/core/CircularProgress";
import CloudUploadIcon from "@material-ui/icons/CloudUpload";
import { makeStyles } from "@material-ui/core/styles";
import ImageCropping from "../ImageCropping";
import Backdrop from "../Backdrop";

const useStyles = makeStyles((theme) => ({
  input: {
    display: "none",
  },
  editProfileForm: {
    width: "80%",
    display: "flex",
    flexDirection: "column",
    maxWidth: "500px",
    marginTop: "20px",
    "& > *": {
      marginBottom: "10px",
    },
  },
  formTitle: {
    alignSelf: "center",
    fontSize: "1.8em",
    fontWeight: "bolder",
  },
  imageInputWrapper: {
    display: "flex",
    alignItems: "center",
  },
  imageMini: {
    width: "20vw",
    maxWidth: "120ox",
    borderRadius: "50%",
    marginRight: "20px",
  },
  validateBtn: {
    width: "50%",
    alignSelf: "center",
  },
}));

function FormEditProfile({ context, history }) {
  const classes = useStyles();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [inputs, setInputs] = useState({});
  const [tempUrl, setTempUrl] = useState("");
  const [tempUrlCropped, setTempUrlCropped] = useState("");
  const [cropToolDisplayed, setCropToolDisplayed] = useState(false);
  const [loading, setLoading] = useState(false);

  const { user, setUser } = context;

  useEffect(() => {
    apiHandler.getUser(user._id).then((user) => {
      const { name, description, email, profilePicture } = user;
      setInputs({ name, description, email });
      setTempUrl(profilePicture);
      setIsLoading(false);
    });
    return () => {
      setLoading(false);
    };
  }, []);

  const handleInputsChange = (evt) => {
    evt.persist();
    setInputs((inputs) => ({ ...inputs, [evt.target.name]: evt.target.value }));
  };

  const handleSubmit = async (evt) => {
    evt.preventDefault();

    setLoading(true);

    const fd = new FormData();
    for (let key in inputs) {
      if (inputs[key] !== user[key]) {
        fd.append(key, inputs[key]);
      }
    }

    const res = await apiHandler.updateUser(fd);
    if (!res.message) {
      setUser(res);
      history.push(`/profile/${user._id}`);
    }
  };

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleCropValidation = (croppedImage) => {
    setTempUrl(URL.createObjectURL(croppedImage));
    setInputs((inputs) => ({ ...inputs, profilePicture: croppedImage }));
    setCropToolDisplayed(false);
  };

  const handleUpload = (event) => {
    setTempUrlCropped(URL.createObjectURL(event.target.files[0]));
    setCropToolDisplayed(true);
  };

  if (isLoading) return <CircularProgress />;
  return (
    <React.Fragment>
      {loading && <Backdrop loading={loading} />}
      <form className={classes.editProfileForm}>
        <h2 className={classes.formTitle}>Edit profile</h2>

        <div className={classes.imageInputWrapper}>
          <img src={tempUrl} alt="Profile" className={classes.imageMini} />
          <input
            accept="image/*"
            className={classes.input}
            id="contained-button-file"
            multiple
            type="file"
            name="profilePicture"
            onChange={handleUpload}
          />
          <label htmlFor="contained-button-file">
            <Button
              variant="contained"
              color="primary"
              component="span"
              startIcon={<CloudUploadIcon />}
            >
              Edit picture
            </Button>
          </label>
        </div>

        {cropToolDisplayed && (
          <ImageCropping
            imgUrl={tempUrlCropped}
            clbkCrop={handleCropValidation}
            round={true}
          />
        )}

        <TextField
          required
          label="Name"
          name="name"
          onChange={handleInputsChange}
          value={inputs.name}
        />

        <TextField
          id="outlined-multiline-static"
          label="Description"
          multiline
          rowsMax={4}
          name="description"
          onChange={handleInputsChange}
          value={inputs.description}
        />

        <TextField
          required
          label="Email"
          name="email"
          onChange={handleInputsChange}
          value={inputs.email}
        />

        <FormControl>
          <InputLabel htmlFor="password">New Password</InputLabel>
          <Input
            onChange={handleInputsChange}
            name="password"
            required
            id="password"
            type={showPassword ? "text" : "password"}
            value={inputs.password}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                >
                  {showPassword ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              </InputAdornment>
            }
          />
        </FormControl>

        <Button
          variant="contained"
          color="primary"
          onClick={handleSubmit}
          className={classes.validateBtn}
        >
          Validate
        </Button>
      </form>
    </React.Fragment>
  );
}

export default withUser(FormEditProfile);
