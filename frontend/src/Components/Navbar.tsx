import { Link } from 'react-router-dom';
import { Avatar } from '@mui/material';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { resetUser } from '../API/postRequests';
import { getUserData } from '../API/getRequests';
import { IdefaultUserValues } from '../API/interfaces';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import '../Style/navbar.css'

const userDefaultData: IdefaultUserValues = {
    name: "admin",
    portfolio: {
        fiat: 200000,
        btc: 0,
        eth: 0,
    },
    trades: null
}

const Navbar: React.FC = () => {
    const queryClient = useQueryClient();                                                                                                                                       
    const {isLoading, isError, data} = useQuery<any>({
        queryKey: ["fiat"],
        queryFn: getUserData
    })
    const resetUserData = useMutation(resetUser)  

    const handleResetClick = async () => {
        try {
            const data = await resetUserData.mutateAsync(userDefaultData);
            console.log(data)
        } catch {
            console.error(resetUserData.error)
        }
    }
    
    return(
        <div className="navbar">
            <Box sx={{ flexGrow: 1 }}>
                <AppBar position="static">
                    <Toolbar>
                    <Typography onClick={() => window.location.href="/"} variant="h5" component="div" sx={{ flexGrow: 1, cursor: "pointer" }}>
                        Good crypto trading
                    </Typography>
                    <Button 
                        sx={{color: "black", backgroundColor: "white", marginRight: "1rem"}} 
                        onClick={() => handleResetClick()}
                    >
                        Reset
                    </Button>
                    <Link className='nav-link' to="/">Buy&Sell</Link>
                    <Link className='nav-link' to="/portfolio">Portfolio</Link>
                    <Link className='nav-link' to="/about">About</Link>
                    <Avatar color="inherit">PH</Avatar>
                    {isLoading ? (
                            <p>Loading...</p>
                        ) : (
                            data && !isError ? Object.entries(data).map(([key, value]: [any, any]) => <p key={key}>{value}</p>) : <p>NaN</p>
                        )
                    }
                    </Toolbar>
                </AppBar>
            </Box>
        </div>
    )
}

export default Navbar;