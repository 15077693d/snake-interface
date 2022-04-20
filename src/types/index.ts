export type PlayerType = {
  x: number;
  y: number;
  isGameover: boolean;
};
export type FieldType = {
  w: number;
  h: number;
};
export type DataType = {
  field?: FieldType;
  players: { [id in string]: PlayerType };
};
