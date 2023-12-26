// ** React Imports
import { useState, useEffect } from 'react'
// ** MUI Imports
import Paper from '@mui/material/Paper'
import Table from '@mui/material/Table'
import Chip from '@mui/material/Chip';
import TableRow from '@mui/material/TableRow'
import TableHead from '@mui/material/TableHead'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TablePagination from '@mui/material/TablePagination'
import Link from '@mui/material/Link'
import Box from '@mui/material/Box'
import { useOutletContext } from "react-router-dom";
import Grid from '@mui/material/Grid'
import { MdOutlinePreview } from "react-icons/md";
import axios from 'axios'
import { CiEdit } from "react-icons/ci";
import { MdDeleteForever } from "react-icons/md";
import { useNavigate, } from 'react-router-dom'
import { Button } from '@mui/material'
import { MdAdd } from "react-icons/md";


const AllArtist = () => {
    // ** States
    const [getAllArtists] = useOutletContext();
    const [page, setPage] = useState(0)
    const [rowsPerPage, setRowsPerPage] = useState(10)
    const [rows, setRows] = useState([])

    const baseURL = process.env.REACT_APP_APIURL

    const navigate = useNavigate()

    const columns = [
        { id: 'fullname', label: 'Name', minWidth: 170 },
        { id: 'education', label: 'Education', minWidth: 170 },
        { id: 'experience', label: 'Experience', minWidth: 170 },
        { id: 'languages', label: 'Languages', minWidth: 170 },
        { id: 'status', label: 'Status', minWidth: 170 },
        { id: 'action', label:'', minWidth: 170},

    ]

    const handleChangePage = (event, newPage) => {
        setPage(newPage)
    }

    const handleChangeRowsPerPage = event => {
        setRowsPerPage(+event.target.value)
        setPage(0)
    }

    const viewArtistHandler = (artistInformation)=>{
         navigate(`/management/artists-request/${artistInformation?._id}`)
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
                        justifyContent: 'start',
                        marginLeft: "20px",
                        marginTop: "10px"
                    }}
                >
                    <div>
                        <h3>All Artists Request</h3>
                    </div>
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
                        {getAllArtists.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(row => {
                            return (
                                <TableRow hover role='checkbox' tabIndex={-1} key={row._id}>
                                    <TableCell>
                                        {row.profile_id?.fullName}
                                    </TableCell>
                                    <TableCell>
                                        {row?.education}
                                    </TableCell>
                                    <TableCell>
                                        {row?.experience}
                                    </TableCell>
                                    <TableCell>
                                        {row?.languages.join(', ')}
                                    </TableCell>
                                    <TableCell>
                                        <Chip label={row?.status} color="primary" /> 
                                    </TableCell>
                                    <TableCell>
                                        <div className=''>
                                            <button className='btn' style={{background:"#8c6a54", border:"none", color:"#fff", fontSize:"12px"}} 
                                                onClick={()=>viewArtistHandler(row)}>
                                                    <span>View <MdOutlinePreview/></span>
                                            </button>
                                        </div>
                                    </TableCell>
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

export default AllArtist
