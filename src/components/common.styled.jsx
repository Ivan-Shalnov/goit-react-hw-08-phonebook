import styled from 'styled-components';

export const Input = styled.input`
  background: rgba(255, 255, 255, 0.1);
  border: 2px solid rgba(255, 255, 255, 0.1);
  color: white;
  transition: 1s;
  height: 20px;
  padding-left: 10px;
  :focus {
    border-radius: 40px;
    outline: none;
  }
`;
export const Button = styled.button`
  background-color: transparent;
  color: rgba(255, 255, 255, 0.1);
  border: 2px solid rgba(255, 255, 255, 0.1);
  text-align: center;
  height: 26px;
  transition: 250ms;
  padding: 0 10px;
  cursor: pointer;
  :hover {
    color: #b554d7;
    background: rgba(255, 255, 255, 0.1);
    border-radius: 40px;
  }
`;
