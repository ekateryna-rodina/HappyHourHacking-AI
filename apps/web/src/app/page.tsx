'use client';

import { useEffect, useState } from 'react';
import ChatInterface from '@/components/ChatInterface';
import AccountSummary from '@/components/AccountSummary';
import InsightsPanel from '@/components/InsightsPanel';
import { MessageCircle, TrendingUp, Wallet, Search, User, Menu } from 'lucide-react';

export default function Home() {
  const [activeView, setActiveView] = useState<'chat' | 'accounts' | 'insights'>('chat');

  return (
    <main className="min-h-screen bg-neutral-50">
      {/* Top Green Bar */}
      <div className="bg-primary-800 text-white text-xs py-2">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-end">
          <span className="font-medium">FDIC-Insured - Backed by the full faith and credit of the U.S. Government</span>
        </div>
      </div>

      {/* Main Header */}
      <header className="bg-gradient-to-r from-primary-700 via-primary-600 to-accent" style={{ background: 'linear-gradient(to right, #006747 0%, #009169 50%, #6fba2c 100%)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Left Navigation */}
            <nav className="flex items-center gap-8">
              <a href="#" className="text-white hover:text-neutral-100 font-medium text-sm transition-colors">Personal</a>
              <a href="#" className="text-white hover:text-neutral-100 font-medium text-sm transition-colors">Business</a>
              <a href="#" className="text-white hover:text-neutral-100 font-medium text-sm transition-colors">Commercial</a>
              <a href="#" className="text-white hover:text-neutral-100 font-medium text-sm transition-colors">Platinum</a>
            </nav>

            {/* Center Logo */}
            <div className="absolute left-1/2 transform -translate-x-1/2">
              <h1 className="text-white text-2xl font-bold tracking-wide" style={{ fontFamily: 'Georgia, serif' }}>
                M&T<span className="font-light">Bank</span>
              </h1>
            </div>

            {/* Right Actions */}
            <div className="flex items-center gap-4">
              <button className="bg-white text-primary-700 px-5 py-2 rounded font-semibold text-sm hover:bg-neutral-50 transition-colors flex items-center gap-2 shadow-sm">
                <span>🔒</span>
                <span>Log In</span>
              </button>
              <button className="text-white hover:text-neutral-100 transition-colors" title="Español">
                <span className="text-sm font-medium">🌐 Es</span>
              </button>
              <button className="text-white hover:text-neutral-100 transition-colors" title="Help">
                <span className="text-lg">?</span>
              </button>
              <button className="text-white hover:text-neutral-100 transition-colors" title="Branch/ATM">
                <span className="text-lg">📍</span>
              </button>
              <button className="text-white hover:text-neutral-100 transition-colors" title="Search">
                <Search size={20} />
              </button>
              <button className="text-white hover:text-neutral-100 transition-colors" title="Menu">
                <Menu size={24} />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Secondary Navigation - Tab Style */}
      <div className="bg-white border-b border-neutral-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex gap-1">
            <button
              onClick={() => setActiveView('chat')}
              className={`flex items-center gap-2 px-6 py-3 font-medium text-sm transition-all relative ${
                activeView === 'chat'
                  ? 'text-primary-700 border-b-3 border-primary-700'
                  : 'text-neutral-600 hover:text-primary-700 hover:bg-neutral-50'
              }`}
              style={activeView === 'chat' ? { borderBottom: '3px solid #006747' } : {}}
            >
              <MessageCircle size={18} />
              <span>AI Assistant</span>
            </button>
            <button
              onClick={() => setActiveView('accounts')}
              className={`flex items-center gap-2 px-6 py-3 font-medium text-sm transition-all relative ${
                activeView === 'accounts'
                  ? 'text-primary-700 border-b-3 border-primary-700'
                  : 'text-neutral-600 hover:text-primary-700 hover:bg-neutral-50'
              }`}
              style={activeView === 'accounts' ? { borderBottom: '3px solid #006747' } : {}}
            >
              <Wallet size={18} />
              <span>Accounts</span>
            </button>
            <button
              onClick={() => setActiveView('insights')}
              className={`flex items-center gap-2 px-6 py-3 font-medium text-sm transition-all relative ${
                activeView === 'insights'
                  ? 'text-primary-700 border-b-3 border-primary-700'
                  : 'text-neutral-600 hover:text-primary-700 hover:bg-neutral-50'
              }`}
              style={activeView === 'insights' ? { borderBottom: '3px solid #006747' } : {}}
            >
              <TrendingUp size={18} />
              <span>Insights</span>
            </button>
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeView === 'chat' && <ChatInterface />}
        {activeView === 'accounts' && <AccountSummary />}
        {activeView === 'insights' && <InsightsPanel />}
      </div>

      {/* Footer */}
      <footer className="bg-neutral-50 border-t border-neutral-200 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid md:grid-cols-3 gap-8">
            {/* Why Bank with M&T Section */}
            <div>
              <h3 className="text-primary-600 text-2xl font-serif mb-4">Why Bank with M&T?</h3>
              <p className="text-neutral-700 text-sm leading-relaxed">
                We understand what's important. That's why we've built a banking experience with you in mind.
              </p>
            </div>

            {/* Contact Us Section */}
            <div>
              <h4 className="text-neutral-900 font-semibold mb-4 uppercase text-sm tracking-wide">CONTACT US</h4>
              <ul className="space-y-3">
                <li>
                  <a href="tel:1-800-724-2440" className="text-primary-600 hover:text-primary-700 flex items-center gap-2 text-sm">
                    <span>📞</span>
                    <span>1-800-724-2440</span>
                  </a>
                </li>
                <li>
                  <a href="#" className="text-primary-600 hover:text-primary-700 flex items-center gap-2 text-sm">
                    <span>📍</span>
                    <span>Locations & ATMs</span>
                  </a>
                </li>
                <li>
                  <a href="#" className="text-primary-600 hover:text-primary-700 flex items-center gap-2 text-sm">
                    <span>📅</span>
                    <span>Make an Appointment</span>
                  </a>
                </li>
                <li>
                  <a href="#" className="text-primary-600 hover:text-primary-700 flex items-center gap-2 text-sm">
                    <span>💬</span>
                    <span>More ways to reach us</span>
                  </a>
                </li>
              </ul>
            </div>

            {/* About Section */}
            <div>
              <h4 className="text-neutral-900 font-semibold mb-4 uppercase text-sm tracking-wide">ABOUT</h4>
              <ul className="space-y-3">
                <li>
                  <a href="#" className="text-primary-600 hover:text-primary-700 text-sm">About M&T</a>
                </li>
                <li>
                  <a href="#" className="text-primary-600 hover:text-primary-700 text-sm">Careers</a>
                </li>
                <li>
                  <a href="#" className="text-primary-600 hover:text-primary-700 text-sm">Investor Relations</a>
                </li>
                <li>
                  <a href="#" className="text-primary-600 hover:text-primary-700 text-sm">Privacy & Preference Center</a>
                </li>
                <li>
                  <a href="#" className="text-primary-600 hover:text-primary-700 flex items-center gap-2 text-sm">
                    <span>🔒</span>
                    <span>Security</span>
                  </a>
                </li>
              </ul>
            </div>
          </div>

          {/* Social Media & Search */}
          <div className="flex justify-end gap-3 mt-8 mb-8">
            <a href="#" className="w-10 h-10 rounded-full bg-primary-600 hover:bg-primary-700 flex items-center justify-center text-white transition-colors">
              <span className="sr-only">Facebook</span>
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
            </a>
            <a href="#" className="w-10 h-10 rounded-full bg-primary-600 hover:bg-primary-700 flex items-center justify-center text-white transition-colors">
              <span className="sr-only">Instagram</span>
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
            </a>
            <a href="#" className="w-10 h-10 rounded-full bg-primary-600 hover:bg-primary-700 flex items-center justify-center text-white transition-colors">
              <span className="sr-only">X (Twitter)</span>
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
            </a>
            <a href="#" className="w-10 h-10 rounded-full bg-primary-600 hover:bg-primary-700 flex items-center justify-center text-white transition-colors">
              <span className="sr-only">LinkedIn</span>
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
            </a>
          </div>

          {/* Legal Info */}
          <div className="border-t border-neutral-300 pt-8">
            <div className="flex items-start gap-3 mb-4">
              <span className="text-neutral-700">🏠</span>
              <p className="text-xs text-neutral-700 leading-relaxed">
                Equal Housing Lender. © 2025 M&T Bank. NMLS #381076. Member FDIC. All rights reserved. Not all products are available in all states.
              </p>
            </div>

            {/* Footer Links */}
            <div className="flex flex-wrap gap-4 mb-6 text-xs">
              <a href="#" className="text-neutral-700 hover:text-primary-600 underline">Manage Cookies</a>
              <span className="text-neutral-400">|</span>
              <a href="#" className="text-neutral-700 hover:text-primary-600 underline">Sitemap</a>
              <span className="text-neutral-400">|</span>
              <a href="#" className="text-neutral-700 hover:text-primary-600 underline">Digital Services Agreement</a>
              <span className="text-neutral-400">|</span>
              <a href="#" className="text-neutral-700 hover:text-primary-600 underline">ESign Consent</a>
              <span className="text-neutral-400">|</span>
              <a href="#" className="text-neutral-700 hover:text-primary-600 underline">Terms of Use</a>
            </div>

            {/* Disclosures */}
            <div className="space-y-4 text-xs text-neutral-600 leading-relaxed">
              <h5 className="font-semibold text-neutral-900">Disclosures:</h5>
              <ol className="list-decimal list-inside space-y-2">
                <li>
                  Use of these features and services requires Internet and/or data access through a computer or mobile device. Subject to availability and the same limitations as any service available through the Internet. M&T Bank is not responsible for matters that are outside of its reasonable control that might impact availability and functionality. M&T Bank is not responsible for any fees charged by your carrier for any reason at any time. Your mobile carrier's text messaging and data charges may apply. Fees may apply for optional services provided through M&T Online Banking. View the M&T Digital Services Agreement for additional details.
                </li>
                <li>
                  According to statistics released by the U.S. Small Business Administration (SBA) for total approved loans through the SBA's 7(a) lending program during the federal fiscal year ending 9/30/2025.
                </li>
                <li>
                  Source: Coalition Greenwich 2025 Commercial Banking Program.
                </li>
              </ol>
              <p className="mt-4">
                Unless otherwise specified, all advertised offers and terms and conditions of accounts and services are subject to change at any time without notice. After an account is opened or service begins, it is subject to its features, conditions and terms, which are subject to change at any time in accordance with applicable laws and agreements. Please contact an M&T representative for details.
              </p>
              <p className="mt-2">
                Visa® is a registered trademark of Visa International Service Association.
              </p>
              <p className="mt-2">
                Use of the M&T Custom Card design service is subject to program Terms and Conditions and Image Guidelines.
              </p>
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}
