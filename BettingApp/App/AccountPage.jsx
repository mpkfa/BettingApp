const AccountPage = () => {
    return (
        <div>
            <h4>Account</h4>
            <h5>Display name: {user.DisplayName}</h5>
            <h5>Username: {user.Username}</h5>
            <h5>Password: {user.Password}</h5>
            <h5>Credits: €{user.Credit}</h5>
        </div>
    )
}