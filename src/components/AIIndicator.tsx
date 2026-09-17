import { Brain, Check } from 'lucide-react';

export function AIAnalyzing({ text = 'AI is analyzing live canteen data...' }: { text?: string }) {
  return (
    <div className="flex items-center gap-3 rounded-xl bg-cyan-50 border border-cyan-200 px-4 py-3">
      <div className="ai-orbit flex-shrink-0">
        <div className="absolute inset-0 flex items-center justify-center">
          <Brain className="w-5 h-5 text-cyan-600" />
        </div>
      </div>
      <div className="flex-1">
        <p className="text-sm font-medium text-cyan-800">{text}</p>
        <div className="mt-1.5 h-1 w-full rounded-full bg-cyan-100 overflow-hidden">
          <div className="ai-shimmer h-full w-1/3 rounded-full" />
        </div>
      </div>
    </div>
  );
}

export function AIPredictionDone({ text = 'Prediction Generated' }: { text?: string }) {
  return (
    <div className="flex items-center gap-2 rounded-lg bg-green-50 border border-green-200 px-3 py-2 animate-fade-in">
      <div className="flex items-center justify-center w-5 h-5 rounded-full bg-green-500">
        <Check className="w-3 h-3 text-white" strokeWidth={4} />
      </div>
      <span className="text-sm font-semibold text-green-700">{text} ✓</span>
    </div>
  );
}
