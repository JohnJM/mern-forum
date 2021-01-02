import React from 'react';
import LoginModal from '../../shared/components/login-modal/LoginModal';



const Home = () => {


    // let rngbool;

    // Math.random() <= 0.5 ? rngbool = false : rngbool = true;

    return (
        <div>
            <LoginModal show={true} header='login header help'></LoginModal>

            <p>home works</p>
        </div>
    )

}

export default Home;