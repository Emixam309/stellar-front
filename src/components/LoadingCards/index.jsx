import PropTypes from "prop-types"

const LoadingCards = ({ itemNumber = 0, Card }) => {
  return (
    <div className="cards-list" data-testid="cards-list">
      {[...Array(itemNumber)].map((_, index) => (
        Card
      ))}
    </div>
  )
}

LoadingCards.propTypes = {
  itemNumber: PropTypes.number,
}

export default LoadingCards
