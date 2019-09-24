import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { GlobalStyle } from './constants/GlobalStyle';
import { BotSingle } from './components/pages/BotSingle';

const App: React.FC = () => (
  <>
    <GlobalStyle />
    <Router>
      <Route path="/bot/:id" component={BotSingle} />
    </Router>
  </>
);

export default App;
