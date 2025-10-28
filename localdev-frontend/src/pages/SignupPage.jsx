import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import useAuthStore from "../store/authStore";
import Header from "../component/Header";

function Signup() {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { signup } = useAuthStore();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      await signup(form);
      navigate("/login");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-black text-white">
      <Header />
      <div className="flex flex-col items-center justify-center flex-1 px-4">
        <h1 className="text-3xl font-bold mb-4 text-center">Create Account</h1>
        <p className="text-center text-gray-400 mb-6 text-sm">
          Join us and start your journey
        </p>

        <div className="w-full max-w-sm bg-black p-6 rounded-lg border border-gray-800 shadow-md">
          {error && <p className="text-red-500 mb-4 text-sm">{error}</p>}

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div>
              <label className="block text-gray-400 text-sm mb-1">Full Name</label>
              <input
                type="text"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                placeholder="John Doe"
                required
                className="w-full p-2 rounded bg-black border border-gray-700 focus:outline-none text-white placeholder-gray-500"
              />
            </div>

            <div>
              <label className="block text-gray-400 text-sm mb-1">Email</label>
              <input
                type="email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                placeholder="john@example.com"
                required
                className="w-full p-2 rounded bg-black border border-gray-700 focus:outline-none text-white placeholder-gray-500"
              />
            </div>

            <div>
              <label className="block text-gray-400 text-sm mb-1">Password</label>
              <input
                type="password"
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
                placeholder="••••••••"
                required
                className="w-full p-2 rounded bg-black border border-gray-700 focus:outline-none text-white placeholder-gray-500"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full mt-2 p-2 bg-gray-900 border border-gray-700 rounded hover:bg-gray-800"
            >
              {loading ? "Creating Account..." : "Sign Up"}
            </button>
          </form>

          <p className="text-center text-gray-400 text-sm mt-4">
            Already have an account?{" "}
            <Link to="/login" className="text-blue-500 hover:underline">
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Signup;
