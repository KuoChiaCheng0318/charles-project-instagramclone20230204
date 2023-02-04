import './App.css';
import React, { useState, useEffect } from 'react';
import Post from './Post';
import {db, auth} from "./firebase";
import Modal from '@mui/material/Modal';
import { makeStyles } from '@material-ui/core/styles';
import { Button, Input } from '@material-ui/core';
import ImageUpload from './ImageUpload';
import Sidebar from './Sidebar';
// import InstagramEmbed from 'react-instagram-embed';

// work on modal, modal is something we click,
//  then the modal will pop up,
//  and the original home page will be in the background
function getModalStyle() {
  const top = 50 ;
  const left = 50 ;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

// work on modal
const useStyles = makeStyles((theme) => ({
  paper:{
    position: 'absolute',
    width: 400 ,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2,4,3),
  },
}));

function App() {
  // work on modal
  const classes = useStyles();
  const [modalStyle] = React.useState(getModalStyle);
  const [posts, setPosts] = useState([]);
  const [open, setOpen] = useState(false);
  const [openSignIn, setOpenSignIn] = useState(false);
  const [username, SetUsername] = useState('');
  const [email, SetEmail] = useState('');
  const [password, SetPassword] = useState('');
  const [user, setUser] =useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      if(authUser){
        // if user has logged in...
        console.log(authUser);
        setUser(authUser);

      }else{
        // user has logged out...
        setUser(null);
      }
    })

    return() => {
      unsubscribe();
    }

  },[user, username]);

  useEffect(() => {
    db.collection("posts").orderBy("timestamp", "desc").onSnapshot((snapshot) => {
      setPosts(snapshot.docs.map((doc) => ({
        // id -> so that won't render other posts if new post data added in firebase.
        id: doc.id,
        post: doc.data()
      })))
    })
  },[]);

  const signUp = (event) => {
    event.preventDefault();
    auth.createUserWithEmailAndPassword(email, password)
    .then((authUser) => {
      return authUser.user.updateProfile({
        displayName: username
      })
    })
    .catch((error) => alert(error.message))
    setOpen(false);
  }

  const signIn = (event) => {
    event.preventDefault();
    auth
      .signInWithEmailAndPassword(email, password)
      .catch((error) => alert(error.message))
    setOpenSignIn(false);
  }

  return (
    <div className="app">
      {/* want to have caption input, file picker, post button */}
      
      {/* work on modal */}
      <Modal
        open={open}
        onClose={() => setOpen(false)}
      >
        <div style={modalStyle} className={classes.paper}>
          <form className='app__signup'>
            <center>
              <img className='app__headerImage' 
                src="logo-no-background.png"
                alt="" />
            </center>
            <Input
              placeholder='username'
              type='text'
              value={username}
              onChange={(e) => SetUsername(e.target.value)}
            />
            <Input
              placeholder='email'
              type='text'
              value={email}
              onChange={(e) => SetEmail(e.target.value)}
            />
            <Input
              placeholder='password'
              type='password'
              value={password}
              onChange={(e) => SetPassword(e.target.value)}
            />
            <Button type="submit" onClick={signUp}>Sign Up</Button>
          </form>
        </div>
      </Modal>
      <Modal
        open={openSignIn}
        onClose={() => setOpenSignIn(false)}
      >
        <div style={modalStyle} className={classes.paper}>
          <form className='app__signup'>
            <center>
              <img className='app__headerImage' 
                src="logo-no-background.png"
                alt="" />
            </center>
            <Input
              placeholder='email'
              type='text'
              value={email}
              onChange={(e) => SetEmail(e.target.value)}
            />
            <Input
              placeholder='password'
              type='password'
              value={password}
              onChange={(e) => SetPassword(e.target.value)}
            />
            <Button type="submit" onClick={signIn}>Sign In</Button>
          </form>
        </div>
      </Modal>


      <div className='app__header'>
        <a href="/">
          <img className='app__headerImage' 
          src="logo-no-background.png"
          alt="" />
        </a>
        <p>This is Charles' webpage for practicing React.js and Firebase functions including log in and upload images. </p>

        {user? (
          <Button onClick={() => auth.signOut()}>Logout</Button>
        ):(
          <div className='app__loginContainer'>
            <Button onClick={() => setOpenSignIn(true)}>Sign in</Button>
            <Button onClick={() => setOpen(true)}>Sign up</Button>
          </div>
        )}
      </div>

      
      <div className='app__mainpage'>
      {user?.displayName? (
        <Sidebar className="app__sidebar" username={user.displayName}/>
        ):(<Sidebar className="app__sidebar" />)}
        <div className='app__posts'>
          <div className='app__postsLeft'>
            {
              posts.map(({id, post}) => (
                <Post key={id}
                user={user}
                postId={id}
                username={post.username} 
                caption={post.caption} 
                imageUrl={post.imageUrl} />
              ))
            }
          </div>
          
          {/* <div className='app__postsRight'>
            <InstagramEmbed 
              className="floating"
              url="https://www.instagram.com/p/CoA-FqCs6UN/"
              maxWidth={320}
              hideCaption={false}
              containerTagName="div"
              protocol=""
              injectScript
              onLoading={() => {}}
              onSuccess={() => {}}
              onAfterRender={() => {}}
              onFailure={() => {}}
            />
          </div> */}
        </div>
        
        <div className='app__createpost'>
          {user?.displayName? (
            <ImageUpload username={user.displayName} />
          ):(
            <h3>Login to upload posts</h3>
          )}
        </div>
        
      </div>
      </div>
      

      
      

      
  );
}

export default App;
