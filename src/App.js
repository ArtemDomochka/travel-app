import './App.scss';
import {BrowserRouter, Switch, Route} from 'react-router-dom'
import HomePage from './pages/HomePage'
import CountryPage from './pages/CountryPage'
import { CountriesState } from './context/countries/CountriesState';
import { LanguageState } from './context/countries/LanguageState';
import AdminPage from './pages/AdminPage'


function App() {

  return (
    <LanguageState>
      <CountriesState>
      <BrowserRouter>
        <Switch>
            <Route path="/" exact component={HomePage}/>
            <Route path="/AdminPage" exact component={AdminPage}/>
            <Route path="/:country" component={CountryPage}/>
        </Switch>
      </BrowserRouter>
    </CountriesState>
  </LanguageState>
  );
}

export default App;
