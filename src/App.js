import './App.scss';
import {BrowserRouter, Switch, Route} from 'react-router-dom'
import HomePage from './pages/HomePage'
import CountryPage from './pages/CountryPage'
import { CountriesState } from './context/countries/CountriesState';
import { LanguageState } from './context/countries/LanguageState';
import AdminPage from './pages/AdminPage'
import { LogInState } from './context/countries/LogInState';

function App() {

  return (
    <LanguageState>
      <LogInState>
        <CountriesState>
          <BrowserRouter>
            <Switch>
                <Route path="https://artemdomochka.github.io/travel-app/" exact component={HomePage}/>
                <Route path="https://artemdomochka.github.io/travel-app/AdminPage" exact component={AdminPage}/>
                <Route path="https://artemdomochka.github.io/travel-app/travel-app/:country" component={CountryPage}/>
            </Switch>
          </BrowserRouter>
        </CountriesState>
      </LogInState>
    </LanguageState>
  );
}

export default App;
