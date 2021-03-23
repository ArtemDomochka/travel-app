import './App.scss';
import {HashRouter, Switch, Route} from 'react-router-dom'
import HomePage from './pages/HomePage'
import CountryPage from './pages/CountryPage'
import { CountriesState } from './context/countries/CountriesState';
import { LanguageState } from './context/countries/LanguageState';
import AdminPage from './pages/AdminPage'
import { LogInState } from './context/countries/LogInState';

function App() {

  return ( //proxy
    <LanguageState>
      <LogInState>
        <CountriesState>
          <HashRouter>
            <Switch>
                <Route path="/travel-app" exact component={HomePage}/>
                <Route path="/AdminPage" exact component={AdminPage}/>
                <Route path="/travel-app/:id" component={CountryPage}/>
            </Switch>
          </HashRouter>
        </CountriesState>
      </LogInState>
    </LanguageState>
  );
}

export default App;
