import React, { useState } from 'react';
import { useStore } from '../../context/StoreContext';
import { Mail, Phone, MapPin, Send, Clock, Sparkles } from 'lucide-react';

export const ContactPage: React.FC = () => {
  const { showToast } = useStore();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('Bespoke Tailoring Appointment');
  const [message, setMessage] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    showToast('Your concierge inquiry has been transmitted. Expect a reply within 2 hours.', 'success');
    setName('');
    setEmail('');
    setMessage('');
  };

  return (
    <div className="min-h-screen py-12 px-4 sm:px-8 max-w-7xl mx-auto space-y-12">
      <div className="text-center max-w-2xl mx-auto">
        <span className="text-xs font-bold uppercase tracking-[0.25em] text-[#d4af37]">
          Private Concierge
        </span>
        <h1 className="text-3xl sm:text-5xl font-serif-luxury font-bold text-white mt-1">
          Speak With Our Atelier
        </h1>
        <p className="text-xs sm:text-sm text-neutral-400 mt-2 font-light">
          Whether you require bespoke made-to-measure fittings, wedding party styling, or order guidance, our senior consultants are at your command.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Contact Information (5 cols) */}
        <div className="lg:col-span-5 bg-[#121215] border border-neutral-800 rounded-3xl p-6 sm:p-8 space-y-6 shadow-xl">
          <h3 className="text-lg font-bold font-display-luxury text-white">
            Concierge Desk
          </h3>

          <div className="space-y-4 text-xs text-neutral-300">
            <div className="flex items-start gap-3">
              <Phone className="w-4 h-4 text-[#d4af37] shrink-0 mt-0.5" />
              <div>
                <div className="font-bold text-white">Toll-Free Client Line</div>
                <div className="text-neutral-400 mt-0.5">+91 (022) 8400-GENT / +91 98200 45112</div>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Mail className="w-4 h-4 text-[#d4af37] shrink-0 mt-0.5" />
              <div>
                <div className="font-bold text-white">Direct Correspondence</div>
                <div className="text-neutral-400 mt-0.5">concierge@urbangent.com</div>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Clock className="w-4 h-4 text-[#d4af37] shrink-0 mt-0.5" />
              <div>
                <div className="font-bold text-white">Private Fitting Hours</div>
                <div className="text-neutral-400 mt-0.5">Monday – Saturday: 10:00 AM – 09:00 PM IST</div>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <MapPin className="w-4 h-4 text-[#d4af37] shrink-0 mt-0.5" />
              <div>
                <div className="font-bold text-white">Central Flagship Atelier</div>
                <div className="text-neutral-400 mt-0.5">The Heritage Arcade, Kala Ghoda, Fort, Mumbai 400001</div>
              </div>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-neutral-900 border border-[#d4af37]/20">
            <div className="flex items-center gap-2 text-xs font-bold text-white">
              <Sparkles className="w-4 h-4 text-[#d4af37]" />
              <span>Complimentary Doorstep Stylist</span>
            </div>
            <p className="text-[11px] text-neutral-400 mt-1">
              Available in Mumbai, Delhi NCR, Bengaluru, and Chennai for private orders exceeding ₹25,000.
            </p>
          </div>
        </div>

        {/* Contact Form (7 cols) */}
        <div className="lg:col-span-7 bg-[#121215] border border-neutral-800 rounded-3xl p-6 sm:p-8 shadow-xl">
          <h3 className="text-lg font-bold font-display-luxury text-white mb-6">
            Schedule an Inquiry or Fitting
          </h3>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-neutral-400 mb-1 uppercase tracking-wider">
                  Full Name *
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={e => setName(e.target.value)}
                  placeholder="e.g. Vikramaditya Roy"
                  className="w-full px-4 py-2.5 bg-neutral-900 border border-neutral-800 rounded-xl text-xs text-white focus:outline-none focus:border-[#d4af37]"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-neutral-400 mb-1 uppercase tracking-wider">
                  Email Address *
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="roy.vikram@urbangent.com"
                  className="w-full px-4 py-2.5 bg-neutral-900 border border-neutral-800 rounded-xl text-xs text-white focus:outline-none focus:border-[#d4af37]"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-neutral-400 mb-1 uppercase tracking-wider">
                Service Inquiry
              </label>
              <select
                value={subject}
                onChange={e => setSubject(e.target.value)}
                className="w-full px-4 py-2.5 bg-neutral-900 border border-neutral-800 rounded-xl text-xs text-white focus:outline-none focus:border-[#d4af37]"
              >
                <option value="Bespoke Tailoring Appointment">Bespoke Tailoring Appointment</option>
                <option value="Wedding / Black-Tie Troussier Styling">Wedding / Black-Tie Troussier Styling</option>
                <option value="Custom Size Fitting Guidance">Custom Size Fitting Guidance</option>
                <option value="Corporate / Private Club Gifting">Corporate / Private Club Gifting</option>
                <option value="Order Tracking & Logistics Consultation">Order Tracking &amp; Logistics Consultation</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-medium text-neutral-400 mb-1 uppercase tracking-wider">
                Particulars or Measurements
              </label>
              <textarea
                value={message}
                onChange={e => setMessage(e.target.value)}
                rows={4}
                placeholder="Describe your ideal garment cut, event date, or preferred fitting location..."
                className="w-full px-4 py-2.5 bg-neutral-900 border border-neutral-800 rounded-xl text-xs text-white focus:outline-none focus:border-[#d4af37]"
                required
              />
            </div>

            <button
              type="submit"
              className="px-8 py-3.5 bg-[#d4af37] hover:bg-[#c5a030] text-black font-extrabold text-xs uppercase tracking-wider rounded-xl transition-all shadow-lg shadow-[#d4af37]/20 flex items-center gap-2 cursor-pointer"
            >
              <Send className="w-4 h-4" />
              <span>Dispatch Request to Stylist</span>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
