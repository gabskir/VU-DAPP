// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

contract EventTicketing {
    struct Poll {
        string question;
        string[] options;
        mapping(string => uint) votes;
        bool isActive;
    }

    struct Merchandise {
        string name;
        uint price;
        uint stock;
    }
    
    Poll[] public polls;
    Merchandise[] public merchandiseList;
    address public organizer;
    uint public ticketPrice;
    uint public totalTickets;
    uint public ticketsSold;
    uint public totalSales;
    bool public eventCancelled = false;
    uint public refundDeadline;
    mapping(address => uint) public ticketsOwned;
    mapping(address => uint) public amountPaid;
    mapping(address => bool) public attendeeFeedbackSubmitted;
    mapping(uint => mapping(address => bool)) public hasVotedOnPoll;

    event TicketPurchased(address attendee, uint tickets, uint amountPaid);
    event TicketTransferred(address from, address to, uint tickets);
    event FeedbackSubmitted(address attendee);
    event EventCancelled();
    event RefundIssued(address attendee, uint amount);
    event PollCreated(uint pollId, string question, string[] options);
    event Voted(address voter, uint pollId, string option);
    event MerchandiseAdded(uint indexed merchandiseId, string name, uint price, uint stock);
    event MerchandisePurchased(address indexed buyer, uint indexed merchandiseId, uint quantity);
    event MerchandiseRestocked(uint indexed merchandiseId, uint newStock);

    constructor(uint _ticketPrice, uint _totalTickets) {
        organizer = msg.sender;
        ticketPrice = _ticketPrice;
        totalTickets = _totalTickets;
    }

    function buyTicket(uint tickets) public payable {
        uint currentPrice = currentTicketPrice() * tickets;
        require(msg.value == currentPrice, "Incorrect payment");
        require(ticketsSold + tickets <= totalTickets, "Not enough tickets");
        ticketsOwned[msg.sender] += tickets;
        ticketsSold += tickets;
        totalSales += msg.value;
        emit TicketPurchased(msg.sender, tickets, msg.value);
    }

    function transferTicket(address to, uint tickets) public {
        require(ticketsOwned[msg.sender] >= tickets, "Not enough tickets");
        
        ticketsOwned[msg.sender] -= tickets;
        ticketsOwned[to] += tickets;

        emit TicketTransferred(msg.sender, to, tickets);
    }


    function currentTicketPrice() public view returns (uint) {
        if (ticketsSold < totalTickets / 2) {
            return ticketPrice; 
        } else if (ticketsSold < (3 * totalTickets) / 4) {
            return ticketPrice + (ticketPrice / 10);
        } else {
            return ticketPrice + (ticketPrice / 5);
        }
    }

    function createPoll(string memory question, string[] memory options) public {
        require(msg.sender == organizer, "Only organizer can create polls");
        
        Poll storage newPoll = polls.push();
        newPoll.question = question;
        newPoll.isActive = true;

        for (uint i = 0; i < options.length; i++) {
            newPoll.options.push(options[i]);
        }
        
        emit PollCreated(polls.length - 1, question, options);
    }

    function voteOnPoll(uint pollId, string memory option) public {
        require(ticketsOwned[msg.sender] > 0, "Must be a ticket holder to vote");
        require(!hasVotedOnPoll[pollId][msg.sender], "Already voted on this poll");
        require(pollId < polls.length, "Poll does not exist");
        require(polls[pollId].isActive, "Poll is not active");

        Poll storage poll = polls[pollId];
        bool isValidOption = false;
        for(uint i = 0; i < poll.options.length; i++) {
            if(keccak256(bytes(poll.options[i])) == keccak256(bytes(option))) {
                isValidOption = true;
                break;
            }
        }
        require(isValidOption, "Invalid voting option");

        poll.votes[option]++;
        hasVotedOnPoll[pollId][msg.sender] = true;
        
        emit Voted(msg.sender, pollId, option);
    }

    function endPoll(uint pollId) public {
        require(msg.sender == organizer, "Only organizer can end polls");
        require(pollId < polls.length, "Poll does not exist");
        require(polls[pollId].isActive, "Poll is already ended");

        polls[pollId].isActive = false;
    }

    function cancelEvent() public {
        require(msg.sender == organizer, "Only organizer can cancel the event");
        require(!eventCancelled, "Event already cancelled");
        eventCancelled = true;
        refundDeadline = block.timestamp + 3 minutes;
        emit EventCancelled();
    }

    function pullRefund() public {
        require(eventCancelled, "Event not cancelled");
        require(block.timestamp <= refundDeadline, "Refund deadline passed");
        uint tickets = ticketsOwned[msg.sender];
        require(tickets > 0, "No tickets to refund");

        uint refundAmount = amountPaid[msg.sender];
        ticketsOwned[msg.sender] = 0;
        amountPaid[msg.sender] = 0;
        ticketsSold -= tickets;
        
        payable(msg.sender).transfer(refundAmount);
        emit RefundIssued(msg.sender, refundAmount);
    }

    function addMerchandise(string memory name, uint price, uint stock) public {
        require(msg.sender == organizer, "Only organizer can add merchandise");
        merchandiseList.push(Merchandise(name, price, stock));
        emit MerchandiseAdded(merchandiseList.length - 1, name, price, stock);
    }

    function buyMerchandise(uint merchandiseId, uint quantity) public payable {
        require(merchandiseId < merchandiseList.length, "Merchandise does not exist");
        Merchandise storage item = merchandiseList[merchandiseId];
        require(item.stock >= quantity, "Not enough stock");
        require(msg.value == item.price * quantity, "Incorrect payment");

        item.stock -= quantity;
        totalSales += msg.value;
        emit MerchandisePurchased(msg.sender, merchandiseId, quantity);
    }

    function withdrawFunds() public {
        require(msg.sender == organizer, "Only the organizer can withdraw funds");

        uint amount = totalSales;
        require(amount > 0, "No funds to withdraw");

        totalSales = 0;

        (bool sent, ) = msg.sender.call{value: amount}("");
        require(sent, "Failed to send Ether");
    }

    function restockMerchandise(uint merchandiseId, uint additionalStock) public {
        require(msg.sender == organizer, "Only organizer can restock merchandise");
        require(merchandiseId < merchandiseList.length, "Merchandise does not exist");

        Merchandise storage item = merchandiseList[merchandiseId];
        item.stock += additionalStock;

        emit MerchandiseRestocked(merchandiseId, item.stock);
    }

    function submitFeedback() public {
        require(ticketsOwned[msg.sender] > 0, "Must be an attendee");
        require(!attendeeFeedbackSubmitted[msg.sender], "Feedback already submitted");
        attendeeFeedbackSubmitted[msg.sender] = true;
        emit FeedbackSubmitted(msg.sender);
    }

    function endTicketSales() public {
        require(msg.sender == organizer, "Only organizer can end ticket sales");
        totalTickets = ticketsSold;
    }
}
