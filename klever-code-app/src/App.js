import Home from './pages/Home';
import { Switch, Route } from 'react-router-dom';
import AddToken from './pages/AddToken';
import EditToken from './pages/EditToken';
import NotFound from './pages/NotFound';

function App() {
  return (
    <Switch>
      <Route exact path='/' component={Home} />
      <Route exact path='/addToken' component={AddToken} />
      <Route exact path='/editToken' component={EditToken} />
      <Route exact path='*' component={NotFound} />
    </Switch>
  );
}

export default App;
