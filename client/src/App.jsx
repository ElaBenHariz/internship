
import { BrowserRouter as Router,Routes, Route, Link } from 'react-router-dom';
import Signup from './pages/SignUpPage/Signup'
import Login from './pages/LoginPage/Login';
import Home from './pages/HomePage/Home';
import ProjectList from './components/ProjectList';
import TeamData from './components/TeamData';
import ProjData from './components/ProjData';
import './App.css'

const App = () => {
  return (
    <div className="App">

    <Router>
          <Routes>
          <Route index element={<Login />} />
          <Route path="signup" element={<Signup />} />
          <Route path="login" element={<Login />} />
          <Route path='home'  element={<Home/>}></Route>
          <Route path='allProjects'   element={<ProjectList></ProjectList>}></Route>
          <Route path='personalProj'  element={<ProjectList></ProjectList>}></Route>
          <Route path='teamProj'  element={<ProjectList></ProjectList>}></Route>
          <Route path='tables'  element={<TeamData></TeamData>}></Route>
          <Route path='/:id'  element={<ProjData></ProjData>}></Route>
          
          </Routes>
    </Router>
    
    </div>
  );
 }

export default App;




