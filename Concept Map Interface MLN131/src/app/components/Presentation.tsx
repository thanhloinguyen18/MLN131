import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "motion/react";

/* ── Design tokens ── */
const T = {
  card:    "rgba(18,32,62,0.92)",
  cardBd:  "rgba(255,255,255,0.13)",
  text:    "#ffffff",
  textSub: "rgba(196,212,235,0.85)",
  textMut: "rgba(140,162,196,0.75)",
  inner:   "rgba(255,255,255,0.05)",
  innerBd: "rgba(255,255,255,0.1)",
};

/* ── Reusable animation wrapper ── */
function Reveal({ children, delay = 0, id = "", style = {} }: {
  children: React.ReactNode; delay?: number; id?: string; style?: React.CSSProperties;
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <motion.div id={id} ref={ref} style={style}
      initial={{ opacity: 0, y: 28 }} animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] }}>
      {children}
    </motion.div>
  );
}

/* ── Collapsible section wrapper ── */
function CollapsibleSection({
  id, number, text, color, topBar, children, delay = 0,
}: {
  id: string; number: string; text: string; color: string;
  topBar?: React.ReactNode; children: React.ReactNode; delay?: number;
}) {
  const [open, setOpen] = useState(true);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <motion.div id={id} ref={ref}
      initial={{ opacity: 0, y: 28 }} animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] }}
      style={{ borderRadius: 20, overflow: "hidden", background: T.card, border: `1px solid ${color}28` }}>

      {/* Top color bar */}
      {topBar || <div style={{ height: 3, background: color }} />}

      {/* Header row — clickable */}
      <button onClick={() => setOpen((o) => !o)}
        style={{
          display: "flex", alignItems: "center", gap: 10, width: "100%",
          padding: "18px 28px 14px", background: "none", border: "none", cursor: "pointer",
          textAlign: "left",
        }}>
        {/* Number badge */}
        <div style={{ width: 34, height: 34, borderRadius: 9, background: `${color}22`, border: `2px solid ${color}`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "13px", fontWeight: 900, color, flexShrink: 0, boxShadow: `0 0 12px ${color}40` }}>
          {number}
        </div>
        {/* Divider line */}
        <div style={{ height: 2, flex: 1, background: `linear-gradient(to right, ${color}60, transparent)` }} />
        {/* Section name */}
        <span style={{ fontSize: "9.5px", fontWeight: 800, color, textTransform: "uppercase", letterSpacing: "0.18em", flexShrink: 0 }}>
          {text}
        </span>
        {/* Toggle icon */}
        <motion.div animate={{ rotate: open ? 0 : 180 }} transition={{ duration: 0.25 }}
          style={{ marginLeft: 10, flexShrink: 0, display: "flex", alignItems: "center" }}>
          <div style={{ width: 24, height: 24, borderRadius: 6, background: `${color}18`, border: `1px solid ${color}40`, display: "flex", alignItems: "center", justifyContent: "center" }}>
            <svg width="11" height="11" viewBox="0 0 11 11" fill="none">
              <path d="M2 4l3.5 3.5L9 4" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
        </motion.div>
      </button>

      {/* Collapsible content */}
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            style={{ overflow: "hidden" }}>
            <div style={{ padding: "0 28px 24px" }}>
              {children}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

/* ── Section label (standalone, used in hero) ── */
function SectionLabel({ number, text, color }: { number: string; text: string; color: string }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 18 }}>
      <div style={{ width: 34, height: 34, borderRadius: 9, background: `${color}22`, border: `2px solid ${color}`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "13px", fontWeight: 900, color, flexShrink: 0, boxShadow: `0 0 12px ${color}40` }}>
        {number}
      </div>
      <div style={{ height: 2, flex: 1, background: `linear-gradient(to right, ${color}70, transparent)` }} />
      <span style={{ fontSize: "9.5px", fontWeight: 800, color, textTransform: "uppercase", letterSpacing: "0.18em", flexShrink: 0 }}>{text}</span>
    </div>
  );
}

/* ── Item card ── */
function Item({ icon, label, color, text }: { icon?: string; label: string; color: string; text: string }) {
  return (
    <div style={{ display: "flex", alignItems: "flex-start", gap: 12, background: T.inner, border: `1px solid ${color}30`, borderLeft: `3px solid ${color}`, borderRadius: 10, padding: "13px 15px", boxShadow: `inset 0 0 20px ${color}08` }}>
      {icon && <span style={{ fontSize: "15px", flexShrink: 0, marginTop: 1 }}>{icon}</span>}
      <div>
        <div style={{ fontSize: "10px", fontWeight: 800, color, textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 5 }}>{label}</div>
        <p style={{ fontSize: "13px", color: T.textSub, lineHeight: 1.7 }}>{text}</p>
      </div>
    </div>
  );
}

export function Presentation() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>

      {/* ══ HERO ══ */}
      <div style={{ borderRadius: 20, overflow: "hidden", position: "relative" }}>
        <div style={{ position: "absolute", inset: 0, opacity: 0.05, backgroundImage: "linear-gradient(rgba(14,165,233,1) 1px, transparent 1px), linear-gradient(90deg, rgba(14,165,233,1) 1px, transparent 1px)", backgroundSize: "44px 44px" }} />
        <div style={{ position: "absolute", top: -60, left: "25%", width: 440, height: 440, borderRadius: "50%", background: "radial-gradient(circle, rgba(225,29,72,0.18) 0%, transparent 65%)", pointerEvents: "none" }} />
        <div style={{ position: "absolute", bottom: -40, right: "20%", width: 380, height: 380, borderRadius: "50%", background: "radial-gradient(circle, rgba(14,165,233,0.15) 0%, transparent 65%)", pointerEvents: "none" }} />

        <div style={{ background: "linear-gradient(155deg, #080c1a 0%, #100c22 45%, #080f1e 100%)", padding: "52px 48px 48px", position: "relative", border: "1px solid rgba(255,255,255,0.1)" }}>
          <motion.div initial={{ opacity: 0, y: -16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}
            style={{ display: "flex", flexDirection: "column", gap: 0 }}>

            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 20 }}>
              <span style={{ fontSize: "9.5px", fontWeight: 800, color: "#e11d48", textTransform: "uppercase", letterSpacing: "0.18em", background: "rgba(225,29,72,0.15)", border: "1.5px solid rgba(225,29,72,0.5)", borderRadius: 4, padding: "3px 12px", boxShadow: "0 0 12px rgba(225,29,72,0.3)" }}>MLN131</span>
              <span style={{ color: "rgba(255,255,255,0.2)", fontSize: 14 }}>·</span>
              <span style={{ fontSize: "9.5px", fontWeight: 700, color: "#38bdf8", letterSpacing: "0.1em" }}>Chủ nghĩa xã hội khoa học · Chương 3</span>
            </div>

            <div style={{ display: "flex", alignItems: "flex-start", gap: 24, width: "100%" }}>
              <div style={{ flex: 1 }}>
                <h1 style={{ fontSize: "clamp(28px,4vw,48px)", fontWeight: 900, color: "#ffffff", lineHeight: 1.12, letterSpacing: "-0.02em", marginBottom: 16 }}>
                  Thời kỳ quá độ<br />
                  <span style={{ background: "linear-gradient(90deg, #ff3d6b, #c084fc, #38bdf8)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                    lên Chủ nghĩa Xã hội
                  </span>
                </h1>
                <p style={{ fontSize: "14.5px", color: T.textSub, lineHeight: 1.8, maxWidth: 560, marginBottom: 24 }}>
                  Cây cầu lịch sử tất yếu — phân tích toàn diện tổng quan, điều kiện ra đời và những đặc điểm cơ bản của thời kỳ quá độ lên CNXH.
                </p>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                  {["01 · Tổng quan", "02 · Hai loại hình", "03 · Điều kiện", "04 · Đặc điểm", "05 · Kết luận"].map((s, i) => {
                    const colors = ["#f59e0b","#e11d48","#0ea5e9","#a78bfa","#10b981"];
                    return (
                      <span key={i} style={{ fontSize: "11px", color: colors[i], background: `${colors[i]}14`, border: `1px solid ${colors[i]}40`, borderRadius: 20, padding: "4px 12px", fontWeight: 600 }}>
                        {s}
                      </span>
                    );
                  })}
                </div>
              </div>

              <div className="hidden lg:grid" style={{ gridTemplateColumns: "1fr 1fr", gap: 10, width: 220, flexShrink: 0 }}>
                {[
                  { v: "2", l: "Loại hình quá độ", c: "#ff3d6b" },
                  { v: "4", l: "Lĩnh vực tác động", c: "#38bdf8" },
                  { v: "2", l: "Nhóm điều kiện", c: "#fbbf24" },
                  { v: "3+", l: "Chặng phát triển", c: "#34d399" },
                ].map((s, i) => (
                  <div key={i} style={{ borderRadius: 12, padding: "14px 10px", textAlign: "center", background: `${s.c}12`, border: `1.5px solid ${s.c}40`, boxShadow: `0 0 16px ${s.c}20` }}>
                    <div style={{ fontSize: "28px", fontWeight: 900, color: s.c, lineHeight: 1, textShadow: `0 0 20px ${s.c}` }}>{s.v}</div>
                    <div style={{ fontSize: "9.5px", color: T.textSub, marginTop: 5, lineHeight: 1.4, fontWeight: 500 }}>{s.l}</div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
          <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: 3, background: "linear-gradient(to right, #e11d48, #c084fc, #0ea5e9)" }} />
        </div>
      </div>

      {/* ══ 01 TỔNG QUAN ══ */}
      <CollapsibleSection id="section-01" number="01" text="Tổng quan" color="#f59e0b"
        topBar={<div style={{ height: 3, background: "linear-gradient(to right, #f59e0b, #fbbf24)" }} />}>
            <h2 style={{ fontSize: "clamp(18px,2.2vw,24px)", fontWeight: 800, color: T.text, marginBottom: 12 }}>
              Thời kỳ quá độ lên CNXH là gì?
            </h2>
            <p style={{ fontSize: "14px", color: T.textSub, lineHeight: 1.85, marginBottom: 24, maxWidth: 720 }}>
              Theo quan điểm của các nhà sáng lập CNXH khoa học, sự thay thế hình thái KTXH tư bản chủ nghĩa bằng hình thái KTXH cộng sản chủ nghĩa là một{" "}
              <span style={{ color: "#fbbf24", fontWeight: 700 }}>quá trình tất yếu lịch sử</span>. Đây là thời kỳ{" "}
              <span style={{ color: "#c084fc", fontWeight: 700 }}>cải biến cách mạng sâu sắc, triệt để và toàn diện</span>{" "}
              từ xã hội cũ sang xã hội mới.
            </p>

            {/* Bridge visual */}
            <div style={{ borderRadius: 14, padding: "20px 24px", background: "rgba(6,10,20,0.7)", border: "1px solid rgba(255,255,255,0.1)", marginBottom: 20 }}>
              <div style={{ display: "flex", alignItems: "center" }}>
                <div style={{ flexShrink: 0, textAlign: "center", width: 110 }}>
                  <div style={{ fontSize: "30px", marginBottom: 6 }}>🏭</div>
                  <div style={{ fontSize: "11px", fontWeight: 800, color: "#ff3d6b", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 3 }}>CNTB</div>
                  <div style={{ fontSize: "10px", color: T.textMut }}>Điểm xuất phát</div>
                </div>
                <div style={{ flex: 1, position: "relative", display: "flex", alignItems: "center" }}>
                  <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center" }}>
                    <div style={{ width: "100%", height: 2, background: "linear-gradient(to right, #ff3d6b, #fbbf24, #34d399)" }} />
                  </div>
                  <div style={{ margin: "0 auto", position: "relative", background: "rgba(8,14,28,0.95)", border: "1.5px solid rgba(245,158,11,0.5)", borderRadius: 10, padding: "8px 16px", textAlign: "center", boxShadow: "0 0 20px rgba(245,158,11,0.2)" }}>
                    <div style={{ fontSize: "9px", fontWeight: 800, color: "#fbbf24", textTransform: "uppercase", letterSpacing: "0.12em" }}>🌉 Thời kỳ quá độ</div>
                    <div style={{ fontSize: "8.5px", color: T.textMut, marginTop: 2 }}>Cây cầu lịch sử tất yếu</div>
                  </div>
                </div>
                <div style={{ flexShrink: 0, textAlign: "center", width: 110 }}>
                  <div style={{ fontSize: "30px", marginBottom: 6 }}>🌱</div>
                  <div style={{ fontSize: "11px", fontWeight: 800, color: "#34d399", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 3 }}>CNXH</div>
                  <div style={{ fontSize: "10px", color: T.textMut }}>Đích đến tất yếu</div>
                </div>
              </div>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 12 }}>
              {[
                { icon: "📌", label: "Khái niệm", color: "#fbbf24", text: "Thời kỳ cải biến cách mạng sâu sắc, triệt để và toàn diện từ TBCN sang CSCN." },
                { icon: "⚖️", label: "Tính tất yếu", color: "#c084fc", text: "C. Mác: giữa XHTB và XHCS là một thời kỳ cải biến cách mạng, tương ứng là thời kỳ quá độ chính trị." },
                { icon: "🔬", label: "Bản chất KH", color: "#38bdf8", text: "Không phải ý muốn chủ quan — là kết quả tất yếu của sự vận động các quy luật lịch sử khách quan." },
              ].map((c, i) => (
                <div key={i} style={{ borderRadius: 12, padding: "16px", background: `${c.color}10`, border: `1.5px solid ${c.color}40`, borderTop: `3px solid ${c.color}`, boxShadow: `0 4px 20px ${c.color}15` }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 7, marginBottom: 8 }}>
                    <span style={{ fontSize: "16px" }}>{c.icon}</span>
                    <span style={{ fontSize: "10.5px", fontWeight: 800, color: c.color, textTransform: "uppercase", letterSpacing: "0.08em" }}>{c.label}</span>
                  </div>
                  <p style={{ fontSize: "12.5px", color: T.textSub, lineHeight: 1.65 }}>{c.text}</p>
                </div>
              ))}
            </div>
      </CollapsibleSection>

      {/* ══ 02 HAI LOẠI HÌNH ══ */}
      <CollapsibleSection id="section-02" number="02" text="Hai loại hình quá độ" color="#ff3d6b" delay={0.05}
        topBar={<div style={{ height: 3, background: "linear-gradient(to right, #e11d48, #ff3d6b)" }} />}>
            <h2 style={{ fontSize: "clamp(18px,2.2vw,24px)", fontWeight: 800, color: T.text, marginBottom: 20 }}>
              Quá độ trực tiếp và Quá độ gián tiếp
            </h2>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
              {[
                {
                  label: "Quá độ TRỰC TIẾP", icon: "➡️", color: "#ff3d6b",
                  border: "rgba(255,61,107,0.4)", bg: "rgba(255,61,107,0.08)",
                  items: ["Từ CNTB phát triển cao lên CNCS", "Áp dụng với nước đã trải qua CNTB phát triển đầy đủ", "Cho đến nay loại hình này chưa từng diễn ra trong thực tế lịch sử"],
                  badge: { text: "⚠️ Chưa có tiền lệ", color: "#ffb3c1", bg: "rgba(255,61,107,0.15)", border: "rgba(255,61,107,0.35)" },
                },
                {
                  label: "Quá độ GIÁN TIẾP", icon: "🪜", color: "#34d399",
                  border: "rgba(52,211,153,0.4)", bg: "rgba(52,211,153,0.08)",
                  items: ["Từ CNTB chưa qua giai đoạn phát triển lên CNCS", "Bỏ qua giai đoạn CNTB tự nhiên — đặc điểm riêng", "Áp dụng: Liên Xô, Trung Quốc, Việt Nam và nhiều nước khác"],
                  badge: { text: "✅ Thực tế lịch sử", color: "#6ee7b7", bg: "rgba(52,211,153,0.12)", border: "rgba(52,211,153,0.35)" },
                },
              ].map((col, i) => (
                <div key={i} style={{ borderRadius: 14, padding: "20px 22px", background: col.bg, border: `2px solid ${col.border}`, boxShadow: `0 4px 24px ${col.color}12` }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16, paddingBottom: 14, borderBottom: `1px solid ${col.border}` }}>
                    <span style={{ fontSize: "22px" }}>{col.icon}</span>
                    <span style={{ fontSize: "13.5px", fontWeight: 800, color: col.color }}>{col.label}</span>
                  </div>
                  <div style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: 16 }}>
                    {col.items.map((item, j) => (
                      <div key={j} style={{ display: "flex", gap: 8 }}>
                        <span style={{ color: col.color, flexShrink: 0, marginTop: 2, fontSize: "13px" }}>▸</span>
                        <span style={{ fontSize: "13px", color: T.textSub, lineHeight: 1.65 }}>{item}</span>
                      </div>
                    ))}
                  </div>
                  <span style={{ display: "inline-block", fontSize: "11px", fontWeight: 700, color: col.badge.color, background: col.badge.bg, border: `1px solid ${col.badge.border}`, borderRadius: 20, padding: "4px 12px" }}>
                    {col.badge.text}
                  </span>
                </div>
              ))}
            </div>

            <div style={{ marginTop: 16, borderRadius: 12, padding: "14px 18px", background: "rgba(52,211,153,0.08)", border: "1.5px solid rgba(52,211,153,0.3)", display: "flex", alignItems: "center", gap: 14, boxShadow: "0 0 20px rgba(52,211,153,0.1)" }}>
              <span style={{ fontSize: "24px", flexShrink: 0 }}>🇻🇳</span>
              <p style={{ fontSize: "13px", color: T.textSub, lineHeight: 1.7 }}>
                <span style={{ fontWeight: 800, color: "#34d399" }}>Việt Nam — Quá độ gián tiếp:</span>{" "}
                Bỏ qua CNTB, xuất phát điểm thấp → đòi hỏi thời kỳ quá độ{" "}
                <span style={{ fontWeight: 700, color: "#fbbf24" }}>lâu dài và kiên trì</span> hơn, với đặc điểm và lộ trình riêng.
              </p>
            </div>
      </CollapsibleSection>

      {/* ══ 03 ĐIỀU KIỆN ══ */}
      <CollapsibleSection id="section-03" number="03" text="Điều kiện ra đời" color="#38bdf8" delay={0.05}
        topBar={<div style={{ height: 3, background: "linear-gradient(to right, #0ea5e9, #38bdf8)" }} />}>
            <h2 style={{ fontSize: "clamp(18px,2.2vw,24px)", fontWeight: 800, color: T.text, marginBottom: 6 }}>
              Điều kiện ra đời của Chủ nghĩa xã hội
            </h2>
            <p style={{ fontSize: "13px", color: T.textMut, marginBottom: 22, fontStyle: "italic" }}>
              Sự ra đời của CNXH không phải là ý muốn chủ quan mà là kết quả khi điều kiện khách quan và nhân tố chủ quan hội đủ.
            </p>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
              {/* Khách quan */}
              <div>
                <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 12, padding: "8px 12px", borderRadius: 10, background: "rgba(251,146,60,0.1)", border: "1px solid rgba(251,146,60,0.3)" }}>
                  <span style={{ fontSize: "18px" }}>🌍</span>
                  <span style={{ fontSize: "13px", fontWeight: 800, color: "#fb923c" }}>Điều kiện khách quan</span>
                  <span style={{ marginLeft: "auto", fontSize: "9.5px", color: "rgba(251,146,60,0.7)", background: "rgba(251,146,60,0.1)", border: "1px solid rgba(251,146,60,0.25)", borderRadius: 20, padding: "2px 8px", fontWeight: 700 }}>KT · XH</span>
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                  {[
                    { icon: "⚙️", label: "Lực lượng sản xuất", text: "Phát triển mạnh mẽ, ngày càng có tính xã hội hóa cao dưới CNTB — tạo nền tảng vật chất cho CNXH." },
                    { icon: "💥", label: "Mâu thuẫn cơ bản", text: "LLSX mang tính xã hội hóa >< QHSX dựa trên chiếm hữu tư nhân TBCN về tư liệu sản xuất." },
                    { icon: "⚔️", label: "Mâu thuẫn giai cấp", text: "Đấu tranh giữa giai cấp công nhân hiện đại với giai cấp tư sản lỗi thời — tiền đề cho cách mạng xã hội." },
                  ].map((item, i) => (
                    <Item key={i} icon={item.icon} label={item.label} color="#fb923c" text={item.text} />
                  ))}
                </div>
              </div>

              {/* Chủ quan */}
              <div>
                <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 12, padding: "8px 12px", borderRadius: 10, background: "rgba(56,189,248,0.1)", border: "1px solid rgba(56,189,248,0.3)" }}>
                  <span style={{ fontSize: "18px" }}>🧭</span>
                  <span style={{ fontSize: "13px", fontWeight: 800, color: "#38bdf8" }}>Nhân tố chủ quan</span>
                  <span style={{ marginLeft: "auto", fontSize: "9.5px", color: "rgba(56,189,248,0.7)", background: "rgba(56,189,248,0.1)", border: "1px solid rgba(56,189,248,0.25)", borderRadius: 20, padding: "2px 8px", fontWeight: 700 }}>Bên trong</span>
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                  {[
                    { icon: "✊", label: "Giai cấp công nhân", text: "Phát triển cả số lượng và chất lượng — nhận thức sứ mệnh lịch sử, lực lượng lãnh đạo cách mạng XHCN." },
                    { icon: "⭐", label: "Đảng Cộng sản lãnh đạo", text: "Nhân tố quan trọng nhất — đội tiên phong của GCCN, trực tiếp lãnh đạo đấu tranh, xây dựng xã hội mới." },
                    { icon: "🤝", label: "Khối liên minh giai cấp", text: "Liên minh công - nông - trí thức dưới sự lãnh đạo của Đảng — điều kiện để cách mạng giành thắng lợi." },
                  ].map((item, i) => (
                    <Item key={i} icon={item.icon} label={item.label} color="#38bdf8" text={item.text} />
                  ))}
                </div>
              </div>
            </div>
      </CollapsibleSection>

      {/* ══ 04 ĐẶC ĐIỂM ══ */}
      <CollapsibleSection id="section-04" number="04" text="Đặc điểm cơ bản" color="#c084fc" delay={0.05}
        topBar={<div style={{ height: 3, background: "linear-gradient(to right, #a78bfa, #c084fc)" }} />}>
            <h2 style={{ fontSize: "clamp(18px,2.2vw,24px)", fontWeight: 800, color: T.text, marginBottom: 6 }}>
              Những đặc điểm cơ bản của Thời kỳ quá độ
            </h2>
            <p style={{ fontSize: "13px", color: T.textMut, marginBottom: 22, fontStyle: "italic" }}>
              Thực chất: sự đan xen và đấu tranh giữa "dấu vết" của xã hội cũ và yếu tố mới đang nảy sinh của CNXH.
            </p>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(2,1fr)", gap: 14 }}>
              {[
                { icon: "🏭", field: "Lĩnh vực Kinh tế",    color: "#fb923c", main: "Kinh tế nhiều thành phần",    points: ["Tồn tại các thành phần đối lập (tư nhân và XHCN)", "Nhà nước nắm giữ các ngành then chốt", "Từng bước xác lập QHSX XHCN"] },
                { icon: "🏛️", field: "Lĩnh vực Chính trị",  color: "#ff3d6b", main: "Thiết lập chuyên chính vô sản", points: ["Giai cấp công nhân nắm quyền lực nhà nước", "Trấn áp GCTS đã bị đánh bại nhưng chưa tiêu diệt", "Tổ chức và xây dựng xã hội mới XHCN"] },
                { icon: "🎭", field: "Tư tưởng · Văn hóa",  color: "#c084fc", main: "Đa dạng tư tưởng, văn hóa",    points: ["Tồn tại nhiều loại tư tưởng, văn hóa khác nhau", "Từng bước xây dựng nền văn hóa XHCN", "Tiếp thu tinh hoa văn hóa nhân loại, xóa bỏ tàn dư"] },
                { icon: "👥", field: "Lĩnh vực Xã hội",     color: "#38bdf8", main: "Cơ cấu xã hội phức tạp",       points: ["Nhiều giai cấp, tầng lớp vừa hợp tác vừa đấu tranh", "Khác biệt nông thôn - thành thị còn tồn tại", "Khoảng cách lao động trí óc - chân tay dần thu hẹp"] },
              ].map((card, i) => (
                <div key={i} style={{ borderRadius: 14, overflow: "hidden", background: `${card.color}0a`, border: `1.5px solid ${card.color}35`, boxShadow: `0 4px 20px ${card.color}12` }}>
                  <div style={{ padding: "14px 18px", background: `${card.color}12`, borderBottom: `1px solid ${card.color}25`, display: "flex", alignItems: "center", gap: 10 }}>
                    <div style={{ width: 38, height: 38, borderRadius: 10, background: `${card.color}20`, border: `2px solid ${card.color}50`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "18px", flexShrink: 0, boxShadow: `0 0 12px ${card.color}30` }}>
                      {card.icon}
                    </div>
                    <div>
                      <div style={{ fontSize: "9.5px", fontWeight: 800, color: card.color, textTransform: "uppercase", letterSpacing: "0.1em" }}>{card.field}</div>
                      <div style={{ fontSize: "13px", fontWeight: 700, color: T.text, lineHeight: 1.3, marginTop: 2 }}>{card.main}</div>
                    </div>
                  </div>
                  <div style={{ padding: "14px 18px", display: "flex", flexDirection: "column", gap: 8 }}>
                    {card.points.map((p, j) => (
                      <div key={j} style={{ display: "flex", gap: 8 }}>
                        <div style={{ width: 6, height: 6, borderRadius: "50%", background: card.color, flexShrink: 0, marginTop: 5, boxShadow: `0 0 6px ${card.color}` }} />
                        <span style={{ fontSize: "12.5px", color: T.textSub, lineHeight: 1.65 }}>{p}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
      </CollapsibleSection>

      {/* ══ 05 KẾT LUẬN ══ */}
      <CollapsibleSection id="section-05" number="05" text="Kết luận" color="#34d399" delay={0.05}
        topBar={<div style={{ height: 3, background: "linear-gradient(to right, #34d399, #38bdf8)" }} />}>
            <h2 style={{ fontSize: "clamp(18px,2.2vw,24px)", fontWeight: 800, color: T.text, marginBottom: 20 }}>
              Nhận định tổng quát
            </h2>

            <div style={{ borderRadius: 14, padding: "18px 22px", background: "rgba(245,158,11,0.1)", border: "1.5px solid rgba(245,158,11,0.35)", marginBottom: 20, boxShadow: "0 0 24px rgba(245,158,11,0.12)" }}>
              <p style={{ fontSize: "15.5px", fontWeight: 600, color: "#fde68a", lineHeight: 1.7, fontStyle: "italic" }}>
                "Thời kỳ quá độ lên CNXH là một giai đoạn lịch sử{" "}
                <span style={{ color: "#fbbf24", fontWeight: 900, textShadow: "0 0 10px rgba(251,191,36,0.5)" }}>lâu dài, gian khổ và phức tạp</span>{" "}
                — nhưng là con đường tất yếu không thể bỏ qua."
              </p>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(2,1fr)", gap: 12, marginBottom: 24 }}>
              {[
                { icon: "🔍", color: "#38bdf8", text: "Hiểu rõ điều kiện khách quan và chủ quan giúp kiên định con đường đi lên CNXH" },
                { icon: "📐", color: "#c084fc", text: "Phù hợp với quy luật tiến hóa của lịch sử và điều kiện cụ thể của mỗi quốc gia" },
                { icon: "🇻🇳", color: "#34d399", text: "Việt Nam — quá độ gián tiếp — đặc điểm riêng đòi hỏi lộ trình và chính sách phù hợp" },
                { icon: "⏳", color: "#fbbf24", text: "Không thể nóng vội, phải từng bước vững chắc qua nhiều chặng phát triển kế tiếp" },
              ].map((t, i) => (
                <div key={i} style={{ borderRadius: 10, padding: "13px 16px", background: `${t.color}0e`, border: `1px solid ${t.color}30`, display: "flex", gap: 12, alignItems: "flex-start", boxShadow: `0 0 16px ${t.color}10` }}>
                  <span style={{ fontSize: "20px", flexShrink: 0 }}>{t.icon}</span>
                  <span style={{ fontSize: "12.5px", color: T.textSub, lineHeight: 1.65 }}>{t.text}</span>
                </div>
              ))}
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
              <div style={{ fontSize: "9.5px", fontWeight: 800, color: T.textMut, textTransform: "uppercase", letterSpacing: "0.14em" }}>Trích dẫn kinh điển</div>
              {[
                { text: "Giữa xã hội tư bản chủ nghĩa và xã hội cộng sản chủ nghĩa là một thời kỳ cải biến cách mạng từ xã hội nọ sang xã hội kia.", author: "Karl Marx", work: "Phê phán Cương lĩnh Gotha (1875)", color: "#ff3d6b" },
                { text: "Từ chủ nghĩa tư bản, nhân loại chỉ có thể tiến thẳng lên chủ nghĩa xã hội, tức là nền sở hữu công cộng về tư liệu sản xuất và phân phối sản phẩm theo lao động.", author: "V.I. Lênin", work: "Nhà nước và Cách mạng (1917)", color: "#c084fc" },
              ].map((q, i) => (
                <div key={i} style={{ display: "flex", gap: 14 }}>
                  <div style={{ width: 3, borderRadius: 3, background: q.color, flexShrink: 0, minHeight: 48, boxShadow: `0 0 10px ${q.color}` }} />
                  <div>
                    <p style={{ fontSize: "13px", color: T.textSub, lineHeight: 1.8, fontStyle: "italic", marginBottom: 6 }}>"{q.text}"</p>
                    <div style={{ fontSize: "11px", fontWeight: 800, color: q.color }}>— {q.author} <span style={{ fontWeight: 400, color: T.textMut }}>· {q.work}</span></div>
                  </div>
                </div>
              ))}
            </div>
      </CollapsibleSection>

      {/* ══ 06 PHỤ LỤC AI ══ */}
      <CollapsibleSection id="section-06" number="06" text="Phụ lục AI" color="#818cf8" delay={0.05}
        topBar={<div style={{ height: 3, background: "linear-gradient(to right, #6366f1, #a855f7, #ec4899)" }} />}>

            {/* Big headline */}
            <div style={{ marginBottom: 28 }}>
              <h2 style={{ fontSize: "clamp(20px,2.5vw,28px)", fontWeight: 900, color: T.text, lineHeight: 1.2, marginBottom: 8 }}>
                Sử dụng AI trong sản phẩm này<br />
                <span style={{ background: "linear-gradient(90deg,#818cf8,#c084fc,#f472b6)", WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent" }}>
                  như thế nào?
                </span>
              </h2>
              <p style={{ fontSize: "13.5px", color: T.textMut, lineHeight: 1.75, maxWidth: 620 }}>
                Minh bạch hoàn toàn về quy trình, công cụ và mức độ phụ thuộc AI trong việc tạo ra sản phẩm sáng tạo SPST-C3-01.
              </p>
            </div>

            {/* ── STACK TOOLS ── */}
            <div style={{ marginBottom: 32 }}>
              <div style={{ fontSize: "10px", fontWeight: 800, color: "#818cf8", textTransform: "uppercase", letterSpacing: "0.16em", marginBottom: 16 }}>AI Stack đã sử dụng</div>

              {/* Pipeline flow */}
              <div style={{ display: "flex", alignItems: "stretch", gap: 0, overflowX: "auto" }}>
                {[
                  {
                    logo: (
                      <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
                        <rect width="28" height="28" rx="7" fill="#1a1a2e"/>
                        <text x="14" y="20" textAnchor="middle" fontSize="16" fontWeight="900" fill="#fb923c" fontFamily="sans-serif">AG</text>
                      </svg>
                    ),
                    name: "Antigravity", role: "Tối ưu & cấu trúc prompt", color: "#fb923c", tag: "Prompt layer",
                  },
                  {
                    logo: (
                      <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
                        <rect width="28" height="28" rx="7" fill="#1a0a14"/>
                        {/* Figma F shape: top-left red, top-right salmon, mid-left purple, mid-right blue circle, bottom-left green */}
                        <rect x="5"  y="5"  width="8" height="8" rx="4"   fill="#F24E1E"/>
                        <rect x="15" y="5"  width="8" height="8" rx="4"   fill="#FF7262"/>
                        <rect x="5"  y="11" width="8" height="8" rx="0"   fill="#F24E1E" opacity="0"/>
                        <rect x="5"  y="11" width="8" height="10" rx="4"  fill="#A259FF"/>
                        <circle cx="19" cy="16" r="4"                     fill="#1ABCFE"/>
                        <rect x="5"  y="19" width="8" height="4" rx="4"   fill="#0ACF83"/>
                      </svg>
                    ),
                    name: "Figma Make", role: "Preview & deploy realtime", color: "#f472b6", tag: "Deploy layer",
                  },
                  {
                    logo: (
                      <div style={{ display: "flex", gap: 3 }}>
                        {/* ChatGPT / OpenAI */}
                        <svg width="26" height="26" viewBox="0 0 28 28" fill="none">
                          <rect width="28" height="28" rx="7" fill="#0a1a12"/>
                          <path d="M22.2 11.6a5.6 5.6 0 0 0-.4-4.6 5.8 5.8 0 0 0-6.2-2.8A5.8 5.8 0 0 0 11.3 2a5.8 5.8 0 0 0-5.5 4 5.8 5.8 0 0 0-3.8 2.8 5.8 5.8 0 0 0 .7 6.8 5.6 5.6 0 0 0 .4 4.6 5.8 5.8 0 0 0 6.2 2.8 5.8 5.8 0 0 0 4.4 2.2 5.8 5.8 0 0 0 5.5-4 5.8 5.8 0 0 0 3.8-2.8 5.8 5.8 0 0 0-.8-6.8z" fill="#10a37f"/>
                          <path d="M14 9.5l3 5.2-3 5.2-3-5.2z" fill="white" opacity="0.9"/>
                        </svg>
                        {/* Gemini */}
                        <svg width="26" height="26" viewBox="0 0 28 28" fill="none">
                          <rect width="28" height="28" rx="7" fill="#0a0a1a"/>
                          {/* Gemini 4-pointed star */}
                          <path d="M14 4 C14 4 14.5 10 17 13 C19.5 16 26 14 26 14 C26 14 19.5 14 17 17 C14.5 20 14 26 14 26 C14 26 13.5 20 11 17 C8.5 14 2 14 2 14 C2 14 8.5 14 11 11 C13.5 8 14 4 14 4Z" fill="url(#geminiGrad)"/>
                          <defs>
                            <linearGradient id="geminiGrad" x1="2" y1="14" x2="26" y2="14" gradientUnits="userSpaceOnUse">
                              <stop stopColor="#4285F4"/>
                              <stop offset="0.5" stopColor="#9C27B0"/>
                              <stop offset="1" stopColor="#E91E63"/>
                            </linearGradient>
                          </defs>
                        </svg>
                      </div>
                    ),
                    name: "ChatGPT / Gemini", role: "Tra cứu lý thuyết MLN131", color: "#34d399", tag: "Research layer",
                  },
                ].map((tool, i, arr) => (
                  <div key={i} style={{ display: "flex", alignItems: "center", flex: 1, minWidth: 0 }}>
                    <div style={{ flex: 1, borderRadius: 12, padding: "16px 14px", background: `${tool.color}10`, border: `1.5px solid ${tool.color}35` }}>
                      <div style={{ fontSize: "9px", fontWeight: 700, color: tool.color, textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 10, opacity: 0.8 }}>{tool.tag}</div>
                      <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
                        <div style={{ flexShrink: 0 }}>{tool.logo}</div>
                        <span style={{ fontSize: "12px", fontWeight: 800, color: tool.color }}>{tool.name}</span>
                      </div>
                      <p style={{ fontSize: "11.5px", color: T.textSub, lineHeight: 1.55 }}>{tool.role}</p>
                    </div>
                    {i < arr.length - 1 && (
                      <div style={{ padding: "0 6px", flexShrink: 0, color: "rgba(148,163,184,0.4)", fontSize: "16px" }}>→</div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* ── QUY TRÌNH + MỨC ĐỘ ── */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20, marginBottom: 32 }}>

              {/* Timeline quy trình */}
              <div>
                <div style={{ fontSize: "10px", fontWeight: 800, color: "#a78bfa", textTransform: "uppercase", letterSpacing: "0.16em", marginBottom: 16 }}>Quy trình làm việc</div>
                <div style={{ position: "relative", paddingLeft: 28 }}>
                  {/* Vertical line */}
                  <div style={{ position: "absolute", left: 9, top: 8, bottom: 8, width: 2, background: "linear-gradient(to bottom, #818cf8, #f472b6)", borderRadius: 2 }} />
                  {[
                    { label: "Nhập yêu cầu", desc: "Mô tả giao diện, tính năng bằng ngôn ngữ tự nhiên qua Antigravity" },
                    { label: "AI sinh code", desc: "Claude phân tích yêu cầu và viết toàn bộ code React/Tailwind" },
                    { label: "Xem preview", desc: "Kết quả hiển thị ngay trên Figma Make, không cần build thủ công" },
                    { label: "Phản hồi & tinh chỉnh", desc: "Nhận xét trực tiếp trên giao diện, yêu cầu sửa lại nếu chưa đạt" },
                  ].map((step, i) => (
                    <div key={i} style={{ display: "flex", flexDirection: "column", marginBottom: i < 3 ? 18 : 0, position: "relative" }}>
                      <div style={{ position: "absolute", left: -24, top: 2, width: 12, height: 12, borderRadius: "50%", background: i < 2 ? "#818cf8" : "#f472b6", border: "2px solid rgba(15,25,50,1)", boxShadow: `0 0 8px ${i < 2 ? "#818cf8" : "#f472b6"}` }} />
                      <div style={{ fontSize: "12px", fontWeight: 800, color: T.text, marginBottom: 3 }}>{step.label}</div>
                      <div style={{ fontSize: "12px", color: T.textMut, lineHeight: 1.6 }}>{step.desc}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Mức độ phụ thuộc */}
              <div>
                <div style={{ fontSize: "10px", fontWeight: 800, color: "#f472b6", textTransform: "uppercase", letterSpacing: "0.16em", marginBottom: 16 }}>Mức độ phụ thuộc AI</div>
                <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                  {[
                    { label: "Lập trình & giao diện", pct: 95, color: "#818cf8", note: "AI viết toàn bộ code" },
                    { label: "Thiết kế & bố cục", pct: 80, color: "#a78bfa", note: "AI đề xuất, người dùng tinh chỉnh" },
                    { label: "Nội dung lý thuyết", pct: 30, color: "#34d399", note: "Dựa trên giáo trình MLN131" },
                    { label: "Định hướng & ý tưởng", pct: 10, color: "#fbbf24", note: "Hoàn toàn từ người dùng" },
                  ].map((item, i) => (
                    <div key={i}>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 5 }}>
                        <span style={{ fontSize: "12.5px", color: T.textSub, fontWeight: 600 }}>{item.label}</span>
                        <span style={{ fontSize: "18px", fontWeight: 900, color: item.color, lineHeight: 1, textShadow: `0 0 12px ${item.color}` }}>{item.pct}%</span>
                      </div>
                      <div style={{ height: 6, borderRadius: 6, background: "rgba(255,255,255,0.07)", overflow: "hidden", marginBottom: 4 }}>
                        <motion.div
                          initial={{ width: 0 }} animate={{ width: `${item.pct}%` }}
                          transition={{ duration: 1, delay: i * 0.12, ease: "easeOut" }}
                          style={{ height: "100%", borderRadius: 6, background: `linear-gradient(to right, ${item.color}cc, ${item.color})`, boxShadow: `0 0 10px ${item.color}80` }} />
                      </div>
                      <div style={{ fontSize: "10.5px", color: T.textMut }}>{item.note}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* ── CONCEPT MAP & AI ── */}
            <div style={{ marginBottom: 28 }}>
              <div style={{ fontSize: "10px", fontWeight: 800, color: "#7c3aed", textTransform: "uppercase", letterSpacing: "0.16em", marginBottom: 16 }}>
                🗺️ Concept Map — Cách tạo ra & Mức độ phụ thuộc AI
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
                {/* Cách gen */}
                <div style={{ borderRadius: 14, overflow: "hidden", background: "rgba(124,58,237,0.07)", border: "1.5px solid rgba(124,58,237,0.25)" }}>
                  <div style={{ padding: "12px 16px", borderBottom: "1px solid rgba(124,58,237,0.15)", background: "rgba(124,58,237,0.1)" }}>
                    <span style={{ fontSize: "12px", fontWeight: 800, color: "#a78bfa" }}>Cách gen Concept Map bằng AI</span>
                  </div>
                  <div style={{ padding: "14px 16px", display: "flex", flexDirection: "column", gap: 12 }}>
                    {[
                      { step: "1", title: "Xác định cấu trúc nội dung", desc: "Nhóm đọc giáo trình MLN131, xác định các khái niệm trọng tâm của chương 3 và mối quan hệ giữa chúng." },
                      { step: "2", title: "Prompt mô tả sơ đồ", desc: "Mô tả cho Claude: số lượng node, phân cấp (trung tâm → chính → phụ), màu sắc theo nhóm và loại kết nối giữa các node." },
                      { step: "3", title: "AI sinh code SVG", desc: "Claude tạo toàn bộ sơ đồ bằng SVG trong React — tọa độ từng node, đường nối, gradient, animation, và popup thuyết minh." },
                      { step: "4", title: "Tinh chỉnh qua nhiều vòng", desc: "Điều chỉnh màu sắc, kích thước, bố cục, UX popup cho đến khi sơ đồ rõ ràng và dễ nhìn nhất có thể." },
                    ].map((s, i) => (
                      <div key={i} style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
                        <div style={{ width: 22, height: 22, borderRadius: "50%", background: "rgba(124,58,237,0.25)", border: "1.5px solid rgba(124,58,237,0.5)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "10px", fontWeight: 900, color: "#a78bfa", flexShrink: 0, marginTop: 1 }}>
                          {s.step}
                        </div>
                        <div>
                          <div style={{ fontSize: "12px", fontWeight: 700, color: T.text, marginBottom: 2 }}>{s.title}</div>
                          <div style={{ fontSize: "11.5px", color: T.textMut, lineHeight: 1.6 }}>{s.desc}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Phụ thuộc AI */}
                <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                  {/* Mức độ */}
                  <div style={{ borderRadius: 14, overflow: "hidden", background: "rgba(124,58,237,0.07)", border: "1.5px solid rgba(124,58,237,0.25)" }}>
                    <div style={{ padding: "12px 16px", borderBottom: "1px solid rgba(124,58,237,0.15)", background: "rgba(124,58,237,0.1)" }}>
                      <span style={{ fontSize: "12px", fontWeight: 800, color: "#a78bfa" }}>Mức độ phụ thuộc AI trong Concept Map</span>
                    </div>
                    <div style={{ padding: "14px 16px", display: "flex", flexDirection: "column", gap: 10 }}>
                      {[
                        { label: "Lập trình & vẽ sơ đồ (SVG)", pct: 100, color: "#7c3aed", note: "AI viết hoàn toàn — code SVG, animation, popup" },
                        { label: "Bố cục & vị trí node", pct: 70, color: "#a78bfa", note: "AI đề xuất, nhóm điều chỉnh tọa độ" },
                        { label: "Nội dung thuyết minh", pct: 20, color: "#34d399", note: "Từ giáo trình — AI chỉ diễn đạt lại" },
                        { label: "Cấu trúc khái niệm", pct: 5, color: "#fbbf24", note: "Hoàn toàn từ nhóm & giáo trình MLN131" },
                      ].map((item, i) => (
                        <div key={i}>
                          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 4 }}>
                            <span style={{ fontSize: "11.5px", color: T.textSub, fontWeight: 600 }}>{item.label}</span>
                            <span style={{ fontSize: "16px", fontWeight: 900, color: item.color, lineHeight: 1 }}>{item.pct}%</span>
                          </div>
                          <div style={{ height: 5, borderRadius: 5, background: "rgba(255,255,255,0.07)", overflow: "hidden", marginBottom: 3 }}>
                            <motion.div initial={{ width: 0 }} animate={{ width: `${item.pct}%` }}
                              transition={{ duration: 1, delay: i * 0.1, ease: "easeOut" }}
                              style={{ height: "100%", borderRadius: 5, background: `linear-gradient(to right, ${item.color}99, ${item.color})`, boxShadow: `0 0 8px ${item.color}60` }} />
                          </div>
                          <div style={{ fontSize: "10px", color: T.textMut }}>{item.note}</div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Insight box */}
                  <div style={{ borderRadius: 12, padding: "14px 16px", background: "rgba(124,58,237,0.08)", border: "1px solid rgba(124,58,237,0.2)", flex: 1 }}>
                    <div style={{ fontSize: "11px", fontWeight: 800, color: "#a78bfa", marginBottom: 8 }}>💡 Điều AI không thể thay thế</div>
                    <p style={{ fontSize: "12.5px", color: T.textSub, lineHeight: 1.75 }}>
                      Việc <span style={{ color: "#c4b5fd", fontWeight: 700 }}>lựa chọn khái niệm nào</span> đưa vào sơ đồ, <span style={{ color: "#c4b5fd", fontWeight: 700 }}>mối liên hệ nào là trọng tâm</span> và <span style={{ color: "#c4b5fd", fontWeight: 700 }}>ngữ nghĩa chính trị</span> của từng node — đều đến từ sự hiểu biết của nhóm về nội dung giáo trình MLN131. AI chỉ là cây bút vẽ, không phải người thiết kế.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* ── CÁCH PROMPT (CHAT BUBBLE STYLE) ── */}
            <div style={{ marginBottom: 28 }}>
              <div style={{ fontSize: "10px", fontWeight: 800, color: "#fb923c", textTransform: "uppercase", letterSpacing: "0.16em", marginBottom: 16 }}>
                Cách viết prompt — ví dụ thực tế từ dự án
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                {[
                  {
                    tag: "Mô tả giao diện", tagColor: "#818cf8",
                    user: "Làm cho màu sắc concept map dễ nhìn hơn, dùng nền sáng và màu đậm rực cho các node.",
                    principle: "Mô tả kết quả mong muốn — để AI tự quyết định kỹ thuật thực hiện.",
                  },
                  {
                    tag: "Yêu cầu tính năng", tagColor: "#f472b6",
                    user: "Thêm dropdown để nhảy đến từng section, tự động highlight section đang xem khi scroll.",
                    principle: "Đặc tả hành vi + UX cụ thể, không chỉ nói \"thêm tính năng\".",
                  },
                  {
                    tag: "Sửa & tinh chỉnh", tagColor: "#34d399",
                    user: "Cái button này nhìn không phù hợp, làm lại cho nó gọn và đẹp hơn, không có viền lộ.",
                    principle: "Phản hồi dựa trên preview thực tế — chỉ ra vấn đề, không cần biết cách sửa.",
                  },
                  {
                    tag: "Ngữ cảnh học thuật", tagColor: "#fbbf24",
                    user: "Thêm phụ lục AI gồm: công cụ dùng, cách prompt, mức độ phụ thuộc — vì thầy tôi sẽ hỏi.",
                    principle: "Cung cấp lý do thực tế giúp AI hiểu đúng mục tiêu và ưu tiên.",
                  },
                ].map((p, i) => (
                  <div key={i} style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
                    {/* Avatar */}
                    <div style={{ width: 34, height: 34, borderRadius: "50%", background: `${p.tagColor}20`, border: `2px solid ${p.tagColor}50`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "14px", flexShrink: 0, marginTop: 2 }}>👤</div>
                    <div style={{ flex: 1 }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}>
                        <span style={{ fontSize: "9px", fontWeight: 800, color: p.tagColor, textTransform: "uppercase", letterSpacing: "0.1em", background: `${p.tagColor}18`, border: `1px solid ${p.tagColor}35`, borderRadius: 20, padding: "2px 8px" }}>{p.tag}</span>
                      </div>
                      {/* Chat bubble */}
                      <div style={{ borderRadius: "4px 14px 14px 14px", padding: "11px 15px", background: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.1)", marginBottom: 6, position: "relative" }}>
                        <span style={{ fontSize: "13px", color: T.text, lineHeight: 1.65 }}>"{p.user}"</span>
                      </div>
                      {/* Principle */}
                      <div style={{ display: "flex", alignItems: "flex-start", gap: 6, paddingLeft: 4 }}>
                        <span style={{ fontSize: "11px", color: p.tagColor, flexShrink: 0 }}>↳</span>
                        <span style={{ fontSize: "11.5px", color: T.textMut, lineHeight: 1.55 }}>{p.principle}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* ── DISCLAIMER ── */}
            <div style={{ borderRadius: 14, padding: "18px 22px", background: "rgba(251,191,36,0.07)", border: "1.5px solid rgba(251,191,36,0.22)", display: "flex", gap: 16, alignItems: "flex-start" }}>
              <div style={{ width: 40, height: 40, borderRadius: 10, background: "rgba(251,191,36,0.15)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "18px", flexShrink: 0 }}>⚠️</div>
              <div>
                <div style={{ fontSize: "12px", fontWeight: 800, color: "#fbbf24", marginBottom: 7, letterSpacing: "0.03em" }}>Tuyên bố minh bạch</div>
                <p style={{ fontSize: "13px", color: T.textSub, lineHeight: 1.8 }}>
                  <span style={{ color: "#fbbf24", fontWeight: 700 }}>Nội dung lý thuyết</span> lấy từ giáo trình MLN131 và tài liệu chính thống — AI chỉ hỗ trợ diễn đạt và trình bày.{" "}
                  <span style={{ color: "#a78bfa", fontWeight: 700 }}>Toàn bộ giao diện và code</span> do Claude AI sinh ra theo yêu cầu của nhóm.{" "}
                  <span style={{ color: "#34d399", fontWeight: 700 }}>Tư duy sáng tạo và định hướng</span> hoàn toàn đến từ nhóm thực hiện — AI là công cụ, không phải tác giả.
                </p>
              </div>
            </div>
      </CollapsibleSection>
    </div>
  );
}
