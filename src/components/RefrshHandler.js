import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

function RefrshHandler({ setIsAuthenticated }) {
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        if (localStorage.getItem('token')) {
            setIsAuthenticated(true);

            const restrictedPages = ['/login', '/signup'];
            if (restrictedPages.includes(location.pathname) && !location.state?.fromNavigation) {
                navigate('/', { replace: true, state: { fromNavigation: true } });
            }
        }
    }, [location, navigate, setIsAuthenticated]);

    return null;
}

export default RefrshHandler;
