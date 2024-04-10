import { useState, useEffect } from "react";
import {
  TableView,
  TableHeader,
  Column,
  TableBody,
  Row,
  Cell,
  ProgressCircle,
} from "@adobe/react-spectrum";

function Brands(props) {
  const [date, setDate] = useState(props.date);
  const [brandData, setBrandData] = useState([]);
  const [isLoading, setIsLoading] = useState(false); // State to manage loading indicator

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
  };

  useEffect(() => {
    setIsLoading(true);
    setDate(props.date);
    fetch(
      "http://localhost:5000/brands?start=" +
        convertDate(props.date.start) +
        "&end=" +
        convertDate(props.date.end)
    )
      .then((response) => response.json())
      .then((data) => {
        setBrandData(data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data: ", error);
        setIsLoading(false);
      });
  }, [props.date]);

  return (
    <div>
      {isLoading ? (
        <div
          className="loader"
          style={{ textAlign: "center", paddingTop: "2rem" }}
        >
          <ProgressCircle aria-label="Loading…" isIndeterminate size="L" />
        </div>
      ) : (
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
      )}
    </div>
  );
}

export default Brands;
