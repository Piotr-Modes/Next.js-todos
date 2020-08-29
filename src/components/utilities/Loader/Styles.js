import styled, { keyframes } from "styled-components";

const fadeBars = keyframes`
    0% {
      box-shadow: 0em 5em 0 0em black;
    }
    25%,
    75% {
      box-shadow: 0em 5em 0 0em rgba(black, 0.8);
    }
    100% {
      box-shadow: 0em 5em 0 0em black;
    }
`;

const StyledLoader = styled.div`
  margin: 0 auto;
  display: block;
  font-size: 10px;
  height: 5em;
  width: 1em;
  animation: ${fadeBars} 1s linear infinite;
  animation-delay: 0.1s;
  box-shadow: 0em 5em 0 0em black;
  transform: translateY(-100%);
  &::before,
  &::after {
    content: "";
    position: absolute;
    left: -2em;
    top: 0;
    height: 100%;
    width: 100%;
    box-shadow: 0em 5em 0 0em black;
    animation: fade-bars 1s linear infinite;
    animation-delay: 0s;
  }
  &::after {
    left: 2em;
    animation: fade-bars 1s linear infinite;
    animation-delay: 0.2s;
  }
`;

export default StyledLoader;
