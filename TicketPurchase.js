import React, { useState } from 'react';
import myContract from './MyContract';
import web3 from './initializeWeb3';
import BigNumber from 'bignumber.js';

function BuyTicket() {
    const [tickets, setTickets] = useState(0);

    const handleBuy = async () => {
        try {
            const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
            const account = accounts[0];

            const ticketPrice = await myContract.methods.ticketPrice().call();
            const amount = new BigNumber(ticketPrice).multipliedBy(tickets).toString();

            myContract.methods.buyTicket(tickets).send({ from: account, value: amount })
                .on('transactionHash', hash => {
                    alert(`Transaction sent: ${hash}`);
                })
                .on('receipt', receipt => {
                    alert(`You've successfully purchased ${tickets} tickets. Transaction receipt: ${receipt.transactionHash}`);
                })
                .on('error', error => {
                    alert(`Transaction failed: ${error.message}`);
                });
        } catch (error) {
            alert(`An error occurred: ${error.message}`);
        }
    };

    return (
        <div>
            <h2>Buy Tickets</h2>
            <input
                type="number"
                value={tickets}
                onChange={(e) => setTickets(e.target.value)}
                placeholder="Number of tickets"
            />
            <button onClick={handleBuy}>Buy</button>
        </div>
    );
}

export default BuyTicket;
