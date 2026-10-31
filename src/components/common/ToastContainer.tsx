import React from 'react';
import { useStore } from '../../context/StoreContext';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';

export const ToastContainer: React.FC = () => {
  const { toasts, removeToast } = useStore();

  if (toasts.length === 0) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-2 max-w-md pointer-events-none">
      {toasts.map(toast => (
        <div
          key={toast.id}
          className={`pointer-events-auto flex items-center justify-between gap-3 px-4 py-3 rounded-lg shadow-2xl border text-sm backdrop-blur-md transition-all duration-300 animate-slide-in ${
            toast.type === 'success'
              ? 'bg-[#18181b]/95 border-[#d4af37]/40 text-[#f4f4f5]'
              : toast.type === 'error'
              ? 'bg-[#271010]/95 border-red-500/40 text-red-200'
              : toast.type === 'warning'
              ? 'bg-[#291c0b]/95 border-amber-500/40 text-amber-200'
              : 'bg-[#141416]/95 border-neutral-700 text-neutral-200'
          }`}
        >
          <div className="flex items-center gap-2.5">
            {toast.type === 'success' && <CheckCircle2 className="w-4 h-4 text-[#d4af37] shrink-0" />}
            {toast.type === 'error' && <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />}
            {toast.type === 'info' && <Info className="w-4 h-4 text-sky-400 shrink-0" />}
            {toast.type === 'warning' && <AlertCircle className="w-4 h-4 text-amber-400 shrink-0" />}
            <span className="font-medium tracking-wide">{toast.message}</span>
          </div>
          <button
            onClick={() => removeToast(toast.id)}
            className="text-neutral-400 hover:text-white transition-colors p-1"
            aria-label="Close notification"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      ))}
    </div>
  );
};
