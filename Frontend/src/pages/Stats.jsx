import React, { useEffect, useState } from "react";
import {
  PieChart, Pie, Cell, Tooltip, ResponsiveContainer,
  LineChart, Line, CartesianGrid, XAxis, YAxis
} from "recharts";

const COLORS = ["#1d4ed8", "#2563eb", "#3b82f6", "#60a5fa", "#93c5fd"];

const MetricCard = ({ title, value, note }) => (
  <div className="bg-white border rounded-xl shadow p-6 flex flex-col justify-between">
    <div>
      <h3 className="text-gray-500 text-sm">{title}</h3>
      <p className="text-3xl sm:text-4xl font-bold text-blue-700 mt-1 break-words">{value}</p>
    </div>
    {note && <p className="text-xs text-gray-400 mt-2">{note}</p>}
  </div>
);

export default function StatsDashboard() {
  const [loading, setLoading] = useState(true);
  const [overview, setOverview] = useState({});
  const [breeds, setBreeds] = useState([]);
  const [ageBuckets, setAgeBuckets] = useState([]);
  const [lowConfidence, setLowConfidence] = useState([]);
  const [owners, setOwners] = useState([]);
  const [monthly, setMonthly] = useState([]);
  const API = import.meta.env.VITE_APP_API_URL;

  const fetchAll = async () => {
    setLoading(true);
    try {
      const [ov, br, age, low, own, mon] = await Promise.all([
        fetch(`${API}/api/stats/overview`).then(r => r.json()),
        fetch(`${API}/api/stats/breeds`).then(r => r.json()),
        fetch(`${API}/api/stats/age-distribution`).then(r => r.json()),
        fetch(`${API}/api/stats/low-confidence?threshold=0.7`).then(r => r.json()),
        fetch(`${API}/api/stats/by-owner`).then(r => r.json()),
        fetch(`${API}/api/stats/monthly`).then(r => r.json())
      ]);
      setOverview(ov);
      setBreeds(br.breeds || []);
      setAgeBuckets(age.buckets || []);
      setLowConfidence(low.items || []);
      setOwners(own.owners || []);
      setMonthly(mon.monthly || []);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchAll(); }, []);
  if (loading) return <div className="p-10 text-center text-gray-600">Fetching statistics…</div>;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-12 bg-gray-50">

      {/* ===== Title & Intro ===== */}
      <section className="text-center space-y-2">
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-800">
          Bharat Pashudhan – Animal Registration Dashboard
        </h1>
        <p className="text-gray-600 max-w-3xl mx-auto text-sm sm:text-base">
          Live analytics from the nationwide cattle & buffalo breed recognition initiative.
          Data updates in real time as field officers upload new registrations.
        </p>
      </section>

      {/* ===== Key Metrics ===== */}
      <section>
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Key Indicators</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <MetricCard title="Total Animals" value={overview.total || 0} />
          <MetricCard title="Distinct Breeds" value={overview.distinctBreedsCount || 0} />
          <MetricCard
            title="Species Split"
            value={overview.bySpecies?.map(s => `${s._id}: ${s.count}`).join(" | ")}
          />
          <MetricCard
            title="Low-Confidence Predictions"
            value={lowConfidence.length}
            note="Require manual verification"
          />
        </div>
      </section>

      {/* ===== Breed & Age ===== */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Breed Distribution */}
        <div className="bg-white border rounded-xl shadow p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-3">Breed Distribution</h3>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={breeds.map(b => ({ name: b.breed, value: b.count }))}
                dataKey="value" nameKey="name" outerRadius={90} label
              >
                {breeds.map((_, idx) => (
                  <Cell key={idx} fill={COLORS[idx % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
          <p className="text-xs text-gray-500 mt-2">
            Share of each recognized breed among all registered animals.
          </p>
        </div>

        {/* Age Distribution Table */}
        <div className="bg-white border rounded-xl shadow p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-3">Age Distribution</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-sm border">
              <thead className="bg-gray-100">
                <tr>
                  <th className="p-2 border">Age Group (Months)</th>
                  <th className="p-2 border">Count</th>
                </tr>
              </thead>
              <tbody>
                {ageBuckets.map(b => (
                  <tr key={b._id}>
                    <td className="p-2 border">{b._id}</td>
                    <td className="p-2 border text-center">{b.count}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* ===== Monthly Trend ===== */}
      <section className="bg-white border rounded-xl shadow p-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-3">Monthly Registration Trend</h3>
        <ResponsiveContainer width="100%" height={250}>
          <LineChart data={monthly}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="_id" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="count" stroke="#2563eb" strokeWidth={2} dot />
          </LineChart>
        </ResponsiveContainer>
        <p className="text-xs text-gray-500 mt-2">
          Animals registered per month to identify seasonal patterns.
        </p>
      </section>

      {/* ===== Detailed Lists ===== */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Low confidence table */}
        <div className="bg-white border rounded-xl shadow p-6 overflow-x-auto">
          <h3 className="text-lg font-semibold text-gray-800 mb-3">Records Needing Verification</h3>
          <table className="min-w-full text-sm border">
            <thead className="bg-gray-100">
              <tr>
                <th className="p-2 border">Ear Tag</th>
                <th className="p-2 border">Breed</th>
                <th className="p-2 border">Confidence</th>
                <th className="p-2 border">Owner</th>
              </tr>
            </thead>
            <tbody>
              {lowConfidence.map(a => (
                <tr key={a._id}>
                  <td className="p-2 border">{a.earTag}</td>
                  <td className="p-2 border">{a.breed}</td>
                  <td className="p-2 border text-center">
                    {(a.breedConfidence * 100).toFixed(1)}%
                  </td>
                  <td className="p-2 border">{a.owner?.name || "-"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Top owners table */}
        <div className="bg-white border rounded-xl shadow p-6 overflow-x-auto">
          <h3 className="text-lg font-semibold text-gray-800 mb-3">Top Livestock Owners</h3>
          <table className="w-full text-sm border">
            <thead className="bg-gray-100">
              <tr>
                <th className="p-2 border">Owner</th>
                <th className="p-2 border">Animals Registered</th>
              </tr>
            </thead>
            <tbody>
              {owners.map(o => (
                <tr key={o.owner}>
                  <td className="p-2 border">{o.owner}</td>
                  <td className="p-2 border text-center">{o.count}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* ===== Footer ===== */}
      <section className="text-center pt-6">
        <button
          onClick={fetchAll}
          className="bg-blue-700 text-white px-6 py-2 rounded shadow hover:bg-blue-800"
        >
          Refresh All Data
        </button>
        <p className="text-xs text-gray-500 mt-3">
          Data source: Bharat Pashudhan App – updated in real time
        </p>
      </section>
    </div>
  );
}
