import { ClipLoader } from "react-spinners";

export default function Loader() {
  return (
    <div
      style={{ display: "flex", justifyContent: "center", marginTop: "2rem" }}
    >
      <ClipLoader color="#36d7b7" size={45} />
    </div>
  );
}
