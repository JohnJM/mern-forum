import FormLogin from '../components/form/FormLogin';

export const handleLogout = (setLogoutState, setTokenExpirationDate, displayAlertMsg, displayContent) => {
        setLogoutState();
        setTokenExpirationDate(null);
        localStorage.removeItem('user');
        displayAlertMsg('Logged out succesfully');
        displayContent(<FormLogin forSideBar/>);
}