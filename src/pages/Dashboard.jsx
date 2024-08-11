import { BarChart } from '@mui/x-charts/BarChart';
import Table from '@mui/material/Table';
import Typography from '@mui/material/Typography';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Container, Grid } from '@mui/material';
import MenuNavbar from '../components/MenuNavbar';
import { useQuery } from 'react-query'
import { useNavigate } from 'react-router-dom';


export default function Dashboard() {
  const navigate = useNavigate();
  const cookie = document.cookie;

  const getDashboard = async () => {
    const responseDetails = await fetch('http://localhost:3300/users', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include'
    })
    const responseDetailsData = await responseDetails.json()


    const responseStatistics = await fetch('http://localhost:3300/users/statistics', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include'
    })
    const responseStatisticsData = await responseStatistics.json()
    const responseData = {
      details: responseDetailsData.data,
      statistics: responseStatisticsData.data
    }
 
    
    return responseData
  }
  const { data, error, isError, isLoading } = useQuery('create', getDashboard)
  if (isLoading) {
    return <div>Loading...</div>
  }
  if (isError) {
    return <div>Error! {error.message}</div>
  }
  console.log('resultData', data.details)
  return (
    <>
      {
        cookie ? (
          <Container>
            <MenuNavbar />
            <Grid padding={10} justifyContent='center' spacing={2} sx={{ margin: 'auto' }}>
              <Grid padding={5} sx={{ backgroundColor: 'white', mb: 3, boxShadow: 2 }}>
                <Typography variant="h5" fontWeight='bold' gutterBottom align="left">
                  Dashboard Statistics
                </Typography>
                <BarChart
                  xAxis={[{ scaleType: 'band', data: ['Total Users', 'Users Active Today', 'Users Active 7 Days'], barGapRatio: 0.9, categoryGapRatio: 0.5 }]}
                  series={[{ data: data.statistics }]}
                  minWidth={200}
                  height={300}
                />
              </Grid>
              <Grid>
                <Typography variant="h5" fontWeight='bold' gutterBottom align="left">
                  Login Details
                </Typography>
                <TableContainer component={Paper} >
                  <Table aria-label="simple table">
                    <TableHead>
                      <TableRow sx={{ fontWeight: 'bold' }}>
                        <TableCell align="center">Email</TableCell>
                        <TableCell align="center">Signup At</TableCell>
                        <TableCell align="center">Logout At</TableCell>
                        <TableCell align="center">Login Count</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {data.details.map((row) => (
                        <TableRow
                          key={row.name}
                          sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                          <TableCell align="center">{row.email}</TableCell>
                          <TableCell align="center">{row.createdAt}</TableCell>
                          <TableCell align="center">{row.logoutAt}</TableCell>
                          <TableCell align="center">{row.loginCount}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </Grid>
            </Grid>
          </Container>

        ) : (
          navigate('/login')
        )
      }

    </>
  );
}
