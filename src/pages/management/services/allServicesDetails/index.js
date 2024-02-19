// ** MUI Imports
import Paper from '@mui/material/Paper'
import Table from '@mui/material/Table'
import TableRow from '@mui/material/TableRow'
import TableHead from '@mui/material/TableHead'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import { CiEdit } from "react-icons/ci";
import { MdDeleteForever } from "react-icons/md";
import { Link, useNavigate, } from 'react-router-dom'
import { useLoaderData } from "react-router-dom";
import { Button } from '@mui/material'
import { MdAdd } from "react-icons/md";


const AllServicesDetails = () => {
  // ** States
  const allServices = useLoaderData()

  const navigate=useNavigate()

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
            marginTop: "12px"
          }}
        >
          <Button type='submit' variant='contained' size='large' className='mb-3' onClick={()=>navigate("/management/services/create")}>
            <MdAdd className="me-3"/> Add
          </Button>
        </Box>
      </Grid>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label='sticky table'>
          <TableHead>
            <TableRow>
                <TableCell sx={{ minWidth: 170 }}>
                  S.No
                </TableCell>
                <TableCell sx={{ minWidth: 170 }}>
                  Title
                </TableCell>
                <TableCell sx={{ minWidth: 170 }}>
                  Categories
                </TableCell>
                <TableCell sx={{ minWidth: 170 }}>
                  Icon
                </TableCell>
                <TableCell sx={{ minWidth: 170 }}>
                  Image
                </TableCell>
                <TableCell sx={{ minWidth: 170 }}>
                  Status
                </TableCell>
                <TableCell sx={{ minWidth: 170 }}>
                  Actions
                </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {allServices && Array.isArray(allServices) && allServices.length > 0 && allServices.map((item,ind)=>{
              return (
                <TableRow key={item._id}>
                  <TableCell >
                    {ind + 1}
                  </TableCell>
                  <TableCell >
                    {item.title}
                  </TableCell>
                  <TableCell >
                    {item?.artist_category && Array.isArray(item?.artist_category) && item?.artist_category?.map((el)=>{
                      return el.title + ', ';
                    })}
                  </TableCell>
                  <TableCell>
                    <div>
                      <img src={item?.icon?.thumbnailUrl} alt="Image" style={{ height: "80px", width: "80px" }} />
                    </div>
                  </TableCell>
                  <TableCell>
                    <div>
                      <img src={item?.image?.thumbnailUrl} alt="Image" style={{ height: "80px", width: "80px" }} />
                    </div>
                  </TableCell>
                  <TableCell>{item.status}</TableCell>
                        <TableCell>
                        <div className='d-flex'>
                        <Link to={`/management/services/${item?._id}`} className="fs-4 text-black reset-edit-btn">
                            <CiEdit />
                        </Link>
                        <div className='ms-3 fs-4 text-black reset-edit-btn'>
                            <MdDeleteForever />
                        </div>
                        </div>
                        </TableCell>
                </TableRow>
              )
            })}
        </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  )
}

export default AllServicesDetails
