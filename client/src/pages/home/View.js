import React, { useState } from 'react';
import { Button, Typography, Container, Grid, CircularProgress, Snackbar, Paper } from '@mui/material';
import MainCard from 'components/MainCard';
import config from '../../config';
import { Bar, Pie, Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  PointElement,
  LineElement
} from 'chart.js';

// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement, PointElement, LineElement);

const View = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [fileUploaded, setFileUploaded] = useState(false);
  const [loadingInsights, setLoadingInsights] = useState(false);
  const [insightsGenerated, setInsightsGenerated] = useState(false);
  const [insightsNotGenerated, setInsightsNotGenerated] = useState(false);
  const [analyticsData, setAnalyticsData] = useState(null); // State to hold analytics data

  const handleFileChange = (event) => {
    const file = event.target.files[0]; // Assuming single file selection
    if (file) {
      setSelectedFile(file);
      handleUpload(file);
    } else {
      setSelectedFile(null);
    }
  };

  const handleUpload = (file) => {
    analyticsData && setAnalyticsData(null); // Reset analytics data before fetching new data
    // Simulate an upload process (you should replace this with your actual upload logic)
    setUploading(true);
    setTimeout(() => {
      // Replace this timeout with actual upload logic (e.g., using Axios, fetch, etc.)
      console.log('File uploaded:', file.name);
      setUploading(false);
      setFileUploaded(true); // Set fileUploaded to true after upload completes
    }, 2000); // Simulating a 2 second upload process
  };

  const handleViewInsights = async () => {
    if (selectedFile) {
      try {
        const formData = new FormData();
        formData.append('file', selectedFile);

        setLoadingInsights(true); // Show loader for insights generation

        const response = await fetch(config.apiUrl + 'api/upload', {
          method: 'POST',
          body: formData
        });

        if (response.ok) {
          // Handle successful response
          console.log('File successfully uploaded to server');
          const data = await response.json();
          setAnalyticsData(data); // Save analytics data to state
          setInsightsGenerated(true); // Set insightsGenerated to true after successful insights generation
          setFileUploaded(false); // Reset fileUploaded state
          document.getElementById('file-upload-input').value = null; // Reset the file inputs
        } else {
          // Handle error response
          handleReset(); // Reset the form
          setInsightsNotGenerated(true); // Set insightsNotGenerated to true if insights generation fails
          console.error('Failed to upload file:', response.statusText);
        }

        setLoadingInsights(false); // Hide loader after receiving response
      } catch (error) {
        // Handle fetch error
        console.error('Error during file upload:', error);
        setLoadingInsights(false); // Hide loader on fetch error
      }
    } else {
      console.warn('No file selected');
    }
  };

  const handleSnackbarClose = () => {
    setInsightsGenerated(false); // Close the snackbar
    setInsightsNotGenerated(false); // Close the snackbar
  };

  const handleReset = () => {
    setFileUploaded(false);
    setAnalyticsData(null);
    setSelectedFile(null);
    document.getElementById('file-upload-input').value = null; // Reset the file input
  };

  return (
    <MainCard title="Start Your Journey with Customer Segmentation">
      <Container maxWidth="md">
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Grid container direction="column" alignItems="center" spacing={4} style={{ padding: '40px' }}>
              <Grid item xs={12}>
                <Typography variant="h4" gutterBottom align="center" style={{ fontWeight: 'bold' }}>
                  Elevate Your Hotel Business with Customer Segmentation
                </Typography>
              </Grid>

              <Grid item xs={12} md={8}>
                <Typography variant="body1" paragraph align="center">
                  Welcome to your all-in-one hotel management system tailored for the vibrant hospitality industry of Sri Lanka. Attracting
                  and retaining guests is vital for your hotel&apos;s success, and understanding your guests&apos; preferences is key to
                  achieving this goal.
                </Typography>
                <Typography variant="body1" paragraph align="center">
                  Customer segmentation allows you to personalize guest experiences, optimize marketing efforts, and increase guest
                  satisfaction. By categorizing guests into different segments based on their preferences, behaviors, and demographics, you
                  can tailor your services and offerings to meet their specific needs.
                </Typography>
                <Typography variant="body1" paragraph align="center">
                  Let&apos;s embark on a journey to transform your hotel business. Start exploring the power of customer segmentation today.
                </Typography>
              </Grid>

              <Grid
                container
                item
                xs={12}
                style={{ marginTop: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
              >
                {/* Left-aligned content (View Insights button) */}
                {fileUploaded && (
                  <Grid item style={{ textAlign: 'left' }}>
                    <Button
                      variant="contained"
                      size="large"
                      onClick={handleViewInsights}
                      style={{ backgroundColor: '#4caf50', color: '#ffffff', padding: '10px 20px' }}
                    >
                      {loadingInsights ? <CircularProgress size={24} style={{ color: '#ffffff' }} /> : 'View Insights'}
                    </Button>
                  </Grid>
                )}

                {/* Center-aligned content (Upload CSV File button and selected file name) */}
                <Grid item style={{ textAlign: 'center', flexGrow: 1 }}>
                  <label htmlFor="file-upload-input">
                    <Button
                      variant="contained"
                      component="span"
                      size="large"
                      color="primary"
                      style={{
                        border: 'none'
                      }}
                    >
                      {uploading ? <CircularProgress size={24} color="inherit" /> : 'Upload CSV File'}
                    </Button>
                    <input
                      type="file"
                      accept=".csv"
                      onChange={handleFileChange}
                      style={{ display: 'none' }} // Hide the actual file input
                      id="file-upload-input"
                    />
                  </label>
                  {/* Display selected file name if uploaded */}
                  {selectedFile && !uploading && <Typography variant="body1">Selected file: {selectedFile.name}</Typography>}
                </Grid>

                {/* Right-aligned content (Reset button) */}
                {fileUploaded && (
                  <Grid item style={{ textAlign: 'right' }}>
                    <Button variant="contained" color="error" size="large" onClick={handleReset} style={{ padding: '10px 20px' }}>
                      Reset
                    </Button>
                  </Grid>
                )}
              </Grid>
            </Grid>

            {/* Charts for displaying insights */}
            {analyticsData && (
              <>
                <Grid container spacing={3} style={{ marginTop: '20px' }}>
                  {/* typograpy for title */}
                  <Grid item xs={12}>
                    <Typography variant="h5" gutterBottom>
                      Cluster-Based Analytics
                    </Typography>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <Typography variant="h6">Cluster Counts</Typography>
                    <Bar
                      data={{
                        labels: Object.keys(analyticsData.cluster_counts),
                        datasets: [
                          {
                            label: 'Count',
                            data: Object.values(analyticsData.cluster_counts),
                            backgroundColor: ['#3f51b5', '#f50057', '#00bcd4']
                          }
                        ]
                      }}
                      options={{
                        scales: {
                          y: {
                            beginAtZero: true
                          }
                        }
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <Typography variant="h6">Average Guests per Cluster</Typography>
                    <Bar
                      data={{
                        labels: Object.keys(analyticsData.cluster_counts),
                        datasets: [
                          {
                            label: 'Adults',
                            data: Object.values(analyticsData.average_guests.adults),
                            backgroundColor: '#3f51b5',
                            stack: 'Stack 1'
                          },
                          {
                            label: 'Children',
                            data: Object.values(analyticsData.average_guests.children),
                            backgroundColor: '#f50057',
                            stack: 'Stack 1'
                          },
                          {
                            label: 'Babies',
                            data: Object.values(analyticsData.average_guests.babies),
                            backgroundColor: '#00bcd4',
                            stack: 'Stack 1'
                          }
                        ]
                      }}
                      options={{
                        scales: {
                          y: {
                            beginAtZero: true
                          }
                        },
                        plugins: {
                          legend: {
                            display: true,
                            position: 'bottom'
                          }
                        }
                      }}
                    />
                  </Grid>
                </Grid>

                <Grid container spacing={3} style={{ marginTop: '20px' }}>
                  <Grid item xs={12} md={6}>
                    <Typography variant="h6">Cluster ADR Averages</Typography>
                    <Line
                      data={{
                        labels: Object.keys(analyticsData.cluster_adr_averages),
                        datasets: [
                          {
                            label: 'ADR Average',
                            data: Object.values(analyticsData.cluster_adr_averages),
                            borderColor: '#3f51b5',
                            fill: false
                          }
                        ]
                      }}
                      options={{
                        scales: {
                          y: {
                            beginAtZero: true
                          }
                        }
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <Typography variant="h6">Cluster Stay Duration</Typography>
                    <Bar
                      data={{
                        labels: Object.keys(analyticsData.cluster_stay_duration),
                        datasets: [
                          {
                            label: 'Stay Duration',
                            data: Object.values(analyticsData.cluster_stay_duration),
                            backgroundColor: '#4caf50'
                          }
                        ]
                      }}
                      options={{
                        scales: {
                          y: {
                            beginAtZero: true
                          }
                        }
                      }}
                    />
                  </Grid>
                </Grid>

                <Grid container spacing={3} style={{ marginTop: '20px' }}>
                  <Grid item xs={12}>
                    <Typography variant="h5" gutterBottom>
                      Other Analytics
                    </Typography>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <Typography variant="h6">ADR per Market Segment</Typography>
                    <Bar
                      data={{
                        labels: Object.keys(analyticsData.adr_per_segment),
                        datasets: [
                          {
                            label: 'ADR',
                            data: Object.values(analyticsData.adr_per_segment),
                            backgroundColor: '#3f51b5'
                          }
                        ]
                      }}
                      options={{
                        scales: {
                          y: {
                            beginAtZero: true
                          }
                        }
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <Typography variant="h6">ADR per Customer Type</Typography>
                    <Bar
                      data={{
                        labels: Object.keys(analyticsData.adr_per_customer_type),
                        datasets: [
                          {
                            label: 'ADR',
                            data: Object.values(analyticsData.adr_per_customer_type),
                            backgroundColor: '#f50057'
                          }
                        ]
                      }}
                      options={{
                        scales: {
                          y: {
                            beginAtZero: true
                          }
                        }
                      }}
                    />
                  </Grid>
                </Grid>

                <Grid container spacing={3} style={{ marginTop: '20px' }}>
                  <Grid item xs={12} md={6}>
                    <Typography variant="h6">ADR per Country</Typography>
                    <Bar
                      data={{
                        labels: Object.keys(analyticsData.adr_per_country),
                        datasets: [
                          {
                            label: 'ADR',
                            data: Object.values(analyticsData.adr_per_country),
                            backgroundColor: '#00bcd4'
                          }
                        ]
                      }}
                      options={{
                        scales: {
                          y: {
                            beginAtZero: true
                          }
                        }
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <Typography variant="h6">Seasonal Bookings</Typography>
                    <Bar
                      data={{
                        labels: ['Winter', 'Spring', 'Summer', 'Fall'],
                        datasets: [
                          {
                            data: [
                              analyticsData.monthly_bookings.January +
                                analyticsData.monthly_bookings.February +
                                analyticsData.monthly_bookings.December,
                              analyticsData.monthly_bookings.March +
                                analyticsData.monthly_bookings.April +
                                analyticsData.monthly_bookings.May,
                              analyticsData.monthly_bookings.June +
                                analyticsData.monthly_bookings.July +
                                analyticsData.monthly_bookings.August,
                              analyticsData.monthly_bookings.September +
                                analyticsData.monthly_bookings.October +
                                analyticsData.monthly_bookings.November
                            ],
                            backgroundColor: ['#3f51b5', '#f50057', '#00bcd4', '#4caf50']
                          }
                        ]
                      }}
                      options={{
                        indexAxis: 'y',
                        elements: {
                          bar: {
                            borderWidth: 2
                          }
                        },
                        responsive: true,
                        plugins: {
                          legend: {
                            display: false
                          },
                          title: {
                            display: true,
                            text: 'Seasonal Bookings'
                          }
                        }
                      }}
                    />
                  </Grid>
                </Grid>

                <Grid container spacing={3} style={{ marginTop: '20px' }}>
                  <Grid item xs={12} md={6}>
                    <Typography variant="h6">Monthly Bookings</Typography>
                    <Bar
                      data={{
                        labels: Object.keys(analyticsData.monthly_bookings),
                        datasets: [
                          {
                            label: 'Bookings',
                            data: Object.values(analyticsData.monthly_bookings),
                            backgroundColor: '#f50057'
                          }
                        ]
                      }}
                      options={{
                        scales: {
                          y: {
                            beginAtZero: true
                          }
                        }
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <Typography variant="h6">Meal Counts</Typography>
                    <Pie
                      data={{
                        labels: Object.keys(analyticsData.meal_counts),
                        datasets: [
                          {
                            label: 'Count',
                            data: Object.values(analyticsData.meal_counts),
                            backgroundColor: ['#3f51b5', '#f50057', '#00bcd4', '#4caf50', '#ff9800']
                          }
                        ]
                      }}
                    />
                  </Grid>
                </Grid>

                <Grid container spacing={3} style={{ marginTop: '20px' }}>
                  <Grid item xs={12}>
                    <Typography variant="h5" gutterBottom>
                      Best Cluster Analytics
                    </Typography>
                  </Grid>
                  {/* component to display revenue of all three clusters */}
                  <Grid item xs={12} md={6}>
                    <Typography variant="h6">Revenue per Cluster</Typography>
                    <Bar
                      data={{
                        labels: Object.keys(analyticsData.cluster_revenue),
                        datasets: [
                          {
                            label: 'Revenue',
                            data: Object.values(analyticsData.cluster_revenue),
                            backgroundColor: ['#3f51b5', '#f50057', '#00bcd4']
                          }
                        ]
                      }}
                      options={{
                        scales: {
                          y: {
                            beginAtZero: true
                          }
                        }
                      }}
                    />
                  </Grid>
                  {/* special simple component to display best cluster name and it's revenue */}
                  <Grid item xs={12} md={6}>
                    <Paper elevation={3} style={{ padding: '20px' }}>
                      <Typography variant="h6" gutterBottom>
                        Best Cluster
                      </Typography>
                      <Typography variant="body1" color="textSecondary">
                        Cluster Name:
                      </Typography>
                      <Typography variant="body1">{analyticsData.best_cluster.name}</Typography>
                      <Typography variant="body1" color="textSecondary">
                        Revenue:
                      </Typography>
                      <Typography variant="body1">{analyticsData.best_cluster.revenue.toFixed(2)}</Typography>
                    </Paper>
                  </Grid>

                  <Grid item xs={12}>
                    <Paper elevation={3} style={{ padding: '20px' }}>
                      <Typography variant="h6" gutterBottom>
                        Average Values for the Best Cluster by Revenue
                      </Typography>
                      {/* typograpy to display best cluster name */}
                      <Typography variant="h4" color="textSecondary" style={{ marginBottom: '16px' }}>
                        {analyticsData.best_cluster.name}
                      </Typography>
                      <Grid container spacing={2}>
                        {Object.entries(analyticsData.median_values_numeric).map(([key, value]) => (
                          <Grid item xs={6} sm={4} md={3} key={key}>
                            <Typography variant="body2" color="textSecondary">
                              {key.replace(/_/g, ' ')}:
                            </Typography>
                            <Typography variant="body1">{value.toFixed(2)}</Typography>
                          </Grid>
                        ))}
                      </Grid>
                    </Paper>
                  </Grid>
                </Grid>

                <Grid container spacing={3} style={{ marginTop: '20px' }}>
                  <Grid item xs={12}>
                    <Paper elevation={3} style={{ padding: '20px' }}>
                      <Typography variant="h6" gutterBottom>
                        Most Frequent Categorical Values for the Best Cluster by Revenue
                      </Typography>
                      {/* typograpy to display best cluster name */}
                      <Typography variant="h4" color="textSecondary" style={{ marginBottom: '16px' }}>
                        {analyticsData.best_cluster.name}
                      </Typography>
                      <Grid container spacing={2}>
                        {Object.entries(analyticsData.mode_values_non_numeric).map(([key, value]) => (
                          <Grid item xs={6} sm={4} md={3} key={key}>
                            <Typography variant="body2" color="textSecondary">
                              {key.replace(/_/g, ' ')}:
                            </Typography>
                            <Typography variant="body1">{value}</Typography>
                          </Grid>
                        ))}
                      </Grid>
                    </Paper>
                  </Grid>
                </Grid>
              </>
            )}

            {/* Snackbar for displaying "Insights generated" */}
            <Snackbar
              open={insightsGenerated}
              autoHideDuration={6000}
              onClose={handleSnackbarClose}
              message="Insights generated. Scroll down to view the charts."
              anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
              action={
                <Button color="secondary" size="small" onClick={handleSnackbarClose}>
                  Close
                </Button>
              }
            />

            {/* Snackbar for displaying "Insights not generated" */}
            <Snackbar
              open={insightsNotGenerated}
              autoHideDuration={6000}
              onClose={handleSnackbarClose}
              message="Failed to generate insights. Please try again."
              anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
              action={
                <Button color="secondary" size="small" onClick={handleSnackbarClose}>
                  Close
                </Button>
              }
            />
          </Grid>
        </Grid>
      </Container>
    </MainCard>
  );
};

export default View;
