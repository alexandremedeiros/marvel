import React from 'react';
import { Switch } from 'react-router-dom';

import Route from './Route';

import Characters from '../pages/Characters';
import CharacterDetail from '../pages/CharacterDetail';

const Routes: React.FC = () => (
  <Switch>
    <Route path="/" exact component={Characters} />
    <Route path="/character-detail" component={CharacterDetail} />
  </Switch>
);

export default Routes;
