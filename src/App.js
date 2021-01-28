import { Switch, Route } from 'react-router-dom'
import Cookie from './Modals/Cookie/Cookie';
import FullReport from './pages/FullReport/FullReport';
import Home from './pages/Home/Home'
function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path='/' component={Home} />
        <Route exact path='/:location' component={FullReport} />
      </Switch>
      {
        localStorage.getItem('recent') === null || localStorage.getItem('saved') === null ?
          <Cookie />
          :
          null
      }
    </div>
  );
}

export default App;
