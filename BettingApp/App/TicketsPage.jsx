const TicketsPage = () => {
    const [tickets, setTickets] = React.useState(allTickets);

    React.useEffect(() => {
        apiGet('tickets', tickets => {
            allTickets = tickets;
            setTickets(tickets);
        });
    }, []);

    const TicketsGrid = ({ ticket }) => {
        let totalCoefficient = 1.0;

        return (
            <table className="table">
                <thead>
                    <tr className="table-primary">
                        <th className="text-left w-5">{formatTime(ticket.CreatedUtc)}</th>
                        <th className="text-center w-25" />
                        <th className="text-center w-5">Game</th>
                        <th className="text-center w-25" />
                        <th className="text-center w-20">Option</th>
                        <th className="text-center w-20">Coefficient</th>
                    </tr>
                </thead>
                <tbody>
                    {ticket.Bets.map((x, i) => {
                        let coefficient = x.Odd.Coefficient;
                        totalCoefficient *= coefficient;
                        return (
                            <tr id={'tp-' + i} className="info">
                                <td>{formatTime(x.Offer.Event.CreatedUtc)}</td>
                                <td className="text-right">{x.Offer.Event.Participant1}</td>
                                <td className="text-center align-middle p-1"><img src={"Content/Images/Sports/" + x.Offer.Event.Sport.Icon} /></td>
                                <td className="text-left">{x.Offer.Event.Participant2}</td>
                                <td className="text-center">{x.Odd.BetOption.Value}</td>
                                <td className="text-center">{coefficient.toFixed(2)}</td>
                            </tr>
                        )
                    })}
                    <tr>
                        <td colSpan="4" />
                        <td className="text-right">Total coefficient:</td>
                        <td className="text-center">{totalCoefficient.toFixed(2)}</td>
                    </tr>
                    <tr>
                        <td colSpan="4" />
                        <td className="text-right">Bet amount:</td>
                        <td className="text-center">{ticket.Amount}</td>
                    </tr>
                </tbody>
            </table>
        )
    }

    return (
        <div>
            {allTickets.length == 0 ? "No tickets created" : allTickets.map((ticket, i) => <TicketsGrid id={i} ticket={ticket} />)}
        </div>
    )
}