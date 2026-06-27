import { motion, AnimatePresence } from "motion/react";
import type { Node } from "./ConceptMap";

interface InfoPanelProps { node: Node | null; }

const styles: Record<string, { bar: string; label: string; dot: string }> = {
  "#fbbf24": { bar: "#fbbf24", label: "#fbbf24", dot: "#fbbf24" },
  "#ff3d6b": { bar: "#ff3d6b", label: "#ff6b8a", dot: "#ff3d6b" },
  "#34d399": { bar: "#34d399", label: "#34d399", dot: "#34d399" },
  "#fb923c": { bar: "#fb923c", label: "#fb923c", dot: "#fb923c" },
  "#38bdf8": { bar: "#38bdf8", label: "#38bdf8", dot: "#38bdf8" },
  "#fdba74": { bar: "#fdba74", label: "#fdba74", dot: "#fdba74" },
  "#7dd3fc": { bar: "#7dd3fc", label: "#7dd3fc", dot: "#7dd3fc" },
  "#c084fc": { bar: "#c084fc", label: "#c084fc", dot: "#c084fc" },
};
const fallback = { bar: "#64748b", label: "rgba(148,163,184,0.9)", dot: "#64748b" };

const overview = {
  sections: [
    { label: "Bản chất", text: "Giai đoạn cải biến cách mạng toàn diện, tất yếu về kinh tế, chính trị, văn hóa và tư tưởng." },
    { label: "Đặc điểm", text: "Lâu dài, nhiều bước trung gian, đầy mâu thuẫn giữa cái mới và cái cũ." },
    { label: "Hướng dẫn", text: "Nhấp vào từng nút để xem chi tiết từng khái niệm trong sơ đồ." },
  ],
  legend: [
    { color: "#ff3d6b", label: "CNTB — điểm xuất phát" },
    { color: "#fbbf24", label: "Thời kỳ quá độ (trung tâm)" },
    { color: "#34d399", label: "CNXH — đích đến" },
    { color: "#fb923c", label: "Điều kiện khách quan" },
    { color: "#38bdf8", label: "Điều kiện chủ quan" },
    { color: "#c084fc", label: "Đặc trưng của quá độ" },
  ],
};

export function InfoPanel({ node }: InfoPanelProps) {
  const s = node ? (styles[node.color] || fallback) : fallback;

  return (
    <AnimatePresence mode="wait">
      {node ? (
        <motion.div key={node.id}
          initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }}
          transition={{ duration: 0.2 }}
          className="flex flex-col gap-2.5">

          {/* Header */}
          <div style={{ borderRadius: 10, padding: "12px 14px", background: "rgba(255,255,255,0.04)", borderLeft: `3px solid ${s.bar}`, border: `1px solid rgba(255,255,255,0.07)`, borderLeftWidth: 3, borderLeftColor: s.bar }}>
            <div style={{ fontSize: "9.5px", fontWeight: 700, color: s.label, textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 5 }}>
              {node.icon} &nbsp;Chi tiết nội dung
            </div>
            <div style={{ fontSize: "13.5px", fontWeight: 700, color: "#f1f5f9", lineHeight: 1.4 }}>
              {node.description}
            </div>
          </div>

          {/* Details */}
          {node.details.map((d, i) => (
            <motion.div key={i}
              initial={{ opacity: 0, x: 8 }} animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.05 }}
              style={{ display: "flex", alignItems: "flex-start", gap: 10, borderRadius: 8, padding: "9px 12px", background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)" }}>
              <div style={{ width: 6, height: 6, borderRadius: "50%", background: s.dot, flexShrink: 0, marginTop: 5, boxShadow: `0 0 6px ${s.dot}` }} />
              <span style={{ fontSize: "12.5px", color: "rgba(203,213,225,0.85)", lineHeight: 1.65 }}>{d}</span>
            </motion.div>
          ))}

          <div style={{ textAlign: "right", marginTop: 2 }}>
            <span style={{ fontSize: "10px", fontWeight: 600, color: s.label, background: `${s.bar}15`, border: `1px solid ${s.bar}30`, borderRadius: 20, padding: "3px 10px" }}>
              MLN131 · Chương 3
            </span>
          </div>
        </motion.div>
      ) : (
        <motion.div key="overview"
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          className="flex flex-col gap-2.5">

          <div style={{ borderRadius: 10, padding: "12px 14px", background: "rgba(245,158,11,0.06)", border: "1px solid rgba(245,158,11,0.2)", borderLeft: "3px solid #f59e0b" }}>
            <div style={{ fontSize: "9.5px", fontWeight: 700, color: "rgba(251,191,36,0.8)", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 5 }}>
              🌉 &nbsp;Tổng quan sơ đồ
            </div>
            <div style={{ fontSize: "13px", fontWeight: 700, color: "#f1f5f9", lineHeight: 1.4 }}>
              Cây cầu lịch sử: CNTB → CNXH
            </div>
          </div>

          {overview.sections.map((sec, i) => (
            <div key={i} style={{ borderRadius: 8, padding: "9px 12px", background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)" }}>
              <div style={{ fontSize: "9.5px", fontWeight: 700, color: "rgba(245,158,11,0.8)", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 4 }}>
                {sec.label}
              </div>
              <p style={{ fontSize: "12.5px", color: "rgba(203,213,225,0.8)", lineHeight: 1.6 }}>{sec.text}</p>
            </div>
          ))}

          <div style={{ borderRadius: 8, padding: "10px 12px", background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)" }}>
            <div style={{ fontSize: "9.5px", fontWeight: 700, color: "rgba(148,163,184,0.7)", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 8 }}>
              Chú thích màu
            </div>
            <div className="flex flex-col gap-1.5">
              {overview.legend.map((l, i) => (
                <div key={i} style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <div style={{ width: 8, height: 8, borderRadius: "50%", background: l.color, flexShrink: 0, boxShadow: `0 0 5px ${l.color}` }} />
                  <span style={{ fontSize: "11.5px", color: "rgba(148,163,184,0.8)" }}>{l.label}</span>
                </div>
              ))}
            </div>
          </div>

          <div style={{ textAlign: "center", marginTop: 2 }}>
            <span style={{ fontSize: "11px", color: "rgba(100,116,139,0.6)" }}>↑ Nhấp vào nút để xem chi tiết</span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
