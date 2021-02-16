import React,{useState,useEffect} from 'react'
import './Post.css'
import Avatar from '@material-ui/core/Avatar'
import {auth, db} from './firebase';
import firebase from 'firebase'

function Post({postId,user,username,caption,imageUrl}) {
    const [comments, setComments] = useState([])

    const [comment, setComment] = useState('')

    useEffect(() => {
        let unsubscribe;
        if(postId){
            unsubscribe = db
                .collection("posts")
                .doc(postId)
                .collection("comments")
                .orderBy('timestamp','asc')
                .onSnapshot((snap) => {
                    setComments(snap.docs.map((doc) =>doc.data()));
                });
        }
        return () => {
            unsubscribe();
        };
    }, [postId])



    const postComment = (e) => {
        e.preventDefault(); 
        db.collection("posts").doc(postId).collection("comments").add(
            {
                text:comment,
                username:user.displayName,
                timestamp: firebase.firestore.FieldValue.serverTimestamp()
            });
        setComment('');
    }
    return (
        <div className="post">
            <div className="post__header">
                <Avatar
                    className="post__avatar"
                    alt="Sachitha Hirushan"
                    src="https://banner2.cleanpng.com/20180625/req/kisspng-computer-icons-avatar-business-computer-software-user-avatar-5b3097fcae25c3.3909949015299112927133.jpg"
                />
                <h3>{username}</h3>
                {/* header -> avatar + username */}

            </div>

            <img className="post__image" src={imageUrl} alt=""/>
            {/* image */}

            <h4 className="post__text"><strong>{username} </strong>  {caption}</h4>
            {/* username + caption */}

            {/* Post comments here */}
            <div className="post__comments">
                {
                    comments.map((com) => (
                        <p>
                            <b>{com.username}</b> {com.text}
                        </p>
                    ))
                }
            </div>
            {
                user && (
                    <form className="post__commentBox">
                        <input type="text" className="post__input" placeholder="Add a Comment" value={comment} onChange={(e) => setComment(e.target.value)}/>
                        <button disabled={!comment} type="submit" onClick={postComment} className="post__button">
                            Post
                        </button>
                    </form>
                )
            }
            

        </div>
    )
}

export default Post
