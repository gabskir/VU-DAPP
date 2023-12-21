import React, { useState } from 'react';
import myContract from './MyContract';
import web3 from './initializeWeb3';

function CreateMerchandise() {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [stock, setStock] = useState('');

  const handleCreate = async () => {
    try {
      const accounts = await web3.eth.getAccounts();
      await myContract.methods.addMerchandise(name, web3.utils.toWei(price, 'ether'), stock)
        .send({ from: accounts[0] });
      alert('Merchandise added successfully!');
    } catch (error) {
      alert('Error adding merchandise: ' + error.message);
    }
  };

  return (
    <div>
      <h2>Add Merchandise</h2>
      <div className="input-container">
        <input 
          type="text" 
          value={name} 
          onChange={(e) => setName(e.target.value)} 
          placeholder="Merchandise Name" 
        />
        <input 
          type="text" 
          value={price} 
          onChange={(e) => setPrice(e.target.value)} 
          placeholder="Price in ETH" 
        />
        <input 
          type="number" 
          value={stock} 
          onChange={(e) => setStock(e.target.value)} 
          placeholder="Stock" 
        />
      </div>
      <div className="button-container">
        <button onClick={handleCreate}>Add Merchandise</button>
      </div>
    </div>
  );
}

export default CreateMerchandise;
