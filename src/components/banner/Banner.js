import Avatar from '@material-ui/core/Avatar';

import './Banner.css';
import bag from './bag.png';

function Banner({changeSearchText, startSearch, loggedIn}) {
  const redirect = () => {
    window.location.href = '/admin'
  }
  
  return (
    <div className="banner">
      <div className="banner-container">
        <div className="banner-left">
          <a href="/">
            <img alt="bag" src={bag} />
          </a>
          <h1>Shop</h1>
        </div>
        <div className="banner-right">
          <input
            type="text"
            placeholder="Search items..."
            onChange={(e) => changeSearchText(e.target.value)}
            onKeyPress={e => startSearch(e)}
          />
        {/* <button onClick={() => localStorage.removeItem('loggedIn')}>sbh</button> */}
          {loggedIn && (
            <div className="admin-button">
              <Avatar
                sx={{ bgcolor: 'white' }}
                onClick={redirect}
              >A</Avatar>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Banner;
