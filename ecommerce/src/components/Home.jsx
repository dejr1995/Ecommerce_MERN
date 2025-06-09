import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../store/CartSlice";
import { Link, useNavigate } from "react-router-dom";
import stripe from "../assets/images/stripe.png";
import paypal from "../assets/images/paypal.png";
import visa from "../assets/images/visa.png";
import iconwsp from "../assets/images/iconwsp2.png";
import iconfb from "../assets/images/iconfb.png";
import iconig from "../assets/images/iconig.png";

//Swiper
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "../../src/index.css";
import { Pagination, Navigation, Autoplay } from "swiper/modules";
import { useTranslation } from "react-i18next";

const Home = () => {
  const { t } = useTranslation();
  const { items: databan, statusban } = useSelector((state) => state.banners);

  const { items: data, status } = useSelector((state) => state.products);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleAddToCart = (product) => {
    dispatch(addToCart(product));
    navigate("/cart");
  };

  return (
    <div className="home-container">
      {status === "success" ? (
        <>
          <Swiper
            slidesPerView={1}
            spaceBetween={30}
            loop={true}
            autoplay={{ delay: 5000 }}
            pagination={{
              clickable: true,
            }}
            navigation={true}
            modules={[Pagination, Navigation, Autoplay]}
            className="swiper-container-banner"
          >
            {databan &&
              databan.map((banner) => (
                <SwiperSlide key={banner._id}>
                  <div className="banners">
                    <img className="imgbanner" src={banner.image?.url} />
                  </div>
                </SwiperSlide>
              ))}
          </Swiper>
          <h2>{t("tecnology")}</h2>
          <div className="products">
            {data &&
              data?.map((product) => (
                <div key={product._id} className="product">
                  <h3>{product.name}</h3>
                  <Link to={`/product/${product._id}`}>
                    <img src={product.image?.url} alt={product.name} />
                  </Link>
                  <div className="details">
                    <span>{product.desc}</span>
                    <span className="price">S/.{product.price}</span>
                  </div>
                  <button onClick={() => handleAddToCart(product)}>
                  {t("addtocart")}
                  </button>
                </div>
              ))}
          </div>
        </>
      ) : status === "pending" ? (
        <p>{t("loading")}</p>
      ) : (
        <p>{t("unexpectederror")}</p>
      )}
      <div>
        <div className="div2">
          <h2 className="myh2">{t("mostselled")}</h2>

          <Swiper
            slidesPerView={1}
            spaceBetween={30}
            loop={true}
            pagination={{
              clickable: true,
            }}
            navigation={true}
            modules={[Pagination, Navigation]}
            className="swiperselled"
          >
            <SwiperSlide>
              <img src="https://i.imgur.com/A1CWYCV.jpg" className="imgselled" />
              <img src="https://i.imgur.com/DV7DMdU.jpg" className="imgselled"/>
              <img src="https://i.imgur.com/zjgU2ex.jpg" className="imgselled" />
              <img src="https://i.imgur.com/Yj9Y7iA.jpg" className="imgselled" />
              <img src="https://i.imgur.com/EzgNuEP.jpg" className="imgselled" />
            </SwiperSlide>
            <SwiperSlide>
              <img className="imgselled" src="https://i.imgur.com/is4Yoy7.jpg" />
              <img src="https://i.imgur.com/mrCqSkO.png" className="imgselled" />
            </SwiperSlide>
            {/* Adicione mais SwiperSlides conforme necessário */}
          </Swiper>
        </div>
        <div className="div3">
          <h2 className="myh3">{t("categories")}</h2>
          <div className="grid-container2">
            <div className="imgcategories"><img src="https://i.imgur.com/A1CWYCV.jpg"></img><h3>{t("monitors")}</h3></div>
            <div className="imgcategories"><img src="https://i.imgur.com/zjgU2ex.jpg"></img><h3>{t("peripherals")}</h3></div>
            <div className="imgcategories"><img src="https://i.imgur.com/EzgNuEP.jpg"></img><h3>{t("graphics")}</h3></div>
            <div className="imgcategories"><img src="https://i.imgur.com/1e1qJk8.jpg"></img><h3>{t("disks")}</h3></div>            
          </div>
        </div>
      </div>

      <div className="grid-container">
        <div
          className="grid-item"
          style={{
            display: "flex",
            justifyContent: "left",
            paddingTop: "20px",
          }}
        >
          <img className="icons" src={iconwsp}></img>
          <img className="icons" src={iconfb}></img>
          <img className="icons" src={iconig}></img>
        </div>
        <div
          className="grid-item"
          style={{
            display: "flex",
            justifyContent: "right",
            paddingTop: "20px",
          }}
        >
          <h3 className="myh4">{t("paymentmethods")}:</h3>
        </div>
        <div
          className="grid-item"
          style={{ display: "flex", paddingTop: "20px" }}
        >
          <span style={{ width: "70%", height: "70%" }}>
            <img
              className="colourgray"
              src={visa}
              style={{
                width: "100%",
                height: "100%",
                paddingTop: "10px",
                paddingBottom: "10px",
              }}
            ></img>
          </span>
          <span style={{ width: "70%", height: "70%" }}>
            <img
              className="colourgray"
              src={stripe}
              style={{ width: "100%", height: "100%" }}
            ></img>
          </span>
          <span style={{ width: "70%", height: "70%" }}>
            <img
              className="colourgray"
              src={paypal}
              style={{ width: "100%", height: "100%" }}
            ></img>
          </span>
        </div>
      </div>
    </div>
  );
};

export default Home;
