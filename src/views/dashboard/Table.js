// ** MUI Imports
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Chip from '@mui/material/Chip'
import Table from '@mui/material/Table'
import TableRow from '@mui/material/TableRow'
import TableHead from '@mui/material/TableHead'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import Typography from '@mui/material/Typography'
import TableContainer from '@mui/material/TableContainer'

const rows = [
  {
    age: 27,
    status: 'current',
    date: '09/27/2018',
    name: 'Sally Quinn',
    salary: '$19586.23',
    email: 'eebsworth2m@sbwire.com',
    designation: 'Human Resources Assistant'
  },
  {
    age: 61,
    date: '09/23/2016',
    salary: '$23896.35',
    status: 'professional',
    name: 'Margaret Bowers',
    email: 'kocrevy0@thetimes.co.uk',
    designation: 'Nuclear Power Engineer'
  },
  
  

]

const statusObj = {
  progress: { color: 'info' },
  rejected: { color: 'error' },
  pending: { color: 'primary' },
  resigned: { color: 'warning' },
  professional: { color: 'success' }
}

function calculateAge(birthdate) {
  const today = new Date();
  const birthdateDate = new Date(birthdate);
  let age = today.getFullYear() - birthdateDate.getFullYear();
  const monthDiff = today.getMonth() - birthdateDate.getMonth();

  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthdateDate.getDate())) {
    age--;
  }

  return age;
}

const DashboardTable = ({ artistRequests }) => {
  return (
    <Card>
      <TableContainer>
        <Table sx={{ minWidth: 800 }} aria-label='table in dashboard'>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Date</TableCell>
              <TableCell>Salary</TableCell>
              <TableCell>Age</TableCell>
              <TableCell>Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {artistRequests && artistRequests.map(row => (
              <TableRow hover key={row.profile_id?.fullName} sx={{ '&:last-of-type td, &:last-of-type th': { border: 0 } }}>
                <TableCell sx={{ py: theme => `${theme.spacing(0.5)} !important` }}>
                  <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                    <Typography sx={{ fontWeight: 500, fontSize: '0.875rem !important' }}>{row.profile_id?.fullName}</Typography>
                    <Typography variant='caption'>
                    {row.services?.map((service, i) => (i === row.services.length - 1 ? service.title : `${service.title}, `))}
                    </Typography>
                  </Box>
                </TableCell>
                <TableCell>{row.profile_id?.email}</TableCell>
                <TableCell>
                  {row.profile_id?.createdAt
    && new Date(row.profile_id.createdAt).toLocaleDateString('en-GB')}
    </TableCell>
                <TableCell>{row.pricing?.totalPrice}</TableCell>
                <TableCell> {row.profile_id?.dob
    ? calculateAge(new Date(row.profile_id.dob))
    : ''}</TableCell>
                <TableCell>
                  <Chip
                    label={row.status}
                    color={statusObj[row.status]?.color}
                    sx={{
                      height: 24,
                      fontSize: '0.75rem',
                      textTransform: 'capitalize',
                      '& .MuiChip-label': { fontWeight: 500 }
                    }}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Card>
  )
}

export default DashboardTable
