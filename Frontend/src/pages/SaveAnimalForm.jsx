import React, { useState } from "react";

export default function SaveAnimalForm({ prediction, onClose }) {
  const [form, setForm] = useState({
    earTag: "",
    species: "Cattle",
    gender: "",
    ageMonths: "",
    ownerName: "",
    ownerContact: "",
    ownerVillage: "",
    ownerDistrict: "",
    ownerState: "",
    breed: prediction.breed || "",
    breedConfidence: prediction.confidence || 0,
  });

  const [toast, setToast] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const showToast = (message, type = "success") => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3500);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const owner = {
        name: form.ownerName,
        contact: form.ownerContact,
        village: form.ownerVillage,
        district: form.ownerDistrict,
        state: form.ownerState,
      };

      const payload = {
        earTag: form.earTag,
        breed: form.breed,
        breedConfidence: form.breedConfidence,
        species: form.species,
        gender: form.gender,
        ageMonths: Number(form.ageMonths),
        owner,
      };

      const res = await fetch(
        `${import.meta.env.VITE_APP_API_URL}/api/animals`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        }
      );

      if (!res.ok) throw new Error("Failed to save animal");

      showToast("✅ Animal details saved successfully!");
      setTimeout(() => onClose(), 1500);
    } catch (err) {
      console.error(err);
      showToast(`❌ ${err.message}`, "error");
    }
  };

  return (
    <>
      {/* Toast Notification */}
      {toast && (
        <div
          className={`fixed top-4 right-4 px-4 py-2 rounded shadow-lg text-white text-sm transition-opacity
          ${toast.type === "success" ? "bg-green-600" : "bg-red-600"}`}
        >
          {toast.message}
        </div>
      )}

      <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50 backdrop-blur-sm">
        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-2xl p-6 w-full max-w-md shadow-2xl space-y-4 border border-gray-100"
        >
          <h2 className="text-2xl font-bold text-center bg-gradient-to-r from-blue-600 to-green-500 bg-clip-text text-transparent">
            Save Animal to Database
          </h2>

          {/* Breed info */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block font-medium text-gray-700">
                Breed (AI)
              </label>
              <input
                type="text"
                value={form.breed}
                readOnly
                className="w-full border px-3 py-2 rounded bg-gray-100 cursor-not-allowed"
              />
            </div>
            <div>
              <label className="block font-medium text-gray-700">
                Confidence (%)
              </label>
              <input
                type="number"
                value={(form.breedConfidence * 100).toFixed(2)}
                readOnly
                className="w-full border px-3 py-2 rounded bg-gray-100 cursor-not-allowed"
              />
            </div>
          </div>

          {/* Animal details */}
          <div className="border-t pt-4 space-y-3">
            <div>
              <label className="block font-medium">Ear Tag (Unique ID)</label>
              <input
                name="earTag"
                value={form.earTag}
                onChange={handleChange}
                required
                className="w-full border px-3 py-2 rounded"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block font-medium">Species</label>
                <select
                  name="species"
                  value={form.species}
                  onChange={handleChange}
                  className="w-full border px-3 py-2 rounded"
                >
                  <option value="Cattle">Cow</option>
                  <option value="Buffalo">Buffalo</option>
                </select>
              </div>
              <div>
                <label className="block font-medium">Gender</label>
                <select
                  name="gender"
                  value={form.gender}
                  onChange={handleChange}
                  className="w-full border px-3 py-2 rounded"
                >
                  <option value="">Select</option>
                  <option value="Female">Female</option>
                  <option value="Male">Male</option>
                </select>
              </div>
            </div>
            <div>
              <label className="block font-medium">Age (Months)</label>
              <input
                type="number"
                name="ageMonths"
                value={form.ageMonths}
                onChange={handleChange}
                required
                className="w-full border px-3 py-2 rounded"
              />
            </div>
          </div>

          {/* Owner details */}
          <h3 className="font-semibold mt-4 text-lg text-gray-700">
            Owner Information
          </h3>
          <div className="space-y-3">
            <input
              name="ownerName"
              placeholder="Owner Name"
              value={form.ownerName}
              onChange={handleChange}
              required
              className="w-full border px-3 py-2 rounded"
            />
            <input
              name="ownerContact"
              placeholder="Contact Number"
              value={form.ownerContact}
              onChange={handleChange}
              className="w-full border px-3 py-2 rounded"
            />
            <input
              name="ownerVillage"
              placeholder="Village"
              value={form.ownerVillage}
              onChange={handleChange}
              className="w-full border px-3 py-2 rounded"
            />
            <input
              name="ownerDistrict"
              placeholder="District"
              value={form.ownerDistrict}
              onChange={handleChange}
              className="w-full border px-3 py-2 rounded"
            />
            <input
              name="ownerState"
              placeholder="State"
              value={form.ownerState}
              onChange={handleChange}
              className="w-full border px-3 py-2 rounded"
            />
          </div>

          {/* Buttons */}
          <div className="flex justify-end space-x-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded border hover:bg-gray-100"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 bg-gradient-to-r from-blue-600 to-green-500 text-white rounded hover:opacity-90"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
