import {useDispatch} from 'react-redux'
import authService from '../../appwrite/auth'
import { logout } from '../../store/authSlice'


function LogoutBtn() {
    const dispatch = useDispatch();
    
    const logoutHandler = () => {
        authService.logout()// jb btn pr click ho to logout hojaen
        .then(()=>{//.then isliye kiunk logout aik promise return kr rha 
            dispatch(logout()) //state mein update krne kliye
        })
    }
  return (
    <button className='inline-bock px-6 py-2 duration-200 hover:bg-teal-500 rounded-full text-xl' onClick={logoutHandler}>Logout</button>
  )
}

export default LogoutBtn