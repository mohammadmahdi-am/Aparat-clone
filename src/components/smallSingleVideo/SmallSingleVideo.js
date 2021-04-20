import React from 'react'
import Tilt from "react-parallax-tilt";
import './smallSingleVideo.css'
import {  Link } from 'react-router-dom'
function SmallSingleVideo({title,small_poster,uid}) {
    return (
        <div className="col-md-2 col-6 mb-3">
    <Link to={"/single/"+uid} className="w-100 video-link-title">
                  <Tilt
                    className="track-on-window"
                    perspective={800}
                    glareEnable={true}
                    glareMaxOpacity={0.75}
                    glarePosition="all"
                  >
                    <div>
                      <img
                        src={small_poster}
                        className="d-block w-100"
                        id="videoThumbnail"
                        alt=""
                        />
                      {title}
                    </div>
                  </Tilt>
                      </Link>
                </div>
    )
}

export default SmallSingleVideo
