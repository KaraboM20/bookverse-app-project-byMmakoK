import './App.css';
import Header from './components/Header';
import { Route, Switch } from 'react-router-dom/cjs/react-router-dom';
import Addnewpage from './Pages/Addnewpage';
import Wishlistpage from './Pages/Wishlistpage';
import Createprofilepage from './Pages/Createprofilepage';
import { Redirect } from 'react-router-dom/cjs/react-router-dom.min';
import Home from './Pages/Home';

function App() {
  return (
    <div>
      <Header />
      
      <main>
        <Switch>
        <Route path='/' exact>
        <Redirect to='/home' />
        </Route>
        <Route path='/home'>
        <Home />
        </Route>
        <Route path='/addnewpage'>
        <Addnewpage />
        </Route>
        <Route path='/wishlistpage'>
        <Wishlistpage />
        </Route>
        <Route path='/createprofilepage'>
        <Createprofilepage />
        </Route>
        <Route path='/booklists'>
        <Booklis />
        </Route>
        </Switch>
      </main>
    </div>
  );
}

export default App;
