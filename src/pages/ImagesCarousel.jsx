import React, { useState, useEffect } from "react";
import apiHandler from "../api/apiHandler";
import CircularProgress from "@material-ui/core/CircularProgress";
import ImageCard from "../components/ImageCard";
import { withUser } from "../components/Auth/withUser";

function ImagesCarousel({ match, context }) {
  const [images, setImages] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (match.params.mode === "home") {
      apiHandler.getAllImages().then((fetchedImages) => {
        setImages(fetchedImages);
        setIsLoading(false);
      });
    } else if (match.params.mode === "profile") {
      apiHandler.getProfileImages(match.params.id).then((fetchedImages) => {
        setImages(fetchedImages);
        setIsLoading(false);
      });
    }
  }, [match, context.user]);

  const handleDelete = async (imgId) => {
    const updatedUser = await apiHandler.deleteImage(imgId);
    context.setUser(updatedUser);
  };

  const handleLike = async (likedImgId) => {
    const updatedImage = await apiHandler.toggleLike(likedImgId);
    setImages(images => {
        const index = images.findIndex( img => img._id === likedImgId);
        const newImages = [...images];
        newImages[index] = updatedImage;
        return newImages;
    })
  };

  if (isLoading) return <CircularProgress />;
  return (
    <React.Fragment>
      {images.map((currentImage) => (
        <ImageCard
          key={currentImage._id}
          image={currentImage}
          clbkDelete={handleDelete}
          clbkLike={handleLike}
        />
      ))}
    </React.Fragment>
  );
}

export default withUser(ImagesCarousel);
