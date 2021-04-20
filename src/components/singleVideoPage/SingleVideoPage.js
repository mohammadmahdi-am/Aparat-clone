import React, { useEffect, useState } from "react";
import { useParams,Link } from "react-router-dom";
function SingleVideoPage() {
  let { uid } = useParams();
  const [singleVideoData, setSingleVideoData] = useState(null);

  useEffect(() => {
    console.log(uid);
    fetch(`https://www.aparat.com/etc/api/video/videohash/${uid}`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        return setSingleVideoData(data);
      });
  }, []);
  return (
    <div className="container-fluid">
      <div className="row">
        {singleVideoData && (
          <div className="col-12">
            <iframe
              src={singleVideoData.video.frame}
              frameborder="0"
              className="w-100 d-block"
              style={{ height: 500 }}
            ></iframe>
            <h2>عنوان :{singleVideoData.video.title}</h2>
            <p>تاریخ انتشار :{singleVideoData.video.sdate}</p>
            <p>
              توضیحات :
              <br />
              {singleVideoData.video.description}
            </p>

            <p>
              uid:
              {singleVideoData.video.uid}
            </p>
            <p>کاربر :{singleVideoData.video.sender_name}</p>

            <p>نام کاربری :
              <Link to={"/userProfile/"+singleVideoData.video.username}>{singleVideoData.video.username}</Link>
              
              </p>

            <p>
              userid:
              {singleVideoData.video.userid}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default SingleVideoPage;
