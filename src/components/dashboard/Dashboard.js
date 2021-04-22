import React, { useEffect, useState } from "react";
import SmallSingleVideo from "../smallSingleVideo/SmallSingleVideo";
import "./dashboard.css";
function Dashboard() {
  const [follower, setFollower] = useState(0);
  const [following, setFollowing] = useState(0);
  const [channelName, setChannelName] = useState("");
  const [videoByUser, setVideoByUser] = useState([]);
  const userName = JSON.parse(localStorage.getItem("username"));
  useEffect(() => {
    fetch(`https://www.aparat.com/etc/api/profile/username/${userName}`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setFollower(data.profile.follower_cnt);
        setFollowing(data.profile.followed_cnt);
        setChannelName(data.profile.name);
      });

    fetch(
      `https://www.aparat.com/etc/api/videoByUser/username/${userName}`
    ).then((res) =>
      res.json().then((data) => setVideoByUser(data.videobyuser))
    );
  }, []);
  return (
    <div>
      <div className="container-fluid">
        <div className="row">
          <div className="col-2">
            <div className="border">
              <img src="" alt="" />
              <span>نام کاربری:</span>
              {localStorage.getItem("username")}
            </div>
          </div>

          <div className="col-10">
            <div className="row mb-5">
              <div className="col-4">
                <div className="border">
                  <span>تعداد دنبال کننده:{follower}</span>
                </div>
              </div>
              <div className="col-4">
                <div className="border">
                  <span>تعداد دنبال شونده:{following}</span>
                </div>
              </div>
              <div className="col-4">
                <div className="border">
                  <span>نام کانال:{channelName}</span>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-9 ">
                <div className="border p-2">
                  <span>ویدیو های من</span>
                  <div>
                      <div className="row">
                      {videoByUser.map(video=>{
                          return(
                         
                          <SmallSingleVideo title={video.title} small_poster={video.small_poster} uid={video.uid} edit={true} delete={true}/>

                         
                          )
                      })}
                      </div>
                  </div>
                </div>
              </div>
              <div className="col-3 ">
                <div className="border p-2">
                  <span>دیدگاه ها</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
