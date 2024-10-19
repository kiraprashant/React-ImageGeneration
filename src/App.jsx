import React, { useState, useEffect } from "react";
import axios from "axios";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import Modal from 'react-modal';


const App = () => {
  const [field, setfield] = useState("");
  const [Image, setImage] = useState("");
  const [isLoading, setisLoading] = useState(false);
  const [dBlock, setdBlock] = useState("none");
  const [modalIsOpen, setIsOpen] = React.useState(false);
  const [SaveImage,setSaveImage] = useState(false)
  const [selectModel, setseletModel] = useState([
    {
      modelid:
        "https://api-inference.huggingface.co/models/stabilityai/stable-diffusion-xl-base-1.0",
      Name: "Stable-diffusion",
    },
    {
      modelid:
        "https://api-inference.huggingface.co/models/black-forest-labs/FLUX.1-dev",
      Name: "black-forest-labs/FLUX",
    },

    {
      modelid:
        "https://api-inference.huggingface.co/models/stable-diffusion-v1-5/stable-diffusion-v1-5",
      Name: "Stable-diffusion-1.5",
    },
  ]);

  const [selectedModel, setselectedModel] = useState(
    {
     modelid:"https://api-inference.huggingface.co/models/stabilityai/stable-diffusion-xl-base-1.0",
     Name:"stable-diffusion-xl-base"
    } 
    );

    useEffect(() => {
      if (selectedModel) {
        console.log("Updated selectedModel:", selectedModel);
      }
    }, [selectedModel]);

  const customStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
    },
  };

  // useEffect(() => {
  //   console.log("useEffect Changing ,", selectedModel);
  // }, [selectedModel]);

  function closeModal() {
    setIsOpen(false);
  }

   function query(data,datamodel) {
    console.log("///////", selectedModel.modelid);
    if (!data) {
      return false;
    }

    if (!selectModel) {
      return false;
    }

    console.log("l,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,", data);
    setisLoading(true);
    setSaveImage(false)
    setdBlock("block");

    axios
      .post(
        // "https://api-inference.huggingface.co/models/stabilityai/stable-diffusion-xl-base-1.0",
        selectedModel.modelid,
        data,
        {
          headers: {
            Authorization: "Bearer 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",
            "Content-Type": "application/json",
          },
          responseType: "blob",
        }
      )
      .then((res) => {
        const Image = URL.createObjectURL(res.data);
        console.log(res.data);
        console.log(Image);
        setImage(Image);
        setisLoading(false);
        
      })
      .catch((e) => {
        console.log(e);
        setisLoading(false);
      });
  }

  const SavingImage = async () => {
    const blobUrl = Image;

    // Fetch the Blob from the Blob URL
    const response = await fetch(blobUrl);
    const blob = await response.blob();

    const formData = new FormData();

    // Append the Blob with a specified filename
    formData.append("image", blob, "prashantnair1999@gmail.com.png");
    formData.append("UserGmail", "prashantNair1999@gmail.com");
    formData.append("UserName", "Prashant");
    formData.append("Model", selectedModel.Name);
    formData.append("Prompt", field);
    // console.log("data saving :",formData.entries())

    const dataToServer = {
      name: "prashantnair",
      ImageDetail: formData,
    };

    axios
      .post("http://localhost:4000/SaveImage", formData, {
        // headers: {
        //   'Content-Type': 'multipart/form-data',
        // },
        responseType: "blob",
      })
      .then((res) => {
        console.log(res);
        setIsOpen(true)
        // setisLoading(true)
        setSaveImage(true)
      })
      .catch((err) => {
        console.log(err);
      });

    console.log(dataToServer);
  };

  const handlechange = (e) => {
    const selectedObj = selectModel.find(option => option.modelid === e.target.value);
    setselectedModel(selectedObj);
    console.log(selectedModel);
  };

  return (
    <div className="container">

      <h1 className="mb-4">Image Generation</h1>
      <p className="mb-4">
        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 "A modern, visually captivating
        image featuring a sleek, minimalist design that perfectly blends with
        the website's overall aesthetic. The background is a smooth gradient of
        soft pastel colors, transitioning seamlessly from a light sky blue at
        the top to a warm peach at the bottom. In the center, a stylish and
        elegant element stands out—whether it's a product, logo, or artistic
        illustration—bathed in soft lighting that creates a subtle yet striking
        shadow. The image exudes a sense of professionalism and creativity,
        drawing attention without overwhelming the viewer."
      </p>

      <div
        style={{ display: "flex", flexDirection: "column" }}
        className="mb-4"
      >
        <select
          className="mb-1 form-control"
          // value={selectedModel.modelid}
          onChange={(e) => handlechange(e)}
        >
          {selectModel.map((elem) => (
            <option value={elem.modelid}>{elem.Name}</option>
          ))}
        </select>
      </div>
      <div
        style={{ display: "flex", justifyContent: "space-between" }}
        className="mb-4"
      >
        <input
          style={{ width: "85%" }}
          className="form-control"
          type="text"
          value={field}
          onChange={(e) => setfield(e.target.value)}
          placeholder="give me prompt to generate the image"
        />
        <button
          onClick={() => query(field,selectedModel)}
          style={{ width: "150px" }}
          type="button"
          className="btn btn-primary"
        >
          Generate
        </button>
      </div>

      {isLoading ? (
        <SkeletonTheme>
          <Skeleton width={"420px"} height={"420px"} count={1} />
        </SkeletonTheme>
      ) : null}

      {!isLoading ? (
        <>
          <div
            className="mb-4"
            style={{ width: "420px", height: "420px", display: dBlock }}
          >
            <img
              style={{ width: "100%", height: "100%", bjectFit: "cover" }}
              src={Image}
              className="rounded img-fluid"
            />
          </div>
          {/* <button
            onClick={() => SavingImage(field)}
            style={{ width: "150px", display: dBlock }}
            type="button"
            className="btn btn-success mb-4"
          >
            Save To Server
          </button> */}
          
        </>
      ) : null}

      {SaveImage?<div>Image Saved</div>:null}
      
    </div>
  );
};

export default App;
