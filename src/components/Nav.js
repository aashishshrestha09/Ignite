import React, {useState} from 'react';
// Animations
import styled from 'styled-components';
import {motion} from 'framer-motion';
import logo from '../img/logo.svg';
//Redux and Routes
import {fetchSearch} from '../actions/gameAction'
import {useDispatch} from 'react-redux';

export default function Nav() {
    const dispatch = useDispatch();
    const [textInput, setTextInput] = useState("");

    const inputHandler = (e) => {
        setTextInput(e.target.value);
    }

    const submitSearch = (e) => {
        e.preventDefault();
        dispatch(fetchSearch(textInput));
        setTextInput("");
    }

    const clearSearched = () => {
        dispatch({
            type: "CLEAR_SEARCHED"
        });
    }

    return (
        <StyledNav>
            <Logo onClick={clearSearched}>
                <img src={logo} alt="logo" />
                <h1>Ignite</h1>
            </Logo>
            <form className="search">
                <input value={textInput} onChange={inputHandler} type="text" />
                <button onClick={submitSearch} type="submit">Search</button>
            </form>
        </StyledNav>
    )
}

const StyledNav = styled(motion.nav)`
    padding: 1rem 3rem;
    text-align: center;
    input{
        width: 30%;
        font-size: 1.5rem;
        padding: 0.3rem;
        border: none;
        margin-top: 1rem;
        box-shadow: 0px 0px 30px rgba(0, 0, 0, 0.2);
    }
    button {
        font-size: 1.5rem;
        border: none;
        cursor: pointer;
        padding: 0.3rem 2rem;
        background: #ff7676;
        color: white;
    }
`

const Logo = styled(motion.div)`
    display: flex;
    justify-content: center;
    padding: 1rem;
    cursor: pointer;
    img{
        height: 2rem;
        width: 2rem;
    }
`