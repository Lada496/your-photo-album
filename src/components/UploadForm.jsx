import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { Card } from "react-bootstrap";
import { ProgressBar } from "react-bootstrap";
import { AuthContext } from "../store/auth-context";
import { storage } from "../firebase/config";
import axios from "axios";

const UploadForm = () => {
  const navigate = useNavigate();
  const { uid, accessToken } = useContext(AuthContext);
  const [progress, setProgress] = useState(0);
  const [showProgress, setShowProgress] = useState(false);
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({
    mode: "onChange", // "onChange"
  });
  const successHandler = async () => {
    setProgress(100);
    alert("upload completed!");
    setShowProgress(false);
    navigate("/loggedin/gallery");
  };
  const uploadDB = async (snapshot, tagData) => {
    const url = await getDownloadURL(snapshot);
    try {
      await axios.post(
        `https://your-photo-album-default-rtdb.firebaseio.com/images/${uid}.json?auth=${accessToken}`,
        {
          tag: tagData,
          imageUrl: url,
        }
      );
      await successHandler();
    } catch (error) {
      setProgress(0);
      setShowProgress(false);
      alert("⚠ Upload failed");
    }
  };
  const onSubmit = (data, e) => {
    setShowProgress(true);
    const storageRef = ref(storage, `/images/${uid}/${data.image[0].name}`);
    const uploadTask = uploadBytesResumable(storageRef, data.image[0]);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 99.9;
        setProgress(progress);
      },
      (error) => {
        switch (error.code) {
          case "storage/unauthorized":
            // User doesn't have permission to access the object
            alert("⚠ Access denied");
            break;
          case "storage/canceled":
            // User canceled the upload
            alert("⚠ Upload canceled");
            break;

          case "storage/unknown":
            // Unknown error occurred, inspect error.serverResponse
            alert("⚠ Unknown error occurred");
            break;
          default:
            alert("⚠ Upload failed");
        }
      },
      () => {
        try {
          uploadDB(uploadTask.snapshot.ref, data.tag);
        } catch (error) {
          setProgress(0);
          setShowProgress(false);
          alert("⚠ Upload failed");
        }
      }
    );
  };

  return (
    <>
      {showProgress && <ProgressBar now={progress} variant="secondary" />}
      <Card style={{ width: "18rem", margin: "2rem auto" }}>
        <Card.Title
          style={{ textAlign: "center", marginTop: "1rem", fontSize: "1.5rem" }}
        >
          Uploading
        </Card.Title>
        <Card.Body style={{ backgroundColor: "white" }}>
          <div className="form">
            <form onSubmit={handleSubmit(onSubmit)}>
              <div>
                <label htmlFor="image">Your Photo</label>
                <input
                  type="file"
                  accept="image/png, image/jpeg"
                  {...register("image", { required: true })}
                />
                {errors.image && <p>This is required</p>}
              </div>

              <div>
                <label htmlFor="tag">Tags</label>
                <input
                  placeholder="word1,word2,word3"
                  type="text"
                  {...register("tag", { required: false })}
                />
                {errors.password && <p>This is required</p>}
              </div>

              <input type="submit" />
            </form>
          </div>
        </Card.Body>
      </Card>
    </>
  );
};

export default UploadForm;
