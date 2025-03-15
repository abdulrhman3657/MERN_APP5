import { CiLogin, CiHome, CiUser} from "react-icons/ci";
import { VscBlank } from "react-icons/vsc";
import { Link } from 'react-router-dom';

function Header() {
  return (
    <div>

        <Link to='/'> <button> <CiHome /> set Goal </button></Link> <br />

        <Link to='/login'> <button> <CiLogin /> log in<VscBlank /> </button> </Link> <br />

        <Link to='/register'><button> <CiUser /> register </button></Link>
        
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