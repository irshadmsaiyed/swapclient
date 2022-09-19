import React from 'react';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import EventNoteIcon from '@mui/icons-material/EventNote';
import BadgeRoundedIcon from '@mui/icons-material/BadgeRounded';
import ScienceRoundedIcon from '@mui/icons-material/ScienceRounded';
import DirectionsBusRoundedIcon from '@mui/icons-material/DirectionsBusRounded';
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';
import LocalLibraryIcon from '@mui/icons-material/LocalLibrary';
import NoteAltIcon from '@mui/icons-material/NoteAlt';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import NavigationIcon from '@mui/icons-material/Navigation';
import SportsHandballIcon from '@mui/icons-material/SportsHandball';
import VolunteerActivismIcon from '@mui/icons-material/VolunteerActivism';
import LocationCityIcon from '@mui/icons-material/LocationCity';
import NightShelterIcon from '@mui/icons-material/NightShelter';
import SpaIcon from '@mui/icons-material/Spa';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

const menuItems = [
  {
    key: '1',
    text: 'Home',
    icon: <HomeRoundedIcon />,
    link: '/dashboard/admin',
  },
  {
    key: '2',
    text: 'Session',
    icon: <EventNoteIcon />,
    link: '/session',
  },
  {
    key: '3',
    text: 'Student',
    icon: <LocalLibraryIcon />,
    link: '/student',
  },
  {
    key: '4',
    text: 'Employee',
    icon: <BadgeRoundedIcon />,
    link: '/employee',
  },
  {
    key: '5',
    text: 'Subject-Class',
    icon: <ScienceRoundedIcon />,
    link: '/subject',
  },
  {
    key: '6',
    text: 'Divider',
    icon: '',
    link: '',
  },
  {
    key: '7',
    text: 'Exam-Schedule',
    icon: <NoteAltIcon />,
    link: '/transport',
  },
  {
    key: '8',
    text: 'Favourite Student',
    icon: <AutoAwesomeIcon />,
    link: '/transport',
  },
  {
    key: '9',
    text: 'Fee',
    icon: <CurrencyRupeeIcon />,
    link: '/fee',
  },
  {
    key: '10',
    text: 'Bus-Root',
    icon: <DirectionsBusRoundedIcon />,
    link: '/transport',
  },
  {
    key: '11',
    text: 'Bus Tracking',
    icon: <NavigationIcon />,
    link: '/transport',
  },
  {
    key: '12',
    text: 'Divider',
    icon: '',
    link: '',
  },
  {
    key: '13',
    text: 'Activities-Programs',
    icon: <SportsHandballIcon />,
    link: '/transport',
  },
  {
    key: '14',
    text: 'Donor-Visitors',
    icon: <VolunteerActivismIcon />,
    link: '/transport',
  },
  {
    key: '15',
    text: 'School',
    icon: <LocationCityIcon />,
    link: '/transport',
  },
  {
    key: '16',
    text: 'Hostel',
    icon: <NightShelterIcon />,
    link: '/transport',
  },
  {
    key: '17',
    text: 'Trust',
    icon: <SpaIcon />,
    link: '/transport',
  },
  {
    key: '18',
    text: 'User',
    icon: <AccountCircleIcon />,
    link: '/user',
  },
];

export default menuItems;
