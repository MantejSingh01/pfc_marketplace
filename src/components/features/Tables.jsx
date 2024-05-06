import React, { useState } from "react";
import TableContainer from "@mui/material/TableContainer";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableBody from "@mui/material/TableBody";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import Paper from "@mui/material/Paper";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";

const Tables = (props) => {
  const { data, headers, items, formatFunc, from } = props;
  const pageSize = from ? 10 : 5;
  const [page, setPage] = useState(1);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const startIndex = (page - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const paginatedData = data?.slice(startIndex, endIndex);

  return (
    <div className={from ? "table-conatiner-full" : "table-conatiner-half"}>
      {data && (
        <TableContainer>
          <Table>
            <TableHead className="table-head">
              <TableRow>
                {headers.map((header, index) => (
                  <TableCell key={index} className="table-head-cell">
                    {header}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {paginatedData.map((item) => (
                <TableRow key={item.id}>
                  {items.map((field, index) => (
                    <TableCell key={index}>
                      {formatFunc &&
                      (field === "createdAt" ||
                        field.toLowerCase().includes("date")) ? (
                        formatFunc(item[field])
                      ) : typeof item[field] === "boolean" ? (
                        item[field] ? (
                          <CheckCircleOutlineIcon style={{ color: "green" }} />
                        ) : (
                          <HighlightOffIcon style={{ color: "red" }} />
                        )
                      ) : (
                        item[field]
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
      {data && (
        <Stack spacing={2} mt={2} className="pagination">
          <Pagination
            count={Math.ceil(data.length / pageSize)}
            page={page}
            onChange={handleChangePage}
            siblingCount={0}
          />
        </Stack>
      )}
    </div>
  );
};

export default Tables;
