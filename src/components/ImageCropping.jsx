import React, { useState, useCallback, useEffect } from "react";
import Slider from "@material-ui/core/Slider";
import Grid from "@material-ui/core/Grid";
import ZoomOutIcon from "@material-ui/icons/ZoomOut";
import ZoomInIcon from "@material-ui/icons/ZoomIn";
import Cropper from "react-easy-crop";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  croppingToolWrapper: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    marginTop: "20px",
  },
  cropWrapper: {
    position: "relative",
    width: "100vw",
    height: 0,
    paddingTop: "75%",
  },
  slider: {
    width: "50%",
    alignItems: "center",
  },
});

const createImage = (url) =>
  new Promise((resolve, reject) => {
    const image = new Image();
    image.addEventListener("load", () => resolve(image));
    image.addEventListener("error", (error) => reject(error));
    image.setAttribute("crossOrigin", "anonymous"); // needed to avoid cross-origin issues on CodeSandbox
    image.src = url;
  });

async function getCroppedImg(imageSrc, pixelCrop) {
  const image = await createImage(imageSrc);
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");

  canvas.width = image.naturalWidth;
  canvas.height = image.naturalHeight;

  ctx.drawImage(image, 0, 0);

  const data = ctx.getImageData(
    pixelCrop.x,
    pixelCrop.y,
    pixelCrop.width,
    pixelCrop.height
  );

  canvas.width = pixelCrop.width;
  canvas.height = pixelCrop.height;

  ctx.putImageData(data, 0, 0);

  return new Promise((resolve) => {
    canvas.toBlob((file) => {
      resolve(file);
    }, "image/jpeg");
  });
}

export default function ImageCropping({ imgUrl, clbkCrop, round }) {
  const classes = useStyles();
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);

  const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);

  const handleCropValidation = async () => {
    try {
      const croppedImg = await getCroppedImg(imgUrl, croppedAreaPixels);
      clbkCrop(croppedImg);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className={classes.croppingToolWrapper}>
      <div className={classes.cropWrapper}>
        <Cropper
          image={imgUrl}
          crop={crop}
          zoom={zoom}
          onCropChange={setCrop}
          onCropComplete={onCropComplete}
          onZoomChange={setZoom}
          aspect={round ? 1 : 4 / 3}
          cropShape={round ? "round" : "rect"}
        />
      </div>
      <Grid container spacing={2} className={classes.slider}>
        <Grid item>
          <ZoomOutIcon />
        </Grid>
        <Grid item xs>
          <Slider
            value={zoom}
            min={1}
            max={3}
            step={0.1}
            aria-labelledby="Zoom"
            onChange={(e, zoom) => setZoom(zoom)}
          />
        </Grid>
        <Grid item>
          <ZoomInIcon />
        </Grid>
      </Grid>
      <Button
        variant="contained"
        color="primary"
        component="span"
        onClick={handleCropValidation}
      >
        Validate image
      </Button>
    </div>
  );
}
