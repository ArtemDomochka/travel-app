import './App.scss';
import {BrowserRouter, Switch, Route} from 'react-router-dom'
import HomePage from './pages/HomePage'
import CountryPage from './pages/CountryPage'

function App() {
  return (
    <BrowserRouter>
      <Switch>
          <Route path="/" exact component={HomePage}/>
          <Route path="/Country" component={CountryPage}/>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
