
import React from 'react';

export const SupplyIcon: React.FC<{ size?: number, value?: number }> = ({ size = 100, value = 50 }) => {
  // Determine how many boxes to show based on value (10-100)
  // Mapping: 10-30: 1-2 boxes, 31-50: 3 boxes, 51-75: 5 boxes, 76-100: 6 boxes
  const level = Math.ceil(value / 18); // Approx 1 to 6 levels

  return (
    <svg width={size} height={size} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Bottom Layer Boxes */}
      {level >= 1 && <rect x="10" y="60" width="25" height="25" rx="2" fill="#4ade80" stroke="#166534" strokeWidth="2"/>}
      {level >= 2 && <rect x="37" y="60" width="25" height="25" rx="2" fill="#4ade80" stroke="#166534" strokeWidth="2"/>}
      {level >= 3 && <rect x="64" y="60" width="25" height="25" rx="2" fill="#4ade80" stroke="#166534" strokeWidth="2"/>}
      
      {/* Middle Layer */}
      {level >= 4 && <rect x="23" y="38" width="25" height="25" rx="2" fill="#86efac" stroke="#166534" strokeWidth="2"/>}
      {level >= 5 && <rect x="52" y="38" width="25" height="25" rx="2" fill="#86efac" stroke="#166534" strokeWidth="2"/>}
      
      {/* Top Layer */}
      {level >= 6 && <rect x="38" y="16" width="25" height="25" rx="2" fill="#bbf7d0" stroke="#166534" strokeWidth="2"/>}
      
      {/* Box details (lines) for visible boxes */}
      {level >= 1 && <line x1="10" y1="72.5" x2="35" y2="72.5" stroke="#166534" strokeWidth="1"/>}
      {level >= 2 && <line x1="37" y1="72.5" x2="62" y2="72.5" stroke="#166534" strokeWidth="1"/>}
      {level >= 4 && <line x1="23" y1="50.5" x2="48" y2="50.5" stroke="#166534" strokeWidth="1"/>}
    </svg>
  );
};

export const DemandIcon: React.FC<{ size?: number, value?: number }> = ({ size = 100, value = 50 }) => {
  // Scale the cart based on demand value (10-100)
  // Base scale is 0.6 to 1.4
  const scale = 0.5 + (value / 100);
  
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      <g transform={`translate(${50 - (50 * scale)}, ${80 - (80 * scale)}) scale(${scale})`}>
        {/* Shopping Cart Base */}
        <path d="M10 20 L25 20 L40 70 L80 70" stroke="#ea580c" strokeWidth="4" strokeLinecap="round"/>
        <rect x="30" y="30" width="45" height="30" rx="4" fill="#fb923c" stroke="#ea580c" strokeWidth="2"/>
        <circle cx="45" cy="80" r="6" fill="#4b5563" />
        <circle cx="70" cy="80" r="6" fill="#4b5563" />
        {/* Person Silhouette 1 */}
        <circle cx="50" cy="40" r="5" fill="#fef3c7" />
        <path d="M45 55 Q50 45 55 55" stroke="#ea580c" strokeWidth="2" fill="#fef3c7"/>
        {/* Person Silhouette 2 */}
        <circle cx="65" cy="40" r="5" fill="#fef3c7" />
        <path d="M60 55 Q65 45 70 55" stroke="#ea580c" strokeWidth="2" fill="#fef3c7"/>
      </g>
    </svg>
  );
};

export const PriceBlockIcon: React.FC<{ size?: number, color?: string }> = ({ size = 60, color = "#facc15" }) => (
  <svg width={size} height={size} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* 3D-ish Block Effect */}
    <rect x="10" y="20" width="80" height="70" rx="4" fill={color} stroke="#854d0e" strokeWidth="3" />
    <path d="M10 20 L25 5 L95 5 L80 20" fill={color} fillOpacity="0.7" stroke="#854d0e" strokeWidth="2" />
    <path d="M90 20 L95 5 L95 75 L80 90" fill={color} fillOpacity="0.5" stroke="#854d0e" strokeWidth="2" />
    {/* Label Text "價" */}
    <text x="50" y="65" fontSize="36" fontWeight="bold" fill="#854d0e" textAnchor="middle">價</text>
  </svg>
);
