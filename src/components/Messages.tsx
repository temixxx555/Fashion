import React from 'react';

const testimonials = [
  {
    rating: 5,
    text: "You always have to leave it to Garm Island for their sick designs and amazing quality. Kudos to the team.",
    username: "@Tennyshotit",
    location: "Abuja, Nigeria",
  },
  {
    rating: 5,
    text: "Garm Island has the hardest retro jerseys collection ever!!!",
    username: "@theblvckmoose",
    location: "Oyo, Nigeria",
  },
  {
    rating: 5,
    text: "Patronized all the way from the US. Swift delivery, quality clothes, awesome service. Garm you will always be great!",
    username: "@day_zera",
    location: "New York, United States",
  },
];

const TestimonialSlider: React.FC = () => {
  return (
    <div className="w-full max-w-3xl mx-auto py-12 px-4 text-center">
      <h2 className="text-3xl font-bold mb-6">Don't Take Our Word</h2>
      <div className="flex space-x-4 overflow-x-auto scrollbar-hide">
        {testimonials.map((testimonial, index) => (
          <div
            key={index}
            className="min-w-[300px] bg-white shadow-md rounded-lg p-6 flex flex-col items-center"
          >
            <div className="flex items-center mb-4">
              {[...Array(testimonial.rating)].map((_, i) => (
                <svg
                  key={i}
                  className="w-5 h-5 text-yellow-500"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                </svg>
              ))}
            </div>
            <p className="text-gray-700 mb-4">"{testimonial.text}"</p>
            <div className="font-semibold text-gray-900">{testimonial.username}</div>
            <div className="text-sm text-gray-500">{testimonial.location}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TestimonialSlider;
