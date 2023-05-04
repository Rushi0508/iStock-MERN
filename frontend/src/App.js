import './App.css';
import './static/css/style.css'
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import Items from './components/Items';
import Login from './components/Login'
import Register from './components/Register';
import LoadingBar from 'react-top-loading-bar'
import { useState } from 'react';
import { useCookies } from "react-cookie";
import {
  BrowserRouter as Router,
  Routes,
  Link,Route
} from 'react-router-dom';
import "react-toastify/dist/ReactToastify.css";
import AddItem from './components/AddItem';
import Stock from './components/Stock';
import Entry from './components/Entry';
function App() {
  // const isAuth = false;
  // if(!isAuth){
  //   return <Login/>
  // }
  const [progress, setProgress] = useState(0)
  const [cookies, setCookie, removeCookie] = useCookies([]);
  return (
    <>
    <Router>
    <LoadingBar
        color='#f11946'
        progress={progress}
        onLoaderFinished={() => setProgress(0)}
    />
      <div className="App">
        <Routes>
          <Route path='/login' element={<Login setProgress={setProgress}/>}/>
          <Route path='/register' element={<Register setProgress={setProgress}/>}/>
          <Route path='/' element={<Dashboard setProgress={setProgress}/>}/>
          <Route path='/stock' element={<Stock setProgress={setProgress}/>}/>
          <Route path='/items' element={<Items setProgress={setProgress}/>}/>
          <Route path='/add-item' element={<AddItem setProgress={setProgress}/>}/>
          <Route path='/entries' element={<Entry setProgress={setProgress}/>}/>
        </Routes>
      </div>
    </Router>
    </>
  );
}

export default App;
