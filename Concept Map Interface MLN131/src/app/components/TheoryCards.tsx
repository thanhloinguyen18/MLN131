import { motion } from "motion/react";

const theories = [
  {
    emoji: "⏳",
    title: "Tính tất yếu lịch sử",
    border: "border-amber-300",
    bg: "bg-amber-50",
    head: "text-amber-700",
    dot: "text-amber-500",
    points: [
      "Lực lượng sản xuất chưa đủ trình độ xây dựng CNXH ngay lập tức",
      "Tàn dư xã hội cũ cần thời gian để được xóa bỏ triệt để",
      "Không thể nhảy vọt qua các bước phát triển tất yếu của lịch sử",
    ],
  },
  {
    emoji: "🪜",
    title: "Nhiều bước trung gian",
    border: "border-violet-300",
    bg: "bg-violet-50",
    head: "text-violet-700",
    dot: "text-violet-500",
    points: [
      "Chặng đầu: ổn định chính trị, phục hồi và phát triển kinh tế",
      "Chặng giữa: công nghiệp hóa, xây dựng cơ sở vật chất XHCN",
      "Chặng cuối: hoàn thiện quan hệ sản xuất và kiến trúc thượng tầng",
    ],
  },
  {
    emoji: "⚔️",
    title: "Đấu tranh phức tạp",
    border: "border-rose-300",
    bg: "bg-rose-50",
    head: "text-rose-700",
    dot: "text-rose-500",
    points: [
      "Đấu tranh gay gắt giữa cái mới - cái cũ trên mọi lĩnh vực",
      "Chống lại sự phá hoại của các thế lực thù địch trong và ngoài nước",
      "Khắc phục tư tưởng bảo thủ, trì trệ, quan liêu trong bộ máy nhà nước",
    ],
  },
  {
    emoji: "🌐",
    title: "Hai hình thức quá độ",
    border: "border-emerald-300",
    bg: "bg-emerald-50",
    head: "text-emerald-700",
    dot: "text-emerald-500",
    points: [
      "Quá độ trực tiếp: từ CNTB phát triển cao lên CNXH (Liên Xô...)",
      "Quá độ gián tiếp: bỏ qua giai đoạn CNTB (Việt Nam, TQ, Cuba...)",
      "Cả hai đều cần thời kỳ quá độ — chỉ khác điều kiện xuất phát",
    ],
  },
];

export function TheoryCards() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
      {theories.map((t, i) => (
        <motion.div key={i}
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 * i, type: "spring" }}
          className={`rounded-xl border-2 ${t.border} ${t.bg} p-4 flex flex-col gap-2.5`}>
          <div className="flex items-center gap-2">
            <span style={{ fontSize: "20px" }}>{t.emoji}</span>
            <span className={`font-bold ${t.head}`} style={{ fontSize: "13px", fontFamily: "Be Vietnam Pro, sans-serif" }}>
              {t.title}
            </span>
          </div>
          <ul className="flex flex-col gap-1.5">
            {t.points.map((p, j) => (
              <li key={j} className="flex items-start gap-2">
                <span className={`text-xs mt-0.5 flex-shrink-0 ${t.dot}`}>▸</span>
                <span className="text-slate-700" style={{ fontSize: "12.5px", lineHeight: 1.6, fontFamily: "Be Vietnam Pro, sans-serif" }}>
                  {p}
                </span>
              </li>
            ))}
          </ul>
        </motion.div>
      ))}
    </div>
  );
}
