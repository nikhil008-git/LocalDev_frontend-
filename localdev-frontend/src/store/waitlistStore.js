import { create } from 'zustand';
import axios from 'axios';

const API_URL = "https://localdev-backend-7.onrender.com/"
const useWaitlistStore = create((set) => ({
  loading: false,
  error: null,
  success: false,

  joinWaitlist: async (email) => {
    set({ loading: true, error: null, success: false });
    try {
      const response = await axios.post(`${API_URL}`, { email });
      set({ loading: false, success: true });
      return { success: true, data: response.data };
    } catch (err) {
      const message = err.response?.data?.message || 'already in the waiting list';
      set({ loading: false, error: message, success: false });
      return { success: false, message };
    }
  },

  resetState: () => set({ loading: false, error: null, success: false }),
}));

export default useWaitlistStore;
