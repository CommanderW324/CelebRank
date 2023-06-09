import React, { useCallback, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
    Button,
    Container,
    Image,
    List,
    Menu,
    Segment,
    Sidebar,
  } from 'semantic-ui-react'
import logo_small from '../assets/logo-small.png'
function Header({isAuth, signOut}){
    const [fixed, setFixed] = useState(false);

    const [scrollPosition, setScrollPosition] = useState(0);
    useEffect(() => {
        const handleScroll = () => {
        const position = window.pageYOffset;
        setScrollPosition(position);
        };
        window.addEventListener('scroll', handleScroll);
    }, []);
    useEffect(()=>{
        setFixed(!(scrollPosition < window.innerHeight / 4));
    }, [scrollPosition])
    return (
        <Segment
            inverted
            textAlign='center'
            style={{padding: '1em 0em' }}
            vertical
          >
            <Menu
              fixed={fixed ? 'top' : null}
              inverted={!fixed}
              pointing={!fixed}
              secondary={!fixed}
              size='large'
            >
              <Container>
                <Menu.Item as={Link} to='/home'>
                  <img src={logo_small} alt='CelebRank' style={{ height: '45px', width: '40px' }} />
                  <span style={{ marginLeft: '10px', fontWeight: 'bold', fontSize: '20px' }}>CelebRank</span>
                </Menu.Item>
                <Menu.Item as='a' >
                  <Link to="/home">
                    Home
                  </Link>
                </Menu.Item>
                <Menu.Item as='a'><Link to="/influencers"> Influencer Page </Link></Menu.Item>
                <Menu.Item position='right'>
                  {isAuth ? 
                  <><Link to="/profile">
                  <Button as='a' inverted={!fixed}>
                    Profile
                  </Button>
                </Link>
                </>
                  :
                  <><Link to="/login">
                  <Button as='a' inverted={!fixed}>
                    Log in
                  </Button>
                </Link><Button as='a' inverted={!fixed} primary={fixed} style={{ marginLeft: '0.5em' }}>
                    Sign Up
                  </Button></>
                  
                  
                  }
                    
                </Menu.Item>
              </Container>
            </Menu>
          </Segment>
    )
}
export default Header;
