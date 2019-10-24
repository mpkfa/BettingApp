const App = () => {
    const [modal, setModal] = React.useState(<Modal />);
    const [appUser, setAppUser] = React.useState(user);

    const openPage = (page) => {
        currentPageName = page.type.name.replace('Page', '');
        const pageTitle = `${appName} - ${currentPageName}`;
        window.history.pushState({}, pageTitle, `${window.location.origin}/${currentPageName}`);
        document.title = pageTitle;
        setPage(page);
    }

    const pageClick = (event, page) => {
        event.preventDefault();
        openPage(page);
    }

    const createTicket = () => {
        const bets = getCurrentBets();

        setModal(<Modal title='Create ticket' body={<TicketPreview bets={bets} />} okText='Create' okAction={() => {
            var ticket = {
                Amount: $('#bet-amount').val(),
                UserId: user.Id,
                CreatedUtc: new Date(),
                Bets: bets.map(x => ({
                    OfferId: x.offer.Id,
                    OddId: x.odd.Id
                }))
            };

            apiPost('tickets', ticket, () => {
                apiGet('users/' + user.Id, result => {
                    user = result;
                    $('#modal').modal('hide');
                    activeTicket.clear();
                    setAppUser(user);
                    setPage(<TicketsPage />);
                });
            });
        }} />);
        $('#modal').modal();
    }

    const [page, setPage] = React.useState(<OffersPage createTicket={createTicket} />);

    const NavItem = ({ text, page }) => {
        return (
            <li className={"nav-item" + (currentPageName == page.type.name.replace('Page', '') ? " active" : "")}>
                <a id={'nav-item-' + page.type.name} className="nav-link" href="" onClick={event => pageClick(event, page)}>{text}</a>
            </li>
        )
    }

    return (
        <div>
            {/* Navigation Bar */}
            <div className="navbar navbar-expand-lg navbar-dark bg-primary p-0 navbar-fixed-top">
                <div className="navbar-brand">
                    <img height='46px' src="/Content/Images/logo.svg" style={{ margin: "-15px", marginRight: "10px", marginTop: "-20px" }} />
                    {appName}
                </div>
                <div className="collapse navbar-collapse">
                    <ul className="navbar-nav mr-auto">
                        <NavItem text="Offers" page={<OffersPage createTicket={createTicket} />} />
                        <NavItem text="Tickets" page={<TicketsPage />} />
                        <NavItem text="History" page={<HistoryPage />} />
                    </ul>
                    <ul className="navbar-nav ml-auto">
                        <NavItem text={appUser.DisplayName + ' - €' + parseFloat(appUser.Credit).toFixed(2)} page={<AccountPage />} />
                    </ul>
                </div>
            </div>
            {/* Content page */}
            <div id="page" className="p-1 container-fluid fill-height overflow-auto">
                {page}
            </div>
            {modal}
        </div>
    );
}