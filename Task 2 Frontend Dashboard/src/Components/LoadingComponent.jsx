import { ClipLoader } from "react-spinners";

export function LoadingComponent() {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "10px",
        fontSize: "14px",
        color: "#555",
      }}
    >
      <ClipLoader
        color="#36d7b7"
        size={60}
        cssOverride={{
          borderWidth: "6px", // Make the ring thicker
        }}
      />
      <span style={{ fontWeight: "bold" }}>
        Loading... (It might take a few minutes to start the server)
      </span>
    </div>
  );
}
