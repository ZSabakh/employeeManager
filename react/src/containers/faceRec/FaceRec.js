import React, { useState } from "react";
import TopBar from "../../components/topBar/TopBar";
import "./FaceRec.css";
import { PostData } from "../../services/PostData";
import Spinner from "../../components/spinner/Spinner";

const FaceRec = () => {
  const [image, setImage] = useState(null);
  const [difficulty, setDifficulty] = useState("easy");
  const [serverImage, setServerImage] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  const onInputChange = (event) => {
    setImage(event.target.files[0]);
  };

  const faceRecognition = (picURL) => {
    setLoading(true);
    var findParams = new URLSearchParams();
    findParams.append("picURL", picURL);
    findParams.append("difficulty", difficulty);
    PostData("face_recognition", findParams).then((result) => {
      result.forEach(function (person) {
        person.image = "false";

        var pageParams = new URLSearchParams();
        pageParams.append("pid", person.name.split(" ")[2]);
        pageParams.append("lname", person.name.split(" ")[0]);

        PostData("find_with_pid", pageParams)
          .then((resp) => {
            if (resp.length > 0) {
              person.image = resp[0].image_code;
              setResults([...results]);
            }
          })
          .then(() => {
            setResults(result);
            setLoading(false);
          })
          .catch((err) => {
            console.log(err);
          });
      });
    });
  };

  const uploadFile = (file) => {
    setResults([]);
    const fileData = new FormData();
    fileData.append("image", file);
    PostData("faceupload", fileData, true).then((res) => {
      setServerImage(image.name);
      faceRecognition(`http://localhost:4000/faceimages/${image.name}`);
    });
  };
  return (
    <>
      <TopBar />
      <div className="facerec_content">
        <div className="facerec_form">
          <input type="file" onChange={(event) => onInputChange(event)} />
          <button onClick={() => uploadFile(image)}>Find</button>
          {serverImage ? (
            <img
              alt="Face to scan"
              className="facerec_image"
              src={`http://localhost:4000/faceimages/${serverImage}`}
            />
          ) : null}
          <p>Choose difficulty of finding face</p>
          <select
            name="options"
            value={difficulty}
            onChange={(event) => setDifficulty(event.target.value)}
          >
            <option value="easy">Easy</option>
            <option value="medium">Medium</option>
            <option value="hard">Hard</option>
          </select>
        </div>
        {loading ? <Spinner /> : null}
        <div className="detailed_container">
          {results.map((result, index) => (
            <div className="detailed_card" key={index}>
              <h2>{result.name}</h2>

              <img
                src={
                  results[index].image === "false"
                    ? "https://upload.wikimedia.org/wikipedia/en/e/ee/Unknown-person.gif"
                    : results[index].image.charAt(0) === "/"
                    ? `data:image/png;base64,${results[index].image}`
                    : `data:image/png;base64,${atob(results[index].image)}`
                }
                alt="Person"
              />
              <p>
                Probability: <u>{result.probability}%</u>
              </p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default FaceRec;
