import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer role="contentinfo" className="border-t border-[#1B2A4A] bg-[#0B192C] py-14 px-6 text-[#F5F0E8]/70">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6 text-sm">
        <div className="text-center md:text-left">
          <p className="heritage-credit font-serif text-base text-[#FDFBF7]">
            &copy; 2026 Chef Tariq Al-Amad. Authentic Jordanian Terroir Dining.
          </p>
          <p className="service-cadence text-xs tracking-wider text-[#C5A880] mt-1 font-mono">
            Open Strictly Every Friday | Amman &amp; Ajloun Foothills
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center gap-6 text-xs tracking-wide">
          <div className="flex items-center space-x-2 text-[#3E4D34] font-medium">
            <span className="w-2 h-2 rounded-full bg-[#3E4D34]" />
            <span className="text-[#A3B899]">100% Organic &amp; Certified Local Terroir</span>
          </div>
          <div className="footer-links space-x-6 text-[#F5F0E8]/80">
            <a href="#policies" className="hover:text-[#C5A880] hover:underline transition-colors">
              Dining Guidelines
            </a>
            <a href="#concierge" className="hover:text-[#C5A880] hover:underline transition-colors">
              Private Concierge
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
