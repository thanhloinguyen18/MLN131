import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface Slide { id: number; type: string; data: Record<string, any>; }

const slides: Slide[] = [
  {
    id: 1, type: "title",
    data: {
      subject: "MLN131 · Chủ nghĩa xã hội khoa học",
      chapter: "Chương 3 · Chủ đề 1",
      title: "Thời kỳ quá độ\nlên Chủ nghĩa Xã hội",
      subtitle: "Tổng quan, điều kiện ra đời và những đặc điểm cơ bản",
      tag: "SPST-C3-01 · Đề tài TT/PB",
    },
  },
  {
    id: 2, type: "content",
    data: {
      section: "Phần 1", icon: "🌉", accent: "#f59e0b",
      title: "Tổng quan về Thời kỳ quá độ lên CNXH",
      intro: "Theo quan điểm của các nhà sáng lập CNXH khoa học, sự thay thế hình thái KTXH tư bản chủ nghĩa bằng hình thái KTXH cộng sản chủ nghĩa là một quá trình tất yếu lịch sử.",
      items: [
        { label: "Khái niệm", color: "#f59e0b", text: "Thời kỳ cải biến cách mạng sâu sắc, triệt để và toàn diện từ xã hội cũ (TBCN) sang xã hội mới (cộng sản chủ nghĩa)." },
        { label: "Tính tất yếu", color: "#a78bfa", text: "C. Mác khẳng định giữa XHTB và XHCS là một thời kỳ cải biến cách mạng, tương ứng là thời kỳ quá độ chính trị. V.I. Lênin nhấn mạnh đây là giai đoạn khá lâu dài." },
        { label: "Bản chất", color: "#0ea5e9", text: "Không phải là ý muốn chủ quan, mà là kết quả tất yếu của sự vận động các quy luật lịch sử khách quan." },
      ],
    },
  },
  {
    id: 3, type: "two-col",
    data: {
      section: "Phần 1", icon: "🔄", accent: "#e11d48",
      title: "Hai loại hình quá độ lên CNXH",
      left: {
        label: "Quá độ TRỰC TIẾP", color: "#f43f5e", borderColor: "rgba(244,63,94,0.4)", bg: "rgba(244,63,94,0.06)", icon: "➡️",
        items: ["Từ CNTB phát triển cao lên CNCS", "Áp dụng với nước đã trải qua CNTB phát triển đầy đủ", "Cho đến nay loại hình này chưa từng diễn ra trong thực tế lịch sử"],
        note: "⚠️ Chưa có tiền lệ lịch sử",
      },
      right: {
        label: "Quá độ GIÁN TIẾP", color: "#10b981", borderColor: "rgba(16,185,129,0.4)", bg: "rgba(16,185,129,0.06)", icon: "🪜",
        items: ["Từ CNTB chưa qua giai đoạn phát triển lên CNCS", "Bỏ qua giai đoạn phát triển TBCN tự nhiên", "Áp dụng với Liên Xô, Trung Quốc, Việt Nam và nhiều nước khác"],
        note: "✅ Thực tế lịch sử đã diễn ra",
      },
    },
  },
  {
    id: 4, type: "content",
    data: {
      section: "Phần 2", icon: "🌍", accent: "#f97316",
      title: "Điều kiện khách quan — Kinh tế & Xã hội",
      intro: "Sự ra đời của CNXH không phải là ý muốn chủ quan mà là kết quả tất yếu khi điều kiện khách quan và nhân tố chủ quan hội đủ.",
      items: [
        { label: "Lực lượng sản xuất", color: "#f97316", text: "Dưới CNTB, LLSX phát triển mạnh mẽ và ngày càng có tính xã hội hóa cao — tạo nền tảng vật chất cho CNXH." },
        { label: "Mâu thuẫn cơ bản", color: "#ef4444", text: "Xuất hiện mâu thuẫn gay gắt giữa LLSX mang tính xã hội hóa với QHSX dựa trên chế độ chiếm hữu tư nhân TBCN về tư liệu sản xuất." },
        { label: "Mâu thuẫn giai cấp", color: "#dc2626", text: "Biểu hiện xã hội là cuộc đấu tranh giữa giai cấp công nhân hiện đại với giai cấp tư sản lỗi thời. Khi đạt đỉnh điểm → trở thành tiền đề cho cách mạng xã hội." },
      ],
    },
  },
  {
    id: 5, type: "content",
    data: {
      section: "Phần 2", icon: "🧭", accent: "#0ea5e9",
      title: "Nhân tố chủ quan — Điều kiện bên trong",
      intro: "Bên cạnh điều kiện khách quan, ba nhân tố chủ quan sau đây đóng vai trò quyết định trong việc biến khả năng thành hiện thực.",
      items: [
        { label: "Giai cấp công nhân trưởng thành", color: "#0ea5e9", text: "Giai cấp công nhân phát triển cả về số lượng và chất lượng, đặc biệt là nhận thức được sứ mệnh lịch sử — lực lượng lãnh đạo cách mạng." },
        { label: "Sự lãnh đạo của Đảng Cộng sản", color: "#a78bfa", text: "Đây là nhân tố quan trọng nhất. Đảng là đội tiên phong của giai cấp công nhân, trực tiếp lãnh đạo đấu tranh đánh đổ chế độ cũ, xây dựng xã hội mới." },
        { label: "Khối liên minh giai cấp", color: "#38bdf8", text: "Sự đoàn kết và liên minh giữa giai cấp công nhân với nông dân và các tầng lớp nhân dân lao động khác dưới sự lãnh đạo của Đảng." },
      ],
    },
  },
  {
    id: 6, type: "four-grid",
    data: {
      section: "Phần 3", icon: "⚖️", accent: "#a78bfa",
      title: "Đặc điểm cơ bản của Thời kỳ quá độ",
      subtitle: "Thực chất: sự đan xen và đấu tranh giữa 'dấu vết' xã hội cũ và yếu tố mới của CNXH",
      items: [
        { field: "🏭 Kinh tế", color: "#f97316", text: "Tồn tại nền kinh tế nhiều thành phần, trong đó có các thành phần đối lập (kinh tế tư nhân và kinh tế XHCN)." },
        { field: "🏛️ Chính trị", color: "#e11d48", text: "Thiết lập chuyên chính vô sản — giai cấp công nhân nắm quyền lực nhà nước, trấn áp GCTS đã bị đánh bại, tổ chức xây dựng xã hội mới." },
        { field: "🎭 Tư tưởng - Văn hóa", color: "#a78bfa", text: "Tồn tại nhiều loại tư tưởng, văn hóa. Từng bước xây dựng nền văn hóa XHCN, tiếp thu tinh hoa nhân loại, xóa bỏ tàn dư lạc hậu." },
        { field: "👥 Xã hội", color: "#0ea5e9", text: "Tồn tại nhiều giai cấp vừa hợp tác vừa đấu tranh. Có sự khác biệt nông thôn - thành thị, lao động trí óc - chân tay." },
      ],
    },
  },
  {
    id: 7, type: "summary",
    data: {
      section: "Kết luận",
      title: "Nhận định tổng quát",
      quote: "Thời kỳ quá độ lên CNXH là một giai đoạn lịch sử lâu dài, gian khổ và phức tạp.",
      points: [
        { icon: "🔍", text: "Hiểu rõ điều kiện khách quan và chủ quan giúp kiên định con đường đi lên CNXH" },
        { icon: "📐", text: "Phù hợp với quy luật tiến hóa của lịch sử và điều kiện cụ thể của mỗi quốc gia" },
        { icon: "🇻🇳", text: "Việt Nam đi theo con đường quá độ gián tiếp — đặc điểm riêng đòi hỏi lộ trình phù hợp" },
        { icon: "⏳", text: "Không thể nóng vội, phải từng bước vững chắc qua nhiều chặng phát triển" },
      ],
      refs: ["C. Mác — Phê phán Cương lĩnh Gotha (1875)", "V.I. Lênin — Nhà nước và Cách mạng (1917)"],
    },
  },
];

/* ─── Slide renderers ─── */

function TitleSlide({ data }: { data: Record<string, any> }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", height: "100%", textAlign: "center", padding: "40px 48px", background: "linear-gradient(160deg, #06080f 0%, #0f0a1e 40%, #060c18 100%)", position: "relative", overflow: "hidden" }}>
      {/* Grid lines */}
      <div style={{ position: "absolute", inset: 0, opacity: 0.04, backgroundImage: "linear-gradient(rgba(14,165,233,1) 1px, transparent 1px), linear-gradient(90deg, rgba(14,165,233,1) 1px, transparent 1px)", backgroundSize: "40px 40px" }} />
      {/* Glows */}
      <div style={{ position: "absolute", top: "10%", left: "30%", width: 400, height: 400, borderRadius: "50%", background: "radial-gradient(circle, rgba(225,29,72,0.12) 0%, transparent 65%)", pointerEvents: "none" }} />
      <div style={{ position: "absolute", bottom: "10%", right: "25%", width: 350, height: 350, borderRadius: "50%", background: "radial-gradient(circle, rgba(14,165,233,0.1) 0%, transparent 65%)", pointerEvents: "none" }} />

      <div style={{ position: "relative", zIndex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 0 }}>
        <span style={{ fontSize: "10px", fontWeight: 700, color: "rgba(225,29,72,0.85)", textTransform: "uppercase", letterSpacing: "0.2em", background: "rgba(225,29,72,0.1)", border: "1px solid rgba(225,29,72,0.3)", borderRadius: 4, padding: "3px 14px", marginBottom: 16 }}>
          {data.subject}
        </span>
        <div style={{ fontSize: "11px", color: "rgba(14,165,233,0.7)", letterSpacing: "0.1em", fontWeight: 600, marginBottom: 12 }}>{data.chapter}</div>
        <h1 style={{ fontSize: "clamp(26px,4.5vw,46px)", fontWeight: 900, color: "#f1f5f9", lineHeight: 1.15, whiteSpace: "pre-line", letterSpacing: "-0.02em", marginBottom: 16 }}>
          {data.title}
        </h1>
        <div style={{ width: 80, height: 3, background: "linear-gradient(to right, #e11d48, #a78bfa, #0ea5e9)", borderRadius: 4, marginBottom: 16 }} />
        <p style={{ fontSize: "14px", color: "rgba(148,163,184,0.8)", maxWidth: 480, lineHeight: 1.75, marginBottom: 24 }}>{data.subtitle}</p>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <span style={{ fontSize: "22px" }}>☭</span>
          <span style={{ fontSize: "10.5px", color: "rgba(100,116,139,0.7)", fontWeight: 600, letterSpacing: "0.1em" }}>{data.tag}</span>
        </div>
      </div>
    </div>
  );
}

function ContentSlide({ data }: { data: Record<string, any> }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100%", background: "#080e1c" }}>
      {/* Header */}
      <div style={{ padding: "22px 32px 18px", borderBottom: `2px solid ${data.accent}`, background: "rgba(255,255,255,0.02)" }}>
        <div style={{ fontSize: "9.5px", fontWeight: 700, color: data.accent, textTransform: "uppercase", letterSpacing: "0.16em", marginBottom: 7 }}>
          {data.section} &nbsp;{data.icon}
        </div>
        <h2 style={{ fontSize: "clamp(17px,2.2vw,23px)", fontWeight: 800, color: "#f1f5f9", lineHeight: 1.3 }}>{data.title}</h2>
      </div>

      <div style={{ display: "flex", flexDirection: "column", flex: 1, padding: "18px 32px", gap: 12, overflow: "auto" }}>
        {data.intro && (
          <p style={{ fontSize: "12.5px", color: "rgba(148,163,184,0.75)", lineHeight: 1.75, fontStyle: "italic", borderLeft: `3px solid ${data.accent}40`, paddingLeft: 14 }}>
            {data.intro}
          </p>
        )}
        {data.items?.map((item: any, i: number) => (
          <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: 12, background: "rgba(255,255,255,0.03)", border: `1px solid ${item.color}20`, borderLeft: `3px solid ${item.color}`, borderRadius: 10, padding: "14px 16px" }}>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: "10px", fontWeight: 800, color: item.color, textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 5 }}>{item.label}</div>
              <p style={{ fontSize: "13px", color: "rgba(203,213,225,0.85)", lineHeight: 1.7 }}>{item.text}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function TwoColSlide({ data }: { data: Record<string, any> }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100%", background: "#080e1c" }}>
      <div style={{ padding: "22px 32px 18px", borderBottom: `2px solid ${data.accent}`, background: "rgba(255,255,255,0.02)" }}>
        <div style={{ fontSize: "9.5px", fontWeight: 700, color: data.accent, textTransform: "uppercase", letterSpacing: "0.16em", marginBottom: 7 }}>{data.section} &nbsp;{data.icon}</div>
        <h2 style={{ fontSize: "clamp(17px,2.2vw,23px)", fontWeight: 800, color: "#f1f5f9", lineHeight: 1.3 }}>{data.title}</h2>
      </div>
      <div style={{ display: "flex", gap: 16, flex: 1, padding: "18px 32px", overflow: "auto" }}>
        {[data.left, data.right].map((col: any, ci: number) => (
          <div key={ci} style={{ flex: 1, borderRadius: 12, padding: "18px 20px", background: col.bg, border: `1.5px solid ${col.borderColor}`, display: "flex", flexDirection: "column", gap: 12 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8, paddingBottom: 10, borderBottom: `1px solid ${col.borderColor}` }}>
              <span style={{ fontSize: "20px" }}>{col.icon}</span>
              <div style={{ fontSize: "12.5px", fontWeight: 800, color: col.color }}>{col.label}</div>
            </div>
            {col.items?.map((item: string, i: number) => (
              <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: 8 }}>
                <span style={{ color: col.color, flexShrink: 0, fontSize: "11px", marginTop: 3 }}>▸</span>
                <span style={{ fontSize: "12.5px", color: "rgba(203,213,225,0.85)", lineHeight: 1.65 }}>{item}</span>
              </div>
            ))}
            {col.note && (
              <div style={{ marginTop: "auto", paddingTop: 10, borderTop: `1px dashed ${col.borderColor}`, fontSize: "11.5px", color: col.color, fontWeight: 700 }}>{col.note}</div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

function FourGridSlide({ data }: { data: Record<string, any> }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100%", background: "#080e1c" }}>
      <div style={{ padding: "22px 32px 16px", borderBottom: `2px solid ${data.accent}`, background: "rgba(255,255,255,0.02)" }}>
        <div style={{ fontSize: "9.5px", fontWeight: 700, color: data.accent, textTransform: "uppercase", letterSpacing: "0.16em", marginBottom: 7 }}>{data.section} &nbsp;{data.icon}</div>
        <h2 style={{ fontSize: "clamp(16px,2vw,22px)", fontWeight: 800, color: "#f1f5f9", lineHeight: 1.3 }}>{data.title}</h2>
        {data.subtitle && <p style={{ fontSize: "11.5px", color: "rgba(148,163,184,0.6)", marginTop: 5, fontStyle: "italic" }}>{data.subtitle}</p>}
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, flex: 1, padding: "16px 32px", overflow: "auto" }}>
        {data.items?.map((item: any, i: number) => (
          <div key={i} style={{ borderRadius: 10, padding: "14px 16px", background: "rgba(255,255,255,0.03)", border: `1px solid ${item.color}25`, borderLeft: `3px solid ${item.color}`, display: "flex", flexDirection: "column", gap: 6 }}>
            <div style={{ fontSize: "10.5px", fontWeight: 800, color: item.color, textTransform: "uppercase", letterSpacing: "0.08em" }}>{item.field}</div>
            <p style={{ fontSize: "12.5px", color: "rgba(203,213,225,0.82)", lineHeight: 1.65 }}>{item.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function SummarySlide({ data }: { data: Record<string, any> }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100%", background: "linear-gradient(160deg, #060c18 0%, #0f0a1e 100%)", position: "relative", overflow: "hidden" }}>
      <div style={{ position: "absolute", inset: 0, opacity: 0.03, backgroundImage: "linear-gradient(rgba(14,165,233,1) 1px, transparent 1px), linear-gradient(90deg, rgba(14,165,233,1) 1px, transparent 1px)", backgroundSize: "40px 40px", pointerEvents: "none" }} />
      <div style={{ padding: "22px 32px 16px", borderBottom: "1px solid rgba(255,255,255,0.08)", position: "relative" }}>
        <div style={{ fontSize: "9.5px", fontWeight: 700, color: "rgba(167,139,250,0.8)", textTransform: "uppercase", letterSpacing: "0.16em", marginBottom: 7 }}>{data.section}</div>
        <h2 style={{ fontSize: "clamp(18px,2.5vw,26px)", fontWeight: 800, color: "#f1f5f9" }}>{data.title}</h2>
      </div>
      <div style={{ display: "flex", flexDirection: "column", flex: 1, padding: "16px 32px 20px", gap: 12, overflow: "auto", position: "relative" }}>
        <div style={{ borderRadius: 10, padding: "14px 18px", background: "rgba(245,158,11,0.08)", border: "1px solid rgba(245,158,11,0.25)" }}>
          <p style={{ fontSize: "14px", fontWeight: 600, color: "#fde68a", lineHeight: 1.65, fontStyle: "italic" }}>"{data.quote}"</p>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, flex: 1 }}>
          {data.points?.map((p: any, i: number) => (
            <div key={i} style={{ borderRadius: 10, padding: "12px 14px", background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", display: "flex", alignItems: "flex-start", gap: 10 }}>
              <span style={{ fontSize: "18px", flexShrink: 0 }}>{p.icon}</span>
              <span style={{ fontSize: "12.5px", color: "rgba(203,213,225,0.82)", lineHeight: 1.65 }}>{p.text}</span>
            </div>
          ))}
        </div>
        <div style={{ borderTop: "1px solid rgba(255,255,255,0.08)", paddingTop: 10 }}>
          <div style={{ fontSize: "9px", color: "rgba(100,116,139,0.6)", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 6 }}>Tài liệu tham khảo</div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
            {data.refs?.map((r: string, i: number) => (
              <span key={i} style={{ fontSize: "10.5px", color: "rgba(196,181,253,0.8)", background: "rgba(124,58,237,0.12)", border: "1px solid rgba(124,58,237,0.25)", borderRadius: 20, padding: "3px 12px" }}>
                📖 {r}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function renderSlide(slide: Slide) {
  switch (slide.type) {
    case "title":     return <TitleSlide data={slide.data} />;
    case "content":   return <ContentSlide data={slide.data} />;
    case "two-col":   return <TwoColSlide data={slide.data} />;
    case "four-grid": return <FourGridSlide data={slide.data} />;
    case "summary":   return <SummarySlide data={slide.data} />;
    default:          return null;
  }
}

const thumbAccents = ["#e11d48", "#f59e0b", "#e11d48", "#f97316", "#0ea5e9", "#a78bfa", "#0ea5e9"];

export function SlideShow() {
  const [current, setCurrent] = useState(0);
  const [dir, setDir] = useState(1);

  const go = (next: number) => { setDir(next > current ? 1 : -1); setCurrent(next); };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
      {/* Viewer */}
      <div style={{ borderRadius: 16, overflow: "hidden", aspectRatio: "16/9", position: "relative", border: "1px solid rgba(255,255,255,0.1)", boxShadow: "0 0 40px rgba(0,0,0,0.5)" }}>
        <AnimatePresence mode="wait" custom={dir}>
          <motion.div key={slides[current].id} custom={dir}
            initial={{ x: dir * 40, opacity: 0 }} animate={{ x: 0, opacity: 1 }} exit={{ x: dir * -40, opacity: 0 }}
            transition={{ duration: 0.22, ease: "easeInOut" }}
            style={{ position: "absolute", inset: 0, fontFamily: "Be Vietnam Pro, sans-serif" }}>
            {renderSlide(slides[current])}
          </motion.div>
        </AnimatePresence>

        {/* Slide counter */}
        <div style={{ position: "absolute", top: 12, right: 14, background: "rgba(0,0,0,0.55)", backdropFilter: "blur(8px)", borderRadius: 20, padding: "3px 12px", fontSize: "10.5px", color: "rgba(255,255,255,0.75)", fontWeight: 600, zIndex: 10, border: "1px solid rgba(255,255,255,0.1)" }}>
          {current + 1} / {slides.length}
        </div>
      </div>

      {/* Controls */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12 }}>
        <button onClick={() => current > 0 && go(current - 1)} disabled={current === 0}
          style={{ display: "flex", alignItems: "center", gap: 6, padding: "9px 18px", borderRadius: 10, fontSize: "13px", fontWeight: 600, cursor: current === 0 ? "not-allowed" : "pointer", fontFamily: "Be Vietnam Pro, sans-serif", background: current === 0 ? "rgba(255,255,255,0.03)" : "rgba(255,255,255,0.06)", color: current === 0 ? "rgba(100,116,139,0.5)" : "#cbd5e1", border: "1px solid rgba(255,255,255,0.08)", transition: "all 0.2s" }}>
          <ChevronLeft size={15} /> Trước
        </button>

        {/* Dots */}
        <div style={{ display: "flex", alignItems: "center", gap: 6, flexWrap: "wrap", justifyContent: "center" }}>
          {slides.map((_, i) => (
            <button key={i} onClick={() => go(i)}
              style={{ width: current === i ? 22 : 7, height: 7, borderRadius: 4, background: current === i ? thumbAccents[i] || "#0ea5e9" : "rgba(255,255,255,0.15)", border: "none", cursor: "pointer", transition: "all 0.25s", boxShadow: current === i ? `0 0 8px ${thumbAccents[i] || "#0ea5e9"}` : "none" }} />
          ))}
        </div>

        <button onClick={() => current < slides.length - 1 && go(current + 1)} disabled={current === slides.length - 1}
          style={{ display: "flex", alignItems: "center", gap: 6, padding: "9px 18px", borderRadius: 10, fontSize: "13px", fontWeight: 600, cursor: current === slides.length - 1 ? "not-allowed" : "pointer", fontFamily: "Be Vietnam Pro, sans-serif", background: current === slides.length - 1 ? "rgba(255,255,255,0.03)" : "linear-gradient(135deg, #0ea5e9, #0284c7)", color: current === slides.length - 1 ? "rgba(100,116,139,0.5)" : "#fff", border: `1px solid ${current === slides.length - 1 ? "rgba(255,255,255,0.08)" : "transparent"}`, transition: "all 0.2s", boxShadow: current === slides.length - 1 ? "none" : "0 0 16px rgba(14,165,233,0.35)" }}>
          Tiếp <ChevronRight size={15} />
        </button>
      </div>

      {/* Thumbnail strip */}
      <div style={{ borderRadius: 14, padding: "12px 14px", background: "rgba(13,21,38,0.8)", border: "1px solid rgba(255,255,255,0.07)" }}>
        <div style={{ fontSize: "9px", fontWeight: 700, color: "rgba(100,116,139,0.6)", textTransform: "uppercase", letterSpacing: "0.12em", marginBottom: 10 }}>
          Danh sách slide
        </div>
        <div style={{ display: "flex", gap: 8, overflowX: "auto", paddingBottom: 4 }}>
          {slides.map((s, i) => (
            <button key={i} onClick={() => go(i)}
              style={{ flexShrink: 0, width: 96, height: 58, borderRadius: 8, overflow: "hidden", cursor: "pointer", position: "relative", background: "#080e1c", border: current === i ? `2px solid ${thumbAccents[i]}` : "2px solid rgba(255,255,255,0.08)", boxShadow: current === i ? `0 0 10px ${thumbAccents[i]}40` : "none", transition: "all 0.2s" }}>
              <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: 6, gap: 2 }}>
                <div style={{ width: 28, height: 2.5, borderRadius: 2, background: thumbAccents[i], boxShadow: `0 0 6px ${thumbAccents[i]}` }} />
                <div style={{ fontSize: "7.5px", fontWeight: 700, color: current === i ? thumbAccents[i] : "rgba(148,163,184,0.6)", textAlign: "center", lineHeight: 1.3, marginTop: 3 }}>
                  {s.data.title?.split("\n")?.[0]?.slice(0, 20) || s.type}
                </div>
                <div style={{ fontSize: "6.5px", color: "rgba(100,116,139,0.5)", marginTop: 1 }}>Slide {i + 1}</div>
              </div>
              {current === i && <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: 2.5, background: thumbAccents[i], boxShadow: `0 0 6px ${thumbAccents[i]}` }} />}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
