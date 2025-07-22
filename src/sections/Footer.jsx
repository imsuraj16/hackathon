import React, { useState } from 'react';
import { ArrowRight } from 'lucide-react';

export default function SleepyOwlFooter() {
  const [email, setEmail] = useState('');

  return (
    <footer className="bg-white text-black px-6 py-12">
      <div className="max-w-7xl mx-auto">
        {/* Large faded heading */}
        <div className="text-center mb-16">
         <h2 className="text-7xl md:text-[12rem] font-bold tracking-wider leading-none bg-gradient-to-r from-amber-600 via-orange-500 to-amber-800 bg-clip-text text-transparent">
            SLEEPY OWL
          </h2>
        </div>

        {/* Four column layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* SHOP Column */}
          <div>
            <h3 className="font-semibold text-sm mb-4 tracking-wider">SHOP</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:underline">COLD BREW</a></li>
              <li><a href="#" className="hover:underline">COFFEE PODS</a></li>
              <li><a href="#" className="hover:underline">INSTANT COFFEE</a></li>
              <li><a href="#" className="hover:underline">ICED COFFEE</a></li>
              <li><a href="#" className="hover:underline">MERCHANDISE</a></li>
            </ul>
          </div>

          {/* SLEEPY OWL HOUSE Column */}
          <div>
            <h3 className="font-semibold text-sm mb-4 tracking-wider">SLEEPY OWL</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:underline">OUR STORY</a></li>
              <li><a href="#" className="hover:underline">BREWING GUIDE</a></li>
              <li><a href="#" className="hover:underline">BLOG</a></li>
              <li><a href="#" className="hover:underline">CAREERS</a></li>
              <li><a href="#" className="hover:underline">PRESS</a></li>
            </ul>
          </div>

          {/* CONTACT Column */}
          <div>
            <h3 className="font-semibold text-sm mb-4 tracking-wider">CONTACT</h3>
            <div className="text-sm space-y-3">
              <p className="leading-relaxed">
                SLEEPY OWL COFFEE CO.,<br />
                NEW DELHI, INDIA<br />
                110001
              </p>
              <p className="tracking-wide">EMAIL: HELLO@SLEEPYOWLCOFFEE.COM</p>
              <div className="flex space-x-6 pt-2">
                <a href="#" className="font-bold hover:underline tracking-wide">INSTAGRAM</a>
                <a href="#" className="font-bold hover:underline tracking-wide">FACEBOOK</a>
              </div>
            </div>
          </div>

          {/* Newsletter Column */}
          <div>
            <h3 className="font-semibold text-sm mb-4 tracking-wider">STAY CAFFEINATED</h3>
            <div className="space-y-3">
              <div className="relative">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-none text-sm focus:outline-none focus:border-gray-500"
                />
                <button className="absolute right-2 top-1/2 transform -translate-y-1/2 w-8 h-8 bg-gray-400 rounded-full flex items-center justify-center hover:bg-gray-500 transition-colors">
                  <ArrowRight className="w-4 h-4 text-white" />
                </button>
              </div>
              <p className="text-xs text-gray-700 leading-relaxed">
                Subscribe to get updates on new products, brewing tips, and exclusive offers. We promise not to spam your inbox - only the good stuff! Check our <a href="#" className="underline hover:no-underline">privacy policy</a> for more details.
              </p>
            </div>
          </div>
        </div>

        {/* Separator line */}
        <div className="border-t border-gray-300 mb-6"></div>

        {/* Bottom bar */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center space-y-4 md:space-y-0">
          <div className="flex flex-wrap gap-4 text-xs">
            <a href="#" className="hover:underline">CONTACT US</a>
            <a href="#" className="hover:underline">SHIPPING INFO</a>
            <a href="#" className="hover:underline">RETURNS</a>
            <a href="#" className="hover:underline">TERMS & CONDITIONS</a>
            <a href="#" className="hover:underline">PRIVACY POLICY</a>
          </div>
          <div className="text-xs text-gray-600">
            © 2024 SLEEPY OWL COFFEE CO.
          </div>
        </div>
      </div>
    </footer>
  );
}
