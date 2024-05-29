import '../App.css'
import arrow from '../assets/arrrow.svg'
export default function Down({text}){
    return( 
        <div className='arrows'>
        <span style={{ opacity: '50%'}}>{text}</span>
        <img src={arrow} alt="arrow"  className='arrow'/>
        </div>
    )
}