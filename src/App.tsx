import React from 'react';
import { Route, Link, Switch } from "react-router-dom";

import FormikForm from './Formik';

const App: React.FC = () => {
  return (
    <div className="App">
      <nav>
        <Link to="/formik"> Formik</Link> 
      </nav>
      <Switch>
        <Route path="/formik" component={FormikForm} />
      </Switch>
    </div>
  );
}

export default App;
