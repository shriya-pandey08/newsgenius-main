import React, { useContext } from 'react';
import { navigationMenu } from './NavigationMenu';
import { useNavigate } from 'react-router-dom';
import { Avatar, Button, Menu, MenuItem } from '@mui/material';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import { AuthContext } from '../../App';

const Navigation = () => {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    const navigate = useNavigate();
    const { user, logout } = useContext(AuthContext);

    const handleLogout = () => {
        logout();
        handleClose();
    };
    
    const navigateToPath = (item) => {
        if (item.title === "Profile") {
            // Navigate to the user's profile if logged in, otherwise prompt to login
            if (user) {
                navigate(`/profile/${user.id}`);
            } else {
                navigate('/auth');
            }
        } else {
            navigate(item.path);
        }
    };

    return (
        <div className="h-screen sticky top-0">
            <div>
                <div className="py-5">
                    <img
                        src="/logo.jpg"
                        alt="Logo"
                        width="80"
                        height="80"
                        className="cursor-pointer"
                        onClick={() => navigate('/')}
                    />
                </div>

                {/* Horizontal Navigation Bar */}
                <div className="space-y-6">
                    {navigationMenu.map((item) => (
                        <div
                            key={item.title}
                            className="cursor-pointer flex space-x-3 items-center"
                            onClick={() => navigateToPath(item)}
                        >
                            {item.icon}
                            <p className="text-xl">{item.title}</p>
                        </div>
                    ))}
                </div>

                <div className="py-10">
                    <Button
                        sx={{ width: "100%", borderRadius: "29px", py: "15px", bgcolor: '#1e88e5' }}
                        variant="contained"
                        onClick={() => user ? navigate('/create-article') : navigate('/auth')}
                    >
                        Post Article
                    </Button>
                </div>
            </div>

            <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                    <Avatar
                        alt={user?.name || 'Guest'}
                        src={user ? `https://ui-avatars.com/api/?name=${encodeURIComponent(user.name)}` : "https://cdn.pixabay.com/photo/2020/07/01/12/58/icon-5359553_960_720.png"}
                    />
                    <div>
                        <p className="font-medium">{user?.name || 'Guest'}</p>
                        {user && (
                            <p className="text-sm opacity-70">
                                @{user.name.toLowerCase().replace(/\s+/g, '_')}
                            </p>
                        )}
                    </div>

                    {user && (
                        <>
                            <Button
                                id="basic-button"
                                aria-controls={open ? 'basic-menu' : undefined}
                                aria-haspopup="true"
                                aria-expanded={open ? 'true' : undefined}
                                onClick={handleClick}
                            >
                                <MoreHorizIcon />
                            </Button>
                            <Menu
                                id="basic-menu"
                                anchorEl={anchorEl}
                                open={open}
                                onClose={handleClose}
                                MenuListProps={{
                                    'aria-labelledby': 'basic-button',
                                }}
                            >
                                <MenuItem onClick={handleLogout}>Logout</MenuItem>
                            </Menu>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Navigation;
