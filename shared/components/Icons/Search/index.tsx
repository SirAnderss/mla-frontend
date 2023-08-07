import { SVGProps, memo } from 'react';

const SvgComponent = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    width={props.width ?? 24}
    height={props.height ?? 24}
    fill='none'
    viewBox='0 0 24 24'
    data-testid='search-icon'
    {...props}
  >
    <g>
      <path d='M0 0h24v24H0z' />
      <circle
        cx={10.5}
        cy={10.5}
        r={6.5}
        stroke={props.color ?? '#000'}
        strokeLinejoin='round'
      />
      <path
        fill={props.color ?? '#000'}
        d='M19.646 20.354a.5.5 0 0 0 .708-.708l-.708.708Zm.708-.708-5-5-.708.708 5 5 .708-.708Z'
      />
    </g>
    <defs>
      <clipPath id='a'>
        <path d='M0 0h24v24H0z' />
      </clipPath>
    </defs>
  </svg>
);

const SearchIcon = memo(SvgComponent);

export { SearchIcon };
