import React, { useEffect, useState } from "react";
import { fieldValuesObj, formatDate } from "../../constants/extra";
import NoResults from "./NoResults";
import { AppBar, Button } from "@mui/material";
import Tables from "./Tables";
import {  useGetAllUsersQuery } from "../../redux/userSlice";
import FormModal from "./FormModal";
import NotificationModal from "./NotificationModal";
import { useDispatch, useSelector } from "react-redux";
import Loading from "./Loading";

function KycComponent(props) {
  const { data, error, isLoading, refetch } = useGetAllUsersQuery({
    skip: true,
  });
  const users = useSelector((state) => state.user);
  const kyc = useSelector((state) => state.kyc);
  const [kycData, setKycData] = useState([]);
  const [open, setOpen] = useState(false);
  const [isUserSelected, setIsUserSelected] = useState(false);
  const [userId, setUserId] = useState("");
  const dispatch = useDispatch();
  const handleOpenModaltoggle = () => {
    try {
      setOpen(!open);
      setUserId("");
      setIsUserSelected(false);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    if (data) {
      let filteredData = data.filter((item) => !item.isKYCDone);

      setKycData(filteredData);
    }
  }, [data]);
  useEffect(() => {
    if (users) {
      let filteredData = users.filter((item) => !item.isKYCDone);

      setKycData(filteredData);
    }
  }, [users]);

  const handleUserSelection = (user) => {
    if (user !== "close") {
      setUserId(user);
      setIsUserSelected(true);
    } else {
      setOpen(!open);
      setUserId("");
    }
  };
  const { user } = fieldValuesObj;
  return (
    <div className="kyc-main-container">
      <AppBar className="kyc-nav" position="sticky">
        <h2>KYC & Agreement</h2>
        <Button className="kyc-button" onClick={handleOpenModaltoggle}>
          + Add new
        </Button>
      </AppBar>
      {isLoading && <Loading items={6}/>}
      {kycData && kycData.length ? (
        <Tables
          data={kycData}
          headers={user.tableHeaders}
          items={user.tableItems}
          formatFunc={formatDate}
          from={"Parent"}
        />
      ) : (
        !isLoading && kycData.length ==0 && <NoResults />
      )}
      {open && isUserSelected && (
        <FormModal
          open={open}
          keyName={"kyc"}
          onClose={handleOpenModaltoggle}
          userId={userId}
        />
      )}
      {!isUserSelected && (
        <NotificationModal
          handleSelection={handleUserSelection}
          options={kycData}
          open={open}
          keyName={"user"}
        />
      )}
    </div>
  );
}

export default KycComponent;
