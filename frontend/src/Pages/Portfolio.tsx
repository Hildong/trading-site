import { useState, useEffect } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { CryptoComponent } from '../Components/cryptoComponent'
import { getTrades } from '../API/getRequests';
import { TradeTable } from '../Components/Tables/tradeTables';
import '../Style/portfolio.css';

const Portfolio: React.FC = () => {
    const [querKey, setQuerKey] = useState<string[]>(["trades"])

    const queryClient = useQueryClient();
    const {isLoading, isError, data} = useQuery<any>({
    queryKey: querKey,
        queryFn: getTrades
    })

    useEffect(() => {
        if (querKey[0].includes("trades")) {
          queryClient.invalidateQueries(["trades"]);
        }
    }, [querKey, queryClient]);
    
    if (isLoading) {
        return <div>Loading...</div>
    }

    if(isError) {
        return <div>There was an error</div>
    }

    console.log(data[0].trades)

    return(
        <div className='portfolio-div'>
            <section className="portfolio-left-side-div">
                <CryptoComponent showSellButton={true} coin={"bitcoin"} trades={data[0].trades} invalidateQuery={() => setQuerKey(["trades"])}/>
                <CryptoComponent showSellButton={true} coin={"ethereum"} trades={data[0].trades} invalidateQuery={() => setQuerKey(["trades"])}/>
            </section>
            <section className="portfolio-right-side-div">
                <TradeTable data={data[0].trades} />
            </section>
        </div>
    )
}

export default Portfolio;