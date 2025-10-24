import { createFileRoute, useNavigate } from '@tanstack/react-router';
import { useAuth0 } from '@auth0/auth0-react';
import { useEffect, useState } from 'react';
import { layoutStyles } from '../styles/layoutStyles';
import { useCurrentUser } from '../integrations/api';

export const Route = createFileRoute('/home')({
  component: HomePage,
});

function HomePage() {
  const { user, isAuthenticated, isLoading: authLoading } = useAuth0();
  const navigate = useNavigate();
  const [hasRedirected, setHasRedirected] = useState(false);
  const [fadeOut] = useState(false);
  const [countdown, setCountdown] = useState(3);

  // Fetch user info from backend
  const { data: currentUser, isLoading: userLoading } = useCurrentUser();

  // Handle not authenticated redirect
  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      const countdownInterval = setInterval(() => {
        setCountdown((prev) => prev - 1);
      }, 1000);

      const redirectTimer = setTimeout(() => {
        navigate({ to: '/login' });
      }, 3000);

      return () => {
        clearInterval(countdownInterval);
        clearTimeout(redirectTimer);
      };
    }
  }, [authLoading, isAuthenticated, navigate]);

  // Handle authenticated redirect to correct page based on userType
  useEffect(() => {
    if (!authLoading && !userLoading && isAuthenticated && !hasRedirected) {

      setTimeout(() => {
        const userType = localStorage.getItem('userType') || 'instructor';

        if (userType === 'student') {
          navigate({ to: '/student/dashboard' });
        } else if (userType === 'instructor') {
          navigate({ to: '/instructor/assignments' });
        } else if (userType === 'admin') {
          navigate({ to: '/admin/courses' });
        }

        setHasRedirected(true);
      }, 3500);
    }
  }, [authLoading, userLoading, isAuthenticated, navigate, hasRedirected]);

  if (authLoading || userLoading) {
    return (
      <div style={layoutStyles.centerMessage}>
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>💻</div>
          <h2 style={{ margin: 0, marginBottom: '0.5rem' }}>Welcome to CodeCollab!</h2>
          <p style={{ margin: 0, opacity: 0.8 }}>Setting up your account...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div style={layoutStyles.centerMessage}>
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🔒</div>
          <h1 style={{
            marginBottom: '1rem',
            fontSize: '2rem'
          }}>
            Not Authenticated
          </h1>
          <p style={{ fontSize: '1.125rem', opacity: 0.8 }}>
            Redirecting to login in {countdown} second{countdown !== 1 ? 's' : ''}...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div style={layoutStyles.centerMessage}>
      <div style={{
        textAlign: 'center',
        opacity: fadeOut ? 0 : 1,
        transition: 'opacity 0.5s ease-in-out',
      }}>
        <div style={{
          fontSize: '4rem',
          marginBottom: '1rem',
          animation: 'bounce 1s ease-in-out'
        }}>
          👋
        </div>
        <h1 style={{
          margin: 0,
          marginBottom: '1rem',
          fontSize: '2.5rem',
          fontWeight: '600',
          background: 'linear-gradient(135deg, #667eea, #764ba2)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'white',
        }}>
          Welcome, {user?.name || currentUser?.name || 'User'}!
        </h1>
        <p style={{
          margin: 0,
          marginBottom: '0.5rem',
          fontSize: '1.125rem',
          opacity: 0.9
        }}>
          {user?.email || currentUser?.email}
        </p>
      </div>

      {/* Add animations */}
      <style>{`
        @keyframes bounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-20px); }
        }
        
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}