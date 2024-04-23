import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  signInStart,
  signInSuccess,
  signInFailure,
} from '../redux/user/userSlice';
import { useDispatch, useSelector } from 'react-redux';
import OAuth from '../components/OAuth';

export default function SignIn() {
  const [formData, setFormData] = useState({});
  const { loading, error } = useSelector((state) => state.user);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(signInStart());
      const res = await fetch('http://localhost:5500/auth/signin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success === false) {
        dispatch(signInFailure(data));
        return;
      }
      dispatch(signInSuccess(data));
      navigate('/');
    } catch (error) {
      dispatch(signInFailure(error));
    }
  };

  return (
    <div style={{ padding: '2rem', maxWidth: '400px', margin: 'auto', backgroundColor: '#fafafa', borderRadius: '8px', boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)' }}>
      <h1 style={{ fontSize: '2.5rem', fontWeight: 'bold', textAlign: 'center', marginBottom: '1.5rem', color: '#333', fontFamily: 'Roboto, sans-serif' }}>Sign In</h1>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
        <input
          type='email'
          placeholder='Email'
          id='email'
          style={{ backgroundColor: '#fff', padding: '1rem', borderRadius: '6px', border: '2px solid #ddd', fontSize: '1rem', fontFamily: 'Roboto, sans-serif' }}
          onChange={handleChange}
        />
        <input
          type='password'
          placeholder='Password'
          id='password'
          style={{ backgroundColor: '#fff', padding: '1rem', borderRadius: '6px', border: '2px solid #ddd', fontSize: '1rem', fontFamily: 'Roboto, sans-serif' }}
          onChange={handleChange}
        />
        <button
          disabled={loading}
          style={{ backgroundColor: '#2196f3', color: '#fff', padding: '1rem', borderRadius: '6px', textTransform: 'uppercase', cursor: 'pointer', fontSize: '1rem', transition: 'opacity 0.3s', border: 'none', fontFamily: 'Roboto, sans-serif', ':hover': { backgroundColor: '#1976d2' }, ':disabled': { opacity: '0.8' } }}
        >
          {loading ? 'Loading...' : 'Sign In'}
        </button>
        <OAuth />
      </form>
      <div style={{ display: 'flex', justifyContent: 'center', marginTop: '1rem' }}>
        <p style={{ color: '#555', fontSize: '1rem', fontFamily: 'Roboto, sans-serif' }}>Don't have an account?</p>
        <Link to='/sign-up' style={{ color: '#2196f3', textDecoration: 'none', fontSize: '1rem', fontFamily: 'Roboto, sans-serif' }}>
          <span style={{ color: '#2196f3', textDecoration: 'none', marginLeft: '0.25rem', fontFamily: 'Roboto, sans-serif' }}>Sign up</span>
        </Link>
      </div>
      <p style={{ color: '#f44336', textAlign: 'center', marginTop: '1rem', fontSize: '1rem', fontFamily: 'Roboto, sans-serif' }}>
        {error ? error.message || 'Something went wrong!' : ''}
      </p>
    </div>
  );
}