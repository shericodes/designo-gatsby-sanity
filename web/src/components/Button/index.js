import React from "react";
import styled from "styled-components";
import { Link as GatsbyLink } from "gatsby";

const StyledLink = styled(GatsbyLink)`
  padding: 16px 24px;
  border: none;
  border-radius: 8px;
  font-size: 0.9375rem;
  font-weight: 500;
  text-transform: uppercase;
  background-color: ${(props) =>
    props.primary ? "var(--white)" : "var(--peach)"};
  color: ${(props) => (props.primary ? "var(--black)" : "var(--white)")};
  text-decoration: none;
  transition: var(--transition);
  &:hover,
  &:focus {
    cursor: pointer;
    background-color: var(--light-peach);
    color: var(--white);
  }

  &:focus {
    outline: none;
    box-shadow: 0 0 0 3px var(--black);
  }
`;

function Button({ route, primary, label }) {
  return (
    <StyledLink to={`/${route}`} primary={primary}>
      {label}
    </StyledLink>
  );
}

export default Button;
