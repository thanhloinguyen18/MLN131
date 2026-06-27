import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X } from "lucide-react";

export interface Node {
  id: string;
  label: string;
  sublabel?: string;
  x: number;
  y: number;
  type: "center" | "endpoint" | "main" | "sub" | "bridge";
  color: string;
  textColor: string;
  description: string;
  details: string[];
  icon: string;
}

export const nodes: Node[] = [
  { id:"cntb",   label:"CHỦ NGHĨA\nTƯ BẢN",       sublabel:"Điểm xuất phát",          x:60,  y:255, type:"endpoint", color:"#dc2626", textColor:"#fff",    icon:"🏭", description:"Chủ nghĩa tư bản — Điểm xuất phát",        details:["Nền kinh tế hàng hóa TBCN phát triển cao","Chế độ tư hữu về tư liệu sản xuất","Giai cấp tư sản thống trị về kinh tế và chính trị","Bóc lột giá trị thặng dư từ giai cấp công nhân","Mâu thuẫn nội tại ngày càng sâu sắc — tất yếu sụp đổ"] },
  { id:"cnxh",   label:"CHỦ NGHĨA\nXÃ HỘI",        sublabel:"Đích đến tất yếu",         x:790, y:255, type:"endpoint", color:"#16a34a", textColor:"#fff",    icon:"🌿", description:"Chủ nghĩa xã hội — Mục tiêu",              details:["Sở hữu xã hội về tư liệu sản xuất","Phân phối theo lao động và nhu cầu","Giai cấp công nhân làm chủ nhà nước và xã hội","Xóa bỏ hoàn toàn bóc lột, áp bức, bất bình đẳng","Phát triển toàn diện lực lượng và quan hệ sản xuất"] },
  { id:"qd",     label:"THỜI KỲ QUÁ ĐỘ",           sublabel:"Cây cầu lịch sử tất yếu", x:480, y:183, type:"center",   color:"#7c3aed", textColor:"#fff",    icon:"🌉", description:"Thời kỳ quá độ lên CNXH",                  details:["Giai đoạn lịch sử tất yếu — không thể bỏ qua","Thời kỳ cải biến cách mạng sâu sắc và toàn diện","Tồn tại đan xen yếu tố cũ và mới trên mọi lĩnh vực","LLSX chưa đạt trình độ để xây dựng CNXH ngay","Nhà nước chuyên chính vô sản giữ vai trò chủ đạo"] },
  { id:"kq",     label:"Điều kiện\nkhách quan",     x:170, y:408, type:"main",     color:"#ea580c", textColor:"#fff",    icon:"🌍", description:"Điều kiện khách quan",                      details:["LLSX còn thấp kém, chưa phát triển đồng đều","QHSX cũ còn tồn tại dai dẳng trong xã hội","Tàn dư tư tưởng, lối sống cũ chưa bị xóa bỏ","Nền kinh tế nhiều thành phần đan xen phức tạp","Áp lực, phá hoại từ các thế lực thù địch quốc tế"] },
  { id:"cq",     label:"Điều kiện\nchủ quan",       x:710, y:408, type:"main",     color:"#0369a1", textColor:"#fff",    icon:"🧭", description:"Điều kiện chủ quan",                        details:["Sự lãnh đạo đúng đắn, sáng tạo của Đảng Cộng sản","Sức mạnh và ý thức giác ngộ của GCCN","Liên minh vững chắc: công - nông - trí thức","Chính sách, pháp luật phù hợp quy luật khách quan","Tiếp thu thành tựu KH-CN và kinh nghiệm quản lý"] },
  { id:"lld",    label:"Lực lượng\nsản xuất",       x:55,  y:535, type:"sub",      color:"#c2410c", textColor:"#fff",    icon:"⚙️", description:"Lực lượng sản xuất",                       details:["Công nghiệp hóa, hiện đại hóa toàn diện","Phát triển mạnh khoa học - công nghệ","Nâng cao trình độ và kỹ năng người lao động","Xây dựng cơ sở vật chất - kỹ thuật của CNXH"] },
  { id:"qhsx",   label:"Quan hệ\nsản xuất",         x:240, y:535, type:"sub",      color:"#c2410c", textColor:"#fff",    icon:"🔗", description:"Quan hệ sản xuất",                          details:["Từng bước xác lập QHSX XHCN","Nhà nước nắm giữ các ngành kinh tế then chốt","Phát triển kinh tế tập thể và hợp tác xã","Tiến dần tới xã hội hóa tư liệu sản xuất"] },
  { id:"dcs",    label:"Đảng\nlãnh đạo",            x:615, y:535, type:"sub",      color:"#075985", textColor:"#fff",    icon:"⭐", description:"Sự lãnh đạo của Đảng Cộng sản",            details:["Đường lối chính trị đúng đắn, sáng tạo","Kiên định mục tiêu độc lập dân tộc và CNXH","Đổi mới tư duy, phù hợp thực tiễn đất nước","Xây dựng Đảng trong sạch, vững mạnh, uy tín"] },
  { id:"gcn",    label:"Giai cấp\ncông nhân",       x:795, y:535, type:"sub",      color:"#075985", textColor:"#fff",    icon:"✊", description:"Vai trò giai cấp công nhân",               details:["Giai cấp tiên tiến, lãnh đạo cách mạng XHCN","Liên minh chiến lược với nông dân và trí thức","Nâng cao ý thức giác ngộ và văn hóa chính trị","Xây dựng nhà nước thực sự của nhân dân lao động"] },
  { id:"laulai", label:"Lâu dài\nNhiều bước",       x:335, y:355, type:"bridge",   color:"#5b21b6", textColor:"#fff",    icon:"⏳", description:"Tính lâu dài và nhiều bước trung gian",     details:["Không thể thực hiện ngay trong thời gian ngắn","Phải trải qua nhiều chặng phát triển kế tiếp","Phụ thuộc điều kiện lịch sử cụ thể của mỗi nước","Mỗi bước tiến là nền tảng vững chắc cho bước sau"] },
  { id:"dauco",  label:"Đấu tranh\nPhức tạp",       x:570, y:355, type:"bridge",   color:"#5b21b6", textColor:"#fff",    icon:"⚔️", description:"Đấu tranh giai cấp trong thời kỳ quá độ",  details:["Diễn ra gay gắt, phức tạp dưới nhiều hình thức","Cái mới - cái cũ đan xen, xung đột quyết liệt","Chống tư tưởng phản động, cơ hội, xét lại","Bảo vệ và củng cố thành quả cách mạng XHCN"] },
];

const EDGES = [
  { from:"cntb",   to:"qd",      color:"#dc2626", label:"quá độ →", dashed:false },
  { from:"qd",     to:"cnxh",    color:"#16a34a", label:"→ hướng tới", dashed:false },
  { from:"qd",     to:"kq",      color:"#ea580c", dashed:false },
  { from:"qd",     to:"cq",      color:"#0369a1", dashed:false },
  { from:"kq",     to:"lld",     color:"#c2410c", dashed:true },
  { from:"kq",     to:"qhsx",    color:"#c2410c", dashed:true },
  { from:"cq",     to:"dcs",     color:"#075985", dashed:true },
  { from:"cq",     to:"gcn",     color:"#075985", dashed:true },
  { from:"qd",     to:"laulai",  color:"#7c3aed", dashed:true },
  { from:"qd",     to:"dauco",   color:"#7c3aed", dashed:true },
];

function cx(n: Node) {
  if (n.type === "center")   return { x: n.x,        y: n.y };
  if (n.type === "endpoint") return { x: n.x + 74,   y: n.y + 44 };
  if (n.type === "main")     return { x: n.x + 72,   y: n.y + 34 };
  if (n.type === "bridge")   return { x: n.x + 66,   y: n.y + 28 };
  return                            { x: n.x + 62,   y: n.y + 28 };
}

/* ── Node renderer ── */
function MapNode({ node, selected, onClick }: { node: Node; selected: boolean; onClick: () => void }) {
  const delay = { center:0.1, endpoint:0.2, main:0.4, bridge:0.5, sub:0.65 }[node.type];
  const lines = node.label.split("\n");

  const dims: Record<string, { w: number; h: number; rx: number }> = {
    endpoint: { w: 148, h: 88, rx: 14 },
    main:     { w: 144, h: 68, rx: 34 },
    bridge:   { w: 132, h: 56, rx: 10 },
    sub:      { w: 124, h: 56, rx: 10 },
  };
  const d = dims[node.type];

  return (
    <motion.g onClick={onClick} style={{ cursor: "pointer" }}
      whileHover={{ scale: 1.07 }} whileTap={{ scale: 0.95 }}
      initial={{ scale: 0, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
      transition={{ type: "spring", stiffness: 240, damping: 20, delay }}>

      {node.type === "center" ? (
        <>
          {selected && (
            <motion.ellipse cx={node.x} cy={node.y} rx={130} ry={62} fill="none"
              stroke={node.color} strokeWidth={2.5} opacity={0.4}
              animate={{ rx:[124,136,124], ry:[56,66,56] }}
              transition={{ repeat:Infinity, duration:2.2, ease:"easeInOut" }} />
          )}
          <defs>
            <radialGradient id="gc" cx="50%" cy="30%" r="70%">
              <stop offset="0%" stopColor="#9f67ff" />
              <stop offset="100%" stopColor="#5b21b6" />
            </radialGradient>
          </defs>
          <ellipse cx={node.x} cy={node.y} rx={118} ry={52} fill="url(#gc)"
            stroke={selected ? "#fff" : "rgba(255,255,255,0.5)"} strokeWidth={selected ? 2.5 : 1.5}
            style={{ filter:"drop-shadow(0 6px 18px rgba(124,58,237,0.55))" }} />
          <text x={node.x} y={node.y - 8} textAnchor="middle" fill="#fff"
            style={{ fontSize:"12.5px", fontWeight:900, fontFamily:"Be Vietnam Pro,sans-serif", letterSpacing:"0.05em" }}>
            {node.label}
          </text>
          <text x={node.x} y={node.y + 10} textAnchor="middle" fill="rgba(255,255,255,0.75)"
            style={{ fontSize:"9px", fontFamily:"Be Vietnam Pro,sans-serif" }}>
            ── {node.sublabel} ──
          </text>
        </>
      ) : (
        <>
          {selected && (
            <rect x={node.x - 5} y={node.y - 5} width={d.w + 10} height={d.h + 10} rx={d.rx + 4}
              fill="none" stroke={node.color} strokeWidth={2.5} opacity={0.5}
              style={{ filter:`drop-shadow(0 0 8px ${node.color})` }} />
          )}
          <defs>
            <linearGradient id={`g-${node.id}`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={node.color} stopOpacity="1" />
              <stop offset="100%" stopColor={node.color} stopOpacity="0.75" />
            </linearGradient>
          </defs>
          <rect x={node.x} y={node.y} width={d.w} height={d.h} rx={d.rx}
            fill={`url(#g-${node.id})`}
            stroke={selected ? "#fff" : "rgba(255,255,255,0.4)"} strokeWidth={selected ? 2 : 1}
            style={{ filter:`drop-shadow(0 4px 12px ${node.color}60)` }} />

          {/* icon */}
          <text x={node.x + d.w / 2} y={node.y + (node.type === "endpoint" ? 22 : 20)} textAnchor="middle"
            style={{ fontSize: node.type === "endpoint" ? "18px" : "14px" }}>
            {node.icon}
          </text>

          {/* label */}
          {lines.map((ln, i) => (
            <text key={i}
              x={node.x + d.w / 2}
              y={node.y + (node.type === "endpoint" ? 40 : 34) + i * 14}
              textAnchor="middle" fill={node.textColor}
              style={{ fontSize: node.type === "endpoint" ? "10.5px" : "10px", fontWeight:800, fontFamily:"Be Vietnam Pro,sans-serif" }}>
              {ln}
            </text>
          ))}

          {/* sublabel for endpoints */}
          {node.sublabel && node.type === "endpoint" && (
            <text x={node.x + d.w / 2} y={node.y + 72} textAnchor="middle"
              fill="rgba(255,255,255,0.7)"
              style={{ fontSize:"8.5px", fontFamily:"Be Vietnam Pro,sans-serif" }}>
              {node.sublabel}
            </text>
          )}
        </>
      )}
    </motion.g>
  );
}

/* ── Detail side panel ── */
function DetailPanel({ node, onClose }: { node: Node; onClose: () => void }) {
  return (
    <motion.div
      initial={{ x: "100%", opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: "100%", opacity: 0 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
      style={{
        position: "absolute", top: 0, right: 0, bottom: 0,
        width: 300, zIndex: 10,
        background: "#0d1a35",
        borderLeft: `3px solid ${node.color}`,
        display: "flex", flexDirection: "column",
        boxShadow: `-8px 0 32px rgba(0,0,0,0.4)`,
        fontFamily: "Be Vietnam Pro, sans-serif",
      }}>

      {/* Header */}
      <div style={{ padding: "16px 16px 14px", background: node.color, flexShrink: 0 }}>
        <div style={{ display: "flex", alignItems: "flex-start", gap: 10 }}>
          <span style={{ fontSize: "28px", lineHeight: 1, flexShrink: 0 }}>{node.icon}</span>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ fontSize: "8.5px", fontWeight: 700, color: "rgba(255,255,255,0.7)", textTransform: "uppercase", letterSpacing: "0.14em", marginBottom: 3 }}>
              Thuyết minh chi tiết
            </div>
            <div style={{ fontSize: "13.5px", fontWeight: 800, color: "#fff", lineHeight: 1.3 }}>
              {node.description}
            </div>
          </div>
          <button onClick={onClose}
            style={{ background: "rgba(255,255,255,0.2)", border: "none", borderRadius: 8, width: 28, height: 28, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", flexShrink: 0 }}>
            <X size={14} color="#fff" />
          </button>
        </div>
      </div>

      {/* Details scrollable */}
      <div style={{ flex: 1, overflowY: "auto", padding: "12px 14px", display: "flex", flexDirection: "column", gap: 8 }}>
        {node.details.map((d, i) => (
          <motion.div key={i}
            initial={{ opacity: 0, x: 12 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.06 }}
            style={{ display: "flex", alignItems: "flex-start", gap: 9, background: "rgba(255,255,255,0.05)", border: `1px solid ${node.color}25`, borderRadius: 8, padding: "9px 11px" }}>
            <div style={{ width: 7, height: 7, borderRadius: "50%", background: node.color, flexShrink: 0, marginTop: 4, boxShadow: `0 0 6px ${node.color}` }} />
            <span style={{ fontSize: "12.5px", color: "rgba(210,228,252,0.9)", lineHeight: 1.65 }}>{d}</span>
          </motion.div>
        ))}

        <div style={{ marginTop: 6, textAlign: "right" }}>
          <span style={{ fontSize: "10px", fontWeight: 700, color: node.color, background: `${node.color}18`, border: `1px solid ${node.color}40`, borderRadius: 20, padding: "3px 10px" }}>
            MLN131 · Chương 3
          </span>
        </div>
      </div>

      {/* Bottom hint */}
      <div style={{ padding: "10px 14px", borderTop: "1px solid rgba(255,255,255,0.08)", flexShrink: 0 }}>
        <div style={{ fontSize: "10px", color: "rgba(100,130,180,0.7)", textAlign: "center" }}>
          Nhấp ra ngoài hoặc ✕ để đóng
        </div>
      </div>
    </motion.div>
  );
}

export function ConceptMap({ onSelect }: { onSelect?: (node: Node | null) => void }) {
  const [selected, setSelected] = useState<string>("");

  function handle(node: Node) {
    const next = selected === node.id ? "" : node.id;
    setSelected(next);
    onSelect?.(next ? node : null);
  }

  const activeNode = nodes.find((n) => n.id === selected) ?? null;

  return (
    <div style={{ position: "relative", overflow: "hidden", borderRadius: 12 }}>

      {/* Map */}
      <div style={{ background: "linear-gradient(145deg,#f0f4ff 0%,#e8f0fe 100%)", transition: "all 0.3s" }}>
        <svg viewBox="0 20 960 620" width="100%" style={{ minWidth: 600, display: "block" }}>
          <defs>
            <marker id="arrow" markerWidth="8" markerHeight="6" refX="6" refY="3" orient="auto">
              <polygon points="0 0, 8 3, 0 6" fill="#94a3b8" />
            </marker>
            <filter id="sf">
              <feDropShadow dx="0" dy="3" stdDeviation="4" floodColor="rgba(0,0,0,0.12)" />
            </filter>
          </defs>

          {/* Soft background grid */}
          <rect x="0" y="0" width="960" height="640" fill="none"
            stroke="rgba(148,163,184,0.12)" strokeWidth="0.5"
            style={{ backgroundImage: "repeating-linear-gradient(0deg,transparent,transparent 39px,rgba(148,163,184,0.1) 40px),repeating-linear-gradient(90deg,transparent,transparent 39px,rgba(148,163,184,0.1) 40px)" }} />

          {/* Bridge band */}
          <motion.rect x={108} y={238} width={744} height={58} rx={14}
            fill="rgba(124,58,237,0.06)" stroke="rgba(124,58,237,0.2)" strokeWidth={1.5} strokeDasharray="8,5"
            initial={{ scaleX:0 }} animate={{ scaleX:1 }}
            style={{ transformOrigin:"480px 267px" }} transition={{ duration:0.9 }} />
          <motion.text x={480} y={256} textAnchor="middle"
            fill="rgba(109,40,217,0.4)"
            style={{ fontSize:"8px", fontFamily:"Be Vietnam Pro,sans-serif", letterSpacing:"0.16em", fontWeight:700 }}
            initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ delay:1.1 }}>
            ━━━━━━  C Â Y   C Ầ U   L Ị C H   S Ử  ━━━━━━
          </motion.text>

          {/* Edges */}
          {EDGES.map((e, i) => {
            const fn = nodes.find((n) => n.id === e.from)!;
            const tn = nodes.find((n) => n.id === e.to)!;
            const f  = cx(fn); const t = cx(tn);
            const mx = (f.x + t.x) / 2; const my = (f.y + t.y) / 2 - 14;
            return (
              <g key={i}>
                <motion.path d={`M ${f.x} ${f.y} Q ${mx} ${my} ${t.x} ${t.y}`}
                  fill="none" stroke={e.color}
                  strokeWidth={e.dashed ? 2 : 2.5} strokeDasharray={e.dashed ? "6,4" : "none"}
                  opacity={0} animate={{ opacity: e.dashed ? 0.55 : 0.9 }}
                  transition={{ duration:0.7, delay:0.5 }} />
                {e.label && (
                  <motion.text x={mx} y={my - 5} textAnchor="middle" fill={e.color}
                    style={{ fontSize:"8px", fontFamily:"Be Vietnam Pro,sans-serif", fontWeight:700 }}
                    opacity={0} animate={{ opacity:1 }} transition={{ delay:1.1 }}>
                    {e.label}
                  </motion.text>
                )}
              </g>
            );
          })}

          {/* Nodes */}
          {nodes.map((node) => (
            <MapNode key={node.id} node={node} selected={selected === node.id} onClick={() => handle(node)} />
          ))}
        </svg>
      </div>

      {/* Click-away overlay (transparent) */}
      <AnimatePresence>
        {activeNode && (
          <>
            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => { setSelected(""); onSelect?.(null); }}
              style={{ position:"absolute", inset:0, zIndex:9, cursor:"pointer" }} />
            <DetailPanel node={activeNode} onClose={() => { setSelected(""); onSelect?.(null); }} />
          </>
        )}
      </AnimatePresence>

      {/* Bottom hint */}
      <div style={{ padding: "8px 12px", background: "rgba(8,14,28,0.6)", display: "flex", alignItems: "center", justifyContent: "center", gap: 6 }}>
        <span style={{ fontSize: "11px", color: "rgba(148,163,184,0.65)", fontFamily: "Be Vietnam Pro, sans-serif" }}>
          {activeNode ? `Đang xem: ${activeNode.description}` : "💡 Nhấp vào bất kỳ nút nào để xem thuyết minh chi tiết"}
        </span>
      </div>
    </div>
  );
}
