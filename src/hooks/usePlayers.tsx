import { useEffect, useState } from "react";
import { Rect } from "react-konva";
import { DataType, PlayerType } from "../types";
import { io, Socket } from "socket.io-client";
import { SNAKE_CONSTANTS } from "../constants";

export const usePlayers = (socket: Socket) => {
  const [id, setId] = useState<string | undefined>(undefined);
  const [players, setPlayers] = useState<
    { [id in string]: PlayerType } | undefined
  >(undefined);

  const handleUserKeyPress = (event: Event) => {
    const _event = event as KeyboardEvent;
    switch (_event.key) {
      case "w":
        socket.emit("up");
        break;
      case "s":
        socket.emit("down");
        break;
      case "d":
        socket.emit("right");
        break;
      case "a":
        socket.emit("left");
        break;
      default:
        break;
    }
  };
  useEffect(() => {
    socket.on("fetch", ({ players }: DataType) => {
      setPlayers(players);
    });
    window.addEventListener("keydown", handleUserKeyPress);
    return () => {
      window.removeEventListener("keydown", handleUserKeyPress);
      socket.removeListener("fetch");
    };
  }, []);
  return (
    <>
      {Object.entries(players || {}).map(([id, player]) => (
        <Rect
          key={`${id}_player_rect`}
          x={player.x}
          y={player.y}
          width={SNAKE_CONSTANTS.width}
          height={SNAKE_CONSTANTS.height}
          fill="red"
        />
      ))}
    </>
  );
};
