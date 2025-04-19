import './App.css';
import Header from './components/Header';
import { Route, Switch } from 'react-router-dom/cjs/react-router-dom';
import Addnewpage from './Pages/Addnewpage';
import Wishlistpage from './Pages/Wishlistpage';
import Createprofilepage from './Pages/Createprofilepage';
import { Redirect } from 'react-router-dom/cjs/react-router-dom.min';

function App() {
  return (
    <div>
      <Header />
      
      <main>
        <Switch>
        <Route path='/' exact>
        <Redirect
        </Route>
        <Route path='./addnewpage'>
        <Addnewpage />
        </Route>
        <Route path='./wishlistpage'>
        <Wishlistpage />
        </Route>
        <Route path='./createprofilepage'>
        <Createprofilepage />
        </Route>
        </Switch>
      </main>
    </div>
  );
}

export default App;
