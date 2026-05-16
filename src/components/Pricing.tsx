'use client';

import React from 'react';

export default function Pricing() {
  return (
    <div id="pricing-root" className="pricing-container fade-up delay-1">
      <style dangerouslySetInnerHTML={{ __html: `
        .pricing-container {
          --ink: #0d0d0d;
          --paper: #ffffff;
          --paper-dark: #f5f5f5;
          --accent: #1a6b4a;
          --accent-light: #e8f5ef;
          --accent-mid: #2d9e6e;
          --gold: #b8862a;
          --gold-light: #fdf6e8;
          --muted: #6b6860;
          --border: rgba(13,13,13,0.12);
          --border-strong: rgba(13,13,13,0.25);
          --purple: #3d2e7c;
          --purple-light: #eeebfb;
          --coral: #c0412b;
          --coral-light: #fcecea;
          --blue: #1b4f8a;
          --blue-light: #e8eef8;
          font-family: 'Outfit', sans-serif;
          background: var(--paper);
          color: var(--ink);
          font-size: 19.5px;
          line-height: 1.6;
          padding-bottom: 5rem;
        }

        .pricing-container h2, .pricing-container .logo, .pricing-container .card-name, .pricing-container .bundle-title, .pricing-container .saas-name, .pricing-container .saas-bundle-title, .pricing-container .footer-left {
          font-family: 'DM Serif Display', serif;
        }

        .pricing-container h1 {
          font-family: 'Outfit', sans-serif;
          font-weight: 500;
        }

        .pricing-container .hero {
          max-width: 1280px;
          margin: 0 auto;
          padding: 6rem 2rem 3rem;
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 3rem;
          align-items: center;
        }

        .pricing-container .hero-headline {
          font-size: 4.55rem;
          line-height: 1.1;
          letter-spacing: -0.02em;
          color: var(--ink);
        }

        .pricing-container .hero-headline em {
          font-style: normal;
          color: #F97316;
        }

        .pricing-container .hero-copy {
          color: var(--muted);
          font-size: 1.235rem;
          line-height: 1.75;
          max-width: 380px;
          margin-top: 1.25rem;
        }

        .pricing-container .hero-stats {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1px;
          background: var(--border-strong);
          border: 1px solid var(--border-strong);
          border-radius: 8px;
          overflow: hidden;
        }

        .pricing-container .stat-box {
          background: var(--paper);
          padding: 1.5rem;
          display: flex;
          flex-direction: column;
          gap: 4px;
        }

        .pricing-container .stat-num {
          font-size: 2.6rem;
          color: var(--ink);
          line-height: 1;
        }

        .pricing-container .stat-label {
          font-size: 0.975rem;
          color: var(--muted);
        }

        .pricing-container .section {
          max-width: 1280px;
          margin: 0 auto;
          padding: 3rem 2rem;
        }

        .pricing-container .section-header {
          display: flex;
          align-items: baseline;
          gap: 1rem;
          margin-bottom: 1.5rem;
        }

        .pricing-container .section-eyebrow {
          font-family: 'DM Mono', monospace;
          font-size: 0.845rem;
          letter-spacing: 0.16em;
          text-transform: uppercase;
          color: var(--muted);
        }

        .pricing-container .section-title {
          font-size: 2.34rem;
          color: var(--ink);
          letter-spacing: -0.01em;
        }

        .pricing-container .section-line {
          flex: 1;
          height: 1px;
          background: var(--border-strong);
        }

        .pricing-container .cards-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 0;
          border: 1px solid var(--border-strong);
          border-radius: 10px;
          overflow: hidden;
        }

        .pricing-container .product-card {
          background: var(--paper);
          padding: 1.75rem 1.5rem;
          border-right: 1px solid var(--border-strong);
          display: flex;
          flex-direction: column;
          transition: background 0.2s;
        }

        .pricing-container .product-card:last-child { border-right: none; }
        .pricing-container .product-card:hover { background: #fff; }

        .pricing-container .card-tag {
          display: inline-block;
          font-family: 'DM Mono', monospace;
          font-size: 0.78rem;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          font-weight: 500;
          padding: 3px 8px;
          border-radius: 2px;
          margin-bottom: 1rem;
          width: fit-content;
        }

        .pricing-container .tag-green { background: var(--ink); color: #fff; font-weight: 700; }
        .pricing-container .tag-purple { background: var(--ink); color: #fff; font-weight: 700; }
        .pricing-container .tag-gold { background: var(--ink); color: #fff; font-weight: 700; }
        .pricing-container .tag-coral { background: var(--ink); color: #fff; font-weight: 700; }

        .pricing-container .card-name {
          font-size: 1.5rem;
          color: var(--ink);
          line-height: 1.2;
          margin-bottom: 6px;
          background: #FDEDD3;
          display: inline-block;
          padding: 4px 10px;
          border-radius: 6px;
        }

        .pricing-container .card-desc {
          font-size: 1.04rem;
          color: var(--muted);
          line-height: 1.6;
          flex: 1;
          margin-bottom: 1.25rem;
        }

        .pricing-container .card-price {
          font-size: 2.47rem;
          color: var(--ink);
          line-height: 1;
        }

        .pricing-container .card-price-unit {
          font-size: 0.975rem;
          color: var(--muted);
          margin-top: 4px;
        }

        .pricing-container .bundle-banner {
          margin-top: 1rem;
          background: #FDEDD3;
          color: var(--ink);
          border-radius: 10px;
          padding: 2rem 2.5rem;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 2rem;
          flex-wrap: wrap;
        }

        .pricing-container .bundle-tag {
          font-family: 'DM Mono', monospace;
          font-size: 0.78rem;
          letter-spacing: 0.16em;
          text-transform: uppercase;
          color: var(--ink);
          margin-bottom: 8px;
        }

        .pricing-container .bundle-title {
          font-size: 1.95rem;
          margin-bottom: 6px;
        }

        .pricing-container .bundle-sub {
          font-size: 1.04rem;
          opacity: 0.7;
        }

        .pricing-container .bundle-price {
          font-size: 3.64rem;
          line-height: 1;
        }

        .pricing-container .bundle-was {
          font-size: 1.04rem;
          opacity: 0.6;
          text-decoration: line-through;
          margin-bottom: 4px;
        }

        .pricing-container .bundle-save {
          font-size: 1.04rem;
          color: var(--accent-mid);
          font-weight: 500;
          margin-top: 4px;
        }

        .pricing-container .section-divider {
          max-width: 1280px;
          margin: 0 auto;
          border: none;
          border-top: 1px solid var(--border-strong);
        }

        .pricing-container .saas-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 1.5rem;
        }

        .pricing-container .saas-card {
          background: #fff;
          border: 1px solid var(--border-strong);
          border-radius: 10px;
          padding: 1.75rem;
          display: flex;
          flex-direction: column;
        }

        .pricing-container .saas-card-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          margin-bottom: 1.25rem;
        }

        .pricing-container .commit-badge {
          font-family: 'DM Mono', monospace;
          font-size: 0.78rem;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          background: var(--paper-dark);
          color: var(--muted);
          padding: 4px 10px;
          border-radius: 20px;
        }

        .pricing-container .metrics-table {
          width: 100%;
          border-collapse: collapse;
          margin: 1rem 0;
          font-size: 1.04rem;
        }

        .pricing-container .metrics-table td {
          padding: 7px 0;
          border-bottom: 1px solid var(--border);
        }

        .pricing-container .metrics-table td:first-child { color: var(--muted); width: 55%; }
        .pricing-container .metrics-table td:last-child { text-align: right; font-weight: 500; font-family: 'DM Mono', monospace; }

        .pricing-container .saas-price-row {
          display: flex;
          align-items: baseline;
          gap: 6px;
          margin-top: auto;
          padding-top: 1rem;
          border-top: 1px solid var(--border);
        }

        .pricing-container .saas-price { font-size: 2.21rem; font-family: 'DM Serif Display', serif; }
        .pricing-container .saas-price-unit { font-size: 0.975rem; color: var(--muted); }

        .pricing-container .saas-bundle {
          margin-top: 1rem;
          background: var(--paper-dark);
          border: 2px dashed var(--border-strong);
          border-radius: 10px;
          padding: 2rem 2.5rem;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 2rem;
          flex-wrap: wrap;
        }

        .pricing-container .saas-bundle-title { font-size: 1.82rem; margin-bottom: 5px; }

        .pricing-container .compare-table-wrap { overflow-x: auto; border: 1px solid var(--border-strong); border-radius: 10px; }
        .pricing-container .compare-table { width: 100%; border-collapse: collapse; font-size: 1.07rem; background: #fff; }
        .pricing-container .compare-table th { padding: 1rem 1.25rem; text-align: left; font-family: 'DM Mono', monospace; font-size: 0.78rem; text-transform: uppercase; background: var(--paper-dark); border-bottom: 1px solid var(--border-strong); }
        .pricing-container .compare-table td { padding: 0.9rem 1.25rem; border-bottom: 1px solid var(--border); }
        .pricing-container .compare-table td:not(:first-child) { text-align: center; }
        .pricing-container .strong-val { font-family: 'DM Mono', monospace; font-weight: 500; color: var(--ink); }

        .pricing-container .cta-btn {
          display: inline-block;
          background: var(--accent);
          color: #fff;
          padding: 10px 22px;
          border-radius: 4px;
          text-decoration: none;
          font-weight: 500;
          transition: background 0.2s;
        }

        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(18px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .pricing-container.fade-up { animation: fadeUp 0.55s ease both; }

        @media (max-width: 900px) {
          .pricing-container .hero { grid-template-columns: 1fr; }
          .pricing-container .hero-headline { font-size: 3.5rem; }
          .pricing-container .cards-grid { grid-template-columns: repeat(2, 1fr); }
          .pricing-container .saas-grid { grid-template-columns: 1fr; }
        }

        @media (max-width: 768px) {
          .pricing-container .hero { padding: 4rem 1.5rem 2.5rem; gap: 2rem; }
          .pricing-container .hero-headline { font-size: 2.75rem; }
          .pricing-container .hero-copy { font-size: 1.05rem; }
          .pricing-container .section { padding: 2.5rem 1.5rem; }
          .pricing-container .section-title { font-size: 1.75rem; }
          .pricing-container .cards-grid { grid-template-columns: repeat(2, 1fr); }
          .pricing-container .card-name { font-size: 1.25rem; }
          .pricing-container .stat-num { font-size: 2rem; }
          .pricing-container .bundle-banner { padding: 1.5rem 1.75rem; flex-direction: column; text-align: center; gap: 1.25rem; }
          .pricing-container .bundle-banner > div:last-child { text-align: center; }
          .pricing-container .bundle-price { font-size: 2.75rem; }
          .pricing-container .saas-bundle { padding: 1.5rem 1.75rem; flex-direction: column; text-align: center; gap: 1.25rem; }
          .pricing-container .saas-bundle > div:last-child { text-align: center; }
        }

        @media (max-width: 640px) {
          .pricing-container { font-size: 16px; }
          .pricing-container .hero { padding: 3rem 1.25rem 2rem; gap: 1.5rem; }
          .pricing-container .hero-headline { font-size: 2.25rem; }
          .pricing-container .hero-copy { font-size: 1rem; }
          .pricing-container .section { padding: 2rem 1.25rem; }
          .pricing-container .cards-grid { grid-template-columns: 1fr; }
          .pricing-container .product-card { border-right: none; border-bottom: 1px solid var(--border-strong); }
          .pricing-container .product-card:last-child { border-bottom: none; }
          .pricing-container .card-price { font-size: 1.75rem; }
          .pricing-container .card-name { font-size: 1.2rem; }
          .pricing-container .stat-num { font-size: 1.75rem; }
          .pricing-container .section-title { font-size: 1.5rem; }
          .pricing-container .section-header { flex-wrap: wrap; }
          .pricing-container .bundle-banner { padding: 1.25rem; }
          .pricing-container .bundle-price { font-size: 2.25rem; }
          .pricing-container .bundle-title { font-size: 1.4rem; }
          .pricing-container .saas-bundle { padding: 1.25rem; }
          .pricing-container .compare-table { font-size: 0.85rem; }
          .pricing-container .compare-table th, .pricing-container .compare-table td { padding: 0.6rem 0.5rem; }
        }
      `}} />

      {/* HERO */}
      <div className="hero">
        <div>
          <h1 className="hero-headline">Hire smarter.<br /><em>Pay only for</em><br />what you need.</h1>
          <p className="hero-copy">Four specialized modules built for recruitment agencies — available as a custom build or as a scalable SaaS subscription.</p>
        </div>
        <div className="hero-stats">
          <div className="stat-box">
            <div className="stat-num">4</div>
            <div className="stat-label">Core modules</div>
          </div>
          <div className="stat-box">
            <div className="stat-num">20%</div>
            <div className="stat-label">Custom bundle save</div>
          </div>
          <div className="stat-box">
            <div className="stat-num">38%</div>
            <div className="stat-label">SaaS bundle save</div>
          </div>
          <div className="stat-box">
            <div className="stat-num">3mo</div>
            <div className="stat-label">Min. SaaS commit</div>
          </div>
        </div>
      </div>

      {/* CUSTOM SECTION */}
      <div className="section" id="custom-builds">
        <div className="section-header">
          <span className="section-eyebrow">01</span>
          <h2 className="section-title">Custom Solution</h2>
          <div className="section-line"></div>
          <span className="section-eyebrow">One-time build fee</span>
        </div>

        <div className="cards-grid">
          <div className="product-card">
            <div className="card-tag tag-green">Lead Generation</div>
            <div className="card-name">Find Qualified Leads</div>
            <p className="card-desc">Automated sourcing and targeting system for your recruitment pipelines.</p>
            <div className="card-price">$4,000</div>
            <div className="card-price-unit">one-time build</div>
          </div>
          <div className="product-card">
            <div className="card-tag tag-purple">Candidate to Customer</div>
            <div className="card-name">Hybrid Model</div>
            <p className="card-desc">Lead generation combined with resume screening in a single integrated system.</p>
            <div className="card-price">$2,500</div>
            <div className="card-price-unit">one-time build</div>
          </div>
          <div className="product-card">
            <div className="card-tag tag-gold">Resume Screening</div>
            <div className="card-name">Smart Resume Filter</div>
            <p className="card-desc">AI-powered screening to shortlist the best-fit candidates fast.</p>
            <div className="card-price">$2,000</div>
            <div className="card-price-unit">one-time build</div>
          </div>
          <div className="product-card">
            <div className="card-tag tag-coral">Outreach</div>
            <div className="card-name">Mass Outreach Engine</div>
            <p className="card-desc">Send hundreds of thousands of personalized emails with delivery built in.</p>
            <div className="card-price">$3,000</div>
            <div className="card-price-unit">one-time build</div>
          </div>
        </div>

        <div className="bundle-banner">
          <div>
            <div className="bundle-tag">Full Suite Bundle — Best Value</div>
            <div className="bundle-title">All 4 modules, fully integrated</div>
            <div className="bundle-sub">Lead Gen + C2C + Resume Screening + Outreach</div>
          </div>
          <div style={{ textAlign: 'right' }}>
            <div className="bundle-was">$12,500 separately</div>
            <div className="bundle-price">$10,000</div>
            <div className="bundle-save">Save $2,500 &middot; 20% off</div>
          </div>
        </div>
      </div>

      <hr className="section-divider" />

      {/* SAAS SECTION */}
      <div className="section" id="saas-subscriptions">
        <div className="section-header">
          <span className="section-eyebrow">02</span>
          <h2 className="section-title">SaaS Subscription</h2>
          <div className="section-line"></div>
          <span className="section-eyebrow">Pay as you grow</span>
        </div>

        <div className="saas-grid">
          <div className="saas-card">
            <div className="saas-card-header">
              <div>
                <div className="card-tag tag-green">Lead Generation</div>
                <div className="saas-name">Per-Lead Billing</div>
              </div>
              <div className="commit-badge">3-mo min</div>
            </div>
            <table className="metrics-table">
              <tbody>
                <tr><td>Cost per lead</td><td>$0.80 / lead</td></tr>
                <tr><td>Leads per month</td><td>750 leads</td></tr>
                <tr><td>Monthly minimum</td><td>$600 / mo</td></tr>
              </tbody>
            </table>
            <div className="saas-price-row">
              <div className="saas-price">$600</div>
              <div className="saas-price-unit">/ mo minimum</div>
            </div>
          </div>

          <div className="saas-card">
            <div className="saas-card-header">
              <div>
                <div className="card-tag tag-purple">Candidate to Customer</div>
                <div className="saas-name">Per-Candidate Billing</div>
              </div>
              <div className="commit-badge">3-mo min</div>
            </div>
            <table className="metrics-table">
              <tbody>
                <tr><td>Cost per match</td><td>$1.00</td></tr>
                <tr><td>Monthly matches</td><td>1,200 matches</td></tr>
                <tr><td>Est. monthly</td><td>~$1,200 / mo</td></tr>
              </tbody>
            </table>
            <div className="saas-price-row">
              <div className="saas-price">$1.200</div>
              <div className="saas-price-unit">/ mo estimated</div>
            </div>
          </div>
        </div>

        <div className="saas-bundle">
          <div>
            <div className="saas-bundle-title">SaaS Full Suite — Bulk Rate</div>
            <div className="saas-bundle-sub">All 4 modules at a locked-in rate &middot; 3-month min.</div>
          </div>
          <div style={{ textAlign: 'right' }}>
            <div className="saas-bundle-was">~$2,400 / mo</div>
            <div className="saas-bundle-price">$1,500 <span style={{fontSize:'1rem'}}> / mo</span></div>
            <div className="saas-bundle-save">Save ~$900 / mo &middot; 38% off</div>
          </div>
        </div>
      </div>

      <hr className="section-divider" />

      {/* COMPARISON */}
      <div className="section">
        <div className="section-header">
          <span className="section-eyebrow">03</span>
          <h2 className="section-title">Quick Comparison</h2>
          <div className="section-line"></div>
        </div>

        <div className="compare-table-wrap">
          <table className="compare-table">
            <thead>
              <tr>
                <th>Module</th>
                <th>Custom Build</th>
                <th>SaaS (unit)</th>
                <th>SaaS (min)</th>
                <th>Commit</th>
              </tr>
            </thead>
            <tbody>
              <tr><td>Lead Generation</td><td><span className="strong-val">$4,000</span></td><td>$0.80</td><td>$600</td><td>3mo</td></tr>
              <tr><td>C2C</td><td><span className="strong-val">$2,500</span></td><td>$1.00</td><td>$1,200</td><td>3mo</td></tr>
              <tr><td>Resume Screening</td><td><span className="strong-val">$2,000</span></td><td>$10/1K</td><td>$300</td><td>3mo</td></tr>
              <tr><td>Outreach</td><td><span className="strong-val">$3,000</span></td><td>Included</td><td>$300</td><td>3mo</td></tr>
              <tr style={{ background: 'var(--paper-dark)' }}>
                <td><strong>Full Suite</strong></td>
                <td><span className="strong-val" style={{color:'var(--accent)'}}>$10,000</span></td>
                <td>-</td>
                <td><span className="strong-val" style={{color:'var(--accent)'}}>$1,500</span></td>
                <td>3mo</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
