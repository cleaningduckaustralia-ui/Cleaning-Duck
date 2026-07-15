import { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, A11y } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import api from '../../services/api';
import { generateReviewSchema } from '../../utils/seoData';
import { Helmet } from 'react-helmet-async';

const StarRating = ({ rating }) => (
  <div className="stars" aria-label={`${rating} out of 5 stars`}>
    {[...Array(5)].map((_, i) => (
      <span key={i} className={i < rating ? 'star text-yellow-400' : 'star text-neutral-200'}>★</span>
    ))}
  </div>
);

const TestimonialCard = ({ testimonial }) => (
  <div className="testimonial-card h-full flex flex-col">
    <div className="flex items-start justify-between mb-3">
      <div className="flex items-center gap-3">
        {/* Avatar */}
        <div className="w-11 h-11 rounded-full bg-primary text-white flex items-center justify-center font-bold text-sm flex-shrink-0">
          {testimonial.name.charAt(0).toUpperCase()}
        </div>
        <div>
          <div className="font-semibold text-neutral-800 text-sm">{testimonial.name}</div>
          {testimonial.location && (
            <div className="text-neutral-400 text-xs">{testimonial.location}</div>
          )}
        </div>
      </div>
      {/* Google Icon */}
      <svg className="w-5 h-5 flex-shrink-0 mt-1" viewBox="0 0 24 24" fill="none">
        <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
        <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
        <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
        <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
      </svg>
    </div>

    <StarRating rating={testimonial.rating} />

    <blockquote className="mt-3 text-neutral-600 text-sm leading-relaxed flex-1 line-clamp-5">
      "{testimonial.review}"
    </blockquote>

    {testimonial.service && (
      <div className="mt-4 pt-4 border-t border-neutral-100">
        <span className="badge-primary text-xs">{testimonial.service}</span>
      </div>
    )}
  </div>
);

// Fallback testimonials (extracted data) — shown while API loads
const fallbackTestimonials = [
  { _id: '1', name: 'Robert Roberto', rating: 5, review: 'Used Cleaning Duck Australia for carpet cleaning in Brisbane after moving out of a rental. The carpets were heavily soiled, but they managed to bring them back to life. Very professional service and easy to deal with.', service: 'Carpet Cleaning', location: 'Brisbane' },
  { _id: '2', name: 'Nischal Karki', rating: 5, review: "Booked Cleaning Duck Australia for a full clean including carpets, couch, plus rug and curtain hand cleaning. The results were amazing, everything looks fresh, and the service was very professional. I wouldn't hesitate to recommend them.", service: 'Full Clean', location: 'Brisbane' },
  { _id: '3', name: 'Ada', rating: 5, review: "Booked carpet cleaning in Brisbane for my home in Annerley and I'm very satisfied with the results. The team was on time, worked efficiently, and removed old stains I couldn't get rid of myself. Great service overall.", service: 'Carpet Cleaning', location: 'Annerley, Brisbane' },
  { _id: '4', name: 'Tommy', rating: 5, review: 'I used Cleaning Duck Australia for upholstery cleaning in Coorparoo, and the difference is huge. My couch looks clean, feels soft, and no harsh smell at all. The whole experience was smooth and hassle-free.', service: 'Upholstery Cleaning', location: 'Coorparoo' },
  { _id: '5', name: 'Pedrii', rating: 5, review: 'Very impressed with their mattress cleaning service. They removed dust and allergens thoroughly, and the mattress smells fresh again. Professional and friendly staff — great service in the Logan Central area.', service: 'Mattress Cleaning', location: 'Logan Central' },
];

const TestimonialsSlider = () => {
  const [testimonials, setTestimonials] = useState(fallbackTestimonials);
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });

  useEffect(() => {
    api.get('/testimonials').then(({ data }) => {
      if (data.data?.length) setTestimonials(data.data);
    }).catch(() => {});
  }, []);

  const reviewSchema = generateReviewSchema(testimonials);

  return (
    <section className="section bg-white" aria-label="Customer testimonials" id="testimonials" ref={ref}>
      <Helmet>
        <script type="application/ld+json">{JSON.stringify(reviewSchema)}</script>
      </Helmet>

      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <span className="section-label">Customer Reviews</span>
          <h2 className="section-title mt-2">Trusted by 500+ Happy Clients</h2>
          <p className="section-subtitle mx-auto mt-4">
            Don't just take our word for it — here's what our clients across Brisbane and South East QLD say.
          </p>
          {/* Google rating badge */}
          <div className="flex items-center justify-center gap-3 mt-5">
            <div className="flex items-center gap-1.5 px-4 py-2 bg-neutral-50 rounded-full border border-neutral-200">
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
              </svg>
              <span className="text-sm font-semibold text-neutral-700">5.0</span>
              <div className="stars text-sm">{'★'.repeat(5)}</div>
              <span className="text-neutral-500 text-sm">18 reviews</span>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <Swiper
            modules={[Autoplay, Pagination, A11y]}
            spaceBetween={24}
            slidesPerView={1}
            breakpoints={{
              640:  { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
            }}
            autoplay={{ delay: 5000, disableOnInteraction: false, pauseOnMouseEnter: true }}
            pagination={{ clickable: true }}
            a11y={{ prevSlideMessage: 'Previous testimonial', nextSlideMessage: 'Next testimonial' }}
            className="pb-12"
          >
            {testimonials.map((t) => (
              <SwiperSlide key={t._id}>
                <TestimonialCard testimonial={t} />
              </SwiperSlide>
            ))}
          </Swiper>
        </motion.div>

        {/* Leave a review CTA */}
        <div className="text-center mt-4">
          <a
            href="https://admin.trustindex.io/api/googleWriteReview?place-id=ChIJIyityxQbHwQR55-2nOHlIwE"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm text-neutral-500 hover:text-primary transition-colors"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
            </svg>
            Leave us a Google Review
          </a>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSlider;
