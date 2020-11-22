import { BrowserRouter as Router } from 'react-router-dom';

import Header from './components/basic/header'

import useRoutes from '../src/routes'

import './style/App.scss';

function App() {
  const routes = useRoutes()

  return (
      <Router>
        <div className="App">
          <Header />
          {routes}
        </div>
      </Router>
  );
}

export default App;
