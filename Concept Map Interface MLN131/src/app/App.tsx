import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ConceptMap } from "./components/ConceptMap";
import type { Node } from "./components/ConceptMap";
import { Presentation } from "./components/Presentation";

const SECTIONS = [
  { id: "section-01", label: "Tổng quan",          sub: "Khái niệm & tính tất yếu", icon: "🌉", color: "#f59e0b", num: "01" },
  { id: "section-02", label: "Hai loại hình",       sub: "Trực tiếp & Gián tiếp",    icon: "🔄", color: "#e11d48", num: "02" },
  { id: "section-03", label: "Điều kiện ra đời",    sub: "Khách quan & Chủ quan",     icon: "⚖️", color: "#0ea5e9", num: "03" },
  { id: "section-04", label: "Đặc điểm cơ bản",    sub: "4 lĩnh vực cốt lõi",       icon: "📐", color: "#a78bfa", num: "04" },
  { id: "section-05", label: "Kết luận",            sub: "Nhận định & Trích dẫn",    icon: "🏁", color: "#10b981", num: "05" },
  { id: "section-06", label: "Phụ lục AI",          sub: "Cách sử dụng & Mức độ phụ thuộc", icon: "🤖", color: "#818cf8", num: "06" },
];

function scrollTo(id: string) {
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
}

/* ── Section nav in tab bar ── */
function SectionNav({ visible }: { visible: boolean }) {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("section-01");

  useEffect(() => {
    function onScroll() {
      let current = SECTIONS[0].id;
      for (const s of SECTIONS) {
        const el = document.getElementById(s.id);
        if (el && el.getBoundingClientRect().top <= 100) current = s.id;
      }
      setActive(current);
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (!visible) return null;

  const currentSection = SECTIONS.find((s) => s.id === active) || SECTIONS[0];

  return (
    <div style={{ position: "relative" }}>
      {/* Toggle button in tab bar */}
      <button onClick={() => setOpen((o) => !o)}
        style={{
          display: "flex", alignItems: "center", gap: 7,
          padding: "6px 12px", borderRadius: 8, border: "none", cursor: "pointer",
          fontFamily: "Be Vietnam Pro, sans-serif", transition: "all 0.18s",
          background: open ? `${currentSection.color}18` : "rgba(255,255,255,0.05)",
          outline: open ? `1px solid ${currentSection.color}45` : "1px solid rgba(255,255,255,0.1)",
        }}>
        <span style={{ fontSize: "13px" }}>{currentSection.icon}</span>
        <span style={{ fontSize: "11.5px", fontWeight: 700, color: open ? currentSection.color : "rgba(203,213,225,0.85)", whiteSpace: "nowrap" }}>
          {currentSection.num} · {currentSection.label}
        </span>
        <motion.span animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.2 }}
          style={{ display: "flex", alignItems: "center", color: "rgba(148,163,184,0.6)", fontSize: 12 }}>
          ▾
        </motion.span>
      </button>

      {/* Drop-down panel */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8, scaleY: 0.9 }}
            animate={{ opacity: 1, y: 0, scaleY: 1 }}
            exit={{ opacity: 0, y: -8, scaleY: 0.9 }}
            transition={{ duration: 0.18, ease: "easeOut" }}
            style={{
              position: "absolute", top: "calc(100% + 6px)", left: 0, zIndex: 100,
              width: 230, borderRadius: 14, transformOrigin: "top left",
              background: "rgba(8,14,28,0.97)", border: "1px solid rgba(255,255,255,0.12)",
              backdropFilter: "blur(20px)",
              boxShadow: "0 16px 40px rgba(0,0,0,0.55)",
              overflow: "hidden",
            }}>
            <div style={{ padding: "6px 6px 8px" }}>
              <div style={{ fontSize: "8px", fontWeight: 700, color: "rgba(100,116,139,0.55)", textTransform: "uppercase", letterSpacing: "0.14em", padding: "6px 10px 5px" }}>
                Mục lục
              </div>
              {SECTIONS.map((s) => {
                const isActive = s.id === active;
                return (
                  <button key={s.id}
                    onClick={() => { scrollTo(s.id); setOpen(false); }}
                    style={{
                      display: "flex", alignItems: "center", gap: 8, width: "100%",
                      padding: "7px 10px", borderRadius: 8, border: "none", cursor: "pointer",
                      background: isActive ? `${s.color}15` : "transparent",
                      outline: isActive ? `1px solid ${s.color}28` : "none",
                      transition: "background 0.15s", fontFamily: "Be Vietnam Pro, sans-serif",
                    }}
                    onMouseEnter={(e) => { if (!isActive) (e.currentTarget as HTMLButtonElement).style.background = "rgba(255,255,255,0.05)"; }}
                    onMouseLeave={(e) => { if (!isActive) (e.currentTarget as HTMLButtonElement).style.background = "transparent"; }}
                  >
                    <div style={{ width: 2.5, height: 28, borderRadius: 2, flexShrink: 0, background: isActive ? s.color : "rgba(255,255,255,0.1)", boxShadow: isActive ? `0 0 6px ${s.color}` : "none", transition: "all 0.2s" }} />
                    <span style={{ fontSize: "14px", flexShrink: 0 }}>{s.icon}</span>
                    <div style={{ flex: 1, textAlign: "left" }}>
                      <div style={{ fontSize: "8.5px", fontWeight: 800, color: isActive ? s.color : "rgba(100,116,139,0.5)", letterSpacing: "0.06em" }}>{s.num}</div>
                      <div style={{ fontSize: "11.5px", fontWeight: isActive ? 700 : 500, color: isActive ? "#f1f5f9" : "rgba(203,213,225,0.7)", lineHeight: 1.2 }}>{s.label}</div>
                    </div>
                    {isActive && <div style={{ width: 5, height: 5, borderRadius: "50%", background: s.color, flexShrink: 0, boxShadow: `0 0 5px ${s.color}` }} />}
                  </button>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}


export default function App() {
  const [selectedNode, setSelectedNode] = useState<Node | null>(null);
  const [activeTab, setActiveTab] = useState<"slide" | "map">("slide");

  return (
    <div className="min-h-screen" style={{ fontFamily: "Be Vietnam Pro, sans-serif", background: "#060c18" }}>

      {/* Ambient glows */}
      <div style={{ position: "fixed", inset: 0, pointerEvents: "none", overflow: "hidden", zIndex: 0 }}>
        <div style={{ position: "absolute", top: -120, left: "20%", width: 600, height: 600, borderRadius: "50%", background: "radial-gradient(circle, rgba(225,29,72,0.07) 0%, transparent 65%)" }} />
        <div style={{ position: "absolute", bottom: -80, right: "15%", width: 500, height: 500, borderRadius: "50%", background: "radial-gradient(circle, rgba(14,165,233,0.07) 0%, transparent 65%)" }} />
        <div style={{ position: "absolute", top: "45%", left: "-5%", width: 350, height: 350, borderRadius: "50%", background: "radial-gradient(circle, rgba(124,58,237,0.05) 0%, transparent 65%)" }} />
      </div>

      {/* Header */}
      <header style={{ position: "relative", zIndex: 10, borderBottom: "1px solid rgba(255,255,255,0.07)", background: "rgba(6,12,24,0.85)", backdropFilter: "blur(16px)" }}>
        <div style={{ height: 3, background: "linear-gradient(to right, #e11d48, #7c3aed, #0ea5e9)" }} />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4">
          <div className="flex items-center gap-4">
            <div style={{ flexShrink: 0, width: 52, height: 52, borderRadius: 12, background: "linear-gradient(135deg, #e11d48, #9f1239)", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 0 20px rgba(225,29,72,0.35), inset 0 1px 0 rgba(255,255,255,0.1)" }}>
              <span style={{ fontSize: "22px" }}>☭</span>
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
                <span style={{ fontSize: "9.5px", fontWeight: 700, color: "#e11d48", textTransform: "uppercase", letterSpacing: "0.14em", background: "rgba(225,29,72,0.12)", border: "1px solid rgba(225,29,72,0.3)", borderRadius: 4, padding: "2px 8px" }}>MLN131</span>
                <span style={{ fontSize: "9.5px", color: "rgba(148,163,184,0.5)" }}>·</span>
                <span style={{ fontSize: "9.5px", fontWeight: 600, color: "rgba(14,165,233,0.8)", textTransform: "uppercase", letterSpacing: "0.1em" }}>Chủ nghĩa xã hội khoa học</span>
                <span style={{ fontSize: "9.5px", color: "rgba(148,163,184,0.5)" }}>·</span>
                <span style={{ fontSize: "9.5px", color: "rgba(148,163,184,0.5)", letterSpacing: "0.06em" }}>SPST-C3-01</span>
              </div>
              <h1 style={{ fontSize: "clamp(17px,2.5vw,22px)", fontWeight: 800, color: "#f1f5f9", lineHeight: 1.25, letterSpacing: "-0.01em" }}>
                Thời kỳ quá độ lên Chủ nghĩa Xã hội
              </h1>
              <p style={{ fontSize: "12px", color: "rgba(148,163,184,0.65)", marginTop: 2 }}>
                Chương 3 · Concept Map: Thời kỳ quá độ như một cây cầu lịch sử
              </p>
            </div>
            <div className="hidden sm:flex items-center gap-2">
              <div style={{ background: "rgba(14,165,233,0.08)", border: "1px solid rgba(14,165,233,0.2)", borderRadius: 20, padding: "5px 14px", fontSize: "11px", color: "rgba(14,165,233,0.85)", fontWeight: 600 }}>
                📡 Đề tài TT/PB · Trực quan hóa
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Tab bar + dropdown */}
      <div style={{ position: "sticky", top: 0, zIndex: 40, background: "rgba(6,12,24,0.92)", backdropFilter: "blur(16px)", borderBottom: "1px solid rgba(255,255,255,0.07)" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div style={{ display: "flex", alignItems: "center", gap: 0 }}>

            {/* Tab duy nhất */}
            <button
              style={{
                padding: "13px 20px", fontSize: "13px", fontWeight: 600,
                fontFamily: "Be Vietnam Pro, sans-serif", cursor: "pointer",
                background: "none", border: "none", whiteSpace: "nowrap",
                color: "#0ea5e9", borderBottom: "2.5px solid #0ea5e9",
              }}>
              📄  Tổng quan chuyên đề
            </button>

            {/* Spacer */}
            <div style={{ flex: 1 }} />

            {/* Nút bên phải */}
            <AnimatePresence mode="wait">
              {activeTab === "slide" ? (
                <motion.button key="btn-map"
                  initial={{ opacity: 0, x: 8 }} animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 8 }} transition={{ duration: 0.18 }}
                  onClick={() => {
                    setActiveTab("map");
                    setTimeout(() => {
                      document.getElementById("concept-map-section")?.scrollIntoView({ behavior: "smooth", block: "start" });
                    }, 120);
                  }}
                  style={{
                    display: "flex", alignItems: "center", gap: 7,
                    padding: "8px 18px", borderRadius: 8, cursor: "pointer",
                    border: "none",
                    background: "linear-gradient(135deg, #7c3aed, #6d28d9)",
                    fontFamily: "Be Vietnam Pro, sans-serif",
                    boxShadow: "0 4px 14px rgba(124,58,237,0.45)",
                    transition: "opacity 0.2s, transform 0.2s",
                  }}
                  onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.opacity = "0.88"; (e.currentTarget as HTMLButtonElement).style.transform = "translateY(-1px)"; }}
                  onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.opacity = "1"; (e.currentTarget as HTMLButtonElement).style.transform = "translateY(0)"; }}
                >
                  <span style={{ fontSize: "14px" }}>🗺️</span>
                  <span style={{ fontSize: "12.5px", fontWeight: 700, color: "#fff", whiteSpace: "nowrap" }}>Concept Map</span>
                  <motion.span
                    animate={{ x: [0, 3, 0] }} transition={{ repeat: Infinity, duration: 1.4, ease: "easeInOut" }}
                    style={{ fontSize: "12px", color: "rgba(221,214,254,0.9)", lineHeight: 1 }}>
                    →
                  </motion.span>
                </motion.button>
              ) : (
                <motion.button key="btn-back"
                  initial={{ opacity: 0, x: 8 }} animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 8 }} transition={{ duration: 0.18 }}
                  onClick={() => setActiveTab("slide")}
                  style={{
                    display: "flex", alignItems: "center", gap: 7,
                    padding: "8px 18px", borderRadius: 8, cursor: "pointer",
                    border: "none",
                    background: "rgba(255,255,255,0.08)",
                    fontFamily: "Be Vietnam Pro, sans-serif",
                    transition: "opacity 0.2s",
                  }}
                  onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.opacity = "0.75"; }}
                  onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.opacity = "1"; }}
                >
                  <span style={{ fontSize: "12px", color: "rgba(148,163,184,0.9)" }}>←</span>
                  <span style={{ fontSize: "12.5px", fontWeight: 600, color: "rgba(203,213,225,0.9)", whiteSpace: "nowrap" }}>Tổng quan</span>
                </motion.button>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* Main */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-5" style={{ position: "relative", zIndex: 1 }}>
        <AnimatePresence mode="wait">
          {activeTab === "slide" ? (
            <motion.div key="slide"
              initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
              <Presentation />

            </motion.div>
          ) : (
            <motion.div key="map"
              initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
              className="flex flex-col gap-4">

              <div id="concept-map-section" style={{ borderRadius: 16, overflow: "hidden", background: "rgba(13,21,38,0.8)", border: "1px solid rgba(255,255,255,0.08)" }}>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "12px 16px", borderBottom: "1px solid rgba(255,255,255,0.07)" }}>
                  <div>
                    <div style={{ fontSize: "13.5px", fontWeight: 700, color: "#f1f5f9" }}>Sơ đồ tư duy tương tác</div>
                    <div style={{ fontSize: "11px", color: "rgba(148,163,184,0.55)", marginTop: 2 }}>Nhấp vào nút bất kỳ — thuyết minh hiện ngay trên sơ đồ</div>
                  </div>
                  <span style={{ fontSize: "10px", background: "rgba(14,165,233,0.08)", color: "rgba(14,165,233,0.7)", border: "1px solid rgba(14,165,233,0.15)", borderRadius: 20, padding: "3px 10px", fontWeight: 600 }}>
                    Interactive
                  </span>
                </div>
                <div style={{ padding: 12 }}>
                  <ConceptMap onSelect={setSelectedNode} />
                </div>
                <div style={{ padding: "10px 16px", borderTop: "1px solid rgba(225,29,72,0.15)", background: "rgba(225,29,72,0.05)" }}>
                  <p style={{ fontSize: "12px", color: "rgba(203,213,225,0.75)", lineHeight: 1.7 }}>
                    <span style={{ fontWeight: 700, color: "#fca5a5" }}>💡 Luận điểm cốt lõi:</span>{" "}
                    Thời kỳ quá độ là <span style={{ fontWeight: 700, color: "#f87171" }}>tất yếu khách quan</span> — không quốc gia nào có thể bỏ qua giai đoạn cải biến <span style={{ fontWeight: 700, color: "#93c5fd" }}>toàn diện, lâu dài</span> về kinh tế, chính trị, văn hóa và tư tưởng.
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {[
                  { value: "4",  label: "Lĩnh vực tác động", sub: "KT · CT · VH · TT",    r: "#e11d48" },
                  { value: "2",  label: "Hình thức quá độ",  sub: "Trực tiếp · Gián tiếp", r: "#0ea5e9" },
                  { value: "2",  label: "Nhóm điều kiện",    sub: "Khách quan · Chủ quan",  r: "#f59e0b" },
                  { value: "3+", label: "Chặng phát triển",  sub: "Đầu · Giữa · Cuối",      r: "#10b981" },
                ].map((s, i) => (
                  <motion.div key={i}
                    initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.08 * i }}
                    style={{ borderRadius: 14, textAlign: "center", padding: "18px 12px", background: "rgba(13,21,38,0.8)", border: `1px solid ${s.r}28`, backdropFilter: "blur(8px)" }}>
                    <div style={{ fontSize: "32px", fontWeight: 800, color: s.r, lineHeight: 1, textShadow: `0 0 20px ${s.r}60` }}>{s.value}</div>
                    <div style={{ fontSize: "12px", fontWeight: 700, color: "#cbd5e1", marginTop: 7 }}>{s.label}</div>
                    <div style={{ fontSize: "10px", color: "rgba(148,163,184,0.5)", marginTop: 3 }}>{s.sub}</div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}
