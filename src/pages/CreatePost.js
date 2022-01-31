import React, { useState, useEffect } from "react";
import { addDoc, collection } from "firebase/firestore";
import { db, auth } from "../firebase-config";
import { useNavigate } from "react-router-dom";


function CreatePost({ isAuth }) {
  
  const [title, setTitle] = useState("");
  const [postText, setPostText] = useState("");
  const [postPhoto, setPostPhoto] = useState("");

  const postsCollectionRef = collection(db, "posts");
  let navigate = useNavigate();



  const createPost = async () => {
    await addDoc(postsCollectionRef, {
      title,
      postText,
      postPhoto,
      timime: Math.floor(Date.now() / 1000),
      author: { name: auth.currentUser.displayName, id: auth.currentUser.uid , photoURL: auth.currentUser.photoURL},
    });
    navigate("/");
  };

  useEffect(() => {
    if (!isAuth) {
      navigate("/login");
    }
  }, []);

  return (
    <div className="createPostPage">
      <div className="cpContainer">
        <h1>Create A Post</h1>
        <div className="inputGp">
          <label> Title:</label>
          <input
            placeholder="Title..."
            onChange={(event) => {
              setTitle(event.target.value);
            }}
          />
        </div>
        <div className="inputGp">
          <label> Post:</label>
          <textarea
            placeholder="Post..."
            onChange={(event) => {
              setPostText(event.target.value);
            }}
          />
        </div>
        <div className="inputGp">
          <label> Photo:</label>
          <input
            placeholder="Post..."
            onChange={(event) => {
              setPostPhoto(event.target.value);
            }}
          ></input>
        </div>
        <button onClick={createPost}> Submit Post</button>
      </div>
    </div>
  );
}

export default CreatePost;
