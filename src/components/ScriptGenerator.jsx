import React, { useEffect, useRef, useState } from "react";
import "../App.css";

// Dữ liệu hiển thị cho Dropdown (Khớp key với Backend)
const PERSONA_OPTIONS = {
  FMCG: [
    { value: "Budget_Shopper", label: "🛒 Người Săn Hàng Giá Rẻ (Tiết kiệm)" },
    {
      value: "Premium_Seeker",
      label: "💎 Người Ưa Chuộng Hàng Cao Cấp (Chất lượng)",
    },
    { value: "GenZ_TrendFollower", label: "🔥 Gen Z Bắt Trend (FOMO)" },
    {
      value: "Health_Conscious",
      label: "🍎 Người Quan Tâm Sức Khỏe (Sản phẩm tốt cho sức khỏe)",
    },
    {
      value: "Eco_Friendly",
      label: "🌿 Người Yêu Môi Trường (Sản phẩm xanh, sạch)",
    },
    {
      value: "Everyday_User",
      label: "🧴 Người Dùng Hàng Ngày (Sản phẩm thiết yếu)",
    },
  ],
  Fashion: [
    {
      value: "Trend_Hunter",
      label: "👗 Người Bắt Trend (Thời trang mới nhất)",
    },
    {
      value: "Office_Elegant",
      label: "💼 Nhân Viên Văn Phòng (Thanh lịch, chuyên nghiệp)",
    },
    { value: "Utility_Man", label: "👔 Quý Ông Thực Dụng (Đơn giản, bền bỉ)" },
    {
      value: "Kid_Fashion_Mom",
      label: "🧒 Mẹ Sành Điệu Cho Bé (Thời trang Trẻ em)",
    },
    { value: "Shoe_Lover", label: "👟 Tín Đồ Giày Dép (Sneaker, Sandal)" },
    {
      value: "Accessory_Enthusiast",
      label: "💍 Người Yêu Phụ Kiện (Vòng tay, Ví, Túi)",
    },
  ],

  // Gom Điện thoại, Máy tính, Camera, Điện gia dụng
  Tech: [
    {
      value: "Smartphone_Enthusiast",
      label: "📱 Tín Đồ Điện Thoại (Smartphone/Phụ kiện)",
    },
    {
      value: "Laptop_Professional",
      label: "💻 Dân Văn Phòng (Laptop/PC/Phụ kiện)",
    },
    {
      value: "Camera_Hobbyist",
      label: "📷 Người Yêu Nhiếp Ảnh (Camera/Phụ kiện)",
    },
    {
      value: "Home_Appliance_User",
      label: "🏠 Người Dùng Gia Dụng (Đồ điện gia dụng)",
    },
    {
      value: "Gadget_Lover",
      label: "🔌 Tín Đồ Đồ Công Nghệ (Gadget/Thiết bị thông minh)",
    },
    {
      value: "Audio_Enthusiast",
      label: "🎧 Người Yêu Âm Thanh (Tai nghe/Loa)",
    },
    {
      value: "Smart_Home_User",
      label: "🏡 Người Dùng Nhà Thông Minh (Thiết bị smarthome)",
    },
    {
      value: "Wearable_Tech_User",
      label:
        "⌚ Người Dùng Thiết Bị Đeo Thông Minh (Smartwatch/Thiết bị sức khỏe)",
    },
    {
      value: "Gaming_Enthusiast",
      label: "🎮 Game Thủ Chuyên Nghiệp (PC/Console/Phụ kiện)",
    },
    {
      value: "Tech_Reviewer",
      label: "📝 Reviewer Công Nghệ (Đánh giá sản phẩm)",
    },
  ],

  // Gom Mẹ & Bé, Đồ Chơi
  MomBaby: [
    {
      value: "Safety_First_Mom",
      label: "🍼 Mẹ Bỉm Kỹ Tính (Tã, Sữa, An toàn)",
    },
    { value: "Smart_Edu_Mom", label: "🧩 Mẹ Mua Đồ Chơi Thông Minh/Giáo Dục" },
    {
      value: "Fashionable_Baby_Mom",
      label: "👶 Mẹ Sành Điệu (Quần áo, Phụ kiện)",
    },
    {
      value: "Outdoor_Active_Mom",
      label: "🚴 Mẹ Năng Động (Đồ chơi ngoài trời)",
    },
    {
      value: "Toy_Collector",
      label: "🧩 Người Sưu Tầm Đồ Chơi (Đồ chơi sưu tầm)",
    },
    { value: "Toy", label: "🧸 Đồ chơi phổ thông" },
  ],

  // Gom Nhà cửa, Thú cưng, Bách hóa, Voucher
  HomeLife: [
    { value: "Home_Decor_Enthusiast", label: "🏡 Người Yêu Trang Trí Nhà Cửa" },
    { value: "Cleaning_Obsessed:", label: "🧼 Người Nghiện Dọn Dẹp Sạch Sẽ" },
    { value: "Kitchen_Gourmet", label: "🍳 Tín Đồ Nhà Bếp (Dụng cụ nấu ăn)" },
    {
      value: "Laundry_Fanatic",
      label: "🧺 Người Yêu Giặt Ủi (Máy giặt, Nước giặt)",
    },
    {
      value: "Grocery_Shopper",
      label: "🛒 Người Mua Sắm Bách Hóa (Thực phẩm, Đồ dùng)",
    },
  ],
  Pet: [
    { value: "Pet_Lover", label: "🐶 Người Yêu Thú Cưng (Thức ăn, Phụ kiện)" },
    {
      value: "Pet_Health_Conscious",
      label: "🐱 Người Chăm Sóc Thú Cưng (Sức khỏe, Vệ sinh)",
    },
    {
      value: "Pet_Fashionista",
      label: "🦴 Thú Cưng Sành Điệu (Thời trang, Phụ kiện)",
    },
    {
      value: "Pet_Supply",
      label: "🛍️ Người Mua Sắm Thú Cưng (Đồ chơi, Dụng cụ)",
    },
  ],

  // Gom Sắc đẹp, Sức khỏe
  BeautyHealth: [
    {
      value: "Skincare_Holistic",
      label: "💄 Tín Đồ Làm Đẹp (Mỹ phẩm/Skincare)",
    },
    { value: "Health_Conscious", label: "💊 Người Chăm Sóc Sức Khỏe (TPCN)" },
  ],

  // Ô tô, Xe máy
  Vehicle: [
    { value: "Bike_Lover", label: "🏍️ Dân Chăm Xe (Phụ kiện Xe máy/Ô tô)" },
  ],
};

// Danh sách giọng ElevenLabs "chuẩn" cho tiếng Việt
const VOICE_OPTIONS = [
  { id: "banmai", name: "👩 Ban Mai (Nữ Bắc - Chuẩn Quốc Dân)" },
  { id: "lanhi", name: "👩 Lan Nhi (Nữ Nam - Dịu dàng)" },
  { id: "leminh", name: "👨 Lê Minh (Nam Bắc - Trầm ấm)" },
  { id: "minhquang", name: "👨 Minh Quang (Nam Nam - Rõ ràng)" },
  { id: "myan", name: "👩 Mỹ An (Nữ Miền Trung - Độc đáo)" },
  { id: "thuminh", name: "👩 Thu Minh (Nữ Bắc - Cao cấp)" },
];

const API_BASE_URL = process.env.REACT_APP_API_URL || "http://localhost:5000"; // Thay đổi theo địa chỉ Backend của bạn

const ScriptGenerator = () => {
  // 1. Quản lý Input đầu vào
  const [formData, setFormData] = useState({
    productName: "",
    targetAudience: "",
    usp: "",
    tone: "Hài hước, bắt trend",
    socialNetwork: "Shopee Video",
    aiModel: "gemini-2.5-flash",
    industry: "FMCG",
    personaKey: "",
    strategies: [],
  });
  const [videoFile, setVideoFile] = useState(null);
  const [videoPreview, setVideoPreview] = useState(null);

  // 2. Quản lý trạng thái xử lý
  const [isLoading, setIsLoading] = useState(false);
  const [isUspLoading, setIsUspLoading] = useState(false);
  const [error, setError] = useState("");
  const [appPassword, setAppPassword] = useState("");

  // 3. Quản lý Output (Kết quả từ AI)
  // Khởi tạo null hoặc object rỗng theo đúng cấu trúc JSON mong muốn
  const [scriptResult, setScriptResult] = useState({
    hook_sentence: "",
    body_script: "",
    cta: "",
    caption_hashtags: [],
  });
  // --- STATE MỚI CHO AUDIO ---
  const [audioUrl, setAudioUrl] = useState(null);
  const [isAudioLoading, setIsAudioLoading] = useState(false);
  const [audioConfig, setAudioConfig] = useState({
    voiceId: "minhquang",
    speed: 1.2,
    volume: 1.3,
  });

  const audioRef = useRef(null); // Tham chiếu đến thẻ <audio>
  // --- HÀM XỬ LÝ (HANDLERS) ---
  const handleGenerateAudio = async () => {
    const fullText = `${scriptResult.hook_sentence}. ${scriptResult.body_script}. ${scriptResult.cta}`;
    if (fullText.length < 5) return alert("Chưa có kịch bản!");

    setIsAudioLoading(true);
    try {
      const response = await fetch(`${API_BASE_URL}/api/generate-audio`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-app-password": appPassword,
        },
        body: JSON.stringify({
          text: fullText,
          voiceId: audioConfig.voiceId, // Gửi mã giọng FPT
        }),
      });

      if (!response.ok) throw new Error("Lỗi Server Audio");

      const blob = await response.blob();
      const url = URL.createObjectURL(blob);
      setAudioUrl(url);
    } catch (error) {
      console.error(error);
      alert("Lỗi: " + error.message);
    } finally {
      setIsAudioLoading(false);
    }
  };

  const handleConfigChange = (e) => {
    const { name, value } = e.target;
    setAudioConfig((prev) => ({ ...prev, [name]: parseFloat(value) || value }));
  };

  const handleDownloadAudio = () => {
    if (!audioUrl) return;
    const link = document.createElement("a");
    link.href = audioUrl;
    link.download = "script-audio.mp3";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  // Effect chỉnh tốc độ/âm lượng ngay trên trình duyệt
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.playbackRate = audioConfig.speed;
      audioRef.current.volume = audioConfig.volume;
    }
  }, [audioConfig]);

  const handleStrategyChange = (e) => {
    const { value, checked } = e.target;
    setFormData((prev) => {
      if (checked) {
        // Nếu tích vào -> Thêm vào mảng
        return { ...prev, strategies: [...prev.strategies, value] };
      } else {
        // Nếu bỏ tích -> Lọc bỏ khỏi mảng
        return {
          ...prev,
          strategies: prev.strategies.filter((item) => item !== value),
        };
      }
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => {
      const newData = { ...prev, [name]: value };

      // Nếu đang đổi ngành hàng, hãy reset Persona và Strategy mặc định
      if (name === "industry") {
        newData.personaKey = "";
      }
      return newData;
    });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setVideoFile(file);
      // Tạo URL ảo để preview video ngay lập tức
      setVideoPreview(URL.createObjectURL(file));
    }
  };

  // 🔥 TÍNH NĂNG MỚI: Tự động điền USP
  const handleAutoFillUSP = async () => {
    if (!formData.productName)
      return alert("⚠️ Vui lòng nhập tên sản phẩm trước!");

    setIsUspLoading(true); // Bắt đầu loading USP
    try {
      const response = await fetch(`${API_BASE_URL}/api/suggest-usp`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-app-password": appPassword,
        },
        body: JSON.stringify({ productName: formData.productName }),
      });

      const data = await response.json();

      if (data.usp) {
        // Cập nhật USP vào form data
        setFormData((prev) => ({ ...prev, usp: data.usp }));
      } else {
        alert("Không tìm thấy thông tin USP.");
      }
    } catch (error) {
      console.error(error);
      alert("Lỗi khi gợi ý USP: " + error.message);
    } finally {
      setIsUspLoading(false); // Tắt loading
    }
  };
  // Hàm quan trọng: Kết nối với Backend
  const generateScript = async () => {
    setIsLoading(true);
    setError("");

    try {
      // Chuẩn bị dữ liệu gửi đi (Multipart Form Data vì có file)
      const data = new FormData();
      data.append("video", videoFile);
      data.append("productName", formData.productName);
      data.append("targetAudience", formData.targetAudience);
      data.append("usp", formData.usp);
      data.append("tone", formData.tone);
      data.append("socialNetwork", formData.socialNetwork);
      data.append("aiModel", formData.aiModel);
      data.append("industry", formData.industry);
      data.append("personaKey", formData.personaKey);
      data.append("strategies", JSON.stringify(formData.strategies));

      const API_URL = "http://localhost:5000";

      // Gọi API (Giả sử Backend chạy ở cổng 5000)
      const response = await fetch(`${API_URL}/api/generate-script`, {
        method: "POST",
        headers: {
          "x-app-password": appPassword,
        },
        body: data,
        // Lưu ý: Không set 'Content-Type': 'application/json' khi dùng FormData
        // Trình duyệt sẽ tự động set boundary
      });

      if (!response.ok) throw new Error("Lỗi khi gọi AI");

      const resultJSON = await response.json();

      // Cập nhật State để hiển thị kết quả lên giao diện
      setScriptResult(resultJSON);
    } catch (err) {
      setError("Có lỗi xảy ra: " + err.message);
    } finally {
      setIsLoading(false);
    }
  };

  // Hàm cho phép user sửa trực tiếp kết quả AI trả về (Human-in-the-loop)
  const handleResultEdit = (e) => {
    const { name, value } = e.target;
    setScriptResult({ ...scriptResult, [name]: value });
  };

  // Hàm gom nội dung và copy vào Clipboard
  const handleCopy = () => {
    // 1. Định dạng nội dung đẹp mắt
    const formattedText =
      `${scriptResult.hook_sentence}${scriptResult.body_script}${scriptResult.cta}`.trim();

    // 2. Thực hiện lệnh copy
    navigator.clipboard
      .writeText(formattedText)
      .then(() => alert("✅ Đã copy toàn bộ kịch bản!"))
      .catch((err) => alert("❌ Lỗi copy: " + err));
  };
  return (
    <div className="container">
      <h1 className="app-title">✨ AI Video Marketing Studio</h1>

      <div className="main-layout">
        {/* --- CỘT TRÁI: INPUT --- */}
        <div className="card">
          <h3>🛠 Thiết lập thông tin</h3>

          <div className="form-group">
            <label>Tên sản phẩm</label>
            <input
              type="text"
              name="productName"
              value={formData.productName}
              onChange={handleInputChange}
              placeholder="Nhập tên sản phẩm..."
            />
          </div>
          {/* 2. Điểm mạnh USP (Có nút AI) */}
          <div className="form-group">
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: "5px",
              }}
            >
              <label>Điểm mạnh (USP)</label>
              <button
                onClick={handleAutoFillUSP}
                disabled={isUspLoading || !formData.productName}
                style={{
                  padding: "4px 8px",
                  fontSize: "0.8rem",
                  backgroundColor: "#8b5cf6",
                  color: "white",
                  border: "none",
                  borderRadius: "4px",
                  cursor: "pointer",
                  opacity: !formData.productName || isUspLoading ? 0.6 : 1,
                }}
              >
                {isUspLoading ? "⏳ Đang tìm..." : "✨ Gợi ý AI"}
              </button>
            </div>
            <textarea
              name="usp"
              value={formData.usp}
              onChange={handleInputChange}
              rows="3"
              placeholder="Sản phẩm có gì đặc biệt? Bấm 'Gợi ý AI' để tự động điền."
            />
          </div>

          <div className="form-group">
            <label>Khách hàng mục tiêu</label>
            <input
              type="text"
              name="targetAudience"
              value={formData.targetAudience}
              onChange={handleInputChange}
              placeholder="Ví dụ: Gen Z, Nhân viên văn phòng..."
            />
          </div>

          <div className="form-group">
            <label>Nền tảng</label>
            <select
              name="socialNetwork"
              value={formData.socialNetwork}
              onChange={handleInputChange}
            >
              <option value="TikTok">TikTok</option>
              <option value="Instagram Reel">Instagram</option>
              <option value="Facebook Reel">Facebook Reel</option>
              <option value="YouTube Shorts">YouTube Shorts</option>
              <option value="Shopee Video">Shopee Video</option>
            </select>
          </div>

          <div className="form-group">
            <label>Ngành hàng:</label>
            <select
              name="industry"
              value={formData.industry}
              onChange={handleInputChange}
            >
              <option value="FMCG">Hàng Tiêu Dùng (FMCG)</option>
              <option value="Fashion">Thời Trang</option>
              <option value="Tech">Điện Tử & Công Nghệ</option>
              <option value="MomBaby">Mẹ & Bé, Đồ Chơi</option>
              <option value="HomeLife">Nhà Cửa & Đời Sống</option>
              <option value="Pet">Thú Cưng</option>
              <option value="BeautyHealth">Sắc Đẹp & Sức Khỏe</option>
              <option value="Vehicle">Ô Tô & Xe Máy</option>
            </select>
          </div>
          {/* --- MỚI: DROPDOWN PERSONA ĐỘNG --- */}
          {PERSONA_OPTIONS[formData.industry] &&
            PERSONA_OPTIONS[formData.industry].length > 0 && (
              <div
                className="form-group"
                style={{
                  marginLeft: "20px",
                  borderLeft: "3px solid #4f46e5",
                  paddingLeft: "10px",
                }}
              >
                <label style={{ color: "#4f46e5" }}>
                  ✨ Chọn Chân Dung Khách Hàng (Mẫu chuẩn):
                </label>
                <select
                  name="personaKey"
                  value={formData.personaKey}
                  onChange={handleInputChange}
                  style={{ background: "#eef2ff" }}
                >
                  <option value="">-- Tự nhập thủ công bên dưới --</option>
                  {PERSONA_OPTIONS[formData.industry].map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>
            )}

          {/* Ô nhập thủ công (sẽ bị vô hiệu hóa hoặc ẩn nếu đã chọn Persona mẫu) */}
          <div className="form-group">
            <label>
              Mô tả khách hàng{" "}
              {formData.personaKey ? "(Đang dùng mẫu có sẵn)" : "(Nhập tay)"}:
            </label>
            <input
              type="text"
              name="targetAudience"
              value={formData.targetAudience}
              onChange={handleInputChange}
              disabled={!!formData.personaKey} // Khóa lại nếu đã chọn mẫu
              placeholder={
                formData.personaKey
                  ? "Đang sử dụng chân dung mẫu từ hệ thống..."
                  : "Ví dụ: Sinh viên, Nhân viên văn phòng..."
              }
              style={{
                backgroundColor: formData.personaKey ? "#e9ecef" : "#fff",
              }}
            />
          </div>
          <div
            className="form-group"
            style={{
              background: "#f8f9fa",
              padding: "15px",
              borderRadius: "8px",
              border: "1px solid #dee2e6",
            }}
          >
            <label style={{ marginBottom: "10px", display: "block" }}>
              2. Chọn các yêu cầu (Có thể chọn nhiều):
            </label>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "10px",
              }}
            >
              {/* Nhóm A: Insight Thị trường (Dựa trên PDF) */}
              <label
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  cursor: "pointer",
                }}
              >
                <input
                  type="checkbox"
                  value="Insight_PriceSensitive"
                  onChange={handleStrategyChange}
                  checked={formData.strategies.includes(
                    "Insight_PriceSensitive"
                  )}
                />
                💰 Nhấn mạnh Giá rẻ/Tiết kiệm
              </label>

              <label
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  cursor: "pointer",
                }}
              >
                <input
                  type="checkbox"
                  value="Insight_Premium"
                  onChange={handleStrategyChange}
                  checked={formData.strategies.includes("Insight_Premium")}
                />
                💎 Nhấn mạnh Cao cấp/Trải nghiệm
              </label>

              <label
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  cursor: "pointer",
                }}
              >
                <input
                  type="checkbox"
                  value="Insight_GenZ"
                  onChange={handleStrategyChange}
                  checked={formData.strategies.includes("Insight_GenZ")}
                />
                🔥 Bắt Trend Gen Z (FOMO)
              </label>

              {/* Nhóm B: Yêu cầu Kỹ thuật (Yêu cầu của bạn) */}
              <label
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  cursor: "pointer",
                  fontWeight: "bold",
                  color: "#d63384",
                }}
              >
                <input
                  type="checkbox"
                  value="Tech_StrictVideo"
                  onChange={handleStrategyChange}
                  checked={formData.strategies.includes("Tech_StrictVideo")}
                />
                🎥 Bám sát Video 100%
              </label>

              <label
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  cursor: "pointer",
                }}
              >
                <input
                  type="checkbox"
                  value="Tech_Creative"
                  onChange={handleStrategyChange}
                  checked={formData.strategies.includes("Tech_Creative")}
                />
                ✨ Sáng tạo thêm (Không phụ thuộc video)
              </label>

              <label
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  cursor: "pointer",
                }}
              >
                <input
                  type="checkbox"
                  value="Tech_KOC"
                  onChange={handleStrategyChange}
                  checked={formData.strategies.includes("Tech_KOC")}
                />
                🗣️ Văn phong Review KOC
              </label>
            </div>
          </div>

          <div className="form-group">
            <label>Phong cách (Tone)</label>
            <select
              name="tone"
              value={formData.tone}
              onChange={handleInputChange}
            >
              <option value="Hài hước, bắt trend">Hài hước, bắt trend</option>
              <option value="Chuyên nghiệp, tin cậy">
                Chuyên nghiệp, tin cậy
              </option>
              <option value="Cảm động, truyền cảm hứng">
                Cảm động, truyền cảm hứng
              </option>
              <option value="Năng động, trẻ trung">Năng động, trẻ trung</option>
              <option value="Đơn giản, súc tích">Đơn giản, súc tích</option>
            </select>
          </div>

          <div className="form-group">
            <label>Điểm mạnh (USP)</label>
            <textarea
              name="usp"
              value={formData.usp}
              onChange={handleInputChange}
              rows="3"
              placeholder="Sản phẩm có gì đặc biệt?"
            />
          </div>

          <div className="form-group video-upload-area">
            <label style={{ cursor: "pointer" }}>
              <span style={{ fontSize: "2rem" }}>📂</span>
              <br />
              {videoFile
                ? `Đã chọn: ${videoFile.name}`
                : "Bấm để tải video lên"}
              <input
                type="file"
                accept="video/*"
                onChange={handleFileChange}
                style={{ display: "none" }}
              />
            </label>
            {videoPreview && (
              <video
                src={videoPreview}
                controls
                style={{
                  width: "100%",
                  marginTop: "15px",
                  borderRadius: "8px",
                }}
              />
            )}
          </div>
          <div className="form-group">
            <label>Chọn Model AI (Sức mạnh):</label>
            <select
              name="aiModel"
              value={formData.aiModel}
              onChange={handleInputChange}
              style={{ fontWeight: "bold", color: "#2563eb" }}
            >
              <optgroup label="⚡ Groq (Siêu Tốc - Chỉ Text)">
                <option value="llama-3.3-70b-versatile">
                  🦙 Llama 3 70B (Nhanh nhất thế giới)
                </option>
              </optgroup>
              <optgroup label="🔥 Model Mới Nhất (Khuyên dùng)">
                <option value="gemini-2.5-flash">
                  ⚡ Gemini 2.5 Flash (Cân bằng)
                </option>
                <option value="gemini-2.5-pro">
                  🧠 Gemini 2.5 Pro (Thông minh nhất)
                </option>
                <option value="gemini-2.0-flash-lite-preview-02-05">
                  🚀 Gemini 2.0 Flash Lite (Siêu tốc)
                </option>
              </optgroup>

              <optgroup label="🧪 Model Thử Nghiệm (Experimental)">
                <option value="gemini-exp-1206">🧪 Gemini Exp 1206</option>
                <option value="gemini-2.0-flash-exp">
                  🧪 Gemini 2.0 Flash Exp
                </option>
                <option value="gemini-3-pro-preview">
                  🤖 Gemini 3.0 Pro Preview (Tương lai)
                </option>
              </optgroup>

              <optgroup label="📚 Model Chuyên Dụng">
                <option value="gemma-3-27b-it">Gemma 3 (Open Model)</option>
                <option value="deep-research-pro-preview-12-2025">
                  Deep Research (Nghiên cứu sâu)
                </option>
              </optgroup>
            </select>
          </div>
          <div
            className="form-group"
            style={{
              background: "#fff3cd",
              padding: "10px",
              borderRadius: "8px",
              border: "1px solid #ffeeba",
            }}
          >
            <label style={{ color: "#856404" }}>
              🔐 Mật khẩu truy cập (Bắt buộc):
            </label>
            <input
              type="password"
              value={appPassword}
              onChange={(e) => setAppPassword(e.target.value)}
              placeholder="Nhập mật khẩu team..."
              style={{ marginTop: "5px" }}
            />
          </div>
          <button
            className="btn-primary"
            onClick={generateScript}
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <div className="loading-spinner"></div> AI đang xem video...
              </>
            ) : (
              "🚀 Tạo Kịch Bản Ngay"
            )}
          </button>

          {error && (
            <p style={{ color: "red", marginTop: "10px", textAlign: "center" }}>
              {error}
            </p>
          )}
        </div>

        {/* --- CỘT PHẢI: OUTPUT --- */}
        <div className="card result-section">
          <h3>🎬 Kịch bản đề xuất</h3>

          <div className="form-group">
            <span className="badge badge-hook">Hook (3s đầu)</span>
            <textarea
              name="hook_sentence"
              value={scriptResult.hook_sentence}
              onChange={handleResultEdit}
              rows="3"
            />
          </div>

          <div className="form-group">
            <span className="badge badge-body">Nội dung chính</span>
            <textarea
              name="body_script"
              value={scriptResult.body_script}
              onChange={handleResultEdit}
              rows="10"
            />
          </div>

          <div className="form-group">
            <span className="badge badge-cta">Call To Action</span>
            <input
              type="text"
              name="cta"
              value={scriptResult.cta}
              onChange={handleResultEdit}
            />
          </div>

          <div className="form-group">
            <label>Hashtags</label>
            <div
              style={{
                color: "#4f46e5",
                fontStyle: "italic",
                fontWeight: "500",
              }}
            >
              {Array.isArray(scriptResult.caption_hashtags)
                ? scriptResult.caption_hashtags.join(" ")
                : scriptResult.caption_hashtags}
            </div>
          </div>

          <button className="btn-primary btn-copy" onClick={handleCopy}>
            📋 Copy Toàn Bộ
          </button>
          <hr style={{ margin: "20px 0" }} />
          {/* --- MỚI: PHẦN TẠO AUDIO --- */}
          <h3>🎧 Phòng thu FPT.AI (Giọng Việt Chuẩn)</h3>

          <div className="form-group">
            <label>🗣️ Chọn giọng đọc:</label>
            <select
              name="voiceId"
              value={audioConfig.voiceId}
              onChange={handleConfigChange}
            >
              {VOICE_OPTIONS.map((v) => (
                <option key={v.id} value={v.id}>
                  {v.name}
                </option>
              ))}
            </select>
          </div>

          {/* Tốc độ và Volume vẫn xử lý ở Frontend cho mượt */}
          <div style={{ display: "flex", gap: "20px", marginBottom: "15px" }}>
            <div className="form-group" style={{ flex: 1 }}>
              <label>⏩ Tốc độ: x{audioConfig.speed}</label>
              <input
                type="range"
                name="speed"
                min="0.5"
                max="2.0"
                step="0.1"
                value={audioConfig.speed}
                onChange={handleConfigChange}
              />
            </div>
            <div className="form-group" style={{ flex: 1 }}>
              <label>
                🔊 Âm lượng: {Math.round(audioConfig.volume * 100)}%
              </label>
              <input
                type="range"
                name="volume"
                min="0.0"
                max="1.5"
                step="0.1"
                value={audioConfig.volume}
                onChange={handleConfigChange}
              />
            </div>
          </div>

          <button
            className="btn-primary"
            onClick={handleGenerateAudio}
            style={{ background: "#f26522" }}
          >
            {isAudioLoading ? "⏳ Đang xử lý..." : "🎙️ Tạo giọng FPT"}
          </button>

          {/* ... Player Audio ... */}
          <div className="form-group" style={{ marginTop: "15px" }}>
            {audioUrl && (
              <audio
                ref={audioRef}
                src={audioUrl}
                controls
                style={{ width: "100%" }}
              >
                Trình duyệt của bạn không hỗ trợ thẻ audio.
              </audio>
            )}
            <button
              style={{
                marginTop: "10px",
                padding: "8px 12px",
                backgroundColor: "#28a745",
                color: "white",
                border: "none",
                borderRadius: "4px",
                cursor: "pointer",
              }}
              onClick={handleDownloadAudio}
            >
              Download Audio
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ScriptGenerator;
