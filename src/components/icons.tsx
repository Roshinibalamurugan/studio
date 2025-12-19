import type { SVGProps } from 'react';

export function BookMyShowLogo(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 256 256"
      width="1em"
      height="1em"
      {...props}
    >
      <g fill="currentColor">
        <rect width="256" height="256" fill="none" />
        <path d="M208,40H48A16,16,0,0,0,32,56V200a16,16,0,0,0,16,16H208a16,16,0,0,0,16-16V56A16,16,0,0,0,208,40Z" opacity="0.2" />
        <path d="M208,32H48A24,24,0,0,0,24,56V200a24,24,0,0,0,24,24H208a24,24,0,0,0,24-24V56A24,24,0,0,0,208,32Zm8,168a8,8,0,0,1-8,8H48a8,8,0,0,1-8-8V56a8,8,0,0,1,8-8H208a8,8,0,0,1,8,8Z" />
        <path d="M88,104a12,12,0,1,1-12-12A12,12,0,0,1,88,104Z" />
        <path d="M88,152a12,12,0,1,1-12-12A12,12,0,0,1,88,152Z" />
        <path d="M128,104h56a8,8,0,0,0,0-16H128a8,8,0,0,0,0,16Z" />
        <path d="M128,152h56a8,8,0,0,0,0-16H128a8,8,0,0,0,0,16Z" />
      </g>
    </svg>
  );
}

    