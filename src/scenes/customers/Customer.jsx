import React from "react";
import { Box, useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import Header from "components/Header";
// extracting the function "useGetCustomersQuery" from api file
import { useGetCustomersQuery } from "state/api";

const Customer = () => {
  // extracting the data and isLoading from the "Object" api
  const { data, isLoading } = useGetCustomersQuery();
  const theme = useTheme();
  // console.log(data);

  // These are coloums format which we are going the insert in the data grid
  const columns = [
    {
      // This specifies the data field that this column will represent.
      field: "_id",
      // And the headerName will the title of that column
      headerName: "ID",
      flex: 1,
    },
    {
      field: "name",
      headerName: "Name",
      flex: 0.5,
    },
    {
      field: "email",
      headerName: "Email",
      flex: 1,
    },
    {
      field: "phoneNumber",
      headerName: "Phone Number",
      flex: 0.5,
      // renderCell: This is a callback function that defines how the cell's content should be rendered in this column. It takes a params parameter that provides information about the cell being rendered. In this case, it's using the replace function to format the phone number. The regular expression ^(\d{3})(\d{3})(\d{4}) matches a 10-digit phone number and breaks it down into groups of area code, prefix, and line number. The replacement string "($1)$2-$3" formats the phone number in the standard "(123)456-7890" format.
      renderCell: (params) => {
        return params.value.replace(/^(\d{3})(\d{3})(\d{4})/, "($1)$2-$3");
      },
    },
    {
      field: "country",
      headerName: "Country",
      flex: 0.4,
    },
    {
      field: "occupation",
      headerName: "Occupation",
      flex: 1,
    },
    {
      field: "role",
      headerName: "Role",
      flex: 0.5,
    },
  ];

  return (
    // This is the main container box with some horizontal and vertical margins
    <Box m="1.5rem 2.5rem">
      {/* This is the Header component which we are using in each page to display the "Title Text" */}
      {/* Passing the props {title, subtitle} into the "<Header/>" component */}
      <Header title="CUSTOMERS" subtitle="List of Customers" />
      {/* This is the container "Box" for "DataGrid" table */}
      <Box
        mt="40px"
        height="75vh"
        sx={{
          // "&" is referring to the parent element "class"
          // and MuiDataGrid-root is the nothing but the class name of that element which we can find using "inspect element"
          "& .MuiDataGrid-root": {
            border: "none", // this will remove all the outer border of the table
          },
          "& .MuiDataGrid-cell": {
            borderBottom: "none", // this will remove all the bottom border from each column cell
          },
          // In this selector we are targetting only the "header" of the "data-grid" changing the background and color using "theme" function
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: theme.palette.background.alt,
            color: theme.palette.secondary[100],
            borderBottom: "none", // this will remove all the bottom border from each column cell
          },
          // targetting the scroller
          "& .MuiDataGrid-virtualScroller": {
            backgroundColor: theme.palette.primary.light,
          },
          // tagetting the footer
          "& .MuiDataGrid-footerContainer": {
            backgroundColor: theme.palette.background.alt,
            color: theme.palette.secondary[100],
            borderTop: "none",
          },
          "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
            color: `${theme.palette.secondary[200]} !important`,
          },
        }}
      >
        {/* DataGrid requires some few properies like rows, columns, loading */}
        <DataGrid
          //! Here we are using a "loading" prop to control whether the DataGrid should display a loading state.

          //! isLoading is a state which holds a boolean value "true" or "false"

          //!If isLoading is true, it means data is still being fetched, and you might want to show a loading indicator.

          // and the another field is "data" which we are using after "or" operator which means if data returns false (!data - used not operator) then show the "loading" spinning circle
          loading={isLoading || !data}
          //! "getRowId" is a predefined props of "dataGrid" which will return the id of a given GridRow Model
          // In this function it takes all "rows" and returns the "id" of each row in this case we have "_id"
          getRowId={(row) => row._id}
          // If data has a value (it's not null or undefined), then data is used. If data doesn't have a value (it's null or undefined), then the empty array [] is used as a backup.
          rows={data || []}
          columns={columns}
        />
      </Box>
    </Box>
  );
};

export default Customer;
