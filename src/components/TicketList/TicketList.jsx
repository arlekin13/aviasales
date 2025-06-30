import React, { useState, useMemo, useCallback, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import TicketCard from '../TicketCard/TicketCard';
import styles from './TicketList.module.scss';
import ShowMoreButton from '../ShowMoreButton/ShowMoreButton.jsx';

import { fetchTickets } from '../store/slices/ticketsSlice';

function TicketList({ tickets }) {
    const filters = useSelector((state) => state.filter.transfers);
    const sortBy = useSelector((state) => state.sorting.sortBy);
    const [visibleTicket, setVisibleTicket] = useState(5);
    const { loadingMore, stop } = useSelector((state) => state.tickets);
    const dispatch = useDispatch();

   

    const safeTickets = Array.isArray(tickets) ? tickets : [];

    const filterTickets = useMemo(() => {
        return (ticketsToFilter) => {
            
            if (!Array.isArray(ticketsToFilter)) return [];
            
             return ticketsToFilter.filter((ticket) => {
              
                if (!ticket.segments || ticket.segments.length === 0) return false;
                
                const stops = ticket.segments[0].stops.length;
                if (filters.all) { 
                    return true;
                }

                let isValid = false;
                if (filters.noTransfers && stops === 0) {
                    isValid = true;
                }
                if (filters.oneTransfers && stops === 1) {
                    isValid = true;
                }
                if (filters.twoTransfers && stops === 2) {
                    isValid = true;
                }
                if (filters.threeTransfers && stops === 3) {
                    isValid = true;
                }
                return isValid;
            }); 
           
        }; 
    }, [filters]); 

    const totalDuration = useCallback((ticket) => {
        if (!ticket.segments) return 0;
        return ticket.segments.reduce((acc, segment) => acc + segment.duration, 0);
    }, []);

    const sortTicket = useCallback((ticketsToSort, sortBy) => {
        const sortedTicket = Array.isArray(ticketsToSort) ? [...ticketsToSort] : [];

        if (sortBy === 'price') {
            sortedTicket.sort((a, b) => a.price - b.price);
        } else if (sortBy === 'speed') {
            sortedTicket.sort((a, b) => totalDuration(a) - totalDuration(b));
        } else if (sortBy === 'optimal') {
            sortedTicket.sort((a, b) => (
                a.price + totalDuration(a)) - (b.price + totalDuration(b)));
        }
        return sortedTicket;
    }, [totalDuration]);

    const filteredTickets = useMemo(() => filterTickets(safeTickets), [safeTickets, filterTickets]);
    const sortedTicket = useMemo(() => sortTicket(filteredTickets, sortBy), [filteredTickets, sortBy, sortTicket]);

    const handleShowMoreTickets = () => {
        setVisibleTicket(prev => prev + 5);
    };

    useEffect(() => {
        dispatch(fetchTickets());
    }, [dispatch]);

    return (
        <>
      <div className={styles['ticket-list']}>
        {sortedTicket.slice(0, visibleTicket).map((ticket) => (  
          <TicketCard key={ticket.id} ticket={ticket} />
        ))}
        {loadingMore && ( //  Показываем надпись "Получаем билеты..."
          <div style={{ textAlign: 'center' }}>Получаем билеты...</div>
        )}
        {visibleTicket < sortedTicket.length && !loadingMore && !stop && (
          <ShowMoreButton onClick={handleShowMoreTickets} />
        )}
      </div>
    </>
    );
}

export default TicketList;