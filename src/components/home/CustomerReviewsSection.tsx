import React from 'react';
import { Star, Quote, CheckCircle2 } from 'lucide-react';

export const CustomerReviewsSection: React.FC = () => {
  const testimonials = [
    {
      name: 'Aditya Vikram Singhania',
      role: 'Managing Partner, Singhania Capital',
      location: 'Mumbai & London',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
      rating: 5,
      headline: 'The Mayfair Double-Breasted is Sartorial Perfection',
      quote: 'I wear bespoke from London and Milan, but URBAN GENT rivalled both in shoulder precision and hand-sewn buttonholes. Wore it to a venture summit; the presence is unmatched.'
    },
    {
      name: 'Marcus Vance',
      role: 'Creative Director',
      location: 'Dubai & Bengaluru',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80',
      rating: 5,
      headline: 'Best Selvedge Denim in the Subcontinent',
      quote: '14.5oz Okayama raw denim with immaculate redline selvedge cuffs. The honeycomb fades began emerging in week 3. Truly an heirloom garment.'
    },
    {
      name: 'Karthik Subramanian',
      role: 'Architect & Founder',
      location: 'Chennai',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=200&q=80',
      rating: 5,
      headline: 'Crisp Egyptian Cotton that Holds All Day',
      quote: 'From morning client meetings to black-tie dinners, the collar and placket remain razor sharp. Exceptional white-glove doorstep delivery as well.'
    }
  ];

  return (
    <section className="py-24 px-4 sm:px-8 max-w-7xl mx-auto">
      <div className="text-center max-w-2xl mx-auto mb-16">
        <span className="text-xs font-bold uppercase tracking-[0.25em] text-[#d4af37]">
          Verified Testimonials
        </span>
        <h2 className="text-3xl sm:text-4xl font-serif-luxury font-bold text-white mt-1">
          Words From Distinguished Patrons
        </h2>
        <p className="text-xs sm:text-sm text-neutral-400 mt-2">
          Real reviews from gentlemen who appreciate precision tailoring, pure fabrics, and bespoke elegance.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {testimonials.map((t, idx) => (
          <div
            key={idx}
            className="flex flex-col justify-between p-7 rounded-3xl bg-[#121215] border border-neutral-800 hover:border-[#d4af37]/40 transition-all duration-300 shadow-xl relative group"
          >
            <div>
              {/* Star Rating */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex gap-1">
                  {[...Array(t.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <Quote className="w-6 h-6 text-neutral-700 group-hover:text-[#d4af37]/60 transition-colors" />
              </div>

              <h4 className="text-sm font-bold text-white mb-2 leading-snug">
                &ldquo;{t.headline}&rdquo;
              </h4>
              <p className="text-xs text-neutral-400 leading-relaxed font-light">
                {t.quote}
              </p>
            </div>

            {/* Author */}
            <div className="mt-6 pt-5 border-t border-neutral-800/80 flex items-center gap-3">
              <img
                src={t.avatar}
                alt={t.name}
                className="w-10 h-10 rounded-full object-cover border border-[#d4af37]/30"
              />
              <div>
                <div className="text-xs font-bold text-white flex items-center gap-1.5">
                  <span>{t.name}</span>
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#d4af37]" />
                </div>
                <div className="text-[10px] text-neutral-400">
                  {t.role} &bull; {t.location}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
