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

function App() {
  return (
    <div>
      <AuthProvider>
      <WishlistProvider>
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
        <Booklists />
        </Route>
        </Switch>
      </main>
      </WishlistProvider>
    </div>
  );
}

export default App;
