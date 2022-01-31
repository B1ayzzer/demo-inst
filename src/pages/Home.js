import React, { useEffect, useState } from "react";
import { getDocs, collection, deleteDoc, doc  } from "firebase/firestore";
import { auth, db } from "../firebase-config";

function Home({ isAuth ,searchTern}) {
  const [postLists, setPostList] = useState([]);
  const postsCollectionRef = collection(db, "posts");

  const getPosts = async () => {
    const data = await getDocs(postsCollectionRef);
    const posts = data.docs.map((doc) => ({ ...doc.data(), id: doc.id })).sort((a,b) => b.timime - a.timime)
    setPostList(posts);
  };
  useEffect(() => {
    getPosts();
  },[]);

  function timeConverter(UNIX_timestamp) {
    let a = new Date(UNIX_timestamp * 1000);
    let months = [
      "01",
      "02",
      "03",
      "04",
      "05",
      "06",
      "07",
      "08",
      "09",
      "10",
      "11",
      "12",
    ];
    let year = a.getFullYear();
    let month = months[a.getMonth()];
    let date = a.getDate();
    let hour = a.getHours();
    let min = a.getMinutes();
    let time = date + "." + month + "." + year + "г." + " " + hour + ":" + min;
    return time;
  }

  const deletePost = async (id) => {
    const postDoc = doc(db, "posts", id);
    await deleteDoc(postDoc);
    getPosts();

    
  };
  return (
    
    <div className="homePage">
      {postLists.filter((post) => {
        if(searchTern ==""){
          return post
        }else if(post.author.name.toLowerCase().includes(searchTern.toLowerCase())){
          return post
        }
        console.log(searchTern)
      }).map((post,key) => {
        return (
          <div className="post" key={key}>
            <div className="author__head">
            <img  className="photoURL" src={post.author.photoURL}></img>
            <h3 className="nickname">{post.author.name} </h3>
            <h3 className="nickname">{timeConverter(post.timime)} </h3>
            </div>
            <div className="postHeader">
              <div className="title">
                <h1> {post.title}</h1>
              </div>
              <div className="deletePost">
                {isAuth && post.author.id === auth.currentUser.uid && (
                  <button
                    onClick={() => {
                      deletePost(post.id);
                    }}
                  >
                    &#128465;
                  </button>
                )}
              </div>
            </div>
            <img className="post__photo" src={post.postPhoto}></img>
            <div className="postTextContainer"> {post.postText} </div>
            
          </div>
        );
      })}
    </div>
  );
}

export default Home;
