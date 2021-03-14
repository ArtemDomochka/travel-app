import './App.scss';
import {BrowserRouter, Switch, Route} from 'react-router-dom'
import HomePage from './pages/HomePage'
import CountryPage from './pages/CountryPage'
import { CountriesState } from './context/countries/CountriesState';


function App() {
  return (
    <CountriesState>
      <BrowserRouter>
        <Switch>
            <Route path="/" exact component={HomePage}/>
            <Route path="/:country" component={CountryPage}/>
        </Switch>
      </BrowserRouter>
    </CountriesState>
  );
}

export default App;
