// ** React Imports
import { useState, useEffect } from 'react'
// ** MUI Imports
import Paper from '@mui/material/Paper'
import Table from '@mui/material/Table'
import  Chip  from '@mui/material/Chip';
import TableRow from '@mui/material/TableRow'
import TableHead from '@mui/material/TableHead'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TablePagination from '@mui/material/TablePagination'
import Link from '@mui/material/Link'
import Box from '@mui/material/Box'
import { useLoaderData } from "react-router-dom";
import Grid from '@mui/material/Grid'
import axios from 'axios'
import { CiEdit } from "react-icons/ci";
import { MdDeleteForever } from "react-icons/md";
import { useNavigate, } from 'react-router-dom'
import { Button } from '@mui/material'
import { MdAdd } from "react-icons/md";


const AllArtist = () => {
    // ** States
    const getAllArtists = useLoaderData();
    const [page, setPage] = useState(0)
    const [rowsPerPage, setRowsPerPage] = useState(10)
    const [rows, setRows] = useState([])

    const baseURL = process.env.REACT_APP_APIURL

    const navigate = useNavigate()

    useEffect(() => {
        AllArtist();
    }, [getAllArtists])

    const columns = [
        { id: 'education', label: 'Education', minWidth: 170 },
        { id: 'experience', label: 'Experience', minWidth: 170 },
        { id: 'languages', label: 'Languages', minWidth: 170 },
        { id: 'status', label: 'Status', minWidth: 170 },
        
    ]

    const AllArtist = async () => {
        try {
            if (getAllArtists && getAllArtists.length > 0) {
                const artistData = getAllArtists;
                const formattedData = artistData.map(artists => ({
                    _id: artists._id,
                    education: artists.education,
                    experience: artists.experience,
                    status: artists.status,
                    languages: Array.isArray(artists.languages) ? artists.languages.join(', ') : ''                 }));
                setRows(formattedData || []);
            }
        } catch (error) {
            return error.message || "An error occurred while trying to get all product."
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
                        {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(row => {
                            return (
                                <TableRow hover role='checkbox' tabIndex={-1} key={row._id}>
                                    {columns.map(column => (
              <TableCell key={column.id} align={column.align}>
              {column.id === 'status' ? (
                <Chip label={row[column.id]} color="primary" /> // Customize chip based on your needs
              ) : (
                row[column.id]
              )}
            </TableCell>
                                    ))}
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
