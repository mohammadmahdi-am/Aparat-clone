import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Pagination from "../pagination/Pagination";
import SmallSingleVideo from "../smallSingleVideo/SmallSingleVideo";
import "./userProfile.css";

function UserProfile(props) {
  const { username } = useParams();
  const [profileInfo, setProfileInfo] = useState(null);
  const [videoByUser, setVideoByUser] = useState(null);
  const [perPage, setPerPage] = useState(30);

  useEffect(() => {
    props.setShowSpinner(true)
    fetch(`https://www.aparat.com/etc/api/profile/username/${username}`)
      .then((res) => res.json())
      .then((data) => {
        
         setProfileInfo(data.profile)
      });

    fetch(
      `https://www.aparat.com/etc/api/videoByUser/username/${username}/perpage/30/curoffset/0`
    )
      .then((res) => res.json())
      .then((data) => {
        
        setVideoByUser(data.videobyuser)
        props.setShowSpinner(false)
      
      });
  }, []);

  const handlePageClick = (e) => {
    const selectedPage = e.selected + 1;
    console.log(selectedPage);
    const curoffset = selectedPage * perPage;
    receivedData(curoffset);
  };
  const receivedData = (curoffset) => {
    console.log(curoffset - 30);
    props.setShowSpinner(true)
    fetch(
      `https://www.aparat.com/etc/api/videoByUser/username/${username}/perpage/30/curoffset/${
        curoffset - 30
      }`
    )
      .then((res) => res.json())
      .then((data) => {
        console.log(data.videobyuser);

         setVideoByUser(data.videobyuser);
         props.setShowSpinner(false)
      });
  };

  return (
    <div className="container-fluid">
      {profileInfo && (
        <div className="d-flex align-items-center justify-content-between mb-3">
          <img src={profileInfo.pic_m} alt="" id="profileimage" />

          <p>نام کاربری :{profileInfo.username}</p>
          <p>نام :{profileInfo.name}</p>
          <p>تعداد دنبال کننده :{profileInfo.follower_cnt}</p>
          <p>تعداد دنبال شونده :{profileInfo.followed_cnt}</p>
        </div>
      )}

      {videoByUser && (
        <div className="row">
          {videoByUser.map((video) => (
            <SmallSingleVideo
              title={video.title}
              small_poster={video.small_poster}
              uid={video.uid}
            />
          ))}
        </div>
      )}
      <Pagination pageCount={10} handlePageClick={handlePageClick} />
    </div>
  );
}

export default UserProfile;
