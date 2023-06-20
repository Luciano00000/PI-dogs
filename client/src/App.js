import './App.css';
import { Route } from 'react-router-dom'
import Landing from './components/Landing/landing';
import Home from './components/Home/home';
import Form from './components/Form/form';
import Detail from "./components/Detail/detail"
import { useLocation } from 'react-router-dom'
import NavBar from './components/NavBar/NavBar';
function App() {
  const location = useLocation


  return (
    <div className="App">
        {location.pathname !== "/" && <NavBar />}
        <Route exact path='/' component={Landing}/>
        <Route path="/home" component={Home}/>
        <Route path="/create" component={Form}/>
        <Route path="/dogs/detail/:id" component={Detail}/>
    </div>
  );
}

export default App;
