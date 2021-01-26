import React, { useContext, useEffect, useState } from 'react';

import {GetVipContent} from '../../service/VipService';
import {AuthContext} from '../../shared/context/AuthContext';

const Vip = () => {

    const auth = useContext(AuthContext);

    const [vipContent, setVipContent] = useState(null);

    useEffect(() =>{
        GetVipContent(auth.loginState.token).then(res => {
            setVipContent(res.data.content);
        }).catch(err => {
            console.log('error getting VIP content: ', err);
        })
    },[]);

    if (!vipContent){
        return 'loading VIP content...'
    } 

    return (
        <>
            <p>VIP WORKS - EXCLUSIVE CONTENT HERE : </p>
            {vipContent}
        </>
    )

}

export default Vip;