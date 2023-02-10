import styled from 'styled-components';

export const StyledContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  & * {
    cursor: ${({ withPointer }: { withPointer: boolean }): string =>
      withPointer ? 'pointer' : 'default'};
  }
`;

export const StyledUl = styled.ul`
  list-style-type: none;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin: 0;
`;
