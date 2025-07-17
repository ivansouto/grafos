const cy = cytoscape({
  container: document.getElementById('cy'),

  elements: [
    { data: { id: 'a' } },
    { data: { id: 'b' } },
    { data: { id: 'c' } },
    { data: { source: 'a', target: 'b' } },
    { data: { source: 'b', target: 'c' } }
  ],

  style: [
    {
      selector: 'node',
      style: {
        'background-color': '#3498db',
        'label': 'data(id)',
        'color': '#fff',
        'text-valign': 'center',
        'text-halign': 'center',
        'font-size': '14px'
      }
    },
    {
      selector: 'edge',
      style: {
        'width': 3,
        'line-color': '#aaa',
        'target-arrow-color': '#aaa',
        'target-arrow-shape': 'triangle'
      }
    }
  ],

  layout: {
    name: 'cose', // usa força física
    animate: true
  }
});
