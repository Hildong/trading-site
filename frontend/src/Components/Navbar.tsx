import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';
import { Avatar } from '@mui/material';
import '../Style/navbar.css'

const Navbar: React.FC = () => {
    return(
        <div className="navbar">
            <Box sx={{ flexGrow: 1 }}>
                <AppBar position="static">
                    <Toolbar>
                    <Typography onClick={() => window.location.href="/"} variant="h5" component="div" sx={{ flexGrow: 1, cursor: "pointer" }}>
                        Good crypto trading
                    </Typography>
                    <Link className='nav-link' to="/">Buy&Sell</Link>
                    <Link className='nav-link' to="/portfolio">Portfolio</Link>
                    <Link className='nav-link' to="/about">About</Link>
                    <Avatar color="inherit">PH</Avatar>
                    </Toolbar>
                </AppBar>
            </Box>
        </div>
    )
}

export default Navbar;