import styled from 'styled-components';
// import { Button } from 'components/common.styled';
export const List = styled.ul`
  padding: 0;
`;
export const Item = styled.li`
  padding: 20px 8px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  :first-child {
    border-top: 1px solid rgba(255, 255, 255, 0.1);
  }
`;
export const Name = styled.div`
  font-size: 16px;
  line-height: 1.5;
  color: white;
`;
export const Phone = styled.div`
  font-size: 12px;
  line-height: 1.5;
`;
