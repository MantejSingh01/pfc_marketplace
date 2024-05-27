import React, { useEffect } from "react";
import { BarChart } from "@mui/x-charts/BarChart";
import { PieChart, pieArcLabelClasses } from "@mui/x-charts/PieChart";
import {
  chartSetting,
  dataset,
  formatDate,
  pieData,
  pieSize,
} from "../../constants/extra";
import { Box } from "@mui/material";
import FileDownloadOutlinedIcon from "@mui/icons-material/FileDownloadOutlined";
import MailOutlineOutlinedIcon from "@mui/icons-material/MailOutlineOutlined";
import { setUser, updateUser, useGetAllUsersQuery } from "../../redux/userSlice";
import { fieldValuesObj } from "../../constants/extra";
import Tables from "./Tables";
import { useDispatch, useSelector } from "react-redux";
import Loading from "./Loading";
const valueFormatter = (value) => `${value} kg`;

function Dashboard() {
  
  const { user } = fieldValuesObj;
  const users = useSelector(state => state.user);
  const { data, error, isLoading } = useGetAllUsersQuery({skip: true});
  const dispatch = useDispatch();

  useEffect(() => {
    if(data && !isLoading && !error){
      const newData = data?.filter(
        (newItem) => !users.some((user) => user.id === newItem.id)
      );
  
      dispatch(setUser([...newData]));
    }
   
  }, [data]);

  return (
    <div className="dashboard-conatiner">
      <div className="charts-conatiner">
        <BarChart
          className="bar-chart"
          dataset={dataset}
          yAxis={[{ scaleType: "band", dataKey: "day" }]}
          series={[
            { dataKey: "expected", label: "Expected", valueFormatter },
            { dataKey: "sales", label: "Sales", valueFormatter },
          ]}
          layout="horizontal"
         
          {...chartSetting}
        />
        <PieChart
          className="pie-chart"
          series={[
            {
              data: pieData,
              arcLabel: (item) => `(${item.value})`,
              arcLabelMinAngle: 4,
            },
          ]}
          sx={{
            [`& .${pieArcLabelClasses.root}`]: {
              fill: "white",
              fontWeight: "bold",
            },
          }}
          {...pieSize}
        />
      </div>
      {isLoading ? <Loading items={5}/> :<div className="dashboard-inner">
        <Box className="box-nav-bar">
          <Box className="box-nav-inner">
            <h2>On Board Members List</h2>
            <span>{"other info can be given here....."}</span>
          </Box>
          <div className="dashboard-icons">
            <FileDownloadOutlinedIcon />
            <MailOutlineOutlinedIcon />
          </div>
        </Box>
        <div>
          <Tables
            data={users}
            headers={user.tableHeaders}
            items={user.tableItems}
            formatFunc={formatDate}
          />
        </div>
      </div>}
    </div>
  );
}

export default Dashboard;
