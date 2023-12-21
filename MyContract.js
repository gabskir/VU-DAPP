import web3 from './initializeWeb3';
import EventTicketingABI from './EventTicketingABI.json';

const contractAddress = '0x60a8E3B80b84ed2De3AA952ECf2740d4877728b2'

const myContract = new web3.eth.Contract(EventTicketingABI, contractAddress);

export default myContract;