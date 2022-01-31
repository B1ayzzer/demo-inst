import React, { useState, useEffect } from "react";
import { addDoc, collection, getDocs, doc ,onSnapshot,query} from "firebase/firestore";
import { db, auth } from "../firebase-config";
import { Avatar, Button, Container, Grid, TextField } from "@mui/material";

const Chat = ({ isAuth }) => {
  const [mesLists, setMesList] = useState([]);
  const [value, setValue] = useState("");
  const postsCollectionRef = collection(db, "massage");
  const q = query(collection(db, "massage"));

//   const getPosts = async () => {
//     const data = await getDocs(postsCollectionRef);
//     const posts = data.docs
//       .map((doc) => ({ ...doc.data(), id: doc.id }))
//       .sort((a, b) => b.timime - a.timime);
//     setMesList(posts);
//   };
  function getPosts() {
    ////////////////////////////////////get users
    onSnapshot(q, (querySnapshot) => {
      const usersList = [];
      querySnapshot.forEach((doc) => {
        usersList.push({ ...doc.data(), id: doc.id });
      })

     setMesList(usersList.sort((a, b) => b.timime - a.timime))
    })
  }
  useEffect(() => {
    getPosts();
  }, []);

  const sendMassage = async () => {
    await addDoc(postsCollectionRef, {
      value,
      timime: Math.floor(Date.now() / 1000),
      name: auth.currentUser.displayName,
      id: auth.currentUser.uid,
      photoURL: auth.currentUser.photoURL,
    });
    setValue("");
    getPosts();
  };
  return (
    <Container>
      <Grid
        container
        justify={"center"}
        style={{ height: window.innerHeight - 50, marginTop: 20 }}
      >
        <div
          style={{
            width: "80%",
            height: "60vh",
            border: "1px solid gray",
            overflow: "auto",
          }}
        >
          {mesLists.map((mes , key={key}) => {
            return (
              <div key={key}
                style={{
                  margin: 10,
                  border: "2px solid black",
                  width: "fit-content",
                }}
              >
                <Grid container>
                  <Avatar src={mes.photoURL} />
                  <h3>{mes.name}</h3>
                </Grid>
                <h3>{mes.value}</h3>
              </div>
            );
          })}
        </div>
        <Grid
          container
          direction={"column"}
          alignItems={"flex-end"}
          style={{ width: "80%" }}
        >
          <TextField
            fullWidth
            variant={"outlined"}
            value={value}
            onChange={(event) => setValue(event.target.value)}
          />
          <Button onClick={sendMassage}>Send</Button>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Chat;
