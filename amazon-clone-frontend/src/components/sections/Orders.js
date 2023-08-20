import React, { Fragment, useEffect, useState } from 'react'
import { myOrders } from '../../actions/orderAction';
import {useDispatch, useSelector} from "react-redux"
import { useMeQuery } from '../../redux/auth';
import { Link } from "react-router-dom";
import { DataGrid } from "@mui/x-data-grid";
import Typography from "@material-ui/core/Typography";
import "./myOrders.css"
import LaunchIcon from "@mui/icons-material/Launch";
  const Orders = () => {
  const dispatch = useDispatch();
  const { orders } = useSelector((state) => state.myOrders)
  const { data:userData } = useMeQuery();
  const [loading,setloading]=useState(false)
  useEffect(() => {
    setloading(true)
    dispatch(myOrders());
    setloading(false)
  }, [dispatch])
   const columns = [
     { field: "id", headerName: "Order ID", minWidth: 300, flex: 1 },

     {
       field: "status",
       headerName: "Status",
       minWidth: 150,
       flex: 0.5,
       cellClassName: (params) => {
            return params.row.status === "Delivered"
              ? "greenColor"
              : "redColor"
          // },
        //  return console.log("prams",params)
       }
     },
     {
       field: "itemsQty",
       headerName: "Items Qty",
       type: "number",
       minWidth: 150,
       flex: 0.3,
     },

     {
       field: "amount",
       headerName: "Amount",
       type: "number",
       minWidth: 270,
       flex: 0.5,
     },

     {
       field: "actions",
       flex: 0.3,
       headerName: "Actions",
       minWidth: 150,
       type: "number",
       sortable: false,
       renderCell: (params) => {
         return (
           <Link to={`/order/${params.id}`}>
             <LaunchIcon />
           </Link>
         );
       },
     },
   ];
   const rows = [];

   orders &&
     orders.forEach((item, index) => {
       rows.push({
         itemsQty: item.orderItems.length,
         id: item._id,
         status: item.orderStatus,
         amount: item.totalPrice,
       });
     });

  return (
    <div>
      <h1 className="text-center text-2xl md:text-6xl font-light p-5">Orders</h1>
      <Fragment>
       

        {loading ? (
          "Loading......."
        ) : (
          <div className="myOrdersPage">
            <DataGrid
              rows={rows}
              columns={columns}
              rowsPerPageOptions={[5, 10, 20]}
              disableSelectionOnClick
              // className="myOrdersTable"
              autoHeight
              pagination
            />

            <Typography id="myOrdersHeading">{userData?.user?.name}'s Orders</Typography>
          </div>
        )}
      </Fragment>
    </div>
  );
}

export default Orders