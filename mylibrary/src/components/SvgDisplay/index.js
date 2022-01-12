import React from 'react';

// eslint-disable-next-line react/prop-types
export default function SvgDisplay({ alt, xml, ...props }) {
  return <img src={xml} alt={alt} {...props} />;
}
