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
                        <td>{formatTime(ticket.CreatedUtc)}</td>
                        <td className="text-center">Game</td>
                        <td className="text-center" />
                        <td className="text-center">Option</td>
                        <td className="text-center">Coefficient</td>
                    </tr>
                </thead>
                <tbody>
                    {ticket.Bets.map((x, i) => {
                        let coefficient = x.Odd.Coefficient;
                        totalCoefficient *= coefficient;
                        return (
                            <tr id={'tp-' + i} className="info">
                                <td className="text-center">{x.Offer.Event.Participant1}</td>
                                <td className="text-center">-</td>
                                <td className="text-center">{x.Offer.Event.Participant2}</td>
                                <td className="text-center">{x.Odd.BetOption.Value}</td>
                                <td className="text-center">{coefficient.toFixed(2)}</td>
                            </tr>
                        )
                    })}
                    <tr>
                        <td colSpan="3" />
                        <td className="text-center">Total coefficient</td>
                        <td className="text-center">{totalCoefficient.toFixed(2)}</td>
                    </tr>
                    <tr>
                        <td colSpan="3" />
                        <td className="text-center">Bet amount</td>
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