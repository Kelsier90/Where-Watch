import React, {Fragment} from 'react';
import PropTypes from 'prop-types';
import JustWatchIcon from "../../assets/img/justwwatch-icon.png";
import RottenTomatoesIcon from "../../assets/img/rottentomatoes-icon.png";
import ImdbIcon from "../../assets/img/imdb-licon.png";

ItemScores.propTypes = {
    item: PropTypes.object.isRequired
};

function ItemScores({item}) {

    const scoreIconStyle = {
        width: 25,
        marginLeft: 8,
        marginRight: 5,
    };

    const scoreValueStyle = {
        fontSize: "120%"
    };

    return (
        <div style={{display:"flex"}}>
            {item.getJwScore() !== null &&
            <Fragment>
                <img src={JustWatchIcon} alt="JustWatch" style={scoreIconStyle}/>
                <span style={scoreValueStyle}>{item.getJwScore()}</span>
            </Fragment>
            }

            {item.getRtScore() !== null &&
            <Fragment>
                <img src={RottenTomatoesIcon} alt="Rotten tomatoes" style={scoreIconStyle}/>
                <span style={scoreValueStyle}>{item.getRtScore()}</span>
            </Fragment>
            }

            {item.getImdbScore() !== null &&
            <Fragment>
                <img src={ImdbIcon} alt="Imdb" style={scoreIconStyle}/>
                <span style={scoreValueStyle}>{item.getImdbScore()}</span>
            </Fragment>
            }
        </div>
    );
}

export default ItemScores;