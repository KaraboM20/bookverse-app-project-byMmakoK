import './App.css';
import Header from './components/Header';
import { Route } from 'react-router-dom/cjs/react-router-dom';
im

function App() {
  return (
    <div>
      <Header />
      
      <main>
        <Route path='./addnewpage'>
        <Addnewpage />
        </Route>
      </main>
    </div>
  );
}

export default App;
