// Consts

const content = $('#content');

// Vars

var currentPageName = "Offers";
var activeTicket = new Map();
var user, allOffers, allTickets = [];

// Helpers

const formatTime = (time) => pad(new Date(time).getHours(), 2) + ':' + pad(new Date(time).getMinutes(), 2);
const getTime = () => formatTime(new Date());
const pad = (num, size) => ('000000000' + num).substr(-size);

// API

const apiGet = (url, onSuccess) => apiCall('GET', url, onSuccess);
const apiPost = (url, data, onSuccess) => apiCall('POST', url, onSuccess, data);
const apiPut = (url, data, onSuccess) => apiCall('PUT', url, onSuccess, data);
const apiDelete = (url, onSuccess) => apiCall('DELETE', url, onSuccess);

const apiCall = (type, url, onSuccess, data) => {
    if (data != null)
        console.log('POST: ' + JSON.stringify(data));

    $.ajax({
        url: 'api/' + url,
        type: type,
        data: JSON.stringify(data),
        contentType: 'application/json',
        //dataType: 'json',
        complete: (xhr, textStatus) => console.log(`${getTime()} - ${type} api/${url} => ${xhr.status} - ${textStatus}`),
        success: (result) => onSuccess(result)
    });
}

// Client data

const getCurrentBets = () => Array.from(activeTicket.entries())
    .filter(([k, v]) => v > 0)
    .map(([k, v]) => {
        var offer = allOffers.find(o => o.Id == k);
        var odd = offer.Odds.find(o => o.BetOptionId == v);
        return ({
            offer: offer,
            option: odd.BetOption.Value,
            coefficient: odd.Coefficient,
            odd: odd,
        })
    });

const getCoefficient = (offers) => {
    offers = offers || getCurrentBets();
    let coefficient = 1.0;
    offers.forEach(bet => coefficient *= bet.coefficient);
    return coefficient;
}

// UI

const updateTicketInfo = () => {
    let bets = getCurrentBets();
    let ticketInfo = $("#ticket-info");

    let setInfo = (canCreateTicket, infoText) => {
        ticketInfo.addClass(canCreateTicket ? 'badge-success' : 'badge-warning');
        ticketInfo.removeClass(canCreateTicket ? 'badge-warning' : 'badge-success');
        ticketInfo.html('<h5>' + infoText + '</h5>');
        $("#create-ticket").css('display', canCreateTicket ? 'block' : 'none');
    }

    if (!bets.length > 0)
        setInfo(false, 'Place bets to create ticket!');
    // TODO ostale validacije
    else
        setInfo(true, 'Total coefficient ' + getCoefficient(bets).toFixed(2));
}

// Init

window.onload = () => setTimeout(() => {
    content.fadeOut('fast', () => {
        content.removeClass();
        // TODO login
        apiGet('users/1', demoUser => {
            apiGet('offers', offers => {
                user = demoUser;
                allOffers = offers;
                ReactDOM.render(<App />, document.getElementById('content'));
                document.title = appName;
                content.fadeIn('fast', () => {
                    //showInfoModal("Wellcome", "Place betts of offers to create tickets.");
                });
            });
        })
    });
}, 1000); // Splash screen delay