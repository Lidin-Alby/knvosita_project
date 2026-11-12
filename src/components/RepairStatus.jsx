import { Container } from "react-bootstrap";

function RepairStatus({ asset }) {
  return (
    <Container className="my-3">
      <p>
        <strong>Current Status:</strong> {asset.repair.status}
      </p>
      <p>
        <strong>Issue Description:</strong> {asset.repair.issue}
      </p>
      <p>
        <strong>Assigned Technician:</strong> {asset.repair.assigned_technician}
      </p>
    </Container>
  );
}

export default RepairStatus;
