@import "tailwindcss";

* { box-sizing: border-box; margin: 0; padding: 0; }
html { scroll-behavior: smooth; }
body {
  background: #080C14;
  color: #F7FAFC;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  -webkit-font-smoothing: antialiased;
}

::-webkit-scrollbar { width: 4px; height: 4px; }
::-webkit-scrollbar-track { background: transparent; }
::-webkit-scrollbar-thumb { background: rgba(99,179,237,0.3); border-radius: 2px; }

@keyframes pulse-dot { 0%,100%{opacity:1;transform:scale(1)} 50%{opacity:0.5;transform:scale(1.3)} }
@keyframes ticker-scroll { from{transform:translateX(0)} to{transform:translateX(-50%)} }
@keyframes fade-up { from{opacity:0;transform:translateY(16px)} to{opacity:1;transform:translateY(0)} }
@keyframes float { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-8px)} }
@keyframes glow-pulse { 0%,100%{box-shadow:0 0 20px rgba(99,179,237,0.2)} 50%{box-shadow:0 0 50px rgba(99,179,237,0.6)} }

.animate-pulse-dot { animation: pulse-dot 2s ease-in-out infinite; }
.animate-ticker { animation: ticker-scroll 40s linear infinite; }
.animate-fade-up { animation: fade-up 0.6s ease both; }
.animate-float { animation: float 6s ease-in-out infinite; }
.animate-glow { animation: glow-pulse 3s ease-in-out infinite; }

.glass-card {
  background: rgba(255,255,255,0.03);
  border: 1px solid rgba(255,255,255,0.08);
  border-radius: 14px;
  transition: all 0.25s ease;
}
.glass-card:hover {
  border-color: rgba(99,179,237,0.25);
  background: rgba(255,255,255,0.05);
}
.gradient-text {
  background: linear-gradient(135deg, #63B3ED 0%, #9F7AEA 50%, #FC8181 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}
.nav-item {
  display: flex; align-items: center; gap: 10px;
  padding: 9px 12px; border-radius: 9px; color: #718096;
  cursor: pointer; transition: all 0.2s; font-size: 13px; font-weight: 500;
  border-left: 2px solid transparent;
}
.nav-item:hover { background: rgba(99,179,237,0.06); color: #63B3ED; }
.nav-item.active { background: rgba(99,179,237,0.1); color: #63B3ED; border-left-color: #63B3ED; }
