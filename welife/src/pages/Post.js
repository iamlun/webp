import { useParams, useNavigate } from "react-router-dom";
import { getFirestore,
         doc, 
         getDoc,
         deleteDoc,
         updateDoc,
         arrayUnion,
         arrayRemove} from 'firebase/firestore';
import { useEffect, useState } from "react";
import { useAuth } from "../utils/firebase";

import unlike from "../assets/heart-black.png";
import like from "../assets/heart.png";
import commenticon from "../assets/message.png";
import "../pages/Post.css";
const Post = () => {

    const {id}=useParams();
    const db=getFirestore();
    const navigate=useNavigate();

    const currentUser=useAuth();
    const [post,setPost]=useState();
    const [name,setName]=useState();
    const [profileURL,setProfileURL]=useState();
    const [loading,setLoading]=useState(true);
    const [islike,setIsLike]=useState(false);
    const [likenum,setLikenum]=useState();
    const [comment,setComment]=useState('');
    const [edit,setEdit]=useState(false);
    const [editDone,setEditDone]=useState(false);
    const [editContent,setEditContent]=useState('');
    useEffect(()=>{
        fetchdata();
    },[])
    useEffect(()=>{
        if(post){
            if(post.likedby){
                setLikenum(post.likedby.length);
            }
            else{
                setLikenum(0);
            }
            fetchProfile(post.author.uid,currentUser.uid);
        }
    },[post])
    useEffect(()=>{
        if(name && profileURL){
            setLoading(false);
        }
    },[name])
    async function fetchdata(){
        const docRef = doc(db, "posts", `${id}`);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
            setPost(docSnap.data());
          } else {
            // doc.data() will be undefined in this case
            console.log("No such document!");
        }
    }
    async function fetchProfile(uid,currentUser){
        const docRef = doc(db, "profile", `${uid}`);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
            setName(docSnap.data().displayName);
            setProfileURL(docSnap.data().photoURL);
            post.likedby.map((l)=>{
                if(l===currentUser){
                    setIsLike(true);
                }
            })
        } else {
            // doc.data() will be undefined in this case
            console.log("No such document!");
        }
    }
    async function handleLike(t){
        if(t===true){
            const temp=likenum+1;
            setLikenum(temp);
            setIsLike(true);
            const docRef=doc(db,"posts",`${id}`);
            await updateDoc(docRef,{
                likedby:arrayUnion(currentUser.uid)
            })
        }
        else{
            const temp=likenum-1;
            setLikenum(temp);
            setIsLike(false);
            const docRef=doc(db,"posts",`${id}`);
            await updateDoc(docRef,{
                likedby:arrayRemove(currentUser.uid)
            })
        }
    }
    async function handleComment(){
        if(!comment){
            alert('please input some words');
            return;
        }
        const docRef=doc(db,"posts",`${id}`);
            await updateDoc(docRef,{
                comment:arrayUnion({'content':comment,'by':currentUser.displayName}),
            })
        window.location.href=`/${id}`;

    }
    async function commentDelete(by,c){
        const docRef=doc(db,"posts",`${id}`);
        await updateDoc(docRef,{
            comment:arrayRemove({'content':c,'by':by}),
        })
        window.location.href=`/${id}`;
    }
    async function deletePost(){
        await deleteDoc(doc(db,"posts",`${id}`));
        navigate('/');
    }
    async function handleEdit(){
        const docRef=doc(db,"posts",`${id}`);
        await updateDoc(docRef,{
            content:editContent,
        })    
        setEdit(false);
        setEditDone(false);
        window.location.href=`/${id}`;
    }
    useEffect(()=>{
        if(editDone){
            console.log('test');
            handleEdit();
        }
    },[editDone])
    return (
        <div className="postpage_wrapper">
            { loading && <h1>Loading...</h1> }
            { !(loading) && 
            <div className="post_wrapper">
                <div className="post_img-wrapper">
                    <img src={post.url} className="post_img"></img>
                </div>
                <div className="post_list-wrapper">
                    <div className="post_user_wrapper">
                        <img src={profileURL} className="post_user_img"></img>
                        <div className="post_user_name">{name}</div>
                        {(post.author.uid===currentUser.uid)&&<button className="post_edit" onClick={()=>setEdit(~edit)}>Edit</button>}
                        {(post.author.uid===currentUser.uid)&&<button className="post_delete" onClick={()=>deletePost()}>Delete</button>}
                    </div>
                    <div className="content_wrapper">
                        <div className="content_list">{post.content}</div>
                        {edit && <input type="text" value={editContent} onChange={(e)=>setEditContent(e.target.value)} className="content_edit-input"></input>}
                        {edit && <button onClick={()=>setEditDone(true)} className="content_edit-btn">edit</button> }
                    </div>
                    <div className="function_wrapper">
                        <div className="like_wrapper">
                            { islike ? <img className="like_icon" src={like} onClick={()=>handleLike(false)}></img> : <img src={unlike} onClick={()=>handleLike(true)}></img>}
                            <div className="like_number">
                                {likenum} liked
                            </div>
                        </div>
                        <img className="comment_icon" src={commenticon}></img>
                    </div>
                    <div className="comment_wrapper">
                        <div className="comment_list">
                            { (post.comment) && post.comment.map((c,i)=>{
                                return <div className="comment_content">-{c.content}-<span className="comment_by">by.{c.by}</span> { (c.by===currentUser.displayName) && <button className="comment_delete" onClick={()=>commentDelete(c.by,c.content)}>Delete</button> }</div>
                            })}
                        </div>
                        <input className="comment_input" onChange={(e)=>setComment(e.target.value)} value={comment} placeholder='Add comment...'></input>
                        <button className="comment_send" onClick={()=>handleComment()}>send</button>
                    </div>
                </div>
            </div> }
        </div>
    );
}
 
export default Post;