import React, { useRef } from 'react';
import Transformable from '../../app/components/Transformable';

export default function Workflow() {
  const containerRef = useRef(null);

  return (
    <Transformable containerRef={containerRef} transformableId="workflow">
      <g />
    </Transformable>
  );
}
