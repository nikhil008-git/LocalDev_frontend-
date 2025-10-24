// src/pages/SignupPage.jsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Header from "../component/Header";


export default function SignupPage() {
  const { signup } = useAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const result = await signup(formData.name, formData.email, formData.password);

    if (result.success) {
      alert('Signup successful! Please login.');
      navigate('/login');
    } else {
      setError(result.message);
    }
    setLoading(false);
  };

  return (
    <>
    <Header /> 
    <div style={{ 
      display: 'flex', 
      justifyContent: 'center', 
      alignItems: 'center', 
      minHeight: '100vh',
      background: '#000000',
      padding: '20px'
    }}>
      <div style={{ 
        padding: '40px', 
        borderRadius: '20px', 
        background: 'rgba(20, 20, 20, 0.7)',
        backdropFilter: 'blur(20px)',
        border: '1px solid rgba(255, 255, 255, 0.1)',
        boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.5)',
        width: '100%',
        maxWidth: '400px'
      }}>
        <h2 style={{ 
          textAlign: 'center', 
          marginBottom: '30px',
          color: '#ffffff',
          fontSize: '28px',
          fontWeight: '600',
          letterSpacing: '0.5px'
        }}>Create Account</h2>

        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '20px' }}>
            <label style={{ 
              color: '#b0b0b0', 
              fontSize: '14px',
              display: 'block',
              marginBottom: '8px'
            }}>Name</label>
            <input
              type="text"
              placeholder="Enter your name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required
              style={{ 
                width: '100%', 
                padding: '12px 16px', 
                background: 'rgba(255, 255, 255, 0.05)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                borderRadius: '10px',
                color: '#ffffff',
                fontSize: '15px',
                outline: 'none',
                transition: 'all 0.3s ease',
                boxSizing: 'border-box'
              }}
              onFocus={(e) => e.target.style.border = '1px solid rgba(255, 255, 255, 0.3)'}
              onBlur={(e) => e.target.style.border = '1px solid rgba(255, 255, 255, 0.1)'}
            />
          </div>

          <div style={{ marginBottom: '20px' }}>
            <label style={{ 
              color: '#b0b0b0', 
              fontSize: '14px',
              display: 'block',
              marginBottom: '8px'
            }}>Email</label>
            <input
              type="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              required
              style={{ 
                width: '100%', 
                padding: '12px 16px', 
                background: 'rgba(255, 255, 255, 0.05)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                borderRadius: '10px',
                color: '#ffffff',
                fontSize: '15px',
                outline: 'none',
                transition: 'all 0.3s ease',
                boxSizing: 'border-box'
              }}
              onFocus={(e) => e.target.style.border = '1px solid rgba(255, 255, 255, 0.3)'}
              onBlur={(e) => e.target.style.border = '1px solid rgba(255, 255, 255, 0.1)'}
            />
          </div>

          <div style={{ marginBottom: '20px' }}>
            <label style={{ 
              color: '#b0b0b0', 
              fontSize: '14px',
              display: 'block',
              marginBottom: '8px'
            }}>Password</label>
            <input
              type="password"
              placeholder="Enter your password"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              required
              style={{ 
                width: '100%', 
                padding: '12px 16px', 
                background: 'rgba(255, 255, 255, 0.05)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                borderRadius: '10px',
                color: '#ffffff',
                fontSize: '15px',
                outline: 'none',
                transition: 'all 0.3s ease',
                boxSizing: 'border-box'
              }}
              onFocus={(e) => e.target.style.border = '1px solid rgba(255, 255, 255, 0.3)'}
              onBlur={(e) => e.target.style.border = '1px solid rgba(255, 255, 255, 0.1)'}
            />
          </div>

          {error && (
            <div style={{ 
              marginBottom: '20px', 
              color: '#ff4444',
              background: 'rgba(255, 68, 68, 0.1)',
              padding: '12px',
              borderRadius: '8px',
              fontSize: '14px',
              border: '1px solid rgba(255, 68, 68, 0.2)'
            }}>
              {error}
            </div>
          )}

          <button 
            type="submit" 
            disabled={loading} 
            style={{ 
              width: '100%', 
              padding: '14px',
              background: 'linear-gradient(135deg, #2d2d2d 0%, #1a1a1a 100%)',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              borderRadius: '10px',
              color: '#ffffff',
              fontSize: '16px',
              fontWeight: '600',
              cursor: loading ? 'not-allowed' : 'pointer',
              transition: 'all 0.3s ease',
              boxShadow: '0 4px 15px rgba(0, 0, 0, 0.3)',
              opacity: loading ? 0.7 : 1
            }}
            onMouseEnter={(e) => !loading && (e.target.style.background = 'linear-gradient(135deg, #3d3d3d 0%, #2a2a2a 100%)')}
            onMouseLeave={(e) => !loading && (e.target.style.background = 'linear-gradient(135deg, #2d2d2d 0%, #1a1a1a 100%)')}
          >
            {loading ? 'Creating Account...' : 'Sign Up'}
          </button>
        </form>

        <p style={{ 
          textAlign: 'center', 
          marginTop: '25px',
          color: '#888888',
          fontSize: '14px'
        }}>
          Already have an account?{' '}
          <button 
            onClick={() => navigate('/login')} 
            style={{ 
              background: 'none',
              border: 'none',
              color: '#ffffff',
              textDecoration: 'underline', 
              cursor: 'pointer',
              fontSize: '14px',
              padding: 0
            }}
          >
            Login
          </button>
        </p>
      </div>
    </div>
    </>
  );
}