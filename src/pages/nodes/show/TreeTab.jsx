import React from 'react';
import { useParams } from 'react-router-dom';
import Tree from '../../../features/nodes/components/tree/Tree';

export default function TreeTab() {
  const { id } = useParams();

  return (
    <Tree id={id} />
  );
}
