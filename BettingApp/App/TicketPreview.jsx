const TicketPreview = ({ offers }) => {
    const coefficient = getCoefficient(offers);

    const calculate = () => {
        let amount = $('#bet-amount').val();
        $('#bet-payout').text('€' + ((coefficient * 0.95) * amount).toFixed(2));
        $('#modalOKButton').attr('disabled', amount == 0);
    }

    React.useEffect(calculate, []);

    return (
        <table className="table">
            <thead className="thead-dark">
                <tr id='tp-head'>
                    <td/>
                    <td className="text-center">Game</td>
                    <td/>
                    <td className="text-center">Option</td>
                    <td className="text-center">Coefficient</td>
                </tr>
            </thead>
            <tbody>
                {offers.map((x, i) => (
                    <tr id={'tp-' + i} className="p-0">
                        <td className="text-center">{x.offer.Event.Participant1}</td>
                        <td className="text-center">vs</td>
                        <td className="text-center">{x.offer.Event.Participant2}</td>
                        <td className="text-center">{x.option}</td>
                        <td className="text-center">{x.coefficient.toFixed(2)}</td>
                    </tr>
                ))}
                <tr id='tp-tc'>
                    <td className="text-right" colSpan="4">Total coefficient</td>
                    <td className="text-center">{coefficient.toFixed(2)}</td>
                </tr>
                <tr id='tp-ba'>
                    <td className="align-middle text-right" colSpan="2"><h5>Bet amount</h5></td>
                    <td>
                        <input type="number" min="1" max={user.Credit} className="form-control" id="bet-amount" placeholder="" onChange={calculate} />
                    </td>
                    <td className="align-middle text-right"><h5>Payout</h5></td>
                    <td className="align-middle text-center"><h5 id="bet-payout"></h5></td>
                </tr>
            </tbody>
        </table>
    )
}