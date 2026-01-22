"use client";

import { useState, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { REVIEWS_SECTION, REVIEWS, type Review } from "@/constants/reviews";

import "swiper/css";

export function ReviewSlider() {
  const [activeReview, setActiveReview] = useState<Review>(REVIEWS[0]);
  const swiperRef = useRef<SwiperType | null>(null);

  const handleSlideChange = (swiper: SwiperType) => {
    const realIndex = swiper.realIndex;
    setActiveReview(REVIEWS[realIndex]);
  };

  return (
    <section className="section-padding bg-primary relative overflow-hidden">
      {/* 배경 장식 */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-64 h-64 bg-accent/5 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-accent/5 rounded-full blur-3xl" />
      </div>

      <div className="container-custom relative z-10">
        {/* 타이틀 */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            {REVIEWS_SECTION.title}
            <span className="text-lg md:text-xl font-medium text-white/60 ml-6">
              :: {REVIEWS_SECTION.subtitle}
            </span>
          </h2>
        </motion.div>

        {/* 슬라이더 영역 */}
        <div className="relative">
          <Swiper
            modules={[Autoplay]}
            onSwiper={(swiper) => {
              swiperRef.current = swiper;
            }}
            onSlideChange={handleSlideChange}
            slidesPerView={1.5}
            centeredSlides={true}
            spaceBetween={20}
            loop={true}
            speed={900}
            autoplay={{
              delay: 3000,
              disableOnInteraction: false,
            }}
            grabCursor={true}
            breakpoints={{
              640: {
                slidesPerView: 2.5,
                spaceBetween: 25,
              },
              1024: {
                slidesPerView: 4,
                spaceBetween: 35,
              },
              1280: {
                slidesPerView: 5,
                spaceBetween: 35,
              },
            }}
            className="review-swiper !overflow-visible py-4"
          >
            {REVIEWS.map((review) => (
              <SwiperSlide key={review.id}>
                {({ isActive }) => (
                  <motion.div
                    className={`relative aspect-[3/4] rounded-2xl overflow-hidden transition-all duration-500 ${
                      isActive
                        ? "scale-105 shadow-2xl shadow-accent/20"
                        : "scale-95 opacity-60"
                    }`}
                  >
                    <Image
                      src={review.image}
                      alt={review.title}
                      fill
                      className="object-cover"
                    />
                    {/* 그라데이션 오버레이 */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

                    {/* 활성 슬라이드 골드 테두리 */}
                    {isActive && (
                      <div className="absolute inset-0 border-2 border-accent rounded-2xl" />
                    )}
                  </motion.div>
                )}
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        {/* 활성 슬라이드 정보 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-12 text-center"
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={activeReview.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
            >
              <h3 className="text-2xl md:text-3xl font-bold text-white mb-2">
                {activeReview.title}
              </h3>
              <p className="text-accent text-lg mb-6">{activeReview.description}</p>

              {activeReview.link && (
                <a
                  href={activeReview.link}
                  className="inline-flex items-center gap-2 text-white/80 hover:text-accent transition-colors group"
                >
                  <span>Detail view</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </a>
              )}
            </motion.div>
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
