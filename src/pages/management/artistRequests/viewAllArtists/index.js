// ** React Imports
import { useState } from "react";
// ** MUI Imports
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import Chip from "@mui/material/Chip";
import TableRow from "@mui/material/TableRow";
import TableHead from "@mui/material/TableHead";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TablePagination from "@mui/material/TablePagination";
import Link from "@mui/material/Link";
import Box from "@mui/material/Box";
import { useLoaderData } from "react-router-dom";
import Grid from "@mui/material/Grid";
import { MdOutlinePreview } from "react-icons/md";
import axios from "axios";
import { CiEdit } from "react-icons/ci";
import { MdDeleteForever } from "react-icons/md";
import { Button } from "@mui/material";
import { MdAdd } from "react-icons/md";
import Switch from "@mui/material/Switch";
import { axiosAuth } from "configs/axiosInstance";
import { toast } from 'react-toastify';
import { axiosLocal } from "configs/axiosInstance";

const BASE_URL = process.env.REACT_APP_APIURL;

const ViewArtists = () => {
  // ** States
  const getAllArtistRequest = useLoaderData();
  const [allArtist, setAllArtist] = useState(getAllArtistRequest)
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [rows, setRows] = useState([]);


 const getAllArtists  = async () => {
  try {
    const response = await axiosLocal.get('/artists/get-all-artists');
    setAllArtist(response.data);
    toast.success('Request updated Successfully!');
 } catch (error) {
   console.log("this is error", error)
   }
};

  const columns = [
    { id: "fullname", label: "Name", minWidth: 170 },
    { id: "experience", label: "Experience", minWidth: 170 },
    { id: "status", label: "Status", minWidth: 170 },
    { id: "featured", label: "Featured", minWidth: 170 },
    { id: "emerging", label: "Emerging", minWidth: 170 },
  ];

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleFeaturedArtist = async (row) => {
    let payload = {}
    if(row.featuredTag){
      payload = {
        request_id : row._id,
        featuredTag : !row.featuredTag
      }
  }else{
    payload = {
      request_id : row._id,
      featuredTag : true
    }
  }
   try {
        const response = await axiosAuth.post(`${BASE_URL}/management/mark-featured-artist`, payload);
        if (response.statusText == "OK") {
          getAllArtists()         
          
        }
      } catch (error) {
        // setUpdating(false)
        toast.warn('Failed to update artist!');
        return error.message || "An error occured while trying to featured artist."
      }
  };

  const handleEmergingArtist = async (row) => {
    let payload = {}
    if(row.emergingTag){
      payload = {
        request_id : row._id,
        emergingTag : !row.emergingTag
      }
  }else{
    payload = {
      request_id : row._id,
      emergingTag : true
    }
  }
   try {
        const response = await axiosAuth.post(`${BASE_URL}/management/mark-emerging-artist`, payload);
        if (response.statusText == "OK") {
          getAllArtists()         
          
        }
      } catch (error) {
        // setUpdating(false)
        toast.warn('Failed to update artist!');
        return error.message || "An error occured while trying to emerging artist."
      }
  }

  return (
    <Paper sx={{ width: "100%", overflow: "hidden" }}>
      <Grid item xs={12}>
        <Box
          sx={{
            gap: 5,
            display: "flex",
            flexWrap: "wrap",
            alignItems: "center",
            justifyContent: "start",
            marginLeft: "20px",
            marginTop: "10px",
          }}
        >
          <div>
            <h3>All Artists Request</h3>
          </div>
        </Box>
      </Grid>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  sx={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {allArtist &&
              Array.isArray(allArtist) &&
              allArtist.map((row) => {               
                  return (
                    <TableRow hover role="checkbox" tabIndex={-1} key={row._id}>
                      <TableCell>{row.profile_id?.fullName}</TableCell>
                      <TableCell>{row?.experience}</TableCell>
                      <TableCell>
                        <Chip label={row?.status} color="primary" />
                      </TableCell>
                      <TableCell>
                        <Switch
                          checked={row?.featuredTag}
                          onChange={() => handleFeaturedArtist(row)}
                          inputProps={{ "aria-label": "controlled" }}
                        />
                      </TableCell>
                      <TableCell>
                        <Switch
                          checked={row?.emergingTag}
                          onChange={() => handleEmergingArtist(row)}
                          inputProps={{ "aria-label": "controlled" }}
                        />
                      </TableCell>
                    </TableRow>
                  );
                }
              )}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
};

export default ViewArtists;
