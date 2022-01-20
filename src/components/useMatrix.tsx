import { useEffect, useState } from "react";

interface ISquare {
  content: string;
  check: boolean;
}

const useMatrix = (size: number) => {
  // ビンゴの記録
  const [matrix, setMatrix] = useState<ISquare[][]>();
  // 完成したビンゴの数
  const [bingoCount, setBingoCount] = useState(0);
  // 選択した数字
  const [selectCount, setSelectCount] = useState(0);

  const getNumbers = (size: number) => {
    let arr = [];
    for (let i = 1; i <= size; i++) {
      arr.push(i);
    }
    return arr;
  };

  useEffect(() => {
    let bMatrix: ISquare[][] = [];

    for (let i = 0; i < size; i++) {
      bMatrix[i] = new Array(size).fill({ content: "", check: false });
    }

    const shuffle = (a: any) => {
      for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
      }
      return a;
    };

    const shuffledNumbers = shuffle(getNumbers(size * size));

    for (let i = 0; i < size; i++) {
      for (let j = 0; j < size; j++) {
        bMatrix[i].splice(j, 1, {
          content: shuffledNumbers[i * size + j],
          check: false,
        });
      }
    }

    // compare previousArray to bMatrix
    // if differ, setMatrix

    setMatrix(() => bMatrix);
  }, [size]);

  const handleOnClickSquare = (row: number, col: number) => {
    if (matrix !== undefined) {
      matrix[row].splice(col, 1, {
        ...matrix[row][col],
        check: !matrix[row][col].check,
      });
    }
    setMatrix(() => matrix);
    setSelectCount((prevCount) => prevCount + 1);
    checkBingo();
  };

  const checkBingo = () => {
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
    setBingoCount(() => totalBingo);
  };

  return { matrix, handleOnClickSquare, bingoCount };
};

export default useMatrix;
