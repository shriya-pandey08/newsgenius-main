import HomeIcon from "@mui/icons-material/Home"
import ExploreIcon from "@mui/icons-material/Explore"
import NotificationIcon from "@mui/icons-material/Notifications"
import GroupIcon from '@mui/icons-material/Group';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import TheatersIcon from '@mui/icons-material/Theaters';
import SportsIcon from '@mui/icons-material/Sports';
import PsychologyIcon from '@mui/icons-material/Psychology';
import BusinessIcon from '@mui/icons-material/Business';
import ComputerIcon from '@mui/icons-material/Computer';
import SchoolIcon from '@mui/icons-material/School';

export const navigationMenu=[

    {
        title:"Home",
        icon:<HomeIcon/>,
        path:"/"
    },
    {
        title:"Explore",
        icon:<ExploreIcon/>,
        path:"/explore"
    }, {
        title:"Notifications",
        icon:<NotificationIcon/>,
        path:"/notification"
    }, 
    {
        title:"Communities",
        icon:<GroupIcon/>,
        path:"/communities"
    },
    {
        title:"Profile",
        icon:<AccountCircleIcon/>,
        path:"/profile"
    },
   
    {
        title:"Entertainment",
        icon:<TheatersIcon/>,
        path:"/entertainment"
    },
    {
        title:"Sports",
        icon:<SportsIcon/>,
        path:"/sports"
    },
    {
        title:"Astrology",
        icon:<PsychologyIcon/>,
        path:"/astrology"
    },
    {
        title:"Business",
        icon:<BusinessIcon/>,
        path:"/business"
    },
    {
        title:"Technology",
        icon:<ComputerIcon/>,
        path:"/technology"
    },
    {
        title:"Education",
        icon:<SchoolIcon/>,
        path:"/education"
    },
]
