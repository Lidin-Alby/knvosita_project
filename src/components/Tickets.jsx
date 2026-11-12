import { useEffect, useState } from "react";
import { Container, ListGroup } from "react-bootstrap";
import api from "../api";
import { useParams } from "react-router-dom";
import RepairBox from "./RepairBox";

const Tickets = () => {
  const { id } = useParams();
  const [tickets, setTickets] = useState([]);
  const [repiarBox, setRepairBox] = useState(false);
  useEffect(() => {
    getTickets();
  }, [id]);
  async function getTickets() {
    const res = await api.get(`/tickets/?asset_id=${id}`);
    setTickets(res.data);
  }
  function toggleRepairBox() {
    setRepairBox(!repiarBox);
  }

  return (
    <Container>
      <div className=" d-flex align-items-center justify-content-between">
        <h2 className="my-4">Tickets</h2>{" "}
        <button onClick={toggleRepairBox}>New Ticket</button>
      </div>
      {repiarBox ? (
        <RepairBox
          callback={(newTicket) => {
            setRepairBox(false);
            setTickets((prev)=>[...prev,newTicket])
          }}
        />
      ) : null}
      <br />
      {tickets.length === 0 ? (
        <h6 className="text-center">No tickets</h6>
      ) : null}
      <ListGroup>
        {tickets.map((ticket) => (
          <ListGroup.Item key={ticket.id}>
            <div className="d-flex justify-content-between">
              <span>{ticket.issue}</span>
              <span>
                {ticket.assigned_technician ?? (
                  <span>Technician not assigned</span>
                )}
              </span>
              <span>{ticket.status}</span>
            </div>
          </ListGroup.Item>
        ))}
      </ListGroup>
    </Container>
  );
};

export default Tickets;
