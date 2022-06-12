import { useEffect, useState } from 'react';
import '../pages/Profile.css';
import location from'../assets/location.png';
import link from'../assets/makefg.php.png';
const Profile = () => {
    const [profile,setProfile]=useState();
    useEffect(()=>{
        fetch('https://api.github.com/users/iamlun',{
            method:'GET'
        })
        .then(res=>res.json())
        .then((data)=>{
            setProfile(data);
        })
        .catch((err)=>{
            console.log(err.message);
        })
    },[])
    // console.log(profile);
    return (
        <div className="profilePage_wrapper">
            { profile ? 
                <div className='profilePage_Profile-wrapper'>
                    <div className='profilePage_img-wrapper'>
                        <img src={`${profile.avatar_url}`} className='profilePage_img'></img>
                    </div>
                    <div className='profilepage_detail'>
                    <div className="profilePage_name">
                        {profile.name}
                    </div>
                    <div className="profilePage_username">
                        {profile.login}
                    </div>
                    <div className="profilePage_id">
                        {profile.id}
                    </div>
                    </div>
                    <div className="profilePage_followers">
                        <li>{profile.followers} followers</li>
                        <li>   {profile.following}     following</li>
                    </div>
                    <div className="profilePage_location">
                        <img src={location} className='profilePage_location-icon'></img>
                        <span>{profile.location}</span>
                    </div>
                    <div className="profilePage_link">
                        <img src={link} className='profilePage_link-icon'></img>
                        <a href={`${profile.html_url}`} className='profilePage_link-a'>{profile.html_url}</a>
                    </div>
                </div>
                 : <div className='profilePage_loading'>Loading...</div> }
        </div>
    );
}
 
export default Profile;