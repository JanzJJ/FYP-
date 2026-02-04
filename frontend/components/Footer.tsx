
import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="mt-20 border-t border-slate-200 dark:border-slate-800 bg-surface-light dark:bg-surface-dark py-12">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-12">
        <div className="col-span-1">
          <div className="flex items-center gap-2 mb-6">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center text-white">
              <span className="material-symbols-outlined text-sm">pets</span>
            </div>
            <span className="text-xl font-display font-bold text-primary">StayCare</span>
          </div>
          <p className="text-sm text-slate-500 leading-relaxed">
            Dedicated to the well-being of stray animals through technology and community action.
          </p>
        </div>
        
        <div>
          <h4 className="font-bold mb-6">Quick Links</h4>
          <ul className="space-y-4 text-sm text-slate-500">
            <li><a className="hover:text-primary transition-colors" href="#">Emergency Report</a></li>
            <li><a className="hover:text-primary transition-colors" href="#">Adoption Process</a></li>
            <li><a className="hover:text-primary transition-colors" href="#">AI Diagnostics</a></li>
            <li><a className="hover:text-primary transition-colors" href="#">Success Stories</a></li>
          </ul>
        </div>

        <div>
          <h4 className="font-bold mb-6">Resources</h4>
          <ul className="space-y-4 text-sm text-slate-500">
            <li><a className="hover:text-primary transition-colors" href="#">Vet Directory</a></li>
            <li><a className="hover:text-primary transition-colors" href="#">Disease Encyclopedia</a></li>
            <li><a className="hover:text-primary transition-colors" href="#">Volunteer Guide</a></li>
            <li><a className="hover:text-primary transition-colors" href="#">FAQ</a></li>
          </ul>
        </div>

        <div>
          <h4 className="font-bold mb-6">Newsletter</h4>
          <p className="text-sm text-slate-500 mb-4">Stay updated with latest rescues and health alerts.</p>
          <div className="flex">
            <input 
              className="w-full rounded-l-lg border-slate-200 dark:border-slate-700 bg-transparent text-sm focus:ring-primary focus:border-primary px-4" 
              placeholder="Email address" 
              type="email"
            />
            <button className="bg-primary text-white px-4 rounded-r-lg hover:bg-opacity-90 transition-colors flex items-center">
              <span className="material-symbols-outlined">send</span>
            </button>
          </div>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-6 pt-12 mt-12 border-t border-slate-200 dark:border-slate-800 text-center text-slate-400 text-xs">
        <p>© 2026 StayCare. All rights reserved. Technology for animal welfare.</p>
      </div>
    </footer>
  );
};

export default Footer;
