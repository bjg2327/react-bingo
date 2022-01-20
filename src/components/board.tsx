import React, { useEffect, useState } from "react";
import Square from "./square";
import styled from "styled-components";

interface IContainerProps {
  size: number;
}

interface IBingoTitleProps {
  totalBingo: number;
}

const Container = styled("div")<IContainerProps>`
  border: 5px solid black;
  display: grid;
  grid-template-columns: repeat(${(props) => props.size}, 5rem);
  grid-template-rows: repeat(${(props) => props.size}, 5rem);
  font-size: 2.5rem;
`;

const BingoTitle = styled("div")<IBingoTitleProps>`
  margin: 2rem 0;
  font-size: ${(props) => props.totalBingo / 2}rem;
  font-weight: 900;
  transition: 0.5s ease-in-out;
`;

interface ISquare {
  content: string;
  check: boolean;
}

function getNumbers(size: number) {
  let arr = [];
  for (let i = 1; i <= size; i++) {
    arr.push(i);
  }
  return arr;
}

function Board(props: { size: number }) {
  // ビンゴの記録
  const [matrix, setMatrix] = useState<ISquare[][]>();
  // 完成したビンゴの数
  const [bingoCount, setBingoCount] = useState(0);
  // 選択した数字
  const [selectCount, setSelectCount] = useState(0);
  const { size } = props;

  let bMatrix: ISquare[][] = [];
  for (let i = 0; i < size; i++) {
    bMatrix[i] = new Array(size).fill({ content: "", check: false });
  }

  useEffect(() => {
    const shuffle = (a: any) => {
      for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
      }
      return a;
    };
    const shuffledNumber = shuffle(getNumbers(size * size));
    for (let i = 0; i < size; i++) {
      for (let j = 0; j < size; j++) {
        bMatrix[i].splice(j, 1, {
          content: shuffledNumber[i * size + j],
          check: false,
        });
      }
    }
    setMatrix(bMatrix);
  }, []);

  const handleOnClickSquare = (row: number, col: number) => {
    if (matrix !== undefined) {
      matrix[row].splice(col, 1, {
        ...matrix[row][col],
        check: !matrix[row][col].check,
      });
    }
    setMatrix(matrix);
    setSelectCount(selectCount + 1);
    checkBingo();
  };

  const checkBingo = () => {
    const { size } = props;
    let totalBingo = 0;
    // row
    for (let i = 0; i < size; i++) {
      if (
        matrix !== undefined &&
        matrix[i].reduce((bingo, square) => bingo && square.check, true)
      )
        totalBingo++;
    }
    // column
    for (let i = 0; i < size; i++) {
      let bingo = true;
      for (let j = 0; j < size; j++) {
        if (matrix !== undefined) {
          bingo = bingo && matrix[j][i].check;
        }
      }
      if (bingo) totalBingo++;
    }
    // diagnal
    let diagnalBingoOne = true;
    let diagnalBingoTwo = true;
    for (let i = 0; i < size; i++) {
      if (matrix !== undefined) {
        diagnalBingoOne = diagnalBingoOne && matrix[i][size - i - 1].check;
        diagnalBingoTwo = diagnalBingoTwo && matrix[i][i].check;
      }
    }
    if (diagnalBingoOne) totalBingo++;
    if (diagnalBingoTwo) totalBingo++;
    setBingoCount(totalBingo);
  };

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
          : ""}
      </Container>
      <BingoTitle totalBingo={bingoCount}>{`${bingoCount} Bingo!`}</BingoTitle>
    </>
  );
}

export default Board;
