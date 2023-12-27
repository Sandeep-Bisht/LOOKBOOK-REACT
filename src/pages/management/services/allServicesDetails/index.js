// ** React Imports
import { useState, useEffect } from 'react'
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
import { CiEdit } from "react-icons/ci";
import { MdDeleteForever } from "react-icons/md";
import { useNavigate, } from 'react-router-dom'
import { useLoaderData } from "react-router-dom";
import { Button } from '@mui/material'
import { MdAdd } from "react-icons/md";


const AllServicesDetails = () => {
  // ** States
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(10)
  const [rows, setRows] = useState([])
  const allServices = useLoaderData()

  const baseURL = process.env.REACT_APP_APIURL

  const navigate=useNavigate()

  useEffect(() => {
    allServicesDetails();
  }, [allServices])

  const columns = [
    { id: 'title', label: 'Title', minWidth: 170 },
    { id: 'icon', label: 'Icon', minWidth: 170 },
    { id: 'image', label: 'Images', minWidth: 170 },
    { id: 'action', label: 'Action', minWidth: 170 },
  ]

  const allServicesDetails = async () => {
    try {
      const response = await axios.get(`${baseURL}/service/all_services`);
      if (allServices && allServices.length>0) {
        const servicesData = allServices;
        const formattedData = servicesData.map(service => ({
          _id:service._id,
          service: service.title,
          icon: {
            thumbnailUrl: service.icon?.thumbnailUrl || '',
            name: service.icon?.name || ''
          },
          image: {
            thumbnailUrl: service.image?.thumbnailUrl || '',
            name: service.image?.name || ''
          }
        }));
        setRows(formattedData || []);
      }
    } catch (error) {
      return error.message || "An error occured while trying to get all service."
      // Handle the error appropriately
    }
  };
  
  const handleChangePage = (event, newPage) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = event => {
    setRowsPerPage(+event.target.value)
    setPage(0)
  }

  const editHandler = (_id)=>{
    navigate(`/management/services/${_id}`,{state:_id})
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
            marginTop: "10px"
          }}
        >
                    <Button type='submit' variant='contained' size='large' onClick={()=>navigate("/management/services/create")}>
          <MdAdd className="me-2"/> Add
          </Button>
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
  {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(row =>
  {
    return (
    <TableRow hover role='checkbox' tabIndex={-1} key={row._id}>
      {columns.map(column => (
        <TableCell key={column.id} align={column.align}>
          {column.id === "icon" ? (
            <div>
              <img src={row.icon?.thumbnailUrl} alt="Icon" style={{ height: "80px", width: "80px" }} />
            </div>
          ) : column.id === "image" ? (
            <div>
              <img src={row.image?.thumbnailUrl} alt="Image" style={{ height: "80px", width: "80px" }} />
            </div>
          ) : column.id === "title" ? (
            row.service
          ) : column.id === "action" ? (
            <div className='d-flex'>
              <div className="fs-4 text-black reset-edit-btn" onClick={() => editHandler(row?._id)}> {/* Assuming editHandler takes an ID */}
                <CiEdit />
              </div>
              <div className='ms-3 fs-4 text-black reset-edit-btn'>
                <MdDeleteForever />
              </div>
            </div>
          ) : (
            row[column.id]
          )}
        </TableCell>
      ))}
    </TableRow>
  )})}
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
