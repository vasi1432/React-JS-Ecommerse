import { useEffect, useState } from "react";
import { Container, Input } from "reactstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { BsHeart } from "@react-icons/all-files/bs/BsHeart";
import { BsHeartFill } from "@react-icons/all-files/bs/BsHeartFill";
import WishList from "./wishlist";
import { Button } from "bootstrap";

const Homepage = () => {
  const [products, setproducts] = useState([]);
  const [copyProducts, setCopyProducts] = useState([]);
  const [wishListed, setWishListed] = useState([]);
  const [wishListedcopy, setWishListedcopy] = useState([]);
  const [searchedproducts, setSearchedproducts] = useState("");
  const [showWishList, setShowWishList] = useState(true);
  const [isHover, setIsHover] = useState(false);

  //getting data from  API
  useEffect(() => {
    fetch("https://fakestoreapi.com/products")
      .then((res) => res.json())
      .then((json) => {
        setproducts(json);
        setCopyProducts(json);
      });
  }, []);

  //adding product on wishlist
  const handleAddWishlisted = (item) => {
    for (let i = 0; i < wishListedcopy.length; i++) {
      if (wishListedcopy[i].id === item.id) {
        wishListedcopy[i].wishlist = false;
        const filteredwishlist = wishListed.filter((listeditem) => {
          return listeditem.id !== item.id;
        });
        setWishListed(filteredwishlist);
        setWishListedcopy(filteredwishlist);
        return;
      }
    }
    item.wishlist = true;
    setWishListed([...wishListed, item]);
    setWishListedcopy([...wishListed, item]);
  };

  //search logic
  const handleSearchedProducts = (e) => {
    setSearchedproducts(e.target.value);

    //filter from main product list
    const filteredProducts = copyProducts.filter((item) =>
      item.title.toLowerCase().includes(e.target.value.toLowerCase())
    );
    setproducts(filteredProducts);

    //filter from wishlisted products
    const filteredwishlist = wishListedcopy.filter((item) =>
      item.title.toLowerCase().includes(e.target.value.toLowerCase())
    );
    setWishListed(filteredwishlist);
  };

  //main pagec wishlist button toggle
  const handleWishlistClick = () => {
    setShowWishList(showWishList ? false : true);
  };

  //hover button logic
  const handleMouseEnter = (item) => {
    item.hover = true;
    setIsHover(true);
  };
  const handleMouseOut = (item) => {
    item.hover = false;
    setIsHover(false);
  };
  return (
    <>
      <div className="wishlistMain " onClick={handleWishlistClick}>
        <BsHeart fontSize={"50px"}></BsHeart>
      </div>
      <div className="mt-3">
        <Container>
          <Input
            placeholder="Search......."
            onChange={handleSearchedProducts}
          />
        </Container>
      </div>
      {showWishList ? (
        <div className="parent">
          {products.map((item) => {
            return (
              <div
                key={item.id}
                className="card"
                onMouseEnter={() => handleMouseEnter(item)}
                onMouseOut={(m) => handleMouseOut(item)}
              >
                <div
                  className="wishlist"
                  onClick={() => {
                    handleAddWishlisted(item);
                  }}
                >
                  {item.wishlist === true ? (
                    <BsHeartFill></BsHeartFill>
                  ) : (
                    <BsHeart></BsHeart>
                  )}
                </div>
                <img src={item.image} alt="" />
                <h3>{item.title}</h3>
                <p>{item.description}</p>
                <p className="price">
                  {" "}
                  <span>{item.price + 10.2}$</span> {item.price}$
                </p>
                <div>
                  <span className="rating">★{item.rating.rate}</span>
                  <span>({item.rating.count})</span>
                </div>
                <button
                  style={
                    item.hover ? { display: "block" } : { display: "none" }
                  }
                >
                  Explore
                </button>
              </div>
            );
          })}
        </div>
      ) : (
        <>
          <h2>Wishlist</h2>
          <div className="parent">
            {wishListed.map((item) => {
              return (
                <div key={item.id} className="card">
                  <div
                    className="wishlist"
                    onClick={() => {
                      handleAddWishlisted(item);
                    }}
                  >
                    {item.wishlist === true ? (
                      <BsHeartFill></BsHeartFill>
                    ) : (
                      <BsHeart></BsHeart>
                    )}
                  </div>
                  <img src={item.image} alt="" />
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                  <p className="price">
                    {" "}
                    <span>{item.price + 10.2}$</span> {item.price}$
                  </p>
                  <div>
                    <span className="rating">★{item.rating.rate}</span>
                    <span>({item.rating.count})</span>
                  </div>
                </div>
              );
            })}
          </div>
        </>
      )}
    </>
  );
};
export default Homepage;
