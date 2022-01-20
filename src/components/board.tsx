import Square from "./square";
import styled from "styled-components";
import useMatrix from "./useMatrix";
import {
  IBingoTitleProps,
  IBoardProps,
  IContainerProps,
  ISquare,
} from "../type/types";

const Container = styled.div<IContainerProps>`
  border: 5px solid black;
  display: grid;
  grid-template-columns: repeat(${(props) => props.size}, 5rem);
  grid-template-rows: repeat(${(props) => props.size}, 5rem);
  font-size: 2.5rem;
`;

const BingoTitle = styled.div<IBingoTitleProps>`
  margin: 2rem 0;
  font-size: 2rem;
  font-weight: 900;
  transition: 0.5s ease-in-out;
`;

const Board: React.FC<IBoardProps> = ({ size }) => {
  // custom hook
  const { matrix, handleOnClickSquare, bingoCount } = useMatrix(size);
  // custom hook

  return (
    <>
      <Container size={size}>
        {matrix
          ? matrix.map((row: ISquare[], rowIndex: number) =>
              row.map((square: ISquare, colIndex: number) => (
                <Square
                  handleOnClickSquare={handleOnClickSquare}
                  key={rowIndex * size + colIndex}
                  content={square.content}
                  check={square.check}
                  rowIndex={rowIndex}
                  colIndex={colIndex}
                />
              ))
            )
          : null}
      </Container>
      <BingoTitle totalBingo={bingoCount}>{`${bingoCount} Bingo!`}</BingoTitle>
    </>
  );
};

export default Board;
