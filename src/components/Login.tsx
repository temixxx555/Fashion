// Login.tsx
import { useState } from "react";
import { signInWithEmailAndPassword, AuthError } from "firebase/auth";
import { auth } from "../firebaseConfig";
import { Link, useNavigate } from "react-router-dom";

const ADMIN_EMAIL = "admin@example.com"; // specify the admin email here

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const userEmail = userCredential.user.email;
      
      if (userEmail === ADMIN_EMAIL) {
        navigate("/admin"); // Redirect to admin dashboard
      } else {
        navigate("/dashboard"); // Redirect to user dashboard
      }
    } catch (error) {
      const authError = error as AuthError;
      setError(authError.message);
    }
  };

 
  return (
    <div className='flex justify-center items-center min-h-screen bg-gray-100'>
      <form
        onSubmit={handleLogin}
        className='bg-white p-8 rounded shadow-md w-80'
      >
        <h2 className='text-2xl font-bold mb-6'>Login</h2>
        {error && <p className='text-red-500 text-sm mb-4'>{error}</p>}
        <div className='mb-4'>
          <label
            htmlFor='email'
            className='block text-sm font-medium text-gray-700'
          >
            Email
          </label>
          <input
            type='email'
            id='email'
            className='mt-1 block w-full border border-gray-300 rounded-md p-2'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className='mb-4'>
          <label
            htmlFor='password'
            className='block text-sm font-medium text-gray-700'
          >
            Password
          </label>
          <input
            type='password'
            id='password'
            className='mt-1 block w-full border border-gray-300 rounded-md p-2'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button
          type='submit'
          className='w-full py-2 bg-black text-white font-bold rounded-md'
        >
          Sign In
        </button>
        <div className='mt-4 text-center'>
        <Link to='/forgot-password'
            className='text-sm text-blue-500 hover:underline'
          >
            Forgot password?
         </Link>
        </div>
        <div className='mt-2 text-center'>
        <Link to='/signup' className='text-sm text-blue-500 hover:underline'>
            Create Account
        </Link>
        </div>
      </form>
    </div>
  );
};

export default Login;
