"use client";

import { useState } from "react";
import {
  User,
  Mail,
  Phone,
  Calendar,
  Instagram,
  Upload,
  Image as ImageIcon,
} from "lucide-react";

export default function FormPage() {
const initialFormData = {
  firstName: "",
  middleName: "",
  lastName: "",
  phone: "",
  email: "",
  birthDate: "",
  instagram: "",
  image: null as File | null,
};

  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [showModal, setShowModal] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData((prev) => ({ ...prev, image: file }));
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

const [formData, setFormData] = useState(initialFormData);
const [fileInputKey, setFileInputKey] = useState(0);

const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();

  const data = new FormData();

  Object.entries(formData).forEach(([key, value]) => {
    if (value !== null) data.append(key, value as any);
  });

  const res = await fetch("http://localhost:3000/api/form", {
    method: "POST",
    body: data,
  });

  if (res.ok) {
    // ✅ show success
    setShowModal(true);

    // ✅ reset form
    setFormData(initialFormData);
    setImagePreview(null);
setFileInputKey((prev) => prev + 1);

    // ✅ auto close modal
    setTimeout(() => setShowModal(false), 3000);
  } else {
    alert("Something went wrong");
  }
};


  return (
    <div
      className="min-h-screen flex flex-col"
      style={{ backgroundColor: "#070E19" }}
    >
      {/* Main Content */}
      <main className="flex-grow flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-2xl">
          {/* Logo Section */}
          <div className="text-center mb-2">
            <div className="inline-flex items-center justify-center mb-6">
              <div className="relative">
                {/* Logo Image */}
                <img
                  src="/Whole-Logo-White.png"
                  alt="Artl Studio, LLC Logo"
                  className="w-full h-full object-cover "
                />
              </div>
            </div>

            <p className="text-lg md:text-xl" style={{ color: "#686EDA" }}>
              Please fill in your information
            </p>
            <div className=" flex items-center justify-between mt-4">
              <img src="/FIKA.png" alt="FIKA Logo" className=" w-20 sm:w-30" />
              <img
                src="/DrVision.png"
                alt="Dr Vision Logo"
                className="w-30 sm:w-40"
              />
            </div>
          </div>

          {/* Form Card */}
          <div className="bg-white/5 backdrop-blur-lg rounded-3xl p-8 md:p-10 shadow-2xl border border-white/10">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Full Name - Three Parts */}
              <div className="space-y-4">
                <label
                  className="block text-sm font-medium mb-2"
                  style={{ color: "#15F3AF" }}
                >
                  Full Name
                </label>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {/* First Name */}
                  <div className="relative">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <input
                      type="text"
                      name="firstName"
                      placeholder="First Name"
                      required
                      value={formData.firstName}
                      onChange={handleInputChange}
                      className="w-full pl-12 pr-4 py-3 bg-white/10 border border-[#686EDA]/30 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#15F3AF] focus:border-transparent transition-all"
                    />
                  </div>
                  {/* Middle Name */}
                  <div className="relative">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <input
                      type="text"
                      name="middleName"
                      placeholder="Middle Name"
                      value={formData.middleName}
                      onChange={handleInputChange}
                      className="w-full pl-12 pr-4 py-3 bg-white/10 border border-[#686EDA]/30 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#15F3AF] focus:border-transparent transition-all"
                    />
                  </div>
                  {/* Last Name */}
                  <div className="relative">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <input
                      type="text"
                      name="lastName"
                      placeholder="Last Name"
                      required
                      value={formData.lastName}
                      onChange={handleInputChange}
                      className="w-full pl-12 pr-4 py-3 bg-white/10 border border-[#686EDA]/30 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#15F3AF] focus:border-transparent transition-all"
                    />
                  </div>
                </div>
              </div>

              {/* Phone Number */}
              <div>
                <label
                  className="block text-sm font-medium mb-2"
                  style={{ color: "#15F3AF" }}
                >
                  Phone Number
                </label>
                <div className="relative">
                  <Phone className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input
                    type="tel"
                    name="phone"
                    placeholder="+1 (555) 123-4567"
                    required
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full pl-12 pr-4 py-3 bg-white/10 border border-[#686EDA]/30 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#15F3AF] focus:border-transparent transition-all"
                  />
                </div>
              </div>

              {/* Email */}
              <div>
                <label
                  className="block text-sm font-medium mb-2"
                  style={{ color: "#15F3AF" }}
                >
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input
                    type="email"
                    name="email"
                    placeholder="your.email@example.com"
                    required
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full pl-12 pr-4 py-3 bg-white/10 border border-[#686EDA]/30 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#15F3AF] focus:border-transparent transition-all"
                  />
                </div>
              </div>

              {/* Birth Date */}
              <div>
                <label
                  className="block text-sm font-medium mb-2"
                  style={{ color: "#15F3AF" }}
                >
                  Birth Date
                </label>
                <div className="relative">
                  <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input
                    type="date"
                    name="birthDate"
                    required
                    value={formData.birthDate}
                    onChange={handleInputChange}
                    className="w-full pl-12 pr-4 py-3 bg-white/10 border border-[#686EDA]/30 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#15F3AF] focus:border-transparent transition-all"
                  />
                </div>
              </div>

              {/* Instagram Username */}
              <div>
                <label
                  className="block text-sm font-medium mb-2"
                  style={{ color: "#15F3AF" }}
                >
                  Instagram Username
                </label>
                <div className="relative">
                  <Instagram className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input
                    type="text"
                    name="instagram"
                    placeholder="@username"
                    required
                    value={formData.instagram}
                    onChange={handleInputChange}
                    className="w-full pl-12 pr-4 py-3 bg-white/10 border border-[#686EDA]/30 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#15F3AF] focus:border-transparent transition-all"
                  />
                </div>
              </div>

              {/* Upload Image */}
              <div>
                <label
                  className="block text-sm font-medium mb-2"
                  style={{ color: "#15F3AF" }}
                >
                  Upload Image
                </label>
                <div className="relative">
                  <input
                  key={fileInputKey}
                    type="file"
                    id="image-upload"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                  />
                  <label
                    htmlFor="image-upload"
                    className={`flex items-center justify-center gap-4 w-full py-8 border-2 border-dashed rounded-xl cursor-pointer transition-all ${
                      imagePreview
                        ? "border-[#15F3AF] bg-[#15F3AF]/5"
                        : "border-[#686EDA]/30 bg-white/5 hover:bg-white/10 hover:border-[#15F3AF]/50"
                    }`}
                  >
                    {imagePreview ? (
                      <div className="flex flex-col items-center gap-3">
                        <img
                          src={imagePreview}
                          alt="Preview"
                          className="w-32 h-32 object-cover rounded-lg shadow-lg"
                        />
                        <span className="text-sm" style={{ color: "#686EDA" }}>
                          Click to change image
                        </span>
                      </div>
                    ) : (
                      <div className="flex flex-col items-center gap-3">
                        <div className="w-16 h-16 rounded-full flex items-center justify-center bg-[#686EDA]/20">
                          <ImageIcon
                            className="h-8 w-8"
                            style={{ color: "#686EDA" }}
                          />
                        </div>
                        <div className="text-center">
                          <p className="text-white font-medium">
                            Click to upload image
                          </p>
                          <p className="text-sm text-gray-400 mt-1">
                            PNG, JPG up to 10MB
                          </p>
                        </div>
                      </div>
                    )}
                  </label>
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full py-4 px-6 rounded-xl font-bold text-lg transition-all transform hover:scale-[1.02] active:scale-[0.98] shadow-lg"
                style={{
                  background:
                    "linear-gradient(135deg, #686EDA 0%, #15F3AF 100%)",
                  color: "#070E19",
                }}
              >
                Submit Application
              </button>
            </form>
          </div>
          {/* Success Modal */}
          {showModal && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
              <div className="bg-[#070E19] rounded-3xl px-12 py-10 shadow-2xl border border-white/10 flex flex-col items-center gap-6 animate-fadeIn">
                {/* Animated Ring */}
                <div className="relative">
                  <div className="absolute inset-0 rounded-full animate-pingSlow bg-[#15F3AF]/30" />

                  {/* Check Circle */}
                  <div className="relative w-28 h-28 rounded-full flex items-center justify-center bg-gradient-to-br from-[#15F3AF] to-[#686EDA] animate-scaleIn">
                    <svg
                      className="w-12 h-12 text-[#070E19] animate-checkDraw"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="4"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </div>
                </div>

                <h2 className="text-2xl font-bold text-white">
                  Submitted Successfully
                </h2>

                <p className="text-gray-400 text-center max-w-xs">
                  Thanks for applying — we’ll contact you shortly.
                </p>
              </div>
            </div>
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className="py-6 px-4 border-t border-white/10">
        <div className="max-w-2xl mx-auto text-center">
          <p className="text-sm text-gray-400">
            © 2026 Artl Studio, LLC. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
