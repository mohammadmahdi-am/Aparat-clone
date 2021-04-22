import React,{useEffect,useState} from 'react'
import './VideoesByCategory.css'
import { useParams } from "react-router-dom";
import Pagination from '../pagination/Pagination';
import SmallSingleVideo from '../smallSingleVideo/SmallSingleVideo'

function VideoesByCategory({ videoResult, setVideoResult, searchByName }) {
    const {category} = useParams()
    const [aparatCategory, setAparatCategory] = useState(null)
    const [pageCount, setPageCount] = useState(10);
    const [perPage, setPerPage] = useState(36);


    useEffect(() => {
        fetch("https://www.aparat.com/etc/api/categories")
        .then(res=>res.json())
        .then(data=>data.categories)
        .then(categories=>{
            const categoryInfo = categories.find(itemCategory=>itemCategory.name === category)
            setAparatCategory(categoryInfo)

            
        })


        fetch(
            `https://www.aparat.com/etc/api/videoBySearch/text/${category}/perpage/36/curoffset/0`
          )
            .then((res) => {
              return res.json();
            })
            .then((data) => {
              setVideoResult(data);
            });
        
        
    }, [])

    const handlePageClick = (e) => {
        const selectedPage = e.selected + 1;
        console.log('page:',selectedPage)
        const curoffset = selectedPage * perPage;
        
      
        receivedData(curoffset)
    
        
      };
      const receivedData = (curoffset) => {
        console.log(curoffset - 36)
        fetch(
          `https://www.aparat.com/etc/api/videoBySearch/text/${category}/perpage/36/curoffset/${
            curoffset - 36
          }`
        )
          .then((res) => {
            return res.json();
          })
          .then((data) => {
            console.log(data);
            setVideoResult(data);
          });
      };

    return (
        <div className="container-fluid vh-100">
            <div className="row mb-4">
            <div className="position-relative">
            {aparatCategory && (
                <div>
                <h1 className="category-title">{category}</h1>
                <img src={aparatCategory.patternBgSrc} className="w-100 d-block category-banner" alt=""/>
                </div>
                
            )}
            </div>
            </div>
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
    )
}

export default VideoesByCategory
