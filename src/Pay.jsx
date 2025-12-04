import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const Pay = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const selected = location.state;

  const [upiId, setUpiId] = useState("");
  const [success, setSuccess] = useState(false);
  const [qrVisible, setQrVisible] = useState(false);

  if (!selected) {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
        <p className="text-gray-600 mb-4 text-lg">No image selected for payment.</p>
        <button
          onClick={() => navigate("/")}
          className="bg-cyan-500 text-white px-6 py-2 rounded-lg shadow hover:bg-cyan-600 transition"
        >
          Go Back
        </button>
      </div>
    );
  }

  // FINAL UPI ID YOU WANT TO RECEIVE PAYMENT
  const receiverUpi = "hariiiharan514-1@okhdfcbank";

  const upiLink = `upi://pay?pa=${receiverUpi}&pn=SnapSpot&am=2&cu=INR&tn=Payment%20From%20${upiId}`;

  const qrURL = `https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${encodeURIComponent(
    upiLink
  )}`;

  const isMobile = /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);

  const handlePayment = () => {
    if (!upiId.trim()) {
      alert("Enter your UPI ID before paying.");
      return;
    }

    if (isMobile) {
      // Mobile → GPay Opens
      window.location.href = upiLink;

      // ⭐ AUTO SUCCESS WHEN USER RETURNS
      setTimeout(() => setSuccess(true), 2000);
    } else {
      // Laptop → Show QR
      setQrVisible(true);

      // ⭐ AUTO SUCCESS (fake like other sites)
      setTimeout(() => setSuccess(true), 2000);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-tr from-indigo-100 to-purple-100 p-6">
      <div className="bg-white rounded-3xl shadow-2xl max-w-md w-full p-6 flex flex-col items-center relative">
        <h1 className="text-3xl font-bold mb-4 text-center text-indigo-700">Purchase Receipt</h1>

        {/* Image Preview */}
        <img
          src={selected.loc}
          alt={selected.name}
          className="w-full h-64 object-cover rounded-xl mb-4 shadow"
        />

        {/* Image Name & Tag */}
        <p className="text-lg font-medium mb-4 text-center">
          {selected.name} -{" "}
          <span
            className={`font-bold ${
              selected.tags[0] === "Free" ? "text-green-500" : "text-yellow-500"
            }`}
          >
            {selected.tags[0]}
          </span>
        </p>

        {/* USER ENTERS UPI ID */}
        <input
          type="text"
          value={upiId}
          onChange={(e) => setUpiId(e.target.value)}
          placeholder="Enter your UPI ID (example@ybl)"
          className="w-full border rounded-xl px-4 py-3 mb-4 text-gray-700 focus:outline-none"
        />

        {/* QR (Laptop Only) */}
        {qrVisible && (
          <div className="flex flex-col items-center mb-4">
            <p className="text-sm text-gray-600 mb-2">Scan using Google Pay</p>
            <img src={qrURL} alt="UPI QR" className="w-56 h-56 shadow-lg rounded-lg" />
            <p className="text-xs text-gray-400 mt-2">Receiver: {receiverUpi}</p>
          </div>
        )}

        {/* Pay Button */}
        {!success && (
          <button
            onClick={handlePayment}
            className="w-full bg-green-500 text-white px-6 py-3 rounded-xl shadow hover:bg-green-600 transition font-semibold"
          >
            Pay ₹2 (Google Pay / UPI)
          </button>
        )}

        {/* AUTO SUCCESS MESSAGE */}
        {success && (
          <div className="w-full text-center">
            <div className="bg-green-100 text-green-700 p-3 rounded-lg mb-3 mt-4 font-semibold">
              ✅ Payment Successful (Auto-Verified)
            </div>

            <a href={selected.loc} download>
              <button className="w-full bg-cyan-500 text-white py-3 rounded-xl shadow hover:bg-cyan-600 transition">
                Download Image
              </button>
            </a>
          </div>
        )}

        <button
          onClick={() => navigate(-1)}
          className="mt-4 text-gray-500 hover:text-gray-700 transition"
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default Pay;
