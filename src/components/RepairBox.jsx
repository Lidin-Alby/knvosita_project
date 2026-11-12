import { useState } from "react";
import { Container, Form, Button } from "react-bootstrap";
import api from "../api";
import { useParams } from "react-router-dom";

function RepairBox({callback}) {
  const {id}=useParams()
  const [formData, setFormData] = useState({ issue: "" });
  function onFormDataChange(e) {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  }
  async function handleSubmit(e) {
    e.preventDefault();
    try {
      
      const res = await api.post("/tickets/", {...formData,'asset':id});
      callback(res.data)
    } catch (error) {

    }
    
    setFormData({ issue: "" });
  }
  return (
    <Container className="my-3">
      <form onSubmit={handleSubmit}>
        <textarea
          name="issue"
          onChange={onFormDataChange}
          value={formData.issue}
          placeholder="Reason..."
          style={{ width: "70%", marginBlock: "8px" }}
        ></textarea>
        <br />

        <Button variant="outline-primary" type="submit">
          Submit
        </Button>
      </form>
    </Container>
  );
}

export default RepairBox;
