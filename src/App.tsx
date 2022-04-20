import { useEffect } from "react";
import { Layer, Rect, Stage } from "react-konva";
import { io } from "socket.io-client";
import { FIELD_CONSTANTS } from "./constants";
import GlobalStyle from "./globalStyles";
import { usePlayers } from "./hooks/usePlayers";
import { DataType } from "./types";
const socket = io("ws://localhost:3001");
socket.on("connect", () => {
  console.log(`connected: ${socket.id}`);
});
function App() {
  const players = usePlayers(socket);
  return (
    <>
      <GlobalStyle />
      <Stage
        style={{
          backgroundColor: "grey",
          width: FIELD_CONSTANTS.width,
          height: FIELD_CONSTANTS.height,
        }}
        width={FIELD_CONSTANTS.width}
        height={FIELD_CONSTANTS.height}
      >
        <Layer width={FIELD_CONSTANTS.width} height={FIELD_CONSTANTS.height}>
          {players}
        </Layer>
      </Stage>
    </>
  );
}

export default App;
