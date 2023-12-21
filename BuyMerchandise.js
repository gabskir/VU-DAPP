import React, { useState } from 'react';
import myContract from './MyContract';
import web3 from './initializeWeb3';
import BigNumber from 'bignumber.js';

function BuyMerchandise() {
  const [merchandiseId, setMerchandiseId] = useState('');
  const [quantity, setQuantity] = useState('');

  const handleBuy = async () => {
    try {
      const accounts = await web3.eth.getAccounts();
      const merchandise = await myContract.methods.merchandiseList(merchandiseId).call();
  
      const priceBN = new BigNumber(merchandise.price);
      const quantityBN = new BigNumber(quantity);
      const totalCostBN = priceBN.multipliedBy(quantityBN);
  
      const totalCostWei = totalCostBN.toString();
  
      await myContract.methods.buyMerchandise(merchandiseId, quantity)
        .send({ from: accounts[0], value: totalCostWei });
      alert('Purchase successful!');
    } catch (error) {
      alert('Error purchasing merchandise: ' + error.message);
    }
  };

  return (
    <div>
      <h2>Buy Merchandise</h2>
      <div className="input-container">
        <input 
          type="number" 
          value={merchandiseId} 
          onChange={(e) => setMerchandiseId(e.target.value)} 
          placeholder="Merchandise ID" 
        />
        <input 
          type="number" 
          value={quantity} 
          onChange={(e) => setQuantity(e.target.value)} 
          placeholder="Quantity" 
        />
        <button onClick={handleBuy}>Buy</button>
      </div>
    </div>
  );
}

export default BuyMerchandise;
