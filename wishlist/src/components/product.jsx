import React, { useEffect, useState } from "react";
import useFetch from "../../src/hooks/usefetch";
import "./product.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGlasses, faHeart, faRandom } from "@fortawesome/free-solid-svg-icons";
import { useWishlist } from "../context/Wishlist";

function Products() {
  const [data, setData, fetchData] = useFetch([]);
  const [columns, setColumns] = useState(3);
  const { wishlist, addToWishlist, removeFromWishlist } = useWishlist();
  const [wishlistOpen, setWishlistOpen] = useState(true);

  const handleWishlistOpen = () => setWishlistOpen(!wishlistOpen);

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div id="wishList">
      <section className={`wishlist ${wishlistOpen ? "" : "dnone"}`}>
        <div className="texts">
          <h2>Wishlist</h2>
          <p onClick={handleWishlistOpen}>X</p>
        </div>
        <ul>
          {wishlist.map((itemId) => {
            const item = data.find((product) => product.id === itemId);
            return item ? (
              <li key={itemId}>
                <img src={item.image} alt={item.name} />
                <div>
                  <p>{item.category}</p>
                  <p>{item.name}</p>
                  <p>${item.price}</p>
                </div>
                <button onClick={() => removeFromWishlist(itemId)}>
                  Remove
                </button>
              </li>
            ) : null;
          })}
        </ul>
      </section>
      <div className="allcontainer">
        <div className="shop">
          <div
            className="products"
            style={{ gridTemplateColumns: `repeat(${columns}, 1fr)` }}
          >
            {data.map((item) => (
              <ul key={item.id}>
                <div className="cardimgs">
                  <img src={item.image} alt="" />
                  <div className="righticons">
                    <div
                      className="circle"
                      onClick={() => addToWishlist(item.id)}
                    >
                      <FontAwesomeIcon icon={faHeart} />
                    </div>
                    <div onClick={handleWishlistOpen} className="circle">
                      <FontAwesomeIcon icon={faGlasses} />
                    </div>
                    <div className="circle">
                      <FontAwesomeIcon icon={faRandom} />
                    </div>
                  </div>
                  <div className="addtocart">
                    <p>Add To Cart</p>
                  </div>
                </div>
                <li>{item.category}</li>
                <li>{item.name}</li>
                <li>${item.price}</li>
              </ul>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Products;
