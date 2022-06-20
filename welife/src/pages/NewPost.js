import { useState } from "react";
import "../pages/NewPost.css";
import preview from "../assets/photo.png";
import { getFirestore } from "firebase/firestore";
import { collection,serverTimestamp,doc,setDoc } from "firebase/firestore";
import { useAuth, storage } from '../utils/firebase';
import { ref, uploadBytes, getDownloadURL } from"firebase/storage";
import { useNavigate } from 'react-router-dom';

const NewPost = () => {
    const db=getFirestore();
    const currentUser=useAuth();
    const [file,setFile]=useState();
    const imgUrl=file? URL.createObjectURL(file):preview;
    const [content,setContent]=useState('');
    const navigate=useNavigate();


    const handleSubmit=()=>{
        if(!file){
            alert('please choose the img file to update');
            return;
        }
        if(!currentUser){
            alert('login, please');
            return;
        }
        if(!(currentUser.displayName)||!(currentUser.photoURL)){
            alert('complete profile before post, please');
            return;
        }
        const collectionRef=doc(collection(db,"posts"));
        const storageRef=ref(storage,`post-images/${collectionRef.id}.jpg`);
        const metadata={
            contentType:file.type,
        }
        const uploadimg=uploadBytes(storageRef,file,metadata)
        .then((snapshot)=>{
            getDownloadURL(snapshot.ref).then((url)=>{
                const docRef=setDoc(collectionRef,{
                    content,
                    createdAt:serverTimestamp(),
                    author: {
                        displayName: currentUser ? currentUser.displayName: '',
                        photoURL:currentUser ? currentUser.photoURL: '',
                        uid: currentUser ? currentUser.uid: '',
                        email: currentUser ? currentUser.email: '',
                    },
                    url,
                })
                .then(()=>{
                    setContent('');
                    setFile();
                    alert('Post succ!');
                    navigate('/');
                })
                .catch((err)=>{
                    console.log(err);
                })
            })
        })
        }
    return (
        <div className="newpost_wrapper">
            <div className="newpost_title">
                New Post
                <label htmlFor="post-img" className="newpost_img-btn">Upload image</label>
            </div>
            <div className="newpost_img-wrapper">
                <img src={imgUrl} className="newpost_img"></img><br/>
                <input type="file" accept="image/png, image/jpeg" id="post-img" style={{display:'none'}} onChange={(e)=>setFile(e.target.files[0])}></input>
            </div>
            <div className="newpost_content">
                <textarea rows="10" cols="60" className="newpost_content-input" value={content} onChange={(e)=>setContent(e.target.value)}></textarea>
            </div>
            <button className="newpost_send" onClick={()=>handleSubmit()}>
                Post
            </button>
        </div>
    );
}
 
export default NewPost;