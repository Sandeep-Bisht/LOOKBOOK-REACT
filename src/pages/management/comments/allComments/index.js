import React, { useEffect, useState} from 'react'
import Paper from '@mui/material/Paper'
import Table from '@mui/material/Table'
import TableRow from '@mui/material/TableRow'
import TableHead from '@mui/material/TableHead'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TablePagination from '@mui/material/TablePagination'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import { useLoaderData } from 'react-router-dom'
import { CiEdit } from "react-icons/ci";
import { MdDeleteForever } from "react-icons/md";
import { MdAdd } from "react-icons/md";
import { Button } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { axiosAuth } from 'configs/axiosInstance'
import { axiosLocal } from 'configs/axiosInstance'

const Comments = () => {
     
    const [page, setPage] = useState(0)
    const [rowsPerPage, setRowsPerPage] = useState(10)

    const all_comments=useLoaderData()
    const [allComments,setAllComments] = useState(all_comments && Array.isArray(all_comments) ? all_comments : "")
    const navigate=useNavigate()
  
    const columns = [
      { id: 'first_name', label: 'First Name', minWidth: 170 },
      { id: 'last_name', label: 'Last Name', minWidth: 170 },
      { id: 'comment', label: 'Comment', minWidth: 170 },
      { id: 'status', label: 'Status', minWidth: 170 },
      { id:'action', label: '', minWidth:170 },
    ]
    
    const handleChangePage = (event, newPage) => {
      setPage(newPage)
    }
  
    const handleChangeRowsPerPage = event => {
      setRowsPerPage(+event.target.value)
      setPage(0)
    }

    useEffect(()=>{

    })

    const approvedHandler = async(_id)=>{
        const data = {
            _id:_id,
            status:"approved"
        }
        const response = await axiosAuth.put('/comment/update_comments',data)
        if(response.statusText === "OK")
        {
            getAllComment()
        }
    }

    const rejectHandler = async (_id) => {
        try {
            const response = await axiosAuth.delete(`comment/delete_comments_by_id/${_id}`);    
            if (response.statusText === "OK") {
                getAllComment()
            }
        } catch (error) {
            console.error("Error deleting comment or fetching updated comments", error);
        }
    };

    const getAllComment = async()=>{
        const commentsResponse = await axiosLocal.get('/comment/all_comments');    
        if (commentsResponse.statusText === "OK") {
            setAllComments(commentsResponse.data);
        }
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
    {allComments && Array.isArray(allComments) && allComments.length>0 && allComments.map(row => 
    {
        // if(row.status!="rejected")
        // {

            return(
                <TableRow hover role='checkbox' tabIndex={-1} key={row._id}>
                {columns.map(column => (
                  <TableCell key={column.id} align={column.align}>
                    
                    { column.id == "title" ? (
                      row.title
                    ) : column.id == "description" ? (
                        row.description
                      ) 
                      :
                    column.id == "action" ? (
                      
                      <div className='d-flex'>
                      <div className="fs-4 text-black reset-edit-btn ">
                        <Button type="submit" style={{ background: "#8c6a54", color: "#fff" }} onClick={() => rejectHandler(row?._id)} className='btn'>Reject</Button>
                      </div>
                      <div className='ms-3 fs-4 text-black reset-edit-btn'>
                      <Button type="submit" style={{ background: "#8c6a54", color: "#fff" }} className='btn' onClick={()=>approvedHandler(row?._id)}>Approved</Button>
                      </div>
                      </div>
                    
                    ) :
                    (
                      row[column.id]
                    )}
                  </TableCell>
                ))}
              </TableRow>
            )
        // }
        // else{
        //     return null
        // }
    }
    )}
  </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[10, 25, 100]}
          component='div'
          count={allComments.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    )
  }

export default Comments
