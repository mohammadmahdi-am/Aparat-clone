import React, { useState, useEffect } from "react";
import "./videoSearchResult.css";
import SmallSingleVideo from "../smallSingleVideo/SmallSingleVideo";
import Pagination from "../pagination/Pagination";

function VideoSearchResult({ videoResult, setVideoResult, searchByName,setShowSpinner }) {
  const [pageCount, setPageCount] = useState(10);
  const [perPage, setPerPage] = useState(36);


  useEffect(() => {
    setShowSpinner(true)
    fetch(
      `https://www.aparat.com/etc/api/videoBySearch/text/آپارات/perpage/36/curoffset/0`
    )
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setVideoResult(data);
        setShowSpinner(false)
      });
  }, []);



  const handlePageClick = (e) => {
    setShowSpinner(true)
    const selectedPage = e.selected + 1;
    console.log('page:',selectedPage)
    const curoffset = selectedPage * perPage;
    
  
    receivedData(curoffset)

    
  };
  const receivedData = (curoffset) => {
   
    console.log(curoffset - 36)
    fetch(
      `https://www.aparat.com/etc/api/videoBySearch/text/${searchByName}/perpage/36/curoffset/${
        curoffset - 36
      }`
    )
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        console.log(data);
        setVideoResult(data);
        setShowSpinner(false)
      });
  };

  return (
    <div className="container-fluid">
      <div className="row justify-content-center">
        <div className="col-11">
          <div className="row">
            {videoResult.videobysearch &&
              videoResult.videobysearch.map((video,index) => (
                <SmallSingleVideo key={index}
                  title={video.title}
                  small_poster={video.small_poster}
                  uid = {video.uid}
                />
              ))}

            {videoResult.videobysearch && (
              <Pagination
                pageCount={pageCount}
                handlePageClick={handlePageClick}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default VideoSearchResult;
