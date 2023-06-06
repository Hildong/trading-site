import { useEffect, useState } from "react"
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { buyCrypto, sellCrypto } from '../API/postRequests'
import Button from '@mui/material/Button'
import Modal from '@mui/material/Modal';
import { TextField } from "@mui/material";
import '../Style/crypto.css'

type Props = {
    showSellButton: Boolean,
    coin: String
}

export const CryptoComponent: React.FC<Props> = (props: Props) => {

    const [crypto, setCrypto] = useState<String>("")
    const [action, setAction] = useState<String>();
    const [amount, setAmount] = useState<Number>();
    const [open, setOpen] = useState<boolean>(false);

    const buyCryptoCoin = useMutation(buyCrypto); 
    const sellCryptoCoin = useMutation(sellCrypto);  

    useEffect(() => {
        const pricesWs = new WebSocket(`wss://ws.coincap.io/prices?assets=${props.coin}`)

        pricesWs.onmessage = msg => {
            const value = JSON.parse(msg.data)
            setCrypto(Object.values(value).toString())
        }

        return () => {
            pricesWs.close();
        }
    })

    const handleClose = () => {
        setOpen(false);
    }

    const handleOpen = (action: String) => {
        setOpen(true);
        setAction(action)
    }

    const handleInputAmountChange = (e: any) => {
        setAmount(e.target.value)
    }

    const buyCoin = async () => {
        try {
            const cryptoVariables = {name: "admin", volume: amount, quote: props.coin, price: Number(crypto) * Number(amount)}
            const data = await buyCryptoCoin.mutateAsync(cryptoVariables);
            console.log(data)
        } catch {
            console.error(buyCryptoCoin.error)
        }
    }

    const sellCoin = async () => {
        try {
            const cryptoVariables = {name: "admin", volume: amount, quote: props.coin, price: Number(crypto) * Number(amount)}
            const data = await sellCryptoCoin.mutateAsync(cryptoVariables);
            console.log(data)
        } catch {
            console.error(sellCryptoCoin.error)
        }
    }

    if(crypto === "") {
        return <div>Loading...</div>
    }

    return(
        <div className="crypto-container">
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <div className="confirm-sell-or-purchase-div">
                    <p>{action}</p>
                    <TextField onChange={(e) => handleInputAmountChange(e)} className="textfield" id="standard-basic" label="Amount" variant="standard" />
                    <section className="sell-or-purchase-buttons">
                        <Button sx={{backgroundColor: "gray", color: "white", fontSize: "0.7rem"}} onClick={handleClose}>Cancel</Button>
                        {
                            action === "Buy" ?
                            <Button
                                onClick={() => buyCoin()}
                                className="buy-or-sell-btn"
                                sx={{ backgroundColor: "green", color: "white", fontSize: "0.7rem"}}
                            >
                                Buy
                            </Button> :
                            <Button
                                onClick={() => sellCoin()}
                                className="buy-or-sell-btn"
                                sx={{ backgroundColor: "red", color: "white", fontSize: "0.7rem"}}
                            >
                                Sell
                            </Button>
                        }
                    </section>
                </div>
            </Modal>
            <p className="crypto-name">{props.coin}</p>
            <section className="crypto-in-USD-div">
                <p className="crypto-in-USD">{crypto} USD</p>
            </section>
            <section className="crypto-buttons-div">
                {
                    props.showSellButton ? <Button onClick={() => handleOpen("Sell")} sx={{ backgroundColor: "red", color: "white", height: "80%"}}>Sell</Button> : null
                }
                <Button onClick={() => handleOpen("Buy")} sx={{ backgroundColor: "green", color: "white", height: "80%"}}>Buy</Button>
            </section>
        </div>
    )
}