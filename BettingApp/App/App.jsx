const App = () => {
    const [modal, setModal] = React.useState(<Modal />);

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
        setModal(<Modal title='Create ticket' body={<TicketPreview offers={getActiveTicketOffers()} />} okText='Create' okAction={() => {
            var ticket = {
                Amount: 55.55,
                UserId: 1,
                CreatedOn: new Date().toJSON(),
                TicketItems: [{
                    OfferId: 1,
                    OptionId: 1
                }]
            };

            apiPost('tickets', ticket, () => {
                openPage(<TicketsPage />);
                $('#modal').modal('hide');
            });
        }} />);
        $('#modal').modal();
    }

    const [page, setPage] = React.useState(<OffersPage createTicket={createTicket} />);

    const NavItem = ({ text, page }) => {
        return (
            <li className={"nav-item" + (currentPageName == page.type.name.replace('Page', '') ? " active" : "")}>
                <a className="nav-link" href="" onClick={event => pageClick(event, page)}>{text}</a>
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
                        <NavItem text={user.DisplayName + ' - €' + parseFloat(user.Credit).toFixed(2)} page={<AccountPage />} />
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