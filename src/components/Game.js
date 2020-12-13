import React from 'react'
// Styling and Animation
import styled from 'styled-components';
import {motion} from 'framer-motion';
// Redux
import {useDispatch} from 'react-redux';
import {loadDetail} from '../actions/detailAction'
import {Link} from 'react-router-dom'
import {useLocation} from 'react-router-dom'
import {smallImage} from '../util'

export default function Game( props ) {
    const {
        name,
        released,
        image,
        id
    } = props    
    const stringPathId = id.toString();
    const location = useLocation();
    if (location.pathname === '/') {
        document.body.style.overflow = "auto";
    } else {
        document.body.style.overflow = "hidden";
    }
    // Load Details
    const dispatch = useDispatch();
    const loadDetailHandler = () => {   
        dispatch(loadDetail(id));
    }

    return (
        <StyledGame layoutId={stringPathId} onClick={loadDetailHandler}>
            <Link to={`/game/${id}`}>
                <motion.h3 layoutId={`title ${stringPathId}`} >{name}</motion.h3>
                <p>{released}</p>
                <motion.img layoutId={`image ${stringPathId}`} src={smallImage(image, 640)} alt={name}/>   
            </Link>     
        </StyledGame>
    );
};

const StyledGame = styled(motion.div) `
    min-height: 30vh;
    box-shadow: 0px 5px 20px rgba(0, 0, 0, 0.2);
    text-align: center;
    border-radius: 1rem;
    cursor: pointer;
    overflow: hidden;
    img {
        width: 100%;
        height: 40vh;
        object-fit: cover;
    }
`
