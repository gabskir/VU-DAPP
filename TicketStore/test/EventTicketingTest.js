const EventTicketing = artifacts.require("EventTicketing");

contract("EventTicketing", accounts => {
    let eventTicketing;

    before(async () => {
        eventTicketing = await EventTicketing.deployed();
    });

    it("should allow a user to buy tickets", async () => {
        await eventTicketing.buyTicket(1, { from: accounts[1], value: web3.utils.toWei("0.001", "ether") });
        const ticketsOwned = await eventTicketing.ticketsOwned(accounts[1]);
        assert.equal(ticketsOwned.toNumber(), 1, "The user should own 1 ticket");
    });

    it("should allow a user to transfer tickets", async () => {
        await eventTicketing.transferTicket(accounts[2], 1, { from: accounts[1] });
        const ticketsOwnedSender = await eventTicketing.ticketsOwned(accounts[1]);
        const ticketsOwnedReceiver = await eventTicketing.ticketsOwned(accounts[2]);
        assert.equal(ticketsOwnedSender.toNumber(), 0, "The sender should have 0 tickets");
        assert.equal(ticketsOwnedReceiver.toNumber(), 1, "The receiver should have 1 ticket");
    });

    it("should allow the organizer to create a poll", async () => {
        await eventTicketing.createPoll("Favorite Artist", ["Artist A", "Artist B"], { from: accounts[0] });
        const poll = await eventTicketing.polls(0);
        assert.equal(poll.question, "Favorite Artist", "Poll question should match");
        assert.equal(poll.isActive, true, "Poll should be active");
    });

    it("should allow a ticket holder to vote in a poll", async () => {
        await eventTicketing.voteOnPoll(0, "Artist A", { from: accounts[2] });
    });

    it("should allow the organizer to cancel the event and issue refunds", async () => {
        await eventTicketing.cancelEvent({ from: accounts[0] });
        const eventCancelled = await eventTicketing.eventCancelled();
        assert.equal(eventCancelled, true, "Event should be cancelled");

        await eventTicketing.pullRefund({ from: accounts[2] });
        const ticketsAfterRefund = await eventTicketing.ticketsOwned(accounts[2]);
        assert.equal(ticketsAfterRefund.toNumber(), 0, "User should have no tickets after refund");
    });

});

