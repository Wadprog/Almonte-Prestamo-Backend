import React from 'react';
import InfoCards from './InfoCards';
const CardsContainer = props => {
	const { cards } = props;
	return <div className="card-deck">
  {cards.map(card => <InfoCards {...card} />)}
  </div>;
};
export default CardsContainer;
