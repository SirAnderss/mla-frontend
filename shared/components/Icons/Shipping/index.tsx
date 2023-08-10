import * as React from 'react';
import { SVGProps, memo } from 'react';
const SvgComponent = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    width={props.width ?? 24}
    height={props.height ?? 24}
    fill='none'
    viewBox='0 0 24 24'
    data-testid='shipping-icon'
    {...props}
  >
    <path
      fill={props.color ?? '#000'}
      fillRule='evenodd'
      d='M16.5 6H3v11.25h1.527a2.626 2.626 0 0 0 5.196 0h5.304a2.626 2.626 0 0 0 5.196 0h1.527v-4.81L18.31 9H16.5V6Zm0 4.5v4.003a2.625 2.625 0 0 1 3.497 1.247h.253v-2.69l-2.56-2.56H16.5ZM15 15.75V7.5H4.5v8.25h.253a2.625 2.625 0 0 1 4.744 0H15ZM17.625 18a1.125 1.125 0 1 1 0-2.25 1.125 1.125 0 0 1 0 2.25ZM8.25 16.875a1.125 1.125 0 1 1-2.25 0 1.125 1.125 0 0 1 2.25 0Z'
      clipRule='evenodd'
    />
  </svg>
);
const Shipping = memo(SvgComponent);

export { Shipping };
