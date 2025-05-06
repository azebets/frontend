import React, { useState, useEffect } from 'react';

export default function VerificationModal({ isOpen, onClose, onVerify, onResendCode }) {
  const [code, setCode] = useState(new Array(6).fill('')); // Array for 6-digit code
  const [error, setError] = useState('');
  const [isResendDisabled, setIsResendDisabled] = useState(true); // Disable resend initially
  const [countdown, setCountdown] = useState(60); // Countdown timer (60 seconds)

  useEffect(() => {
    let timer;
    if (isResendDisabled) {
      timer = setInterval(() => {
        setCountdown((prev) => {
          if (prev <= 1) {
            clearInterval(timer);
            setIsResendDisabled(false); // Enable the resend button
            return 60; // Reset countdown
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [isResendDisabled]);

  const handleChange = (value, index) => {
    if (isNaN(value)) return; // Only allow numbers
    const newCode = [...code];
    newCode[index] = value;
    setCode(newCode);

    // Automatically focus the next input
    if (value && index < 5) {
      document.getElementById(`code-input-${index + 1}`).focus();
    }
  };

  const handleSubmit = () => {
    const verificationCode = code.join('');
    if (verificationCode.length < 6) {
      setError('Please enter all 6 digits.');
      return;
    }

    onVerify(verificationCode);
  };

  const handleResendCode = () => {
    setIsResendDisabled(true); // Disable the resend button
    setCountdown(60); // Reset the countdown
    onResendCode(); // Trigger the resend code function
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-[#000000ab] bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-[#1a2c38] p-6 rounded shadow-lg w-96">
        <h2 className="text-lg text-white font-bold mb-4">Verify Your Account</h2>
        <p className="text-sm text-gray-400 mb-4">
          Please enter the 6-digit code sent to your email.
        </p>
        <div className="flex justify-between mb-4">
          {code.map((digit, index) => (
            <input
              key={index}
              id={`code-input-${index}`}
              type="text"
              maxLength="1"
              value={digit}
              onChange={(e) => handleChange(e.target.value, index)}
              className="w-10 h-10 text-center border border-gray-500 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          ))}
        </div>
        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
        <div className="flex justify-between items-center mb-4">
          <button
            onClick={handleResendCode}
            disabled={isResendDisabled}
            className={`text-sm ${
              isResendDisabled
                ? 'text-gray-500 cursor-not-allowed'
                : 'text-blue-500 hover:underline'
            }`}
          >
            {isResendDisabled ? `Resend Code in ${countdown}s` : 'Resend Code'}
          </button>
        </div>
        <div className="flex justify-end space-x-4">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-500"
          >
            Verify
          </button>
        </div>
      </div>
    </div>
  );
}