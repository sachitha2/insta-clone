import React, {useState,useEffect} from 'react';
import './App.css';
import Post from './Post';
import {auth, db,msg} from './firebase';
import { Button, Input, Modal } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import ImageUpload from './ImageUpload';
import InstagramEmbed from 'react-instagram-embed';

function getModalStyle() {
  const top = 50 ;
  const left = 50 ;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyles = makeStyles((theme) => ({
  paper: {
    position: 'absolute',
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(4, 4, 3),
  },
}));

function App() {

  useEffect(() => {
    msg.requestPermission().then(()=>{
      return msg.getToken();
    }).then((data)=>{
      console.warn("token",data);
    })
  })

  const classes = useStyles();
  const [modalStyle] = useState(getModalStyle);
  const [open,setopen] = useState(false);
  const [openSignIn,setOpenSignIn] = useState(false);

  const [username,setUsername] = useState([]);
  const [email,setEmail] = useState([]);
  const [password,setPassword] = useState([]);

  const [user,setUser] = useState(null);

  const [posts,setPosts] = useState([]);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      if(authUser){
        //user has logged in
        console.log(authUser);
        setUser(authUser);

      }else{
        //user has  logged out...
        setUser(null);
      }
    })

    return () => {
      //perform some clean up actions
      unsubscribe();
    }
  }, [user,username])

  useEffect(() => {
    db.collection('posts').orderBy('timestamp','desc').onSnapshot(snapshot => {
      setPosts(
        snapshot.docs.map(doc => ({
          id : doc.id,
          post : doc.data()
        }))
      )
    });
  },[])


  const handleClose = () =>{
    setopen(false);
  }

  const handleCloseSignIn = () =>{
    setOpenSignIn(false);
}

  const signUp = (event) => {
      event.preventDefault();
      auth
      .createUserWithEmailAndPassword(email,password)
      .then((authUser) => {
        return authUser.user.updateProfile({
          displayName: username
        })
      })
      .catch((err) => alert(err.message))

  }

  const signIn = (e) => {
    e.preventDefault();
    auth.signInWithEmailAndPassword(email,password)
    .catch((err) => alert(err.message))


    setOpenSignIn(false)
  }

  return (
      <div className="app">
        {/* caption */}
        {/* file picker */}
        {/* Post btn */}
        
        
        <Modal
          open={open}
          onClose={handleClose}
        >
          <div style={modalStyle} className={classes.paper}>
            <form className="app__signup">
              <center>
                <img
                  height="100"
                  className="app__headerImage"
                  src="http://infinisolutionslk.com/img/INFINISOLUTION.png"
                />
                </center>
                <Input
                  placeholder="username"
                  type='text'
                  value={username}
                  onChange={(e)=>setUsername(e.target.value)}/>
                <Input
                  placeholder="email"
                  type='text'
                  value={email}
                  onChange={(e)=>setEmail(e.target.value)}/>

                <Input
                  placeholder="password"
                  type='password'
                  value={password}
                  onChange={(e)=>setPassword(e.target.value)}/>
                  <Button type="submit" onClick={signUp}>Sign Up</Button>
                  
            </form>
            
          </div>
        </Modal>


        <Modal
          open={openSignIn}
          onClose={handleCloseSignIn}
        >
          <div style={modalStyle} className={classes.paper}>
            <form className="app__signup">
              <center>
                <img
                  height="100"
                  className="app__headerImage"
                  src="http://infinisolutionslk.com/img/INFINISOLUTION.png"
                />
                </center>
                
                <Input
                  placeholder="email"
                  type='text'
                  value={email}
                  onChange={(e)=>setEmail(e.target.value)}/>

                <Input
                  placeholder="password"
                  type='password'
                  value={password}
                  onChange={(e)=>setPassword(e.target.value)}/>
                  <Button type="submit" onClick={signIn}>Sign In</Button>
                  
            </form>
            
          </div>
        </Modal>
        <div className="app__header">
          <img alt="" height="100px" className="app__headerImage" src="http://infinisolutionslk.com/img/INFINISOLUTION.png" />
          {
                    user ? (
                      <Button onClick={()=>auth.signOut()}>
                      Logout
                    </Button>
                    ):(
                      <div className="app__loginContainer">
                          <Button onClick={()=>setOpenSignIn(true)}>
                            Sign In
                          </Button>
                          <Button onClick={()=>setopen(true)}>
                            Sign Up
                          </Button>
                      </div>
                      
                    )
                  }
        </div>

       
      <div className="app__post">
        
        <div className="app__postLeft">
          {
            user?.displayName ? (<ImageUpload username = {user.displayName}/>):(<h3>Sorry login to upload.</h3>)
          }
          {
            posts.map(({id,post})=>(
              <Post user={user} key={id} postId={id} username={post.username} caption={post.caption} imageUrl={post.imageUrl}/>
            ))
          }
        </div>

        <div className="app__postRight">
          <InstagramEmbed
          url='https://instagr.am/p/Zw9o4/'
          maxWidth={320} 
          hideCaption={false}
          containerTagName='div'
          protocol=''
          injectScript
          onLoading={() => {}}
          onSuccess={() => {}}
          onAfterRender={() => {}}
          onFailure={() => {}}
        />
        </div>
        
        
      </div>
      
 
      

         {/* Header */}


        {/* post */}
        {/* post */}
        
      </div>

  );
}

export default App;
