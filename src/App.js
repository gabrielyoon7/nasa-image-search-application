import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Theme.css'
import HomeContainer from './container/HomeContainer';
import { Route,Routes } from 'react-router-dom';
const App = () => {
  return (
    <Routes path='/'>
      <Route path='/' element={<HomeContainer/>}/>
    </Routes>
  );
}

export default App;
