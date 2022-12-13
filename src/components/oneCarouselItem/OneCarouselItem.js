import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import StarIcon from '@mui/icons-material/Star';
import StarOutlineIcon from '@mui/icons-material/StarOutline';
import StarHalfIcon from '@mui/icons-material/StarHalf';

import './OneCarouselItem.css';

const style = { fontSize: '20px', color: '#ed143d' };

const redirect = (id) => {
  window.location.href = `/category/subCategory/product?id=${id}`;
  // window.open.href = link;
  // window.open(link, '_blank');
}

function OneCarouselItem({ item }) {
  return (
    <div className="carousal-content" onClick={() => redirect(item.id)}>
      <div className="carousel-item-image">
        <img alt="carousal_img" src={item && item.itemImage} />
      </div>
      <div className="carousel-item-desc">
        <h4>{item && item.itemName}</h4>
        <div className="carousal-item-star-rating">
        {
          Array(5).fill().map((x, i) => {
            if (item.customerRating > i && item.customerRating < i + 1) {
              return <StarHalfIcon style={style} />
            } else if (item.customerRating < i + 1) {
              return <StarOutlineIcon style={style} />
            } else if (item.customerRating >= i + 1) {
              return <StarIcon style={style} />
            }
          })
        }
        </div>
        <h5>Price: Rs. {item && item.itemPrice}</h5>
        <p>{item.itemDescription}</p>
      </div>
    </div>
  );
}

export default OneCarouselItem;
