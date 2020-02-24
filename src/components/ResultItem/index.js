import React from 'react';
import PropTypes from 'prop-types';
import CardHeader from "@material-ui/core/CardHeader";
import Avatar from "@material-ui/core/Avatar";
import CardMedia from "@material-ui/core/CardMedia";
import Card from "@material-ui/core/Card";
import ItemType from "../../domain/enums/ItemType";
import TheatersIcon from "@material-ui/icons/Theaters";
import LiveTvIcon from "@material-ui/icons/LiveTv";
import HelpIcon from "@material-ui/icons/Help";
import Skeleton from "@material-ui/lab/Skeleton";
import {CardContent} from "@material-ui/core";
import IconButton from "@material-ui/core/IconButton";
import MoreIcon from '@material-ui/icons/More';
import ItemOffers from "./ItemOffers";
import ItemScores from "./ItemScores";

ResultItem.propTypes = {
    item: PropTypes.object
};

function ResultItem({item = null}) {

    const getIcon = type => {
        switch (type) {
            case ItemType.Movie:
                return <TheatersIcon/>;
            case ItemType.Show:
                return <LiveTvIcon/>;
            case ItemType.Unknown:
            default:
                return <HelpIcon/>;
        }
    };

    return (
        <Card style={{maxWidth: "100%"}}>
            <CardHeader
                avatar={
                    item ?
                        <Avatar aria-label={item.getType()}>
                            {getIcon(item.getType())}
                        </Avatar>
                        :
                        <Skeleton animation="wave" variant="circle" width={40} height={40} />
                }
                title={
                    item ?
                        item.getTitle()
                        :
                        <Skeleton animation="wave" height={10} width="80%" style={{ marginBottom: 6 }} />
                }
                titleTypographyProps = {
                    {
                        noWrap: true
                    }
                }
                subheader={
                    item ?
                        item.getReleaseYear()
                        :
                        <Skeleton animation="wave" height={10} width="40%" />
                }
                action={
                    item ?
                        <a href={item.getUrl()} target="_blank" rel="noopener noreferrer">
                            <IconButton>
                                <MoreIcon/>
                            </IconButton>
                        </a>
                        :
                        null
                }

            />

            {item ?
                <CardMedia
                    style={{height: 450}}
                    image={item.getPosterUrl()}
                />
                :
                <Skeleton animation="wave" variant="rect" style={{height: 450, width: 600, maxWidth: "100%"}} />
            }

            {item ?
                <CardContent style={{height: 136}}>

                    <div style={{float: "left", overflowX: "auto", maxWidth: "100%"}}>
                        <ItemOffers item={item}/>
                    </div>

                    <div style={{float: "right"}}>
                        <ItemScores item={item}/>
                    </div>

                </CardContent>
                :
                <Skeleton animation="wave" variant="rect" style={{height: 136}}/>
            }

        </Card>
    );
}

export default ResultItem;