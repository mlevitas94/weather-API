import {Switch, Route} from 'react-router-dom'
import FullReport from './pages/FullReport/FullReport';
import Home from './pages/Home/Home'
function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path='/' component={Home}/>
        <Route exact path='/:location' component={FullReport}/>
      </Switch>
    </div>
  );
}

export default App;
