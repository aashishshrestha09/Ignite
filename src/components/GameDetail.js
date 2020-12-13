import React from 'react'
// Styling and Animation
import styled from 'styled-components';
import {motion} from 'framer-motion';
// Redux
import {useSelector} from 'react-redux';
import {useHistory} from 'react-router-dom';

import {smallImage} from '../util'
// Images
import playstation from '../img/playstation.svg';
import steam from '../img/steam.svg';
import xbox from '../img/xbox.svg';
import nintendo from '../img/nintendo.svg';
import apple from '../img/apple.svg';
import gamepad from '../img/gamepad.svg';
// Star Images
import starEmpty from '../img/star-empty.png'
import starFull from '../img/star-full.png'

export default function GameDetail({pathId}) {
    const history = useHistory();
    // Exit Detail
    const exitDetailHandler = (e) => {
        const element = e.target;
        if(element.classList.contains('shadow')) {
            history.push('/');
        }
    };

    // Get platfrom images
    const getPlatfrom = (platform) => {
        switch(platform) {
            case "PlayStation 4":
                return playstation;
            case "PlayStation 5":
                return playstation;
            case "Xbox Series S/X":
                return xbox;
            case "Xbox S":
                return xbox;
            case "Xbox one":
                return xbox;
            case "PC":
                return steam;
            case "Nintendo Switch":
                return nintendo
            case "iOS":
                return apple
            default:
                return gamepad;
        }
    }

    // Get Stars
    const getStars = () => {
        const stars = [];
        const rating = Math.floor(game.rating);
        for(let i = 1; i <= 5; i++) {
            if (i <= rating) {
                stars.push(<img alt="star" key={i} src={starFull}></img>)
            } else {
                stars.push(<img alt="star" key={i} src={starEmpty}></img>)
            }
        }
        return stars;
    }

    // Data
    const {game, screen, isLoading} = useSelector((state) => state.detail)
    return (
        <>
            {!isLoading && (
            <CardShadow className="shadow" onClick={exitDetailHandler}>
                <Detail layoutId={pathId}>
                    <Stats>
                        <div className="rating">
                            <motion.h3 layoutId={`title ${pathId}`} >{game.name}</motion.h3>
                            <p>Rating: {game.rating}</p>
                            {getStars()}
                        </div>
                        <Info>
                            <h3>Platforms</h3>
                            <Platforms>
                                {game.platforms.map((data) => (
                                    <img 
                                        key={data.platform.id} 
                                        src={getPlatfrom(data.platform.name)} 
                                        alt={data.platform.name}
                                    />
                                ))}
                            </Platforms>
                        </Info>
                    </Stats>
                    <Media>
                        <motion.img layoutId={`image ${pathId}`}  src={smallImage(game.background_image, 1280)} alt={game.background_image}/>
                    </Media>
                    <Description>
                        <p>{game.description_raw}</p>
                    </Description>
                    <div className="gallary">
                        {screen.results.map((screen) => (
                            <img src={smallImage(screen.image, 1280)} key={screen.id} alt={screen.image} />
                        ))}
                    </div>
                </Detail>
            </CardShadow>
            )}
        </>
    )
}

const CardShadow = styled(motion.div)`
    width: 100%;
    min-height: 100vh;
    overflow-y: scroll;
    background: rgba(0,0,0,0.5);
    position: fixed;
    top: 0;
    left: 0;
    z-index: 10;
    &::-webkit-scrollbar {
        width: 0.5rem;
    }

    &::-webkit-scrollbar-thumb {
        background-color: #ff7676;
    }

    &::-webkit-scrollbar-track {
        background: white;
    }
`

const Detail = styled(motion.div)`
    width: 80%;
    border-radius: 1rem;
    padding: 1.5rem 4rem;
    background: white;
    position: absolute;
    left: 10%;
    color: black;
    z-index: 10;
    img {
        width: 100%;
    }
`
const Stats = styled(motion.div)`
    display: flex;
    align-items: center;
    justify-content: space-between;
    img {
        width: 1.3rem;
        height: 1.3rem;
        display: inline;
    }
`
const Info = styled(motion.div)`
    text-align: center;
`
const Platforms = styled(motion.div)`
    display: flex;
    justify-content: space-evenly;
    img {
        margin-left: 1.5rem;
    }
`
const Media = styled(motion.div)`
    margin-top: 3rem;
    img {
        width: 100%;
    }
`
const Description = styled(motion.div)`
    margin: 4rem 0rem;
`