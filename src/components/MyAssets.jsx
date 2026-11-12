import { Container, Button, ListGroup } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useState, Fragment, useEffect } from "react";
import RepairBox from "./RepairBox";
import "./MyAssets.module.css";
import RepairStatus from "./RepairStatus";
import api from "../api";

function MyAssets() {
  const [assets, setAssets] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const getMyAssets = async () => {
      const res = await api.get("/assignments/");
      setAssets(res.data);
    };
    getMyAssets();
  }, []);

  return (
    <Container className="py-4">
      <h3 className="mb-4">My Assets</h3>
      <ListGroup>
        <ListGroup.Item className="fw-bold d-flex justify-content-between align-items-center">
          <span style={{ width: "25%" }}>Name</span>
          <span style={{ width: "25%" }}>Type</span>
          <span style={{ width: "25%" }}>Date Assigned</span>
          <span style={{ width: "15%", textAlign: "right" }}></span>
        </ListGroup.Item>

        {assets.map((asset) => (
          <Fragment key={asset.id}>
            <ListGroup.Item
              className="d-flex justify-content-between align-items-center"
              style={{ cursor: "pointer" }}
            >
              <span style={{ width: "25%" }}>{asset.asset.name}</span>
              <span style={{ width: "25%" }}>{asset.asset.type}</span>
              <span style={{ width: "25%" }}>
                {Intl.DateTimeFormat("en-US", { dateStyle: "medium" }).format(
                  new Date(asset.date_assigned),
                )}
              </span>
              <div style={{ width: "15%", textAlign: "right" }}>
                <Button
                  variant="outline-primary"
                  size="sm"
                  onClick={(e) => {
                    navigate(`${asset.asset.id}/tickets`);
                  }}
                >
                  Tickets
                </Button>
              </div>
            </ListGroup.Item>
          </Fragment>
        ))}
      </ListGroup>
    </Container>
  );
}

export default MyAssets;
