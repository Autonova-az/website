'use client';

import { useEffect } from 'react';

export default function GlobalError({ error, reset }) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error('Global application error:', error);
  }, [error]);

  return (
    <html>
      <body>
        <div style={{
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          padding: '2rem',
          fontFamily: 'system-ui, -apple-system, sans-serif'
        }}>
          <div style={{
            textAlign: 'center',
            color: 'white',
            maxWidth: '600px',
            background: 'rgba(255, 255, 255, 0.1)',
            padding: '3rem',
            borderRadius: '16px',
            backdropFilter: 'blur(10px)',
            boxShadow: '0 20px 40px rgba(0, 0, 0, 0.2)'
          }}>
            <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>💥</div>
            <h1 style={{ 
              fontSize: '2.5rem', 
              fontWeight: '700', 
              marginBottom: '1rem',
              textShadow: '2px 2px 4px rgba(0, 0, 0, 0.3)'
            }}>
              Ciddi Xəta
            </h1>
            <p style={{ 
              fontSize: '1.2rem', 
              marginBottom: '2rem', 
              opacity: '0.9',
              lineHeight: '1.6'
            }}>
              Tətbiqimizdə ciddi bir xəta baş verdi. Zəhmət olmasa səhifəni yeniləyin.
            </p>
            <div style={{ 
              display: 'flex', 
              gap: '1rem', 
              justifyContent: 'center',
              flexWrap: 'wrap'
            }}>
              <button 
                onClick={reset}
                style={{
                  padding: '12px 24px',
                  borderRadius: '8px',
                  fontWeight: '600',
                  transition: 'all 0.3s ease',
                  border: 'none',
                  cursor: 'pointer',
                  fontSize: '1rem',
                  background: '#feca57',
                  color: '#2c2c2c'
                }}
              >
                Yenidən Cəhd Et
              </button>
              <button 
                onClick={() => window.location.href = '/'}
                style={{
                  padding: '12px 24px',
                  borderRadius: '8px',
                  fontWeight: '600',
                  transition: 'all 0.3s ease',
                  cursor: 'pointer',
                  fontSize: '1rem',
                  background: 'transparent',
                  color: 'white',
                  border: '2px solid white'
                }}
              >
                Ana Səhifəyə Qayıt
              </button>
            </div>
          </div>
        </div>
      </body>
    </html>
  );
}