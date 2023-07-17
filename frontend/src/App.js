import React from 'react';
import { BrowserRouter as Router, NavLink, Route } from 'react-router-dom';
import Event from './pages/Event/Event';
import Employee from './pages/Employee/Employee';
import Training from './pages/Training/Training';

const App = () => {
  return (
    <section className='text-center text-sm'>
      <Router>
        <nav className='m-4'>
          <NavLink exact activeClassName='active_class' to="/" className="font-bold px-4 py-2 border rounded-md justify-center text-md mx-4">Event</NavLink>
          <NavLink exact activeClassName='active_class' to="/employee" className="font-bold px-4 py-2 border rounded-md justify-center text-md mx-4">Employee</NavLink>
          <NavLink exact activeClassName='active_class' to="/training" className="font-bold px-4 py-2 border rounded-md justify-center text-md mx-4">Training</NavLink>
        </nav>
        <div className='border bottom-2 solid black mx-5'></div>

        <Route exact path="/" component={Event} />
        <Route path="/employee" component={Employee} />
        <Route path="/training" component={Training} />
      </Router>
    </section>
  );
};

export default App;
