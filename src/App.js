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
function App() {
  const [searchByName, setSearchByName] = useState("آپارات");
  const [videoResult, setVideoResult] = useState([]);
  const { token, setToken } = useToken();

  if(token === undefined){
    console.log(token)
    localStorage.removeItem('username');
  }

  async function searchVideo(title) {
    setSearchByName(title);
    const res = await fetch(
      `https://www.aparat.com/etc/api/videoBySearch/text/${title}/perpage/20/curoffset/0`
    );
    const data = await res.json();

    setVideoResult(data);
    console.log(data);
  }
  console.log(token)

  return (
    <Router>
      <div className="App">
        
        <Navbar searchVideo={searchVideo} setToken={setToken} token={token} />
        <Switch>
          <Route path="/" exact>
            <Advertisment />
            <VideoSearchResult
              videoResult={videoResult}
              setVideoResult={setVideoResult}
              searchByName={searchByName}
            />
          </Route>
          <Route path="/single/:uid" children={<SingleVideoPage />} />
          <Route path="/userProfile/:username" children={<UserProfile />} />
          <Route path="/videosBycategory/:category" children={
          <VideoesByCategory
                        videoResult={videoResult}
              setVideoResult={setVideoResult}
              searchByName={searchByName}
           /> }/>
         
         <Route path="/dashboard" >
           {token ? <Dashboard  /> :<Redirect to="/" />}

           
         </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
