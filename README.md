# VU-DAPP
Task 4: Smart Contract and development of a decentralised application (additionally: Hyperledger Fabric install)

## Bonus: HyperLedger Fabric install 
Task was done using WSL.
### CAR0 owner change
**CAR0 owner before change:** <br>
![before change](https://github.com/gabskir/VU-DAPP/blob/main/owner1.png?raw=true)
<br>
**Script used to change owner of CAR0** <br>
![change script](https://github.com/gabskir/VU-DAPP/blob/main/changeowner.png?raw=true)
<br>
**Results:** <br>
![Car change results](https://github.com/gabskir/VU-DAPP/blob/main/changedowner.png?raw=true)
<br>
### Add CAR12
![resultsCMD](https://github.com/gabskir/VU-DAPP/blob/main/car12create.png?raw=true)
![resultsWEB](https://github.com/gabskir/VU-DAPP/blob/main/car12create2.png?raw=true)

---

## Smart contracts and Dapp

The main objective of this assignment is to develop a smart contract that implements a certain business logic and can ensure its "safe" and "secure" functioning in a decentralised public network. A decentralised application with Front-End will be developed to manage the smart contract and to facilitate the interaction between the business actors. In this task, the smart contract will be implemented in the Solidity programming language and will be adapted to the Ethereum blockchain network.

### Requirements:
---
1. Describe the logic of the smart contract business model that the smart contract will implement.
   - Minimum plan: to avoid making the task too complicated, choose a business model similar to the one presented on https://medium.com/coinmonks/build-a-smart-contract-to-sell-goods-6cf73609d25. The business model involves the following parties: buyer, seller, courier, and the smart contract itself ensures the "secure" sale/purchase and delivery of goods.
   - Plan maximum (up to 0.75 points on top of the work!): enthusiasts who choose and describe another business model and implement a smart contract/contracts and a decentralised application based on this model will receive up to 0.75 points extra (depending on complexity).
2. Implement the business logic described in step 1 in a smart contract in Solidi.
3. Test the smart contract on the Ethereum local network and on an Ethereum test network (e.g. Goerli).
4. Using Etherscan on the Ethereum test network, review the performance of the smart contract "logs"
5. Create a front-end of a decentralised application (website or mobile app) that enables communication with the smart contract.
   - Plan minimum: an application with a minimalist design and minimal functionality that simply interacts with the participants in the business model and allows them to activate the functions of the smart contract and to submit/read the data needed for the contract.
   - Plan maximum (up to 0.75 points extra on top of your work!): an app with extended functionality (and design). Here, be creative with your time, experience and capabilities

### Used in this assignment:
---
- Remix IDE
- Truffle IDE
- Ganache
- Sepolia
- MetaMask

### Business model:
---
#### Overview
The `EventTicketing` smart contract is designed for comprehensive event management, encompassing aspects like ticket sales, merchandise sales, attendee engagement through polls, and refund management in case of event cancellation. This contract leverages blockchain technology for secure, transparent, and efficient handling of various event-related activities.

#### Features

##### Ticket Sales and Dynamic Pricing
- **Core Function**: Selling tickets for an event.
- **Dynamic Pricing**: Increases ticket prices as more tickets are sold, encouraging early purchases.
- **Sales Tracking**: Maintains records of total tickets sold and total revenue generated from ticket sales.

##### Merchandise Sales
- **Additional Revenue**: Facilitates the sale of event-related merchandise.
- **Inventory Management**: Monitors stock levels and handles merchandise sales transactions.
- **Revenue Contribution**: Each merchandise sale contributes to the total event sales.

##### Polls for Attendee Engagement
- **Engagement Tool**: Allows attendees to participate in event-related polls.
- **Exclusive Participation**: Restricted to ticket holders, adding value to the ticket purchase.
- **Active Management**: Organizers can create and conclude polls to actively engage attendees.

##### Refund Management
- **Cancellation Policy**: Manages refunds in the event of a cancellation.
- **Refund Deadline**: Sets a deadline for refund claims, providing clarity and fairness.
- **Transparency and Trust**: Automated refund process enhances trust and transparency.

##### Feedback Collection
- **Attendee Insights**: Collects feedback from event attendees.
- **Quality Enhancement**: Utilizes feedback for future event improvements.

##### Fund Management for Organizers
- **Revenue Withdrawal**: Allows organizers to withdraw total sales revenue.
- **Financial Efficiency**: Facilitates efficient financial management of event earnings.

##### Ticket Transferability
- **Attendee Flexibility**: Enables ticket holders to transfer tickets.
- **Secondary Market Potential**: Allows for a potential secondary market in ticket sales.

##### Ending Ticket Sales
- **Sales Conclusion**: Organizers can close ticket sales, aiding in attendee management and event planning.

#### Business Model Characteristics
- **Digital and Automated**: Reduces manual intervention through digital automation.
- **Decentralization and Transparency**: Ensures transparent transactions and decentralized control using blockchain.
- **Security and Trust**: Provides a secure and trustworthy system with pre-defined, immutable rules.
- **Enhanced Engagement and Value**: Offers additional value to attendees, increasing engagement.
- **Revenue Diversification**: Diversifies revenue streams by combining ticket and merchandise sales.

#### Conclusion
The `EventTicketing` smart contract offers a modern, technology-driven solution for event management, aligning with current trends in efficient, transparent, and secure event handling. This model is particularly suitable for events looking to leverage blockchain technology for enhanced attendee experience and streamlined operations.

### Testing with Ganache:
---
#### Testing done using written tests:
![resultsCMD](https://github.com/gabskir/VU-DAPP/blob/main/Testing%20cmd.png?raw=true)
#### Testing using Ganache GUI and REMIX ID
1. From the image presented below we can see that the price of one ticket is set to 2 ETH: <br>
![price set](https://github.com/gabskir/VU-DAPP/blob/main/choose%20value%20to%20transfer.png?raw=true)
2. User chooses to buy 3 tickets, so the total sum - value to send (as seen in the image above) equals to 6 ETH <br>
![ticket number](https://github.com/gabskir/VU-DAPP/blob/main/How%20many%20tickets.png?raw=true)
3. In the Ganache GUI we can see that the balance of address that has decided to buy 3 tickets has decreaded by 6 ETH (initial balance: 100ETH)<br>
![balance decrease](https://github.com/gabskir/VU-DAPP/blob/main/atimta%20suma.png?raw=true)
4. In the Ganache GUI transaction logs we can see that the value sent with transaction equals to 6ETH:
![transaction value](https://github.com/gabskir/VU-DAPP/blob/main/Kiek%20issiusta%20su%20kontraktu.png?raw=true)

### Testing with Sepolia testnet:
**Contract address:** 0x60a8E3B80b84ed2De3AA952ECf2740d4877728b2
#### Transaction logs:
![all transaction](https://github.com/gabskir/VU-DAPP/blob/main/Transaction%20log.png?raw=true)
#### Ticket purchase:
**Buying tickets**<br>
![bought ticket](https://github.com/gabskir/VU-DAPP/blob/main/Bought%20ticket.png?raw=true)
<br>
**Event: ticket bought**<br>
![bought ticket event](https://github.com/gabskir/VU-DAPP/blob/main/Bought%20ticket%20event.png?raw=true)
#### Ticket transfer:
![ticket transfer](https://github.com/gabskir/VU-DAPP/blob/main/Ticket%20transfer.png?raw=true)
#### Organizer withdraws money:
![withdraw](https://github.com/gabskir/VU-DAPP/blob/main/Withdraw.png?raw=true)





