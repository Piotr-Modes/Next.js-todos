import React from "react";
import { Box } from "rebass";

const List = (props) => {
  return (
    <Box>
      {props.list.map((item, index) => props.listRenderer(item, index))}
    </Box>
  );
};

export default List;
