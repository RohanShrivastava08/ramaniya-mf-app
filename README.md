# Ramaniya - Intelligent Mutual Fund Investment Platform 🚀

Ramaniya is a premium, modern, and highly modular Financial Technology (Fintech) web application designed to help users intelligently invest in Mutual Funds. Drawing inspiration from platforms like Groww and Zerodha Coin, Ramaniya features an extremely dense, data-rich user interface wrapped in a beautiful, minimalist aesthetic.

### 🌟 Live API Integrations
This application operates on top of real-world datasets rather than just static mocks:
- **MFAPI (api.mfapi.in):** Directly queries real-time robust Net Asset Value (NAV) metrics, historical trajectories, and dynamic 3-Year CAGRs securely pulling records from SEBI-registered Mutual Funds in India.
- **Marketaux News (api.marketaux.com):** Provides real-time aggregated market signals globally. This is equipped with temporal filters (Last 24 Hours, Past 7 Days) mapping directly to the Indian Securities Market. (Use `VITE_MARKETAUX_API_TOKEN` to go live, otherwise gracefully degrades to realistic fallback records).

---

## 💎 Core Features
- **Strict Linear Onboarding Workflow**: Simulated Auth -> Fake PAN Verification -> Live Video KYC -> Platform Entry. Users cannot bypass critical financial security flows.
- **Dynamic Dashboard Mathematics**: Intelligently simulates actual percentage P&L projections, calculates weighted asset allocations (Equity, Debt, Hybrid), and maps massive local datasets into interactive visual graphs using `recharts`.
- **Live Search & Telemetry**: Native scheme data querying to fetch live mutual funds natively into a densely packed, responsive React layout.
- **Razorpay Simulation Gateway**: Beautiful mock integration mapping real payment gateway parameters (UPI, Cards, Netbanking) executing simulated asynchronous bank transactions seamlessly.
- **Zero-Backend Dependency (Client-Side DB)**: Relies heavily on optimized Browser LocalStorage to memorize session tokens, transaction history, KYC state, and cached API responses without needing complex environments.

---

## 🛠 Tech Stack Overview
- **Core Engine:** React 18, Vite
- **Routing:** React Router v6
- **Styling Architecture:** Tailwind CSS (Vanilla utilities, mobile-first responsive)
- **Data Visualization:** Recharts (Dynamic SVG-based React charts)
- **Iconography:** Lucide-React
- **Authentication/Storage:** LocalStorage (Simulated Stateless Layer)

---

## 🚀 Getting Started

### Prerequisites
Make sure you have Node.js (v18 or higher) installed locally.

### Installation & Launch
1. **Clone the repository:**
   ```bash
   git clone https://github.com/RohanShrivastava08/ramaniya-mf-app.git
   cd ramaniya-mf-app
   ```

2. **Navigate to the core client application:**
   ```bash
   cd frontend
   ```

3. **Install Dependencies:**
   ```bash
   npm install
   ```

4. **Boot up the Vite Development Server:**
   ```bash
   npm run dev
   ```
   > By default, Vite should start the server strictly at `http://localhost:5173`. Open this URL in your web browser.

---

## 📂 Architecture Breakdown
- **`/components/ui/`**: Specialized pure React elements (Buttons, AuthModals, Generic Cards, Checkout Overlays).
- **`/components/layout/`**: Sticky navigational headers and clean minimal footers protecting route layouts.
- **`/components/sections/`**: Modular chunks mapping huge visual Landing Page areas (Hero, Why Trust Us, Previews).
- **`/pages/`**: Massive route controllers (`Dashboard.jsx`, `InvestFlow.jsx`, `News.jsx`, `ExploreFunds.jsx`). 
- **`/lib/`**: Native fetch libraries handling `api.mfapi.in` calls natively and mocking static catalog fallbacks rapidly.

---

## 🔐 Environment Setup (Optional)
**Marketaux Real-Time Support**: To activate absolute real-time news data queries, securely drop your API token in the frontend:
Create `.env` inside `/frontend`:
```env
VITE_MARKETAUX_API_TOKEN=your_token_here
```
*(If you do not perform this, Ramaniya securely manages an intelligent fallback wrapper presenting 100% realistic dummy economic data so the UI remains pristine).*

---

### Developed By
Assembled with meticulous focus on UI/UX mathematics to build an unmatched modern Fintech experience. Enjoy investing! 📈
