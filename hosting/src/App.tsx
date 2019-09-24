import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { BotSingle } from './components/pages/BotSingle';

const App: React.FC = () => (
  <Router>
    <Route path="/bot/:id" component={BotSingle} />
  </Router>
);

export default App;
