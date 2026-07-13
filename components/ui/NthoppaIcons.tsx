import React from "react";

interface IconProps extends React.SVGProps<SVGSVGElement> {
  className?: string;
}

const svgDefaults = {
  viewBox: "0 0 24 24",
  fill: "none",
  xmlns: "http://www.w3.org/2000/svg",
  "aria-hidden": true,
} as const;

export const NthoppaLogoMark: React.FC<IconProps> = ({ className = "h-6 w-6", ...props }) => (
  <svg className={className} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" {...props}>
    <path d="M50 10 70 30 50 50 30 30 50 10Z" fill="#FF6B35" />
    <path d="M50 50 70 70 50 90 30 70 50 50Z" fill="#FF6B35" />
    <rect x="45" y="25" width="10" height="50" rx="2" fill="#FF6B35" />
    <circle cx="50" cy="50" r="8" fill="white" />
  </svg>
);

const IconFrame = ({ className = "h-6 w-6", children, ...props }: IconProps & { children: React.ReactNode }) => (
  <svg className={className} {...svgDefaults} {...props}>
    <g stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
      {children}
    </g>
  </svg>
);

export const SavingsIcon: React.FC<IconProps> = (props) => (
  <IconFrame {...props}>
    <rect x="3" y="7" width="18" height="10" rx="2" />
    <path d="M7 7V5.5h10V7" />
    <path d="M12 10v4M10 12h4" />
  </IconFrame>
);

export const LoansIcon: React.FC<IconProps> = (props) => (
  <IconFrame {...props}>
    <path d="M5 9.5h14v9H5z" />
    <path d="M8 6h8M9.5 14h5M12 11.5v5" />
  </IconFrame>
);

export const NthoppaSureIcon: React.FC<IconProps> = (props) => (
  <IconFrame {...props}>
    <path d="M12 3.5 19 6v5.5c0 4.2-2.8 7.4-7 9-4.2-1.6-7-4.8-7-9V6l7-2.5Z" />
    <path d="m9.5 12 1.7 1.7 3.6-3.8" />
  </IconFrame>
);

export const EducationIcon: React.FC<IconProps> = (props) => (
  <IconFrame {...props}>
    <path d="m3.5 8.5 8.5-4 8.5 4-8.5 4-8.5-4Z" />
    <path d="M6 10v5l6 3.5 6-3.5v-5" />
  </IconFrame>
);

export const MotsheloIcon: React.FC<IconProps> = (props) => (
  <IconFrame {...props}>
    <circle cx="8" cy="9" r="2.5" />
    <circle cx="16" cy="9" r="2.5" />
    <path d="M3.5 18c.6-3 2.2-4.5 4.5-4.5S11.9 15 12.5 18" />
    <path d="M11.5 18c.6-3 2.2-4.5 4.5-4.5s3.9 1.5 4.5 4.5" />
  </IconFrame>
);

export const CoinsIcon: React.FC<IconProps> = (props) => (
  <IconFrame {...props}>
    <ellipse cx="9" cy="8" rx="5" ry="2.5" />
    <path d="M4 8v4c0 1.4 2.2 2.5 5 2.5 1.1 0 2.1-.2 2.9-.5" />
    <path d="M7 14.3V17c0 1.4 2.2 2.5 5 2.5s5-1.1 5-2.5v-4" />
    <ellipse cx="12" cy="13" rx="5" ry="2.5" />
  </IconFrame>
);

export const WalletIcon: React.FC<IconProps> = (props) => (
  <IconFrame {...props}>
    <rect x="3" y="6" width="18" height="13" rx="2.5" />
    <path d="M16 11h5v4h-5a2 2 0 0 1 0-4Z" />
    <path d="M7 6V4.5h10V6" />
  </IconFrame>
);

export const SMEIcon: React.FC<IconProps> = (props) => (
  <IconFrame {...props}>
    <path d="M4 20V9h6v11M14 20V4h6v16" />
    <path d="M2.5 20h19M7 12h.01M7 15h.01M17 8h.01M17 11h.01M17 14h.01" />
  </IconFrame>
);

export const CommunityIcon: React.FC<IconProps> = (props) => (
  <IconFrame {...props}>
    <circle cx="8" cy="8" r="2.5" />
    <circle cx="16" cy="9" r="2" />
    <path d="M3.5 18c.5-3.2 2-4.8 4.5-4.8s4 1.6 4.5 4.8" />
    <path d="M12.5 18c.4-2.5 1.6-3.8 3.5-3.8s3.1 1.3 3.5 3.8" />
  </IconFrame>
);
