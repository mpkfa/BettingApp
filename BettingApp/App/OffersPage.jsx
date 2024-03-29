﻿const OffersPage = ({ createTicket }) => {
    React.useEffect(updateTicketInfo, []);

    var distinctSportIds = [...new Set(allOffers.map(offer => offer.Event.SportId))];
    var distinctSportOffers = distinctSportIds.map(sportId => allOffers.filter(offer => offer.Event.SportId === sportId));

    const SportOffersGrid = ({ offers }) => {
        let sport = offers[0].Event.Sport;

        const SportOfferRow = ({ offer, onOptionChanged }) => {
            const [option, setOption] = React.useState(activeTicket.get(offer.Id) || 0);

            return (
                // <tr key={i} className={offer.IsTopOffer ? 'active' : '' }>
                <tr key={offer.Id} style={{ backgroundColor: offer.IsTopOffer ? 'darkslategray' : '' }}>
                    <td className="text-left w-5">{formatTime(offer.Event.StartUtc)}</td>
                    <td className="text-right w-25">{offer.Event.Participant1}</td>
                    <td className="text-center w-5">-</td>
                    <td className="text-left w-25">{offer.Event.Participant2}</td>
                    {offer.Odds.map((odd, i) => {
                        return (
                            <td key={i} className="text-center">
                                <button id={offer.Id + '-' + odd.BetOptionId} className={option == odd.BetOptionId ? " btn-success" : " btn-primary"} onClick={
                                    event => {
                                        const newOption = option != odd.BetOptionId ? odd.BetOptionId : 0;
                                        activeTicket.set(offer.Id, newOption);
                                        setOption(newOption);
                                        onOptionChanged.call();
                                    }}>{odd.Coefficient.toFixed(2)}</button>
                            </td>
                        )
                    })}
                </tr>
            );
        }

        return (
            <table className="table table-responsive-md">
                <thead>
                    <tr className="table-primary">
                        <th className="w-10 p-1 align-middle"><img src={"Content/Images/Sports/" + sport.Icon} /></th>
                        <th colSpan="3" className="text-center w-50">{sport.Name}</th>
                        {sport.BetOptions.map((option, i) => <th key={i} className="text-center">{option.Value}</th>)}
                    </tr>
                </thead>
                <tbody>
                    {offers.map((offer, i) => <SportOfferRow key={i} offer={offer} onOptionChanged={updateTicketInfo} />)}
                </tbody>
            </table >
        );
    }

    return (
        <div>
            {distinctSportOffers.map((sportOffers, i) => <SportOffersGrid key={i} offers={sportOffers} />)}
            <div id="ticket-info" className="badge d-block"></div>
            <div id="create-ticket">
                <button className="btn btn-primary btn-lg btn-block" onClick={createTicket}>Create ticket</button>
            </div>
        </div>
    )
}