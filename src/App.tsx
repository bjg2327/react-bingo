import React, { useState } from "react";
import Board from "./components/board";
import styled from "styled-components";

function App() {
  const [size, setSize] = useState(5);
  const [hash, setHash] = useState("");
  const handleSizeOnChange = (event: any) => {
    setHash("");
    setSize(parseInt(event.target.value));
  };

  // const hangdleOnClickShuffle = () => {};

  return (
    <Container className="App">
      <Header className="App-header">Bingo Game</Header>
      <InputContainer>
        <span>{`BOARD SIZE `}</span>
        <SizeInput
          value={size}
          onChange={handleSizeOnChange}
          type="number"
          min="1"
          max="12"
        />
      </InputContainer>
      <Shuffle onClick={() => setHash(Math.random().toString(36).substring(7))}>
        ♻️ SHUFFLE ♻️
      </Shuffle>
      <Shuffle onClick={() => null}>♻️ Random Choice ♻️</Shuffle>
      <Board key={size + hash} size={size} />
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  min-height: 100vh;
  background-color: #ffdee9;
  background-image: linear-gradient(0deg, #b4dfa4 0%, #b5f4ff 100%);
`;

const Header = styled.div`
  margin: 2rem 0 0.5rem;
  font-size: 3rem;
  font-weight: 900;
`;

const InputContainer = styled.div`
  font-weight: 900;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 1rem;
`;

const SizeInput = styled.input`
  margin-left: 0.5rem;
  width: 2rem;
  border-radius: 5px;
  outline: none;
  border: 1px solid rgba(0, 0, 0, 0.5);
  padding-left: 0.2rem;
`;

const Shuffle = styled.button`
  border: none;
  background-color: white;
  border: 0.5px solid rgba(0, 0, 0, 0.5);
  border-radius: 5px;
  font-weight: 900;
  padding: 0.2rem 0.55rem;
  margin-bottom: 1rem;
  outline: none;
  transition: 0.2s ease-in-out;
  cursor: pointer;
  &:hover {
    box-shadow: 0px 0px 3px rgba(0, 0, 0, 0.5);
  }
`;
export default App;
