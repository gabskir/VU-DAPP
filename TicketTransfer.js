import React, { useState } from 'react';
import myContract from './MyContract';
import web3 from './initializeWeb3';

function TicketTransfer() {
  const [tickets, setTickets] = useState(1);
  const [recipient, setRecipient] = useState('');

  const handleTransfer = async () => {
    const accounts = await web3.eth.getAccounts();
    await myContract.methods.transferTicket(recipient, tickets)
           .send({ from: accounts[0] });
  };

  return (
    <div>
      <h2>Transfer Tickets</h2>
      <div className="input-container">
        <input 
          type="number" 
          value={tickets} 
          onChange={(e) => setTickets(e.target.value)}
        />
        <input 
          type="text" 
          value={recipient} 
          onChange={(e) => setRecipient(e.target.value)}
        />
        <button onClick={handleTransfer}>Transfer Tickets</button>
      </div>
    </div>
  );
}

export default TicketTransfer;
