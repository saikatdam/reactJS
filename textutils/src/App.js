import logo from './logo.svg';
import './App.css';
import Navbar from './components/Navbar';
import TextForm from './components/TextForm';
import About from './components/About';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
function App() {
  return (
  <>
  <Router>
  <Navbar title="Navbar" aboutText="Home"/>
  <Switch>
        <Route path="/" >
        <TextForm/>
        </Route>
         
          
          <Route path="/About">
          <About/>
       </Route>
  </Switch>
    </Router>
  
 


  </>
  );
}

export default App;
