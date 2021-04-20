import React,{useState} from 'react'
import './advertisment.css'
import advertismentImage from './desktop-583.jpg'
function Advertisment() {
    const [showadAdvertisment,setShowAdvertisment] = useState(true)
    return (
        <div className="mb-4" >
            {showadAdvertisment && (
            <div className="position-relative advertisment-container">
            <span id="closebtnadver" onClick={()=>setShowAdvertisment(!showadAdvertisment)}>&#10540;</span>
            <img src={advertismentImage} id="advertisment" alt=""/>
            </div>
            )}

            
        </div>
    )
}

export default Advertisment
