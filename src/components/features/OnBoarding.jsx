import { AppBar, Button } from "@mui/material";
import React, { useEffect, useState } from "react";
import NoResults from "./NoResults";
import { clearUser, setUser, useGetAllUsersQuery } from "../../redux/userSlice";
import Tables from "./Tables";
import { fieldValuesObj, formatDate } from "../../constants/extra";
import FormModal from "./FormModal";
import { useDispatch, useSelector } from "react-redux";
import Loading from "./Loading";
import PreferencesSettingsModal from "./Preferences";

function OnBoarding(props) {
  const { data, error, isLoading, refetch } = useGetAllUsersQuery({
    skip: true,
  });
  const users = useSelector((state) => state.user);
  const kyc = useSelector((state) => state.kyc);
  const { user } = fieldValuesObj;
  const [open, setOpen] = useState(false);
  const [openCheck, setOpenCheck] = useState(false);

  const handlePreferenceCheck =()=>{
    setOpenCheck(!openCheck)
  }
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
        <Button className="onBoard-button" onClick={()=>{handleOpenModaltoggle();handlePreferenceCheck() }}>
          + Add new
        </Button>
      </AppBar>
      {isLoading && <Loading items={6}/>}
      {users && users.length ? (
        <Tables
          data={users}
          headers={user.tableHeaders}
          items={user.tableItems}
          formatFunc={formatDate}
          from={"Parent"}
        />
      ) : (
        !isLoading && users.length == 0 &&<NoResults />
      )}
      {open && (
        <div>
        <FormModal
          open={open}
          keyName={"user"}
          onClose={handleOpenModaltoggle}
        />
        <PreferencesSettingsModal open={openCheck} onClose={handlePreferenceCheck}/>
        </div>
        
      )}
    </div>
  );
}

export default OnBoarding;
