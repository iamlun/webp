import "./User.css";
import { useNavigate} from "react-router-dom";
import { useState, useEffect } from "react";
import { deleteUser,updateProfile } from 'firebase/auth';
import { getFirestore,collection, doc,setDoc, deleteDoc,getDocs } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL, deleteObject } from"firebase/storage";
import { logout, storage, useAuth } from "../utils/firebase";
import user from "../assets/user.png";
const User = () => {
    const db=getFirestore();
    const currentUser=useAuth();
    const navigate=useNavigate();
    const [file,setFile]=useState();
    const [photoURL,setPhotoURL]=useState();
    const imgUrl=photoURL? photoURL:user;
    const [name,setName]=useState('');
    const [loading,setLoading]=useState(false);
    useEffect(()=>{
        if(currentUser===undefined){
            setLoading(true);
        }
        else{
            setLoading(false);
            setName(currentUser.displayName);
            setPhotoURL(currentUser.photoURL);
        }
    },[currentUser])
    const handleLogout=()=>{
        logout()
        .then(()=>{
            navigate('/');
        })
        .catch((err)=>{
            console.log(err);
        })
    }

    let deletepost=[];
    let deletenum=-1;

    const  handleDelete=async ()=>{
        if(!currentUser){
            alert('error');
            return;
        }
        const querySnapshot=await getDocs(collection(db,"posts"));
        querySnapshot.forEach((doc)=>{
            if(doc.data().author.uid===currentUser.uid){
                deletenum=deletenum+1;
                deletepost[deletenum]=doc.id;
            }                            
        })
        if(deletenum < 0){
            deleteUser(currentUser).then(()=>{
                console.log('delete succ');
                navigate('/');})
                .catch((err)=>{
                    console.log(err);
                })
            return;            
        }
        deletepost.map(async (post)=>{
            deleteDoc(doc(db,"posts",`${post}`));
            const deleteRef=ref(storage,`post-images/${post}.jpg`);
            deleteObject(deleteRef)
            .then(()=>{ })
            .catch((err)=>{
                console.log(err);
            })
        })
        const deletePhotoRef=ref(storage,`profile-images/${currentUser.uid}.jpg`);
        if(deletePhotoRef){
            deleteObject(deletePhotoRef)
            .then(()=>{ })
            .catch((err)=>{
                console.log(err);
            })
        }                    
        deleteUser(currentUser).then(()=>{
            console.log('delete succ');
            navigate('/');})
            .catch((err)=>{
                console.log(err);
        })  
    }
    const handleUpdate=()=>{
        if(!name){
            alert('please input name');
            return;
        }
        else if(!file){
            alert('please choose image');
            return;
        }
        const collectionRef=doc(db,"profile",`${currentUser.uid}`);
        const storageRef=ref(storage,`profile-images/${currentUser.uid}.jpg`);
        const metadata={
            contentType:file.type,
        }
        const uploadimg=uploadBytes(storageRef,file,metadata)
        .then((snapshot)=>{
            getDownloadURL(snapshot.ref).then((url)=>{
                updateProfile(currentUser,{
                    displayName:name,
                    photoURL:url
                })
                .then(()=>{
                    setDoc(collectionRef,{
                        displayName:name,
                        photoURL:url
                    }).then(()=>{
                        alert('Update succ!');
                        navigate('/user');
                    })
                    .catch((err)=>{
                        console.log(err);
                    })
                    
                })
                .catch((err)=>{
                    console.log(err);
                })
            })
        })
    }
    return (
        <div className="user_wrapper">
            {loading && <div className="user_loading">Loading...</div> }
            <div className="user_title">
                Profile
                <label htmlFor="user-img" className="user_img-btn">Upload image</label>
            </div>
            <div className="user_info-wrapper">
                { file ? <img src={URL.createObjectURL(file)} className="user_photo"></img>:<img src={imgUrl} className="user_photo"></img>}
                <input type="file" accept="image/png, image/jpeg" id="user-img" style={{display:'none'}} onChange={(e)=>setFile(e.target.files[0])}></input>
                <div className="user_info">
                    <div className="user_email">
                        Email:   {currentUser ? currentUser.email:<span>Loading...</span>}
                    </div>
                    <div className="user_name">
                        Name: <input className="user_name-input" type="text" value={name} onChange={(e)=>setName(e.target.value)}/>
                    </div>
                    
                </div>
            </div>
            <button onClick={()=>handleUpdate()} className="user_update-btn">Update</button>
            <button onClick={()=>handleDelete()} className="user_delete-btn">Delete Account</button>
            <button onClick={()=>handleLogout()} className='user_logout-btn'>LogOut</button>
        </div>
    );
}
 
export default User;