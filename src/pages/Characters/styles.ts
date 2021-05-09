import styled from 'styled-components';

export const Container = styled.div``;

export const Header = styled.header`
  padding: 32px 0;
  background: #28262e;
`;

export const Content = styled.main`
  display: flex;
  flex: 1;
`;

export const ContentArea = styled.main`
  flex: 1;

  height: 100vh;

  margin-left: 50px;
  margin-right: 50px;

  h1 {
    margin-top: 40px;
  }
`;

export const Character = styled.div`
  margin: 5px;
  border: 1px solid #ccc;
  float: left;
  width: 180px;
  height: 250px;

  img {
    width: 100%;
    height: 200px;
  }

  strong {
    padding: 15px;
    text-align: center;
    font-size: 14px;
  }
`;
