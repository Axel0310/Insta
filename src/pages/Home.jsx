import React, {useState, useEffect} from "react";
import ImageCard from "../components/ImageCard";
import apiHandler from "../api/apiHandler";
import CircularProgress from '@material-ui/core/CircularProgress';

const Home = (props) => {
  const [images, setImages] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect( () => {
    apiHandler.getAllImages()
    .then( images => {
      setImages(images);
      setIsLoading(false);
    })
  }, [])

  if(isLoading) return <CircularProgress />
  return (
    <React.Fragment>
      {images.map( currentImage => <ImageCard key={currentImage._id} image={currentImage}/> )}
    </React.Fragment>
  );
};

export default Home;
