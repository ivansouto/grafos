let cy;

// Grafo inicial
const initialData = {
  nodes: [
    { data: { id: "a" } },
    { data: { id: "b" } },
    { data: { id: "c" } }
  ],
  edges: [
    { data: { source: "a", target: "b" } },
    { data: { source: "b", target: "c" } }
  ]
};

// Renderiza o grafo na tela
function renderGraph(data) {
  if (cy) {
    cy.destroy(); // remove o grafo anterior
  }

  cy = cytoscape({
    container: document.getElementById('cy'),
    elements: [...data.nodes, ...data.edges],
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
      'target-arrow-shape': 'triangle',
      'curve-style': 'bezier'
        }
      }
    ],
    layout: {
      name: 'cose',
      animate: true
    }
  });
}

// Atualiza o grafo com base no texto JSON
function updateGraph() {
  const textarea = document.getElementById('graphData');
  try {
    const data = JSON.parse(textarea.value);
    renderGraph(data);
  } catch (e) {
    alert("Erro ao interpretar JSON: " + e.message);
  }
}

// Extrai o grafo atual da visualização e escreve no textarea
function loadFromGraph() {
  const current = getCurrentGraphJSON();
  document.getElementById("graphData").value = JSON.stringify(current, null, 2);
}

// Converte o grafo atual (cy) para objeto JSON
function getCurrentGraphJSON() {
  const elements = cy.json().elements;

  const nodes = elements.nodes.map(n => ({ data: n.data }));
  const edges = elements.edges.map(e => ({ data: e.data }));

  return { nodes, edges };
}

// Inicialização
document.getElementById("graphData").value = JSON.stringify(initialData, null, 2);
renderGraph(initialData);
