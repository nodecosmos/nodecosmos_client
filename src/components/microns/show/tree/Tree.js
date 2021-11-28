import * as d3 from 'd3';

export default function Tree() {
  const data = d3.hierarchy({
    name: 'root',
    children: [
      { name: 'child #1' },
      {
        name: 'child #2',
        children: [
          { name: 'grandchild #1' },
          { name: 'grandchild #2' },
          { name: 'grandchild #3' },
        ],
      },
    ],
  });

  d3.select('testD3').data(data);
}
