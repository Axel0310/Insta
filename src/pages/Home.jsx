import React, {useState, useEffect} from "react";
import ImageCard from "../components/ImageCard";
import apiHandler from "../api/apiHandler";

const Home = (props) => {
  const [images, setImages] = useState([])

  useEffect( () => {
    apiHandler.getAllImages()
    .then( images => {
      setImages(images);
    })
  }, [])

  console.log(images)
  return (
    <React.Fragment>
      {images.map( currentImage => <ImageCard key={currentImage._id} image={currentImage}/> )}
    </React.Fragment>
  );
};

export default Home;
