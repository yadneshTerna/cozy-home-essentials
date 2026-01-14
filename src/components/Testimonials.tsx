import { Star } from "lucide-react";

const testimonials = [
  {
    name: "Sarah Mitchell",
    location: "New York",
    rating: 5,
    text: "The bedsheets are incredibly soft and have held up beautifully after multiple washes. Best purchase I've made for my bedroom!",
  },
  {
    name: "James Chen",
    location: "Los Angeles",
    rating: 5,
    text: "Finally found sofa covers that actually fit well and look elegant. The quality exceeded my expectations.",
  },
  {
    name: "Emily Roberts",
    location: "Chicago",
    rating: 5,
    text: "Love the pillow covers! The neutral tones match perfectly with my décor. Already ordered more for the guest room.",
  },
];

const Testimonials = () => {
  return (
    <section className="py-20 bg-warm-beige">
      <div className="container">
        <div className="text-center mb-14">
          <h2 className="text-3xl md:text-4xl font-display font-semibold text-foreground mb-4">
            What Our Customers Say
          </h2>
          <div className="flex items-center justify-center gap-1 mb-2">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-5 h-5 fill-sage text-sage" />
            ))}
          </div>
          <p className="text-muted-foreground">
            Trusted by over 10,000 happy customers
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.name}
              className="bg-card p-8 rounded-2xl shadow-soft"
            >
              <div className="flex gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-sage text-sage" />
                ))}
              </div>
              <p className="text-foreground mb-6 leading-relaxed">
                "{testimonial.text}"
              </p>
              <div>
                <p className="font-semibold text-foreground">{testimonial.name}</p>
                <p className="text-sm text-muted-foreground">{testimonial.location}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
