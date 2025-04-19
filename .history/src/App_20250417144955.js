import './App.css';
import Header from './components/Header';
import { Route } from 'react-router-dom/cjs/react-router-dom';
import Addnewpage from './Pages/Addnewpage';
import Wishlistpage from 

function App() {
  return (
    <div>
      <Header />
      
      <main>
        <Route path='./addnewpage'>
        <Addnewpage />
        </Route>
        <Route path='./wishlistpage'>
        <Wishlistpage />
        </Route>
        <Route path='./addnewpage'>
        <Addnewpage />
        </Route>
      </main>
    </div>
  );
}

export default App;
