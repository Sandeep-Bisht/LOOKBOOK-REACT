// ** React Imports
import { useState,useEffect } from 'react'
// ** MUI Imports
import Paper from '@mui/material/Paper'
import Table from '@mui/material/Table'
import TableRow from '@mui/material/TableRow'
import TableHead from '@mui/material/TableHead'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TablePagination from '@mui/material/TablePagination'
import Link from '@mui/material/Link'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import axios from 'axios'


const AllServicesDetails = () => {
  // ** States
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(10)

  const baseURL= process.env.REACT_APP_APIURL

  useEffect(()=>{
    allServicesDetails();
  },[])


  const columns = [
    { id: 'Service', label: 'Service', minWidth: 170 },
    { id: 'Icon', label: 'Icon', minWidth: 170 },
    { id: 'Images', label: 'Images', minWidth: 170 },
  
  ]

  let rows = [];

  const allServicesDetails = async () => {
    try {
      const response = await axios.get(`${baseURL}/service/all_services`);
      if (response.data) {
        const servicesData = response.data.data;
        const newRows = servicesData?.map((service) => {
          rows.push(service)
        });
        console.log(rows,"check the data");
      }
    } catch (error) {
      console.error("Error fetching services:", error);
      // Handle the error appropriately
    }
  };
  
  
  
  console.log(rows,"check the row")

  const handleChangePage = (event, newPage) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = event => {
    setRowsPerPage(+event.target.value)
    setPage(0)
  }

  return (
    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
              <Grid item xs={12}>
              <Box
                sx={{
                  gap: 5,
                  display: 'flex',
                  flexWrap: 'wrap',
                  alignItems: 'center',
                  justifyContent: 'end',
                  marginRight: "20px",
                  marginTop:"10px"
                }}
              >
                <Link  href='/management/services/create'>
                  Add
                </Link>
              </Box>
            </Grid>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label='sticky table'>
          <TableHead>
            <TableRow>
              {columns.map(column => (
                <TableCell key={column.id} align={column.align} sx={{ minWidth: column.minWidth }}>
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(row => {
              return (
                <TableRow hover role='checkbox' tabIndex={-1} key={row.code}>
                  {columns.map(column => {
                    const value = row[column.id]

                    return (
                      <TableCell key={column.id} align={column.align}>
                        {rows && rows.length>0 ? rows.map((item)=>item.service):""}
                      </TableCell>
                    )
                  })}
                </TableRow>
              )
            })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component='div'
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  )
}

export default AllServicesDetails
