import React, { useEffect, useState } from "react";
import { Modal, Backdrop, IconButton, Container } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import { Swiper, SwiperSlide } from "swiper/react";
import { A11y, Navigation, Pagination, Scrollbar } from "swiper";

function ModalProduct({ isOpen, setIsOpen, img }) {
  const handleClose = () => {
    setIsOpen(false);
  };

  const [currentImage, setCurrentImage] = useState("");

  useEffect(() => {
    if (img[0]?.url) {
      setCurrentImage(img[0]?.url);
    }
  }, [img]);

  return (
    <Modal
      open={isOpen}
      onClose={handleClose}
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
      style={{ display: "flex", alignItems: "center", justifyContent: "center" }}
    >
      <div
        style={{
          backgroundColor: "white",
          width: "45%",
          padding: "16px",
          borderRadius: "4px",
          outline: "none",
          position: "relative",
          maxHeight: "90%",
          overflowY: "auto",
        }}
      >
        <IconButton
          aria-label="close"
          onClick={handleClose}
          style={{
            position: "absolute",
            top: "8px",
            right: "8px",
          }}
        >
          <CloseIcon />
        </IconButton>
        <div className="h-[100px] w-[100px] md:h-[400px] md:w-[400px] block mx-auto">
          <img
            src={currentImage}
            alt="Product"
            style={{ maxWidth: "100%", width: "100%", marginTop: "16px" }}
          />
        </div>
        <Swiper
          modules={[Navigation, Pagination, Scrollbar, A11y]}
          spaceBetween={10}
          slidesPerView={3}
          navigation
          pagination={{ clickable: true }}
          scrollbar={{ draggable: true }}
        >
          {img &&
            img.map((v, i) => (
              <SwiperSlide
                className="h-[100px] w-[100px]"
                key={i}
                style={{ cursor: "pointer" }}
              >
                <img
                  src={v?.url}
                  alt=""
                  onClick={() => setCurrentImage(v?.url)}
                  className="w-full h-full object-contain"
                />
              </SwiperSlide>
            ))}
        </Swiper>

        <div
          id="modal-description"
          style={{
            marginTop: "16px",
          }}
        >
          {/* Your modal content */}
        </div>
      </div>
    </Modal>
  );
}

export default ModalProduct;
