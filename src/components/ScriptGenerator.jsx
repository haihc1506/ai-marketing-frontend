import React, { useState } from "react";
import "../App.css";

const ScriptGenerator = () => {
  // 1. Quản lý Input đầu vào
  const [formData, setFormData] = useState({
    productName: "",
    targetAudience: "",
    usp: "",
    tone: "Hài hước, bắt trend",
    socialNetwork: "TikTok",
  });
  const [videoFile, setVideoFile] = useState(null);
  const [videoPreview, setVideoPreview] = useState(null);

  // 2. Quản lý trạng thái xử lý
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  // 3. Quản lý Output (Kết quả từ AI)
  // Khởi tạo null hoặc object rỗng theo đúng cấu trúc JSON mong muốn
  const [scriptResult, setScriptResult] = useState({
    hook_sentence: "",
    body_script: "",
    cta: "",
    caption_hashtags: [],
  });

  const [appPassword, setAppPassword] = useState("");

  // --- HÀM XỬ LÝ (HANDLERS) ---

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setVideoFile(file);
      // Tạo URL ảo để preview video ngay lập tức
      setVideoPreview(URL.createObjectURL(file));
    }
  };

  // Hàm quan trọng: Kết nối với Backend
  const generateScript = async () => {
    if (!videoFile) return alert("Vui lòng chọn video!");

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

      const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5000";

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
        </div>
      </div>
    </div>
  );
};

export default ScriptGenerator;
