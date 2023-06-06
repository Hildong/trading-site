import { useQuery } from '@tanstack/react-query';
import { CryptoComponent } from '../Components/cryptoComponent'
import { getTrades } from '../API/getRequests';
import { TradeTable } from '../Components/Tables/tradeTables';
import '../Style/portfolio.css';

const Portfolio: React.FC = () => {
    const {isLoading, isError, data} = useQuery<any>({
        queryKey: ["trades"],
        queryFn: getTrades
    })

    if (isLoading) {
        return <div>Loading...</div>
    }

    console.log(data[0].trades)

    return(
        <div className='portfolio-div'>
            <section className="portfolio-left-side-div">
                <CryptoComponent showSellButton={true} coin={"bitcoin"}/>
                <CryptoComponent showSellButton={true} coin={"ethereum"}/>
            </section>
            <section className="portfolio-right-side-div">
                <TradeTable data={data[0].trades} />
            </section>
        </div>
    )
}

export default Portfolio;