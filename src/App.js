import "./App.css";
import Navbar from "./components/navbar/Navbar";
import { useState, useEffet } from "react";
import VideoSearchResult from "./components/videoSearchResult/VideoSearchResult";
import Advertisment from "./components/advertisment/Advertisment";
import { BrowserRouter as Router, Switch, Route, Link,Redirect } from "react-router-dom";
import SingleVideoPage from "./components/singleVideoPage/SingleVideoPage";
import UserProfile from "./components/userProfile/UserProfile";
import VideoesByCategory from "./components/VideoesByCategory/VideoesByCategory";
import useToken from './hooks/useToken'
import Dashboard from "./components/dashboard/Dashboard";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import Loader from "react-loader-spinner";
import Contact from "./components/contact/Contact";
function App() {
  const [searchByName, setSearchByName] = useState("آپارات");
  const [videoResult, setVideoResult] = useState([]);
  const { token, setToken } = useToken();

  const [showSpinner, setShowSpinner] = useState(false)

  if(token === undefined){
    console.log(token)
    localStorage.removeItem('username');
  }


  async function searchVideo(title) {
    setShowSpinner(true)
    setSearchByName(title);
    const res = await fetch(
      `https://www.aparat.com/etc/api/videoBySearch/text/${title}/perpage/20/curoffset/0`
    );
    const data = await res.json();

    setVideoResult(data);
    setShowSpinner(false)
    console.log(data);
  }
  console.log(token)



  return (
    <Router>
      <div className="App">
        <div style={{position:"fixed",transform:"translate(-50%,-50%)",top:"50%",left:"50%",zIndex:"999"}}>  
            <Loader
            visible={showSpinner}
        type="Puff"
        color="#00BFFF"
        height={100}
        width={100}
      
      /></div>

        
        <Navbar searchVideo={searchVideo} setToken={setToken} token={token}  />
        <Switch>
          <Route path="/" exact>
            <Advertisment />
            <VideoSearchResult
            setShowSpinner={setShowSpinner}
              videoResult={videoResult}
              setVideoResult={setVideoResult}
              searchByName={searchByName}
            />
          </Route>
          <Route path="/single/:uid" children={<SingleVideoPage setShowSpinner={setShowSpinner} />} />
          <Route path="/userProfile/:username" children={<UserProfile setShowSpinner={setShowSpinner} />} />
          <Route path="/videosBycategory/:category" children={
          <VideoesByCategory
          setShowSpinner={setShowSpinner}
                        videoResult={videoResult}
              setVideoResult={setVideoResult}
              searchByName={searchByName}
           /> }/>
         
         <Route path="/dashboard" >
           {token ? <Dashboard  /> :<Redirect to="/" />}

           
         </Route>

         <Route path="/contactus" children={<Contact/>}/>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
