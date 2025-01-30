import logo from '../assets/logo.jpg';
import '../App.css';
import profile from '../assets/profile.png';

export default function Header(){
  return (
    <>
      <div className="header">
      <div className="logo">
      <img src={logo} className='logoimg' />
      <h1 className='logotxt'>Azign</h1>
      </div>
      <div>
        <img src={profile} className='profileimg' />
      </div>
      </div>
    </>
  )
}