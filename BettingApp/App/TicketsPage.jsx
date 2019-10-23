const TicketsPage = () => {
    let totalCoefficient = 1.0;

    const [tickets, setTickets] = React.useState(allTickets);

    React.useEffect(() => {
        apiGet('tickets', tickets => {
            allTickets = tickets;
            setTickets(tickets);
         } );
    }, []);

    const TicketsGrid = ({ ticket }) => {
        return (
            <table className="table table-responsive-md">
                <thead className="thead-dark">
                    <tr>
                        <td className="text-center" colSpan="3">Game</td>
                        <td className="text-center">Option</td>
                        <td className="text-center">Coefficient</td>
                    </tr>
                </thead>
                <tbody>
                    {ticket.Bets.map((x, i) => {
                        let coefficient = x.Odd.Coefficient;
                        totalCoefficient *= coefficient;
                        return (
                            <tr id={'tp-' + i} className="p-0">
                                <td className="text-center">{x.Offer.Event.Participant1}</td>
                                <td className="text-center">vs</td>
                                <td className="text-center">{x.Offer.Event.Participant2}</td>
                                <td className="text-center">{x.Odd.BetOption.Value}</td>
                                <td className="text-center">{coefficient.toFixed(2)}</td>
                            </tr>
                        )
                    })}
                    <tr>
                        <td colSpan="4">Total coefficient</td>
                        <td className="text-center">{totalCoefficient.toFixed(2)}</td>
                    </tr>
                    <tr>
                        <td colSpan="4">Bet amount</td>
                        <td>{ticket.Amount}</td>
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