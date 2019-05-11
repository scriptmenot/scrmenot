import React from 'react';
import './DomainDetails.scss';
import AddOpinion from './AddOpinion.js';
import Opinions from './Opinions.js';


class Details extends React.Component{

    render() {
        return (
        <div className="Details" >
          <Opinions {...this.props}/>
          <AddOpinion {...this.props}/>
        </div>
        )
    }
}

export default Details;