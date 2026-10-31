import React, { useState } from 'react';
import { useStore } from '../../context/StoreContext';
import { X, Ruler, CheckCircle } from 'lucide-react';

export const SizeGuideModal: React.FC = () => {
  const { isSizeGuideOpen, setIsSizeGuideOpen } = useStore();
  const [unit, setUnit] = useState<'inches' | 'cm'>('inches');

  if (!isSizeGuideOpen) return null;

  const measurements = [
    { size: 'S (38)', chestIn: '38 - 39', chestCm: '96 - 99', waistIn: '30 - 32', waistCm: '76 - 81', shoulderIn: '17.5', shoulderCm: '44.5', lengthIn: '28.5', lengthCm: '72.5' },
    { size: 'M (40)', chestIn: '40 - 41', chestCm: '101 - 104', waistIn: '32 - 34', waistCm: '81 - 86', shoulderIn: '18.2', shoulderCm: '46.2', lengthIn: '29.5', lengthCm: '75' },
    { size: 'L (42)', chestIn: '42 - 43', chestCm: '106 - 109', waistIn: '34 - 36', waistCm: '86 - 91', shoulderIn: '19.0', shoulderCm: '48.2', lengthIn: '30.5', lengthCm: '77.5' },
    { size: 'XL (44)', chestIn: '44 - 46', chestCm: '112 - 117', waistIn: '36 - 38', waistCm: '91 - 96', shoulderIn: '19.8', shoulderCm: '50.3', lengthIn: '31.5', lengthCm: '80' },
    { size: 'XXL (46)', chestIn: '47 - 49', chestCm: '119 - 124', waistIn: '39 - 41', waistCm: '99 - 104', shoulderIn: '20.5', shoulderCm: '52', lengthIn: '32.5', lengthCm: '82.5' }
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in">
      <div className="relative w-full max-w-2xl bg-[#141417] border border-neutral-800 rounded-2xl shadow-2xl overflow-hidden p-6 sm:p-8">
        <div className="flex items-center justify-between pb-5 border-b border-neutral-800">
          <div className="flex items-center gap-2.5">
            <Ruler className="w-5 h-5 text-[#d4af37]" />
            <h3 className="text-xl font-bold font-display-luxury text-white">Gentleman's Sizing Matrix</h3>
          </div>
          <button
            onClick={() => setIsSizeGuideOpen(false)}
            className="p-1 rounded-full text-neutral-400 hover:text-white hover:bg-neutral-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="flex items-center justify-between mt-5 mb-4">
          <p className="text-xs text-neutral-400">
            All garments are engineered to European tailoring benchmarks. True to size.
          </p>
          <div className="flex bg-neutral-900 border border-neutral-800 rounded-lg p-0.5 text-xs font-semibold">
            <button
              onClick={() => setUnit('inches')}
              className={`px-3 py-1 rounded-md transition-colors ${unit === 'inches' ? 'bg-[#d4af37] text-black font-bold' : 'text-neutral-400 hover:text-white'}`}
            >
              Inches (&quot;)
            </button>
            <button
              onClick={() => setUnit('cm')}
              className={`px-3 py-1 rounded-md transition-colors ${unit === 'cm' ? 'bg-[#d4af37] text-black font-bold' : 'text-neutral-400 hover:text-white'}`}
            >
              Centimeters (cm)
            </button>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto rounded-xl border border-neutral-800">
          <table className="w-full text-left text-xs">
            <thead className="bg-neutral-900/90 text-neutral-400 uppercase tracking-wider font-semibold border-b border-neutral-800">
              <tr>
                <th className="py-3 px-4">Size</th>
                <th className="py-3 px-4">Chest</th>
                <th className="py-3 px-4">Waist</th>
                <th className="py-3 px-4">Shoulder</th>
                <th className="py-3 px-4">Length</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-800/60 text-neutral-200">
              {measurements.map(m => (
                <tr key={m.size} className="hover:bg-neutral-900/50 transition-colors">
                  <td className="py-3 px-4 font-bold text-white text-sm">{m.size}</td>
                  <td className="py-3 px-4">{unit === 'inches' ? `${m.chestIn}"` : `${m.chestCm} cm`}</td>
                  <td className="py-3 px-4">{unit === 'inches' ? `${m.waistIn}"` : `${m.waistCm} cm`}</td>
                  <td className="py-3 px-4">{unit === 'inches' ? `${m.shoulderIn}"` : `${m.shoulderCm} cm`}</td>
                  <td className="py-3 px-4">{unit === 'inches' ? `${m.lengthIn}"` : `${m.lengthCm} cm`}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Tailor Tip */}
        <div className="mt-5 p-3.5 rounded-xl bg-neutral-900/60 border border-[#d4af37]/20 flex items-start gap-3">
          <CheckCircle className="w-4 h-4 text-[#d4af37] shrink-0 mt-0.5" />
          <div className="text-xs text-neutral-300 leading-relaxed">
            <span className="font-semibold text-white">Atelier Fit Guarantee:</span> If your fit is not impeccable, our complimentary bespoke exchange service collects your garment within 48 hours and adjusts it at zero additional surcharge.
          </div>
        </div>
      </div>
    </div>
  );
};
