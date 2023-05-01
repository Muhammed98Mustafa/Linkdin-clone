import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const RequireAuth = ({ children }) => {
    const navigate = useNavigate();
    const {userLogin} = useSelector((state)=> state.users)
    
    useEffect(()=> {
        if (!userLogin) {
            navigate("/", { replace: true });
            return;
          } 
    })
    return children;
  };

export default RequireAuth;







