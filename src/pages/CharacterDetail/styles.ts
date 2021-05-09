import styled from 'styled-components';
import { shade } from 'polished';

export const Container = styled.div`
  > header {
    height: 144px;
    background: #09432f;

    display: flex;
    align-items: center;

    div {
      width: 100%;
      max-width: 1120px;
      margin: 0 auto;

      svg {
        color: #999591;
        width: 24px;
        height: 24px;
      }
    }
  }
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: -200px auto 0;

  width: 100%;

  form {
    margin: 80px 0;
    width: 740px;
    text-align: center;
    display: flex;
    flex-direction: column;

    h2 {
      text-align: left;
      color: #000;
    }

    a {
      color: #f4ede8;
      display: block;
      margin-top: 24px;
      text-decoration: none;
      transition: background-color 0.2s;

      &:hover {
        color: ${shade(0.2, '#f4ede8')};
      }
    }

    input[name='old_password'] {
      margin-top: 24px;
    }
  }

  ul {
    list-style: none;
    padding: 0.5em 0;
    margin: 0;

    li {
      display: flex;
      align-items: center;

      padding: 1em 1em 0.5em 0;
      font-size: 0.95em;
      font-weight: regular;
      background-repeat: no-repeat;
      background-position: left 15px center;
      background-size: auto 20px;
      transition: all 0.15s linear;
      /* cursor: pointer; */

      span {
        color: #000;
        /* color: #fff; */
        font-family: 'Roboto Slab', serif;
        font-size: 16px;
      }

      &:hover {
        background-color: rgba(0, 0, 0, 0.1);
      }

      &:focus {
        outline: none;
      }
    }
  }
`;

export const AvatarInput = styled.div`
  margin-bottom: 32px;
  position: relative;
  align-self: center;

  img {
    width: 136px;
    height: 136px;
    border-radius: 50%;
  }

  label {
    position: absolute;
    background: #ff9000;
    width: 48px;
    height: 48px;
    border-radius: 50%;
    right: 0;
    bottom: 0;
    border: 0;
    cursor: pointer;
    transition: background-color 0.2s;

    display: flex;
    align-items: center;
    justify-content: center;

    input {
      display: none;
    }

    svg {
      width: 20px;
      height: 20px;
      color: #312e38;
    }

    &:hover {
      background: ${shade(0.2, '#ff9000')};
    }
  }
`;
