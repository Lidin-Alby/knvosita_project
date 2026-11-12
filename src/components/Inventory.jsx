import { Fragment, useEffect, useState } from "react";
import { Container, ListGroup } from "react-bootstrap";
import api from "../api";

function Inventory() {
  const [inventory, setInventory] = useState([]);

  useEffect(() => {
    getInventory();
  }, []);
  async function getInventory() {
    const res = await api.get("/inventory/");
    setInventory(res.data);
  }
  async function adjustQty(id, delta) {
    const res = await api.patch(`/inventory/${id}/`, { delta: delta });
    const updated = res.data;

    setInventory((prev) =>
      prev.map((e) => (e.id == id ? { ...e, qty: e.qty + delta } : e)),
    );
  }
  return (
    <Container>
      <h3 className="my-4">Inventory</h3>
      <ListGroup>
        {inventory.map((e) => (
          <Fragment key={e.id}>
            <ListGroup.Item className="d-flex justify-content-between ">
              <span>
                {e.item_type} - {e.qty}
              </span>
              <span className="d-flex gap-2">
                <button onClick={() => adjustQty(e.id, -1)}>Take</button>
                <button onClick={() => adjustQty(e.id, +1)}>Return</button>
              </span>
            </ListGroup.Item>
          </Fragment>
        ))}
      </ListGroup>
    </Container>
  );
}
export default Inventory;
