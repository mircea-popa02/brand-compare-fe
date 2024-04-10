import { useState } from "react";
import { useEffect } from "react";
import {
  TableView,
  TableHeader,
  Column,
  TableBody,
  Row,
  Cell,
} from "@adobe/react-spectrum";
import { parseDate } from "@internationalized/date";

function Brands(props) {
  const [date, setDate] = useState(props.date);
  const [brandData, setBrandData] = useState([]);

  const columns = [
    { name: "Brand Name", uid: "name" },
    { name: "Total Profiles", uid: "profiles" },
    { name: "Total Fans", uid: "fans" },
    { name: "Total Engagement", uid: "engagement" },
  ];

  const convertDate = (date) => {
    const day = date.day;
    const month = date.month;
    const year = date.year;
    return new Date(year, month - 1, day).getTime();
  }

  useEffect(() => {
    setDate(props.date);
    fetch("http://localhost:5000/brands?start=" + convertDate(props.date.start) + "&end=" + convertDate(props.date.end))
      .then((response) => response.json())
      .then((data) => {
        setBrandData(data);
        console.log("Data fetched: ", data);
      }).catch((error) => {
        console.error("Error fetching data: ", error);
      });
  }, [props.date]);

  return (
    <div>
      <TableView aria-label="Example table with dynamic content">
        <TableHeader columns={columns}>
          {(column) => <Column key={column.uid}>{column.name}</Column>}
        </TableHeader>
        <TableBody items={brandData}>
          {(item) => (
            <Row key={item.brandname}>
              <Cell>{item.brandname}</Cell>
              <Cell>{item.profiles.length}</Cell>
              <Cell>{item.followers}</Cell>
              <Cell>{item.engagement}</Cell>
            </Row>
          )}
        </TableBody>
      </TableView>
    </div>
  );
}

export default Brands;
