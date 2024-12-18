import React, { useEffect, useState } from "react";
import { Box, Typography, Grid2 as Grid, Card, CardContent, Avatar, List, ListItem, ListItemAvatar, ListItemText, Divider } from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import BookIcon from "@mui/icons-material/Book";
import AssignmentLateIcon from "@mui/icons-material/AssignmentLate";
import { Pie } from "react-chartjs-2";
import "chart.js/auto"; // Required for Chart.js v3+

const Dashboard = () => {
  // Dummy data for the pie chart
  const borrowedBooks = 120;
  const returnedBooks = 80;

  const pieData = {
    labels: ["Borrowed Books", "Returned Books"],
    datasets: [
      {
        data: [borrowedBooks, returnedBooks],
        backgroundColor: ["#873636", "#FFB397"], // Main colors
        hoverBackgroundColor: ["#C56565", "#FFE1D6"], // Hover colors
      },
    ],
  };

  // Dummy data for user base, total books, overdue borrowers, and returned borrowers
  const totalUsers = 150;
  const totalBooks = 1500;

  const overdueBorrowers = [
    { id: 1, name: "Samith Gunasekara", booksToReturn: 3 },
    { id: 2, name: "Nimal Perera", booksToReturn: 5 },
  ];

  const returnedBorrowers = [
    { id: 3, name: "Kamal Silva", booksReturned: 4 },
    { id: 4, name: "Samantha Fernando", booksReturned: 6 },
  ];

  // Calculate the total overdue book count
  const totalOverdueBooks = overdueBorrowers.reduce((total, borrower) => total + borrower.booksToReturn, 0);

  // Set a state variable to store the maximum content width
  const [maxWidth, setMaxWidth] = useState(0);

  // Function to calculate the maximum content width (increased width)
  const calculateMaxWidth = () => {
    const totalUserBaseWidth = 350; // Increased width for Total User Base box
    const totalBookCountWidth = 350; // Increased width for Total Book Count box
    const overdueBooksWidth = 350; // Increased width for Overdue Books box
    // We calculate the max content width based on the text and values in the content
    const max = Math.max(totalUserBaseWidth, totalBookCountWidth, overdueBooksWidth);
    setMaxWidth(max);
  };

  // Call the function to calculate the max width on component mount
  useEffect(() => {
    calculateMaxWidth();
  }, []);

  return (
    <Box sx={{ flexGrow: 1, p: 3 }}>
      {/* Dashboard Header */}
      <Typography variant="h4" gutterBottom>
        Library Dashboard
      </Typography>

      {/* Top Stats */}
      <Grid
        container
        spacing={2}
        justifyContent="center" // Center the content horizontally
        alignItems="stretch" // Stretch items to match height
      >
        {/* Total User Base */}
        <Grid item xs={12} sm={4} display="flex">
          <Card sx={{ flex: 1, display: "flex", alignItems: "center", p: 2, width: maxWidth }}>
            <Avatar sx={{ bgcolor: "#FFB397", mr: 2 }}>
              <AccountCircleIcon />
            </Avatar>
            <CardContent>
              <Typography variant="h6">Total User Base</Typography>
              <Typography variant="h4">{totalUsers}</Typography>
            </CardContent>
          </Card>
        </Grid>

        {/* Total Book Count */}
        <Grid item xs={12} sm={4} display="flex">
          <Card sx={{ flex: 1, display: "flex", alignItems: "center", p: 2, width: maxWidth }}>
            <Avatar sx={{ bgcolor: "#873636", mr: 2 }}>
              <BookIcon />
            </Avatar>
            <CardContent>
              <Typography variant="h6">Total Book Count</Typography>
              <Typography variant="h4">{totalBooks}</Typography>
            </CardContent>
          </Card>
        </Grid>

        {/* Total Overdue Books */}
        <Grid item xs={12} sm={4} display="flex">
          <Card sx={{ flex: 1, display: "flex", alignItems: "center", p: 2, width: maxWidth }}>
            <Avatar sx={{ bgcolor: "#FFB397", mr: 2 }}>
              <AssignmentLateIcon />
            </Avatar>
            <CardContent>
              <Typography variant="h6">Total Overdue Books</Typography>
              <Typography variant="h4">{totalOverdueBooks}</Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Pie Chart */}
      <Box sx={{ mt: 4 }}>
        <Typography variant="h6" gutterBottom>
          Book Borrowing Status (This Month)
        </Typography>
        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <Box sx={{ width: "400px" }}>
            <Pie data={pieData} />
          </Box>
        </Box>
      </Box>

      {/* Overdue Borrowers and Returned Borrowers */}
      <Grid container spacing={2} sx={{ mt: 4 }} justifyContent="center" alignItems="stretch">
        {/* Overdue Borrowers */}
        <Grid item xs={12} sm={6} display="flex">
          <Card sx={{ flex: 1, display: "flex", flexDirection: "column", height: "100%", width: maxWidth }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Overdue Borrowers
              </Typography>
              <List>
                {overdueBorrowers.map((borrower, index) => (
                  <React.Fragment key={borrower.id}>
                    <ListItem>
                      <ListItemAvatar>
                        <Avatar sx={{ bgcolor: "#873636" }}>
                          <AssignmentLateIcon />
                        </Avatar>
                      </ListItemAvatar>
                      <ListItemText
                        primary={borrower.name}
                        secondary={`Books to Return: ${borrower.booksToReturn}`}
                      />
                    </ListItem>
                    {index < overdueBorrowers.length - 1 && <Divider />}
                  </React.Fragment>
                ))}
              </List>
            </CardContent>
          </Card>
        </Grid>

        {/* Returned Borrowers */}
        <Grid item xs={12} sm={6} display="flex">
          <Card sx={{ flex: 1, display: "flex", flexDirection: "column", height: "100%", width: maxWidth }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Borrowers Who Returned Books
              </Typography>
              <List>
                {returnedBorrowers.map((borrower, index) => (
                  <React.Fragment key={borrower.id}>
                    <ListItem>
                      <ListItemAvatar>
                        <Avatar sx={{ bgcolor: "#FFB397" }}>
                          <BookIcon />
                        </Avatar>
                      </ListItemAvatar>
                      <ListItemText
                        primary={borrower.name}
                        secondary={`Books Returned: ${borrower.booksReturned}`}
                      />
                    </ListItem>
                    {index < returnedBorrowers.length - 1 && <Divider />}
                  </React.Fragment>
                ))}
              </List>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Dashboard;