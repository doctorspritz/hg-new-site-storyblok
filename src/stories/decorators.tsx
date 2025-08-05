import React from 'react';
import '../styles/global.css';
import '../styles/critical.css';

export const withGlobalStyles = (Story: any) => (
  <div className="font-sans">
    <Story />
  </div>
);