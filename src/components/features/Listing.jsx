import React, { useEffect, useState } from "react";
import { setList, updateList, useGetAllListQuery } from "../../redux/listSlice";
import { fieldValuesObj, formatDate } from "../../constants/extra";
import Tables from "./Tables";
import NoResults from "./NoResults";
import { AppBar, Button } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import FormModal from "./FormModal";

function Listing(props) {
  const { data, error, isLoading } = useGetAllListQuery();
  const { listing } = fieldValuesObj;
  const [open, setOpen] = useState(false);
  const list = useSelector((state) => state.listing);

  const dispatch = useDispatch();
  useEffect(() => {
    if (data && !isLoading && !error) {
      const newData = data?.filter(
        (newItem) => !list.some((user) => user.id === newItem.id)
      );

      dispatch(setList([...newData]));
    }
  }, [data]);
  const handleOpenModaltoggle = () => {
    setOpen(!open);
  };
  return (
    <div className="list-main-container">
      <AppBar className="list-nav" position="sticky">
        <h2>Listings</h2>
        <Button className="list-button" onClick={handleOpenModaltoggle}>
          + Add new
        </Button>
      </AppBar>
      {list && list.length ? (
        <Tables
          data={list}
          headers={listing.tableHeaders}
          items={listing.tableItems}
          formatFunc={formatDate}
          from={"Parent"}
        />
      ) : (
        !open && <NoResults />
      )}
      {open && (
        <FormModal
          open={open}
          keyName={"listing"}
          onClose={handleOpenModaltoggle}
        />
      )}
    </div>
  );
}

export default Listing;
