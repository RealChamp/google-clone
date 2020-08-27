import React from 'react'
import './SearchPage.css'
import { useStateValue } from '../useContext/StateProvider'
import useGoogleSearch from '../API/useGoogleSearch'
// import Response from '../API/response'
import {Link} from 'react-router-dom'
import Search from '../Search/Search'
import SearchIcon from "@material-ui/icons/Search"
import DescriptionIcon from "@material-ui/icons/Description"
import ImageIcon from "@material-ui/icons/Image"
import LocalOfferIcon from "@material-ui/icons/LocalOffer"
import RoomIcon from "@material-ui/icons/Room"
import MoreVertIcon from "@material-ui/icons/MoreVert"
 

function SearchPage() {
    const [{term}, dispatch] = useStateValue();
    // Live API call
    const {data} = useGoogleSearch(term);

    // Mock API CALL
    // const data = Response;

    console.log(data);
    return (
      <div className="searchPage">
        <div className="searchPage__header">
          <Link to="/">
            <img
              className="searchPage__logo"
              src="https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_272x92dp.png"
              alt="logo"
            />
          </Link>
          <div className="searchPage__headerBody">
            <Search hideButtons />

            <div className="searchPage__options">
              <div className="searchPage__optionsLeft">
                <div className="searchPage__option">
                  <SearchIcon />
                  <Link to="/all">All</Link>
                </div>

                <div className="searchPage__option">
                  <DescriptionIcon />
                  <Link to="/news">News</Link>
                </div>

                <div className="searchPage__option">
                  <ImageIcon />
                  <Link to="/images">Images</Link>
                </div>

                <div className="searchPage__option">
                  <LocalOfferIcon />
                  <Link to="/shopping">Shopping</Link>
                </div>

                <div className="searchPage__option">
                  <RoomIcon />
                  <Link to="/maps">Maps</Link>
                </div>

                <div className="searchPage__option">
                  <MoreVertIcon />
                  <Link to="/more">More</Link>
                </div>
              </div>

              <div className="searchPage__optionsRight">
                <div className="searchPage__option">
                  <Link to="/settings">Settings</Link>
                </div>

                <div className="searchPage__option">
                  <Link to="/tools">Tools</Link>
                </div>
              </div>
            </div>
          </div>
        </div>
        {term && (
          <div className="searchPage__results">
            <p className="searchPage__resultCount">
              About {data?.searchInformation.formattedTotalResults} results in (
              {data?.searchInformation.formattedSearchTime}) for {term}
            </p>

            {data?.items.map((item) => (
              <div className="searchPage__result">
                <a className='searchPage__resultLink' href={item.link}>
                {item.pagemap?.cse_image?.length > 0 && item.pagemap?.cse_image[0]?.src && (
                    <img className='searchPage__resultImage' src={item.pagemap?.cse_image[0]?.src} alt='site-image'/>
                )}
                   

                  {item.displayLink} ▽
                </a>

                <a className="searchPage__resultTitle" href={item.link}>
                  <h2>{item.title}</h2>
                </a>
                <p className="searchPage__resultSnippet">{item.snippet}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    );
}

export default SearchPage
         