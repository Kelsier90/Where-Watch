import React, {Fragment, useState} from 'react';
import PropTypes from 'prop-types';
import PresentationType from "../../domain/enums/PresentationTypes";
import SentimentVeryDissatisfiedIcon from "@material-ui/icons/SentimentVeryDissatisfied";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";

ItemOffers.propTypes = {
    item: PropTypes.object.isRequired
};

function ItemOffers({item}) {
    const [tabSelected, setTabSelected] = useState(0);

    const groupedOffers = {
        [PresentationType.FourK] : [],
        [PresentationType.Hd] : [],
        [PresentationType.Sd] : [],
        [PresentationType.Unknown] : [],
    };

    for(const offer of item.offers) {
        if(!offer.getProvider())
            continue;

        groupedOffers[offer.getPresentationType()].push(offer);
    }

    const presentationTypes = Object.keys(groupedOffers)
        .filter(presentationType => groupedOffers[presentationType].length > 0);

    if(presentationTypes.length === 0)
        return <em>Not available online &nbsp; <SentimentVeryDissatisfiedIcon/></em>;

    return (
        <Fragment>
            <Tabs
                variant="scrollable"
                scrollButtons="auto"
                aria-label="Presentations"
                onChange={(ev, value) => setTabSelected(value)}
                value={tabSelected}
            >
                {presentationTypes.map(presentationType =>
                    <Tab key={`${item.getId()}_${presentationType}`} label={presentationType} aria-controls={`presentation_type_content_${presentationType}`} style={{minWidth: 50}}/>
                )}
            </Tabs>
            {presentationTypes.map((presentationType, index) => {
                const id = `presentation_type_content_${presentationType}`;

                return <div key={id} id={id} role="tabpanel" style={{display: index === tabSelected ? 'block' : 'none'}}>
                    <div style={{display: "flex", paddingTop: 8}}>
                        {groupedOffers[presentationType].map(offer =>
                            <div key={`offer_${offer.getId()}`} style={{width: 55, textAlign: "center", margin: 5}} title={offer.getProvider().getName()}>
                                <a href={offer.getUrl()} target="_blank" rel="noopener noreferrer" style={{color: "inherit", textDecoration: "inherit"}}>
                                    <div>
                                        <img src={offer.getProvider().getIconUrl()} alt={offer.getProvider().getName()} style={{borderRadius: 3}} />
                                    </div>
                                    {offer.getPrice() !== null &&
                                    <div>
                                        {offer.getPrice()}
                                    </div>
                                    }
                                </a>
                            </div>
                        )}
                    </div>
                </div>;
            })}
        </Fragment>
    );
}

export default ItemOffers;