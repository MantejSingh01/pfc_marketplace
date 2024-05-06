import React, { useEffect, useState } from "react";
import { setMaterial, useGetAllMaterialQuery } from "../../redux/materialSlice";
import { fieldValuesObj, formatDate } from "../../constants/extra";
import NoResults from "./NoResults";
import Tables from "./Tables";
import { Button, AppBar } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import NotificationModal from "./NotificationModal";
import FormModal from "./FormModal";
import { useGetAllListQuery } from "../../redux/listSlice";

function MaterialSealection(props) {
  const { data, error, isLoading } = useGetAllMaterialQuery();
  const {
    data: listData,
    error: listError,
    isLoading: isListLoading,
  } = useGetAllListQuery();
  const list = useSelector((state) => state.listing);
  const { material } = fieldValuesObj;
  const [open, setOpen] = useState(false);
  const materialList = useSelector((state) => state.material);
  const [isMaterialSelected, setIsMaterialSelected] = useState(false);
  const [listId, setListId] = useState("");
  console.log(listData);
  const dispatch = useDispatch();

  useEffect(() => {
    if (data && !isLoading && !error) {
      const newData = data?.filter(
        (newItem) => !materialList.some((user) => user.id === newItem.id)
      );

      dispatch(setMaterial([...newData]));
    }
  }, [data]);

  const handleOpenModaltoggle = () => {
    try {
      setOpen(!open);
      setListId("");
      setIsMaterialSelected(false);
    } catch (error) {
      console.log(error);
    }
  };
  const handleMaterialSelection = (user) => {
    if (user !== "close") {
      setListId(user);
      setIsMaterialSelected(true);
    } else {
      setOpen(!open);
      setListId("");
    }
  };
  return (
    <div className="material-main-conatiner">
      <AppBar className="material-nav" position="sticky">
        <h2>Material Selection</h2>
        <Button className="material-button" onClick={handleOpenModaltoggle}>
          + Add new
        </Button>
      </AppBar>
      {data && data.length ? (
        <Tables
          data={materialList}
          headers={material.tableHeaders}
          items={material.tableItems}
          formatFunc={formatDate}
          from={"Parent"}
        />
      ) : (
        !open && <NoResults />
      )}
      {open && isMaterialSelected && (
        <FormModal
          open={open}
          keyName={"material"}
          onClose={handleOpenModaltoggle}
          userId={listId}
        />
      )}
      {!isMaterialSelected && (
        <NotificationModal
          handleSelection={handleMaterialSelection}
          options={listData || list}
          open={open}
          keyName={"Material type"}
        />
      )}
    </div>
  );
}

export default MaterialSealection;
