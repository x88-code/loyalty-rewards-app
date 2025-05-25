import React from 'react';

export default function ProgressBar({ progress }) {
  return (
    <div style={{
      background: '#eee',
      borderRadius: 10,
      overflow: 'hidden',
      margin: '1rem 0'
    }}>
      <div style={{
        width: `${progress * 10}%`,
        background: '#20b2aa',
        height: 12,
        transition: 'width 0.3s'
      }} />
    </div>
  );
}