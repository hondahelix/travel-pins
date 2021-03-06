import react, { useState } from "react";
import API from "../../utils/API";
import "./style.css";

function Upload({ country }) {
  console.log(country);
  console.log("hit upload");
  const [selectedFile, setSelectedFile] = useState();
  const [previewSource, setPreviewSource] = useState("");
  const [upload, setUpload] = useState(true);

  const handleChange = (event) => {
    event.preventDefault();
    const file = event.target.files[0];
    console.log(file);
    previewFile(file);
    setSelectedFile(file);
    setUpload(false);
  };

  const previewFile = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setPreviewSource(reader.result);
    };
  };

  const handleSubmitFile = (event) => {
    event.preventDefault();
    //checks to see if a file is set to upload if not return
    if (!selectedFile) {
      return;
    }
    const reader = new FileReader();
    reader.readAsDataURL(selectedFile);
    reader.onloadend = () => {
      //uploadImage(reader.result);
      API.Upload({ data: reader.result, countryCode: country})
        .then((res) => {
          console.log("upload success");
        })
        .catch((err) => {
          console.log(err);
        });
      //setFileInputState('');
      setPreviewSource("");
    };
    reader.onerror = () => {
      console.error("upload error");
    };
    setUpload(true);
  };

  return (
    <div className="upload">
      {upload ? (
        <div className="container">
          <label for="fileInput" className="uploadbtn">
            <h2 id="postbtnText">Upload</h2>
            <i className="material-icons material-icons-outlined" id="post">
                add
            </i>
          </label>
          <input
            id="fileInput"
            type="file"
            name="image"
            onChange={handleChange}
            className="form-input"
          />
        </div>
      ) : (
        <div className="imgSubmit">
          {previewSource && (
            <div className="imgContainer">
                <img
                className="imagePreview"
                src={previewSource}
                alt="chosen"
                style={{ height: "300px" }}
                />
            </div>
          )}
          <button className="submitBtn" type="submit" onClick={handleSubmitFile}>
            Submit
          </button>
        </div>
      )}
    </div>
  );
}

export default Upload;
