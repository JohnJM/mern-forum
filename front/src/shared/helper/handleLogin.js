import SideProfile from '../components/profile-side/ProfileSide';

export const handleLogin = (id, username, token, expirationDate, colour, setTokenExpirationDate, setLoginState, setContent) => {
    const tokenExpiry = expirationDate || new Date(new Date().getTime() + (1000 * 60 * 60 * 2));
    setTokenExpirationDate(tokenExpiry);
    
    localStorage.setItem('user', JSON.stringify({
        id,
        username,
        token,
        expires: tokenExpiry.toISOString(),
        colour
    }))
    
    setLoginState({isLoggedIn: true, id, username, token, colour});
    setContent(<SideProfile/>);
}
