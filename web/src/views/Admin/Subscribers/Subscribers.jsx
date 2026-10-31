import React from 'react';
import { Link } from 'react-router-dom';
import SubscriberTable from './components/SubscriberTable';
import './subscribers.scss';

const Subscribers = () => {
  return (
    <div className='subscribers'>
      <header>
        <h3>Subscribers</h3>
        <Link to='/subs/new' className='link'>
          Add New
        </Link>
      </header>
      <div className='table-container'>
        <h3 className='table-title'>Subscriber List</h3>
        <SubscriberTable />
      </div>
    </div>
  );
};

export default Subscribers;
