import React from 'react';
import {useSideDrawer} from '../../shared/hooks/SideDrawerHook'




const Home = () => {

    const [sideState, toggleOpen, displayOnSide] = useSideDrawer(false)

    // let rngbool;

    // Math.random() <= 0.5 ? rngbool = false : rngbool = true;

    //doesnt work
    // const changeTheSideBar = useCallback(()=>{
    //     displayOnSide(<h1>AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA</h1>);
    // }, [])

    return (
        <div>
            <p>home works</p>

        {/* doesnt work */}
            {/* <span onClick={changeTheSideBar}>click to open and chage the sidebar</span> */}
        </div>
    )

}

export default Home;