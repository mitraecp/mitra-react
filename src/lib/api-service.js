/**
 * Serviço para interagir com a API de componentes React
 */

const API_URL = 'https://api0.mitraecp.com:1004/rest/v0/React Components';
const API_TOKEN = 'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJyZWFjdC1jb21wb25lbnRzIiwiWC1UZW5hbnRJRCI6InRlbmFudF8xMDU1NyJ9.Ba8sVejL8XD7whXlp4t0_wK-8Htk8AzVLdVhfwQNaCn5RJHgGPZV1HgYkqAybrjHyH_i-Ppii6JrBrNPM9pj8A';

/**
 * Busca componentes da API
 * @returns {Promise<Array>} Lista de componentes
 */
export async function fetchComponents() {
  try {
    const response = await fetch(API_URL, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${API_TOKEN}`,
        'Content-Type': 'application/json'
      }
    });

    if (!response.ok) {
      throw new Error(`Erro ao buscar componentes: ${response.status}`);
    }

    const data = await response.json();

    // Filtra componentes válidos (que têm código)
    const validComponents = data.content.filter(component =>
      component.code !== null && component.code !== undefined && component.code.trim() !== ''
    );

    return validComponents.map(component => ({
      id: component.ID,
      description: component.Descrição || `Componente ${component.ID}`,
      code: component.code,
      categoryId: component['Id Categoria'],
      category: component['Descrição Categoria'],
      createdAt: component['Data Criação (React Components)'],
      createdBy: component['Usuário Criação (React Components)'],
      createdByPhoto: component['Foto Criação (React Components)'],
      updatedAt: component['Data Últ. Alteração (React Components)'],
      updatedBy: component['Usuário Últ. Alteração (React Components)'],
      updatedByPhoto: component['Foto Últ. Alteração (React Components)']
    }));
  } catch (error) {
    console.error('Erro ao buscar componentes:', error);
    return [];
  }
}

/**
 * Busca um componente específico pelo ID
 * @param {number} id ID do componente
 * @returns {Promise<Object|null>} Componente ou null se não encontrado
 */
export async function fetchComponentById(id) {
  const components = await fetchComponents();
  return components.find(component => component.id === id) || null;
}

/**
 * Formata o código para exibição
 * @param {string} code Código do componente
 * @returns {string} Código formatado
 */
export function formatCode(code) {
  if (!code) return '';

  // Remove espaços extras e quebras de linha desnecessárias
  return code.trim()
    .replace(/\s{2,}/g, ' ')
    .replace(/\n\s*\n/g, '\n');
}

export default {
  fetchComponents,
  fetchComponentById,
  formatCode
};
