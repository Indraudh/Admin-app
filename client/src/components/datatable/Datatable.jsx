import "./datatable.scss";
import { DataGrid } from "@mui/x-data-grid";
import { userColumns } from "../../datatablesource";
import { Link } from "react-router-dom";
import { useState , useEffect } from "react";
import axios from "axios";
import { message} from "antd";
function Datatable({setuserdata}){
  const [data, setData] = useState([]);

  const handleDelete = async (id) => {
    try {
      console.log(id);
      await axios.post("api/clients/delete-users", {
        userId : id,
      });
      message.success("User deleted successfully");
      getuserdetails();
    } catch (error) {
      message.error("Something went wrong");
    }
  };

  const actionColumn = [
    {
      field: "action",
      headerName: "Action",
      width: 200,
      renderCell: (params) => {
        return (
          <div className="cellAction">
            <div className="viewButton" onClick={()=>setuserdata(params.row)}><Link to="/users/details" className="view">View</Link></div>
            <div
              className="deleteButton"
              onClick={() => handleDelete(params.row)}
            >
              Delete
            </div>
          </div>
        );
      },
    },
  ];
  const getuserdetails = async ()=> {
      try {
         const user = await axios.get('api/clients/users');
         setData(user.data);
      } catch (error) {
        message.error('Something went wrong');
      }
  }
  useEffect(()=> getuserdetails(),[]);
  function getRowId(row) {
    return row._id;
  }
  return (
    <div className="datatable">
      <div className="datatableTitle">
        Users
        <Link to="/register" className="link">
          Add New
        </Link>
      </div>
      <DataGrid
        className="datagrid"
        rows={data} getRowId={getRowId}
        columns={userColumns.concat(actionColumn)}
        pageSize={10}
        rowsPerPageOptions={[10]}
        checkboxSelection
      />
    </div>
  );
};

export default Datatable;
