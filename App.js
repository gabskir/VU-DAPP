import React from 'react';
import web3 from './initializeWeb3';
import OrganizerDetails from './OrganizerDetails'; 
import TicketInfo from './TicketInfo';
import TicketPurchase from './TicketPurchase';
import TicketTransfer from './TicketTransfer';
import BuyMerchandise from './BuyMerchandise';
import CreateMerchandise from './CreateMerchandise';
import './App.css';

function App() {
  return (
    <body>
      <div className="bg">
        <div className="App">
          <div className="title">
            <h1>Ticke<span className="special-style">Dapp</span></h1>
          </div>
          <div className="subtitle">
            <OrganizerDetails />
          </div>
          <main className="main-content">
            <div className='tickett-info'>
              <h2 className='title2'>Ticket Info</h2>
              <TicketInfo />
              <TicketPurchase />
              <TicketTransfer />
            </div>
            <div className='merchandise-info'>
              <h2 className='title2'>Merchandise shop</h2>
              <BuyMerchandise />
              <CreateMerchandise />
            </div>
          </main>
        </div>
      </div>
    </body>
  );
}

export default App;
