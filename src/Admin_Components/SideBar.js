import React , { useEffect, useState } from 'react';
//import axios from 'axios';
import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from 'react-router-dom';


//import UserDashboard from './Dashboard';
import UserDashb from './Dashb';
import UserCatalog from './Catalog';
import downloadImage from '../assets/download.png';

import { extendTheme, styled } from '@mui/material/styles';
import DashboardIcon from '@mui/icons-material/Dashboard';
//import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
//import BarChartIcon from '@mui/icons-material/BarChart';
//import DescriptionIcon from '@mui/icons-material/Description';
//import LayersIcon from '@mui/icons-material/Layers';
import { AppProvider } from '@toolpad/core/AppProvider';
import { DashboardLayout } from '@toolpad/core/DashboardLayout';
import { PageContainer } from '@toolpad/core/PageContainer';
//import PermContactCalendarIcon from '@mui/icons-material/PermContactCalendar';
//import QrCodeScannerIcon from '@mui/icons-material/QrCodeScanner';
//import ListIcon from '@mui/icons-material/List';
//import SummarizeIcon from '@mui/icons-material/Summarize';
//import ShowChartIcon from '@mui/icons-material/ShowChart';
//import AnalyticsIcon from '@mui/icons-material/Analytics';
//import TodayIcon from '@mui/icons-material/Today';



const NAVIGATION = [
  {
    kind: 'header',
    title: 'Main items',
  },

  {
    segment: 'dashboard',
    title: (<Link to="/Dashb" style={{ textDecoration: 'none', color: 'inherit', display: 'flex', alignItems: 'center' }}>Dashboard </Link>),
    icon: <DashboardIcon />,
    path: './Dashb',
  },

  {
    segment: 'Catalog',
    title: (<Link to="/Catalog" style={{ textDecoration: 'none', color: 'inherit', display: 'flex', alignItems: 'center' }}>Catalog </Link>),
    icon: <DashboardIcon />,
    path: './Catalog',
  },

  /*{
    segment: 'attendance',
    title: (<Link to="/Attendance" style={{ textDecoration: 'none', color: 'inherit', display: 'flex', alignItems: 'center' }}>Attendance </Link>),
    icon: <PermContactCalendarIcon />,
    path: './Attendance',
  },*/

  /*{
    segment: 'attendance',
    title: 'Attendance',
    icon: <PermContactCalendarIcon />,
    children: [
      {
        segment: 'List',
        title: (<Link to="/Attendance" style={{ textDecoration: 'none', color: 'inherit', display: 'flex', alignItems: 'center' }}><ListIcon style={{ marginRight: 18 }} />Attendance </Link>),
      },
      {
        segment: 'QR scanner',
        title: (<Link to="/AttendanceMarking" style={{ textDecoration: 'none', color: 'inherit', display: 'flex', alignItems: 'center' }}><QrCodeScannerIcon style={{ marginRight: 18 }} />QR scanner </Link>),
      },
      /*{
        segment: 'lms_library',
        title: (
          <Link to="/library-requests" style={{ textDecoration: 'none', color: 'inherit', display: 'flex', alignItems: 'center' }}> <DescriptionIcon style={{ marginRight: 20 }} /> Open Requests For Library </Link>
        ),
      },
    ],
  },
  {
    kind: 'divider',
  },
  {
    kind: 'header',
    title: 'Analytics',
  },
  {
    segment: 'reports',
    title: 'Reports',
    icon: <AnalyticsIcon />,
    children: [
      {
        segment: 'Summary',
        title: (<Link to="/Summary" style={{ textDecoration: 'none', color: 'inherit', display: 'flex', alignItems: 'center' }}><SummarizeIcon style={{ marginRight: 18 }} />Summary </Link>),
      },
      {
        segment: 'AttendanceChart',
        title: (<Link to="/AttendanceChart" style={{ textDecoration: 'none', color: 'inherit', display: 'flex', alignItems: 'center' }}><ShowChartIcon style={{ marginRight: 18 }} />AttendanceChart </Link>),
      },
      {
        segment: 'AverageAttendanceReport',
        title: (<Link to="/AverageAttendanceReport" style={{ textDecoration: 'none', color: 'inherit', display: 'flex', alignItems: 'center' }}><BarChartIcon style={{ marginRight: 18 }} />AverageAttendanceReport </Link>),
      },
      {
        segment: 'DailyAttendanceReport',
        title: (<Link to="/DailyAttendanceReport" style={{ textDecoration: 'none', color: 'inherit', display: 'flex', alignItems: 'center' }}><TodayIcon style={{ marginRight: 18 }} />DailyAttendanceReport </Link>),
      },
    ],
  },
  /*{
    segment: 'integrations',
    title: 'Integrations',
    icon: <LayersIcon />,
  },*/
];

const demoTheme = extendTheme({
  colorSchemes: { light: true, dark: true },
  colorSchemeSelector: 'class',
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 600,
      lg: 1200,
      xl: 1536,
    },
  },
});

function useDemoRouter(initialPath)
{
  const [pathname, setPathname] = React.useState(initialPath);

  const router = React.useMemo(() => 
  {
    return {
      pathname,
      searchParams: new URLSearchParams(),
      navigate: (path) => setPathname(String(path)),
    };
  }, [pathname]);

  return router;
}

const Skeleton = styled('div')(({ theme, height }) => 
({
  backgroundColor: theme.palette.action.hover,
  borderRadius: theme.shape.borderRadius,
  height,
  content: '" "',
}));



export default function DashboardLayoutBasic(props) 
{
    useEffect(() => 
    {
        const titleElement = document.querySelector('.MuiTypography-root.MuiTypography-h6.css-1je49cu-MuiTypography-root');
        if (titleElement) 
        {
          titleElement.textContent = 'Vajiraramaya'; // Replace "Vajiraramaya" with your desired text
          titleElement.style.color = 'orange';
        }

        const imageContainer = document.querySelector('.css-yzjoij');
        if (imageContainer) {
        // Clear existing SVG content
        imageContainer.innerHTML = '';

        const newImage = document.createElement('img');
        newImage.src = downloadImage; // Use imported path if it's within src
        newImage.width = 40;
        newImage.height = 40;
        // Append the new image to the container
        imageContainer.appendChild(newImage);
        }
      }, []);

  
  const { window } = props;
  const router = useDemoRouter('/');
  const demoWindow = window ? window() : undefined;

  return (
    <Router>
    <AppProvider navigation={NAVIGATION} router={router} theme={demoTheme} window={demoWindow}>
      <DashboardLayout>
        <PageContainer>
            <Routes>
                <Route path="/Dashb" element={<UserDashb />} />
                <Route path="/Catalog" element={<UserCatalog />} />
            </Routes>
        </PageContainer>
      </DashboardLayout>
    </AppProvider>
    </Router>
  );
}