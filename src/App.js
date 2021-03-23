import './App.scss';
import {Switch, Route, BrowserRouter, HashRouter} from 'react-router-dom'
import HomePage from './pages/HomePage'
import CountryPage from './pages/CountryPage'
import { CountriesState } from './context/countries/CountriesState';
import { LanguageState } from './context/countries/LanguageState';
//import AdminPage from './pages/AdminPage'
import { LogInState } from './context/countries/LogInState';

function App() {

  return ( //proxy
    <LanguageState>
      <LogInState>
        <CountriesState>
          <HashRouter>
            <Switch>
                <Route exact path="/travel-app" component={HomePage}/>
                {/* <Route path="/AdminPage" exact component={AdminPage}/> */}
                <Route exact path="/travel-app/:country" component={CountryPage}/>
            </Switch>
          </HashRouter>
        </CountriesState>
      </LogInState>
    </LanguageState>
  );
}

export default App;
