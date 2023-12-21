import React, { useState, useEffect } from 'react';
import web3 from './initializeWeb3';
import BigNumber from 'bignumber.js';
import myContract from './MyContract';

function TicketInfo() {
  const [currentPrice, setCurrentPrice] = useState(0);
  const [ticketsRemaining, setTicketsRemaining] = useState(0);
  const [totalTickets, setTotalTickets] = useState(0);
  const [ticketsSold, setTicketsSold] = useState(0);

  useEffect(() => {
    const fetchTicketInfo = async () => {
      const price = await myContract.methods.currentTicketPrice().call();
      const sold = await myContract.methods.ticketsSold().call();
      const     total = await myContract.methods.totalTickets().call();
      setCurrentPrice(price);
      setTicketsRemaining(total - sold);
      setTotalTickets(total);
      setTicketsSold(sold);
    };

    fetchTicketInfo();
  }, []);

  return (
    <div className="ticket-info">
      <h3 className="price">Ticket Price: <span className='result'>{web3.utils.fromWei(currentPrice, 'ether')} ETH</span></h3>
    </div>
  );
  
}

export default TicketInfo;





