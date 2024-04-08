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

function Brands(props) {
  const [brands, setBrands] = useState([]);
  const [date, setDate] = useState(props.date);

  const columns = [
    { name: "Brand Name", uid: "name" },
    { name: "Total Profiles", uid: "profiles" },
    { name: "Total Fans", uid: "fans" },
    { name: "Total Engagement", uid: "engagement" },
  ];

  useEffect(() => {
    setDate(props.date);
    fetch("http://localhost:5000/brands")
      .then((response) => response.json())
      .then((data) => {
        setBrands(data.result);
        console.log(data.result);
      });
  }, []);

  return (
    <div>
      <TableView aria-label="Example table with dynamic content">
        <TableHeader columns={columns}>
          {(column) => (
            <Column
              key={column.uid}
            >
              {column.name}
            </Column>
          )}
        </TableHeader>
        <TableBody items={brands}>
          {(item) => (
            <Row key={item.brandname}>
              <Cell>{item.brandname}</Cell>
              <Cell>{item.profiles.length}</Cell>
              <Cell>100</Cell>
              <Cell>1000</Cell>
            </Row>
          )}
        </TableBody>
      </TableView>
    </div>
  );
}

export default Brands;
