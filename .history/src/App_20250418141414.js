import './App.css';
import Header from './components/Header';
import { Route, Switch } from 'react-router-dom/cjs/react-router-dom';
import Addnewpage from './Pages/Addnewpage';
import Wishlistpage from './Pages/Wishlistpage';
import Createprofilepage from './Pages/Createprofilepage';
import { Redirect } from 'react-router-dom/cjs/react-router-dom.min';
import Home from './Pages/Home';
import Booklists from './Pages/Booklists';
import { WishlistProvider } from './context/WishlistContext';
import { AuthProvider } from './context/AuthContext';
import { BrowserRouter, Router } from 'react-router-dom/cjs/react-router-dom.min';

function App() {
  return (
    <div>
      <AuthProvider>
      <WishlistProvider>
        <Router>

      <Header />
      
      <main>
        <Switch>
        <Route path='/' exact>
        <Redirect to='/home' />
        </Route>
        <Route path='/home'>
        <Home />
        </Route>
        <Route path='/add-new'>
        <Addnewpage />
        </Route>
        <Route path='/wish-list'>
        <Wishlistpage />
        </Route>
        <Route path='/createprofilepage'>
        <Createprofilepage />
        </Route>
        <Route path='/booklists'>
        <Booklists />
        </Route>
        </Switch>
      </main>
      </Router>
      </WishlistProvider>
      </AuthProvider>
    </div>
  );
}

export default App;
