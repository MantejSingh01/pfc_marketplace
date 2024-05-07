import { AppBar, Button } from "@mui/material";
import React, { useEffect, useState } from "react";
import NoResults from "./NoResults";
import { clearUser, setUser, useGetAllUsersQuery } from "../../redux/userSlice";
import Tables from "./Tables";
import { fieldValuesObj, formatDate } from "../../constants/extra";
import FormModal from "./FormModal";
import { useDispatch, useSelector } from "react-redux";

function OnBoarding(props) {
  const { data, error, isLoading, refetch } = useGetAllUsersQuery({
    skip: true,
  });
  const users = useSelector((state) => state.user);
  const kyc = useSelector((state) => state.kyc);
  const { user } = fieldValuesObj;
  const [open, setOpen] = useState(false);
  const handleOpenModaltoggle = () => {
    setOpen(!open);
  };
  const dispatch = useDispatch();
  useEffect(() => {
    if (data && !isLoading && !error) {
      const newData = data?.filter(
        (newItem) => !users.some((user) => user.id === newItem.id)
      );

      dispatch(setUser([...newData]));
    }
  }, [data, kyc]);

  return (
    <div className="onboard-main-container">
      <AppBar className="onboard-nav" position="sticky">
        <h2>On Boarded Members list</h2>
        <Button className="onBoard-button" onClick={handleOpenModaltoggle}>
          + Add new
        </Button>
      </AppBar>
      {users && users.length ? (
        <Tables
          data={users}
          headers={user.tableHeaders}
          items={user.tableItems}
          formatFunc={formatDate}
          from={"Parent"}
        />
      ) : (
        !open && <NoResults />
      )}
      {open && (
        <FormModal
          open={open}
          keyName={"user"}
          onClose={handleOpenModaltoggle}
        />
      )}
    </div>
  );
}

export default OnBoarding;
