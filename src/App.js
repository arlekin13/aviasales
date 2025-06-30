import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './App.css';
import Header from './components/Header/Header';
import FilterPanel from './components/FilterPanel/FilterPanel';
import Sorting from './components/Sorting/Sorting';
import TicketList from './components/TicketList/TicketList';

import { fetchTickets } from './components/store/slices/ticketsSlice';

function App() {
  const dispatch = useDispatch();
  const { tickets, loading, error } = useSelector((state) => state.tickets);

  useEffect(() => {
    dispatch(fetchTickets());
  }, [dispatch]);

  if (loading) {
    return <div style={{ textAlign: 'center', marginTop: '20px' }}>Loading...</div>;
  }
  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <>
      <Header />
      <div className="app">
        <FilterPanel />
        <div className="app__main">
          <Sorting />
          <TicketList tickets={tickets} />
        </div>
      </div>
    </>
  );
}
export default App;
