import { Button } from '@material-ui/core';
import {storage,db} from './firebase'
import React, {useState,useEffect} from 'react';
import firebase from 'firebase'

function ImageUpload({username}) {
    const [caption,setCaption] = useState('');
    const [progress, setProgress] = useState(0)
    const [image, setImage] = useState(null)



    const handleChange  = (e) => {
        if(e.target.files[0]){
            setImage(e.target.files[0])
        }
    };

    const handleUpload = (e) => {
        const uploadTask = storage.ref(`images/${image.name}`).put(image);

        uploadTask.on(
            "state_changed",
            (snapshot) => {
                //progress function...
                const progress = Math.round(
                    (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                );
                setProgress(progress);
            },
            (err) => {
                //err func...

                console.log(err)
                alert(err.message)
            },
            () => {
                //complete function...
                storage
                    .ref("images")
                    .child(image.name)
                    .getDownloadURL()
                    .then(url => {
                        db.collection("posts").add({
                            timestamp : firebase.firestore.FieldValue.serverTimestamp(),
                            caption : caption,
                            imageUrl : url,
                            username : username
                        })
                    })
            }
        )
    }
    return (
        <div>
            <input type="text" placeholder='Enter a caption...' onChange={e => setCaption(e.target.value)} value={caption}/>
            <input type="file" onChange={handleChange} />
            <Button className="imageupload__button" onClick={handleUpload}>
                Upload
            </Button>
        </div>
    )
}

export default ImageUpload