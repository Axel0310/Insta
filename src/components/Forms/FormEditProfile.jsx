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

const useStyles = makeStyles((theme) => ({
  input: {
    display: "none",
  },
  imageInputWrapper: {
    display: "flex",
    alignItems: "center",
  },
  imageMini: {
    width: "20vw",
    height: "20vw",
    borderRadius: "50%",
    backgroundPosition: "center",
    backgroundSize: "contain",
    backgroundRepeat: "no-repeat",
  },
}));

function FormEditProfile({ context, history }) {
  const classes = useStyles();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [inputs, setInputs] = useState({});
  const [tempUrl, setTempUrl] = useState("");

  const { user, setUser } = context;

  useEffect(() => {
    apiHandler.getUser(user._id).then((user) => {
      const { name, description, email, profilePicture } = user;
      setInputs({ name, description, email });
      setTempUrl(profilePicture);
      setIsLoading(false);
    });
  }, []);

  const handleInputsChange = (evt) => {
    evt.persist();
    let value = null;
    if (evt.target.type === "file") {
      const uploadedImage = evt.target.files[0];
      setTempUrl(URL.createObjectURL(uploadedImage));
      value = uploadedImage;
    } else {
      value = evt.target.value;
    }
    setInputs((inputs) => ({ ...inputs, [evt.target.name]: value }));
  };

  const handleSubmit = async (evt) => {
    evt.preventDefault();

    const fd = new FormData();
    for (let key in inputs) {
      if (inputs[key] !== user[key]) {
        fd.append(key, inputs[key]);
      }
    }

    const res = await apiHandler.updateUser(fd);
    if (!res.message) {
      setUser(res);
      history.push(`/profile/${user._id}`)
    }
  };

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  if (isLoading) return <CircularProgress />;
  return (
    <form className="form-edit-profil">
      <h2>Edit profile</h2>

      <div className={classes.imageInputWrapper}>
        <div
          style={{ backgroundImage: `url(${tempUrl})` }}
          className={classes.imageMini}
        ></div>
        <input
          accept="image/*"
          className={classes.input}
          id="contained-button-file"
          multiple
          type="file"
          name="profilePicture"
          onChange={handleInputsChange}
        />
        <label htmlFor="contained-button-file">
          <Button
            variant="contained"
            color="primary"
            component="span"
            startIcon={<CloudUploadIcon />}
          >
            Upload
          </Button>
        </label>
      </div>

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

      <Button variant="contained" color="primary" onClick={handleSubmit}>
        Validate
      </Button>
    </form>
  );
}

export default withUser(FormEditProfile);
