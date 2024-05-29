import { actions } from "../utils/Links";
import FAB from "../components/Fab";
import Navbar from '../components/Navbar'
export default function Home(){
    return(
        <div className='header'>
        <Navbar/>
        <FAB actions={actions}/> 
        </div>
    )
}