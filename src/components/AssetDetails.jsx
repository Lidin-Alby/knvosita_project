import { Container } from "react-bootstrap";
import { useParams } from "react-router-dom";
import  myAssets  from "../dummy/assets";

function AssetDetails() {
  const { id } = useParams();
  const asset = myAssets.find((e) => e.id == id);

  return (
    <Container>
      <h1>Details</h1>
      <p>{asset.serial_number}</p>
      <p>{asset.asset_name}</p>
      <p>{asset.asset_type}</p>
      <p>{asset.date_assigned}</p>
    </Container>
  );
}

export default AssetDetails;
