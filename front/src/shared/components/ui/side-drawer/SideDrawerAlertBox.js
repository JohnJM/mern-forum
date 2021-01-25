import React from 'react';
// import SideDrawer from './SideDrawer';

const SideDrawerAlertBox = props => {
    
    let setColour = false;

    props.colour === 'danger' ? setColour = 'red-500' : setColour = false; 

    return (
        <div className={`block alert-box bg-${setColour || props.colour || 'primary'}`}>
            {props.children}
        </div>
    );
}

export default SideDrawerAlertBox;