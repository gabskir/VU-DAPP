const EventTicketing = artifacts.require("EventTicketing");

module.exports = function (deployer) {
  const ticketPrice = web3.utils.toWei("0.001", "ether"); 
  const totalTickets = 100; 

  deployer.deploy(EventTicketing, ticketPrice, totalTickets);
};
