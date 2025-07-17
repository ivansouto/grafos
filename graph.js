let cy;

// Grafo inicial
const initialData = {
  "nodes": [
    { "data": { "id": "a", "label": "Nó A", "descricao": "Texto do nó A" } },
    { "data": { "id": "b", "label": "Nó B", "descricao": "Texto do nó B" } },
    { "data": { "id": "c", "label": "Nó C", "descricao": "Texto do nó C" } },
    { "data": { "id": "d", "label": "Nó D", "descricao": "Texto do nó D" } },
    { "data": { "id": "e", "label": "Nó E", "descricao": "Texto do nó E" } },
    { "data": { "id": "f", "label": "Nó F", "descricao": "Texto do nó F" } },
    { "data": { "id": "g", "label": "Nó G", "descricao": "Texto do nó G" } }
  ],
  "edges": [
    { "data": { "source": "a", "target": "b" } },
    { "data": { "source": "a", "target": "c" } },
    { "data": { "source": "b", "target": "d" } },
    { "data": { "source": "c", "target": "d" } },
    { "data": { "source": "d", "target": "e" } },
    { "data": { "source": "e", "target": "f" } },
    { "data": { "source": "f", "target": "g" } },
    { "data": { "source": "g", "target": "c" } }, 
    { "data": { "source": "b", "target": "f" } },
    { "data": { "source": "c", "target": "g" } }
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
  updateLegendFromGraph();
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

function updateLegendFromGraph() {
  const list = document.getElementById("legendList");
  list.innerHTML = ''; // Limpa legenda atual

  const currentNodes = cy.nodes();

  currentNodes.forEach(node => {
    const data = node.data();
    const item = document.createElement('li');
    item.innerHTML = `<strong>${data.label || data.id}:</strong> ${data.descricao || '(sem descrição)'}`;
    list.appendChild(item);
  });
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
