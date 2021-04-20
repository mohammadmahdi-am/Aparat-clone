import React, { useContext, useEffect,useState } from "react";
import { MenuContext } from "react-flexible-sliding-menu";
import {Link, BrowserRouter as Router,Route} from 'react-router-dom'
import './slidingMenu.css'

function Menu() {
  const { closeMenu } = useContext(MenuContext);
  const [categories, setCategories] = useState([])

  useEffect(()=>{
    fetch("https://www.aparat.com/etc/api/categories")
    .then(res=>res.json())
    .then(data=>{
      setCategories(data.categories)

      console.log(data)
    }
    )
    document.getElementById("div-menu").parentElement && (
    document.getElementById("div-menu").parentElement.style.overflow = 'auto')

  },[])

  return (
    
    <div  id="div-menu" >
      <button onClick={closeMenu} id="closebtn" >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
        >
          <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
          <path d="M0 0h24v24H0z" fill="none" />
        </svg>
      </button>
      
      <div className="slidingMenu-content">
        {categories && (
          categories.map(category=>(
            <div>
            
              <Router>

              <Link to={"/videosBycategory/"+category.name} target="_blank" rel="noopener noreferrer" >
              <img src={category.imgSrc} className="categoryImg" alt=""/>
              {category.name}
              </Link>
              </Router>
            
            </div>
          ))
        )}

      </div>
    </div>
  );
}

export default Menu;
