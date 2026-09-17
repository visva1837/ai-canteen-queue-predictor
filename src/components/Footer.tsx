import { BrainCircuit, Github, Mail, MapPin } from 'lucide-react';

export function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 mb-3">
              <div className="flex items-center justify-center w-9 h-9 rounded-xl bg-gradient-to-br from-blue-600 to-cyan-500">
                <BrainCircuit className="w-5 h-5 text-white" />
              </div>
              <span className="font-display text-lg font-bold text-slate-800">
                AI Canteen
              </span>
            </div>
            <p className="text-sm text-slate-500 max-w-sm leading-relaxed">
              AI-powered crowd prediction platform that helps students avoid long
              canteen queues, preorder food, and save valuable lunch-break time.
            </p>
          </div>

          <div>
            <h4 className="font-semibold text-slate-700 mb-3 text-sm">Features</h4>
            <ul className="space-y-2 text-sm text-slate-500">
              <li>Live Crowd Monitoring</li>
              <li>AI Crowd Prediction</li>
              <li>Food Preordering</li>
              <li>Order Tracking</li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-slate-700 mb-3 text-sm">Contact</h4>
            <ul className="space-y-2 text-sm text-slate-500">
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4" /> admin@campus.edu
              </li>
              <li className="flex items-center gap-2">
                <MapPin className="w-4 h-4" /> Campus Innovation Lab
              </li>
              <li className="flex items-center gap-2">
                <Github className="w-4 h-4" /> Project Exhibition 2026
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-slate-400">
            © 2026 AI Canteen Queue Predictor. Built for college innovation exhibition.
          </p>
          <p className="text-xs text-slate-400">
            Powered by AI prediction models · Mock data prototype
          </p>
        </div>
      </div>
    </footer>
  );
}
