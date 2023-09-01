export interface FunctionNode {
  name: string;
  start: {
    line: number;
    colume: number;
    index: number;
  };
  end: {
    line: number;
    colume: number;
    index: number;
  };
}
