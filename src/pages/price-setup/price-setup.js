// import React from "react";
import { useLoaderData } from "react-router-dom";
// import Box from '@mui/material/Box';
// import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';

import React, { useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Close";
import {
  GridRowModes,
  DataGrid,
  GridToolbarContainer,
  GridActionsCellItem,
  GridRowEditStopReasons,
} from "@mui/x-data-grid";
import { axiosAuth } from "configs/axiosInstance";

const BASE_URL = process.env.REACT_APP_APIURL;

const SetupPrice = () => {
  const [artistServices, setArtistServices] = useState(useLoaderData());

  const gstPerc = 18;
  const serviceChargePer = 5;
  const initialRows = artistServices && Array.isArray(artistServices) && artistServices?.pricing.map((service, index) => ({
    id: index + 1,
    service: service.service.title,
    sessionTime: service.sessionTime,
    price: service.price,
    totalPrice: service.totalPrice,
    serviceId: service.service._id,
  }));

  const [rows, setRows] = useState(initialRows);
  const [rowModesModel, setRowModesModel] = useState({});

  // function EditToolbar(props) {
  //   const { setRows, setRowModesModel } = props;

  //   const handleClick = () => {
  //      const id = initialRows && Array.isArray(initialRows) && initialRows.length + 1      
  //     setRows((oldRows) => [...oldRows, { id, name: '', age: '', isNew: true }]);
  //     setRowModesModel((oldModel) => ({
  //       ...oldModel,
  //       [id]: { mode: GridRowModes.Edit, fieldToFocus: 'name' },
  //     }));
  //   };

  //   return (
  //     <GridToolbarContainer>
  //       <Button color="primary" startIcon={<AddIcon />} onClick={handleClick}>
  //         Add record
  //       </Button>
  //     </GridToolbarContainer>
  //   );
  // }

  const handleRowEditStop = (params, event) => {
    if (params.reason === GridRowEditStopReasons.rowFocusOut) {
      event.defaultMuiPrevented = true;
    }
  };

  const handleEditClick = (id) => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.Edit } });
  };

  const handleSaveClick = (id) => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.View } });
  };

  // const handleDeleteClick = (id) => () => {
  //   setRows(rows.filter((row) => row.id !== id));
  // };

  const handleCancelClick = (id) => () => {
    setRowModesModel({
      ...rowModesModel,
      [id]: { mode: GridRowModes.View, ignoreModifications: true },
    });

    const editedRow = rows.find((row) => row.id === id);
    if (editedRow.isNew) {
      setRows(rows.filter((row) => row.id !== id));
    }
  };

  const processRowUpdate = (newRow) => {
    newRow.totalPrice = newRow.price +(gstPerc * newRow.price) / 100 + (serviceChargePer * newRow.price) / 100;
    if(newRow.price >= 5000){
      updateArtistPricing(newRow);
      const updatedRow = { ...newRow, isNew: false };
      setRows(rows && Array.isArray(rows) && rows.map((row) => (row.id === newRow.id ? updatedRow : row)));
      return updatedRow;
    }   
  };

  const handleRowModesModelChange = (newRowModesModel) => {
    setRowModesModel(newRowModesModel);
  };

  const columns = [
    { field: "id", headerName: "Sno", width: 90 },
    {
      field: "service",
      headerName: "Service name",
      type: "text",
      width: 220,
      align: "left",
      headerAlign: "left",
    },
    {
      field: "sessionTime",
      headerName: "Session Time",
      type: "number",
      headerAlign: "left",
      align: "left",
      width: 180,
      editable: true,
    },
    {
      field: "price",
      headerName: "Price",
      type: "number",
      width: 180,
      align: "left",
      headerAlign: "left",
      editable: true,
    },
    {
      field: "totalPrice",
      headerName: "Total Price",
      type: "text",
      width: 180,
      align: "left",
      headerAlign: "left",
    },
    {
      field: "actions",
      type: "actions",
      headerName: "Actions",
      width: 100,
      cellClassName: "actions",
      getActions: ({ id }) => {
        const isInEditMode = rowModesModel[id]?.mode === GridRowModes.Edit;

        if (isInEditMode) {
          return [
            <GridActionsCellItem
              icon={<SaveIcon />}
              label="Save"
              sx={{
                color: "primary.main",
              }}
              onClick={handleSaveClick(id)}
            />,
            <GridActionsCellItem
              icon={<CancelIcon />}
              label="Cancel"
              className="textPrimary"
              onClick={handleCancelClick(id)}
              color="inherit"
            />,
          ];
        }

        return [
          <GridActionsCellItem
            icon={<EditIcon />}
            label="Edit"
            className="textPrimary"
            onClick={handleEditClick(id)}
            color="inherit"
          />,
          // <GridActionsCellItem
          //   icon={<DeleteIcon />}
          //   label="Delete"
          //   onClick={handleDeleteClick(id)}
          //   color="inherit"
          // />,
        ];
      },
    },
  ];

  const updateArtistPricing = async (newRow) => {
    try {
      const response = await axiosAuth.post(
        `${BASE_URL}/artists/update-pricing`,
        newRow
      );
      if (response.statusText == "OK") {
        setArtistServices(response.data)
      }
    } catch (error) {
      // setUpdating(false)
      //toast.warn('Failed to update artist!');
      return (
        error.message || "An error occured while trying to featured artist."
      );
    }
  };

  return (
    <Box
      sx={{
        height: 500,
        width: "100%",
        "& .actions": {
          color: "text.secondary",
        },
        "& .textPrimary": {
          color: "text.primary",
        },
      }}
    >
      <DataGrid
        rows={rows}
        columns={columns}
        editMode="row"
        rowModesModel={rowModesModel}
        onRowModesModelChange={handleRowModesModelChange}
        onRowEditStop={handleRowEditStop}
        processRowUpdate={processRowUpdate}
        // slots={{
        //   toolbar: EditToolbar,
        // }}
        slotProps={{
          toolbar: { setRows, setRowModesModel },
        }}
      />
    </Box>
  );
};

export default SetupPrice;
