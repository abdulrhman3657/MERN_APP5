import { CiLogin, CiHome, CiUser, CiLogout} from "react-icons/ci";
import { VscBlank } from "react-icons/vsc";
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from "react-redux";
import { logout, reset } from "../features/auth/authSlice";

function Header() {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const {user} = useSelector((state) => state.auth);

    const onLogOut = () => {
        dispatch(logout());
        dispatch(reset());
        navigate('/');
    }

  return (
    <div>

        {user ? (<>
            <button onClick={onLogOut}> <CiLogout />logout<VscBlank /> </button> <br />
        </>) : (<>
            <Link to='/login'> <button> <CiLogin /> log in<VscBlank /> </button> </Link> <br />

            <Link to='/register'><button> <CiUser /> register </button></Link> <br />
        </>)}

        <Link to='/'> <button> <CiHome /> set Goal </button></Link> <br />


        
    </div>
    )
}

export default Header


{/* <header className='header'>
<div className='logo'>
    <Link to='/'>Goal setter</Link>
</div>
<ul>
    <li>
        <Link to='/login'>Login</Link>
    </li>
    <li>
        <Link to='/register'>Register</Link>
    </li>
</ul>
</header> */}