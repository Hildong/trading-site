import { useEffect} from 'react'
import { CryptoComponent } from '../Components/cryptoComponent'
import axios from 'axios'
import '../Style/home.css'

const Home: React.FC = () => {

    return(
        <div className='home-div'>
            <h1>Cryptos</h1>
            <CryptoComponent showSellButton={true} coin={"bitcoin"}/>
            <CryptoComponent showSellButton={true} coin={"ethereum"}/>
        </div>
    )
}

export default Home;