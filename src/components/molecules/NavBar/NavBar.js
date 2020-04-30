import React, { useState, useEffect } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

const StyledNav = styled.nav`
  position: relative;
  display: flex;
  flex-direction: row;
  height: ${({ menu }) => (menu ? "180px" : "60px")};
  justify-content: space-around;
  padding: ${({ menu }) => (menu ? "15px" : "0px")} 6px;
  align-items: ${({ menu }) => (menu ? "flex-start" : "center")};
  @media all and (max-width: 400px) {
    justify-content: flex-end;
    padding-right: 10px;
  }
`;

const Hamburger = styled.div`
  display: flex;
  flex-direction: column;
  width: 40px;
  height: 30px;
  justify-content: space-around;
  align-items: center;
  transition: all 0.3s ease-in-out;
  &:hover > * {
    background-color: #666;
  }
`;

const HamburgerLine = styled.div`
  width: 100%;
  height: 4px;
  background-color: white;
  border-radius: 10px;
`;

const Menu = styled.ul`
  position: absolute;
  top: 60px;
  left: 0px;
  width: 100vw;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const MenuItem = styled.li`
  width: 100%;
  height: 40px;
  text-align: center;
`;

const NavBar = ({ children }) => {
  const getWindowDimensions = () => {
    const { innerWidth } = window;
    return { innerWidth };
  };
  const [screenWidth, setScreenWidth] = useState(
    getWindowDimensions().innerWidth
  );
  const [menu, setMenu] = useState(false);
  useEffect(() => {
    function handleResize() {
      if (getWindowDimensions().innerWidth > 400) {
        setMenu(false);
      }
      setScreenWidth(getWindowDimensions().innerWidth);
    }
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [menu]);

  return (
    <StyledNav menu={menu} className="bg-teal-500">
      {screenWidth > 400 ? (
        children
      ) : (
        <>
          <Hamburger onClick={() => setMenu(!menu)}>
            <HamburgerLine />
            <HamburgerLine />
            <HamburgerLine />
          </Hamburger>
          {menu && (
            <Menu className="bg-teal-500">
              {children.map((el, index) => (
                <MenuItem key={index}>{el}</MenuItem>
              ))}
            </Menu>
          )}
        </>
      )}
    </StyledNav>
  );
};

NavBar.propTypes = {
  children: PropTypes.array,
};

export default NavBar;
