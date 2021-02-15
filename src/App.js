import React, {useState,useEffect} from 'react';
import './App.css';
import Post from './Post';
import {db} from './firebase';

function App() {
  const [posts,setPosts] = useState([    
  ]);

  useEffect(() => {
    db.collection('posts').onSnapshot(snapshot => {
      setPosts(
        snapshot.docs.map(doc => ({
          id : doc.id,
          post : doc.data()
        }))
      )
    })
  },[])

  return (
      <div className="app">
        <div className="app__header">
          <img alt="" className="app__headerImage" src="data:image/png;base64,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" />
        </div>


      {
        posts.map(({id,post})=>(
          <Post key={id} username={post.username} caption={post.caption} imageUrl={post.imageUrl}/>
        ))
      }

         {/* Header */}


        {/* post */}
        {/* post */}
      </div>

  );
}

export default App;
