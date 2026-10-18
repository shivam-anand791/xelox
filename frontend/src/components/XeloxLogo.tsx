import React from 'react';

interface XeloxLogoProps {
  theme?: 'light' | 'dark' | 'auto';
  className?: string;
  width?: number | string;
  height?: number | string;
  iconOnly?: boolean;
}

export const XeloxLogo: React.FC<XeloxLogoProps> = ({
  theme = 'auto',
  className = '',
  width,
  height,
  iconOnly = false,
}) => {
  // Color palette definition
  const pixelCyan = '#19D5D0';
  const pixelLime = '#B8FF3D';

  // Dynamic styling based on theme
  let textColorClass = 'fill-[#0F172A] dark:fill-white';
  let subColorClass = 'fill-[#0891B2] dark:fill-[#19D5D0]';

  if (theme === 'dark') {
    textColorClass = 'fill-white';
    subColorClass = 'fill-[#19D5D0]';
  } else if (theme === 'light') {
    textColorClass = 'fill-[#0F172A]';
    subColorClass = 'fill-[#0891B2]';
  }

  if (iconOnly) {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 46 46"
        width={width || 44}
        height={height || 44}
        fill="none"
        className={className}
        role="img"
        aria-label="Xelox icon"
      >
        <g transform="translate(2, 2)">
          {/* Center Core Block */}
          <rect x="16" y="16" width="10" height="10" rx="2.5" fill={pixelCyan} />

          {/* Top-Left Digital Data Stream */}
          <rect x="9.5" y="9.5" width="7" height="7" rx="2" fill={pixelCyan} />
          <rect x="3" y="3" width="6" height="6" rx="1.8" fill={pixelCyan} />
          <rect x="0" y="1" width="3.2" height="3.2" rx="0.9" fill={pixelLime} />
          <rect x="1" y="8" width="3" height="3" rx="0.8" fill={pixelCyan} opacity="0.85" />
          <rect x="8" y="1" width="3.2" height="3.2" rx="0.9" fill={pixelCyan} />

          {/* Bottom-Left Digital Data Stream */}
          <rect x="9.5" y="25.5" width="7" height="7" rx="2" fill={pixelCyan} />
          <rect x="3" y="33" width="6" height="6" rx="1.8" fill={pixelCyan} />
          <rect x="0" y="37.8" width="3.2" height="3.2" rx="0.9" fill={pixelLime} />
          <rect x="1" y="31" width="3" height="3" rx="0.8" fill={pixelCyan} opacity="0.85" />
          <rect x="8" y="37.8" width="3.2" height="3.2" rx="0.9" fill={pixelCyan} />

          {/* Right-Hand Solid Crossing Modules */}
          <rect x="25.5" y="7" width="14" height="11" rx="2.6" fill={pixelCyan} />
          <rect x="25.5" y="24" width="14" height="11" rx="2.6" fill={pixelCyan} />
          <rect x="36" y="1" width="6" height="6" rx="1.8" fill={pixelCyan} />
          <rect x="36" y="35" width="6" height="6" rx="1.8" fill={pixelCyan} />
        </g>
      </svg>
    );
  }

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 216 48"
      width={width || 'auto'}
      height={height || '100%'}
      fill="none"
      className={className}
      role="img"
      aria-label="Xelox Solutions logo"
    >
      {/* Xelox Modular Pixel X Mark */}
      <g transform="translate(3, 3)">
        {/* Center Core Block */}
        <rect x="16" y="16" width="10" height="10" rx="2.5" fill={pixelCyan} />

        {/* Top-Left Digital Data Stream */}
        <rect x="9.5" y="9.5" width="7" height="7" rx="2" fill={pixelCyan} />
        <rect x="3" y="3" width="6" height="6" rx="1.8" fill={pixelCyan} />
        <rect x="0" y="1" width="3.2" height="3.2" rx="0.9" fill={pixelLime} />
        <rect x="1" y="8" width="3" height="3" rx="0.8" fill={pixelCyan} opacity="0.85" />
        <rect x="8" y="1" width="3.2" height="3.2" rx="0.9" fill={pixelCyan} />

        {/* Bottom-Left Digital Data Stream */}
        <rect x="9.5" y="25.5" width="7" height="7" rx="2" fill={pixelCyan} />
        <rect x="3" y="33" width="6" height="6" rx="1.8" fill={pixelCyan} />
        <rect x="0" y="37.8" width="3.2" height="3.2" rx="0.9" fill={pixelLime} />
        <rect x="1" y="31" width="3" height="3" rx="0.8" fill={pixelCyan} opacity="0.85" />
        <rect x="8" y="37.8" width="3.2" height="3.2" rx="0.9" fill={pixelCyan} />

        {/* Right-Hand Solid Crossing Modules */}
        <rect x="25.5" y="7" width="14" height="11" rx="2.6" fill={pixelCyan} />
        <rect x="25.5" y="24" width="14" height="11" rx="2.6" fill={pixelCyan} />
        <rect x="36" y="1" width="6" height="6" rx="1.8" fill={pixelCyan} />
        <rect x="36" y="35" width="6" height="6" rx="1.8" fill={pixelCyan} />
      </g>

      {/* Wordmark Lockup */}
      <g transform="translate(56, 0)">
        {/* Primary Brand Name: Xelox */}
        <text
          x="0"
          y="27"
          fontFamily="'Space Grotesk', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif"
          fontSize="26"
          fontWeight="700"
          letterSpacing="-0.02em"
          className={`transition-colors duration-200 ${textColorClass}`}
        >
          Xelox
        </text>

        {/* Descriptor / Full Name: SOLUTIONS */}
        <text
          x="1"
          y="41"
          fontFamily="'IBM Plex Mono', 'Space Grotesk', monospace"
          fontSize="8.5"
          fontWeight="600"
          letterSpacing="0.25em"
          className={`transition-colors duration-200 ${subColorClass}`}
        >
          SOLUTIONS
        </text>
      </g>
    </svg>
  );
};

export default XeloxLogo;
