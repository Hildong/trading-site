import { useEffect, useState } from "react"
import Button from '@mui/material/Button'
import Modal from '@mui/material/Modal';
import { TextField } from "@mui/material";
import '../Style/crypto.css'

type Props = {
    showSellButton: Boolean,
    coin: String
}

export const CryptoComponent: React.FC<Props> = (props: Props) => {

    const [BTC, setBTC] = useState<String>()
    const [action, setAction] = useState<String>();
    const [open, setOpen] = useState<boolean>(false);

    useEffect(() => {
        const pricesWs = new WebSocket(`wss://ws.coincap.io/prices?assets=${props.coin}`)

        pricesWs.onmessage = msg => {
            const value = JSON.parse(msg.data)
            setBTC(Object.values(value).toString())
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

    const buyCoin = () => {

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
                    <TextField className="textfield" id="standard-basic" label="Amount" variant="standard" />
                    <section className="sell-or-purchase-buttons">
                        <Button sx={{backgroundColor: "gray", color: "white", fontSize: "0.7rem"}} onClick={handleClose}>Cancel</Button>
                        {
                            action === "Buy" ?
                            <Button
                                className="buy-or-sell-btn"
                                sx={{ backgroundColor: "green", color: "white", fontSize: "0.7rem"}}
                            >
                                Buy
                            </Button> :
                            <Button
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
                <p className="crypto-in-USD">{BTC} USD</p>
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