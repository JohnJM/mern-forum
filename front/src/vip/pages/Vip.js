import React, {useContext, useEffect, useState} from 'react';

import {GetVipContent} from '../../service/VipService';
import {AuthContext} from '../../shared/context/AuthContext';

const Vip = () => {

    const auth = useContext(AuthContext);
    const [vipContent,
        setVipContent] = useState(null);

    useEffect(() => {
        GetVipContent(auth.loginState.token).then(res => {
            setVipContent(res.data.content);
        }).catch(err => {
            throw Error(err);
        })
    }, [auth.loginState.token]);

    if (!vipContent) {
        return 'loading VIP content...'
    }

    return vipContent;
        
    

}

export default Vip;