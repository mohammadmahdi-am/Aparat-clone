import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import MenuProvider from 'react-flexible-sliding-menu';
import Menu from './components/slidingMenu/SlidingMenu';
ReactDOM.render(
  <React.StrictMode>
    <MenuProvider MenuComponent={Menu} direction="right" >
    <App/>
    </MenuProvider>
    
  </React.StrictMode>,
  document.getElementById('root')
);


reportWebVitals();
