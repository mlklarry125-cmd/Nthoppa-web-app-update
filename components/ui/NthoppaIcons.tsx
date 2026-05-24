import React from 'react';

interface IconProps extends React.SVGProps<SVGSVGElement> {
  className?: string;
}

export const NthoppaLogoMark: React.FC<IconProps> = ({ className = "w-6 h-6", ...props }) => (
  <svg className={className} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <path d="M50 10 L70 30 L50 50 L30 30 L50 10Z" fill="#FF6B35" stroke="#FF6B35" strokeWidth="2"/>
    <path d="M50 50 L70 70 L50 90 L30 70 L50 50Z" fill="#FF6B35" stroke="#FF6B35" strokeWidth="2"/>
    <rect x="45" y="25" width="10" height="50" fill="#FF6B35" rx="2"/>
    <circle cx="50" cy="50" r="8" fill="white" stroke="#FF6B35" strokeWidth="2"/>
  </svg>
);

export const SavingsIcon: React.FC<IconProps> = ({ className = "w-6 h-6", ...props }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <path d="M22 7H2V17H22V7Z" stroke="#FF6B35" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
    <path d="M6 12H8" stroke="#FF6B35" strokeWidth="2" strokeLinecap="round"/>
    <path d="M18 12H20" stroke="#FF6B35" strokeWidth="2" strokeLinecap="round"/>
    <path d="M12 10V14" stroke="#FF6B35" strokeWidth="2" strokeLinecap="round"/>
    <circle cx="12" cy="12" r="1" fill="#FF6B35"/>
    <path d="M4 7L6 4H18L20 7" stroke="#FF6B35" strokeWidth="2" strokeLinecap="round"/>
  </svg>
);

export const LoansIcon: React.FC<IconProps> = ({ className = "w-6 h-6", ...props }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <rect x="4" y="8" width="16" height="12" rx="1" stroke="#FF6B35" strokeWidth="2" fill="none"/>
    <path d="M8 5H16" stroke="#FF6B35" strokeWidth="2" strokeLinecap="round"/>
    <path d="M10 12H14" stroke="#FF6B35" strokeWidth="2" strokeLinecap="round"/>
    <path d="M12 10V14" stroke="#FF6B35" strokeWidth="2" strokeLinecap="round"/>
    <path d="M7 20L9 18" stroke="#FF6B35" strokeWidth="2" strokeLinecap="round"/>
    <path d="M17 20L15 18" stroke="#FF6B35" strokeWidth="2" strokeLinecap="round"/>
  </svg>
);

export const NthoppaSureIcon: React.FC<IconProps> = ({ className = "w-6 h-6", ...props }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <path d="M12 3L3 8L12 13L21 8L12 3Z" stroke="#FF6B35" strokeWidth="2" strokeLinejoin="round" fill="none"/>
    <path d="M3 12L12 17L21 12" stroke="#FF6B35" strokeWidth="2" strokeLinejoin="round" fill="none"/>
    <path d="M3 16L12 21L21 16" stroke="#FF6B35" strokeWidth="2" strokeLinejoin="round" fill="none"/>
    <path d="M12 8V13" stroke="#FF6B35" strokeWidth="2"/>
    <circle cx="12" cy="8" r="1.5" fill="#FF6B35"/>
  </svg>
);

export const EducationIcon: React.FC<IconProps> = ({ className = "w-6 h-6", ...props }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <path d="M12 4L3 9L12 14L21 9L12 4Z" stroke="#FF6B35" strokeWidth="2" strokeLinejoin="round" fill="none"/>
    <path d="M5 11V16L12 21L19 16V11" stroke="#FF6B35" strokeWidth="2" strokeLinejoin="round" fill="none"/>
    <path d="M8 13V17" stroke="#FF6B35" strokeWidth="2"/>
    <circle cx="12" cy="9" r="1" fill="#FF6B35"/>
    <path d="M12 14V18" stroke="#FF6B35" strokeWidth="2"/>
  </svg>
);

export const MotsheloIcon: React.FC<IconProps> = ({ className = "w-6 h-6", ...props }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <circle cx="12" cy="12" r="9" stroke="#FF6B35" strokeWidth="2" fill="none"/>
    <path d="M12 5V8" stroke="#FF6B35" strokeWidth="2" strokeLinecap="round"/>
    <path d="M12 16V19" stroke="#FF6B35" strokeWidth="2" strokeLinecap="round"/>
    <path d="M8 12H5" stroke="#FF6B35" strokeWidth="2" strokeLinecap="round"/>
    <path d="M19 12H16" stroke="#FF6B35" strokeWidth="2" strokeLinecap="round"/>
    <circle cx="12" cy="12" r="2" fill="#FF6B35"/>
    <path d="M15 9L17 7" stroke="#FF6B35" strokeWidth="2" strokeLinecap="round"/>
    <path d="M7 17L9 15" stroke="#FF6B35" strokeWidth="2" strokeLinecap="round"/>
  </svg>
);

export const CoinsIcon: React.FC<IconProps> = ({ className = "w-6 h-6", ...props }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <circle cx="12" cy="12" r="8" stroke="#FF6B35" strokeWidth="2" fill="none"/>
    <path d="M12 6V18" stroke="#FF6B35" strokeWidth="2" strokeLinecap="round"/>
    <path d="M8 10H16" stroke="#FF6B35" strokeWidth="2" strokeLinecap="round"/>
    <circle cx="12" cy="12" r="1.5" fill="#FF6B35"/>
    <path d="M6 8L4 6" stroke="#FF6B35" strokeWidth="2" strokeLinecap="round"/>
    <path d="M18 8L20 6" stroke="#FF6B35" strokeWidth="2" strokeLinecap="round"/>
  </svg>
);

export const WalletIcon: React.FC<IconProps> = ({ className = "w-6 h-6", ...props }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <rect x="3" y="7" width="18" height="13" rx="2" stroke="#FF6B35" strokeWidth="2" fill="none"/>
    <path d="M7 7V5H17V7" stroke="#FF6B35" strokeWidth="2" strokeLinecap="round"/>
    <path d="M19 13H16C14.8954 13 14 13.8954 14 15C14 16.1046 14.8954 17 16 17H19" stroke="#FF6B35" strokeWidth="2" fill="none"/>
    <circle cx="17" cy="15" r="1" fill="#FF6B35"/>
  </svg>
);

export const SMEIcon: React.FC<IconProps> = ({ className = "w-6 h-6", ...props }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <rect x="3" y="10" width="6" height="11" rx="1" stroke="#FF6B35" strokeWidth="2" fill="none"/>
    <rect x="15" y="6" width="6" height="15" rx="1" stroke="#FF6B35" strokeWidth="2" fill="none"/>
    <rect x="9" y="3" width="6" height="18" rx="1" stroke="#FF6B35" strokeWidth="2" fill="none"/>
    <path d="M12 8V16" stroke="#FF6B35" strokeWidth="2" strokeLinecap="round"/>
    <circle cx="12" cy="12" r="1" fill="#FF6B35"/>
  </svg>
);

export const CommunityIcon: React.FC<IconProps> = ({ className = "w-6 h-6", ...props }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <circle cx="9" cy="8" r="3" stroke="#FF6B35" strokeWidth="2" fill="none"/>
    <circle cx="18" cy="10" r="2" stroke="#FF6B35" strokeWidth="2" fill="none"/>
    <circle cx="6" cy="18" r="3" stroke="#FF6B35" strokeWidth="2" fill="none"/>
    <circle cx="15" cy="19" r="2" stroke="#FF6B35" strokeWidth="2" fill="none"/>
    <path d="M9 11V15" stroke="#FF6B35" strokeWidth="2" strokeLinecap="round"/>
    <path d="M12 18H13" stroke="#FF6B35" strokeWidth="2" strokeLinecap="round"/>
    <path d="M8 16L7 17" stroke="#FF6B35" strokeWidth="2" strokeLinecap="round"/>
    <path d="M17 17H18" stroke="#FF6B35" strokeWidth="2" strokeLinecap="round"/>
  </svg>
);