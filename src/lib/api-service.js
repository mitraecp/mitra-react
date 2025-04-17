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

  // Remover espaços extras e quebras de linha desnecessárias
  let formattedCode = code.trim();

  // Formatar JSX com indentação básica
  try {
    // Substituir múltiplos espaços por um único espaço
    formattedCode = formattedCode.replace(/\s{2,}/g, ' ');

    // Adicionar quebras de linha após chaves, parênteses e tags JSX
    formattedCode = formattedCode
      .replace(/({)\s*/g, '$1\n  ') // Adiciona quebra após chave de abertura
      .replace(/\s*(})/g, '\n$1') // Adiciona quebra antes de chave de fechamento
      .replace(/(return)\s*\(/g, '$1 (\n  ') // Formata o return com parênteses
      .replace(/(>)\s*(<\/)/g, '$1\n$2') // Quebra entre tags de fechamento
      .replace(/(<\w+)\s+([^>]*>)/g, '$1 $2') // Espaçamento em tags
      .replace(/(\/>)/g, ' $1'); // Espaço antes de tags auto-fechantes

    // Ajustar indentação para blocos aninhados
    const lines = formattedCode.split('\n');
    let indentLevel = 0;
    const indentSize = 2;

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i].trim();

      // Reduzir indentação para linhas com chaves/tags de fechamento
      if (line.match(/^[})]/) || line.match(/^<\//)) {
        indentLevel = Math.max(0, indentLevel - 1);
      }

      // Aplicar indentação atual
      lines[i] = ' '.repeat(indentLevel * indentSize) + line;

      // Aumentar indentação para próximas linhas após abertura de blocos
      if (line.match(/{$/) || line.match(/\($/) || (line.match(/<\w+/) && !line.match(/\/>$/) && !line.match(/<\/\w+>$/))) {
        indentLevel++;
      }
    }

    formattedCode = lines.join('\n');
  } catch (error) {
    console.error('Erro ao formatar código:', error);
    // Em caso de erro, retornar o código apenas com trim
    return code.trim();
  }

  return formattedCode;
}

/**
 * Cria um novo componente
 * @param {Object} componentData Dados do componente a ser criado
 * @param {string} componentData.description Descrição do componente
 * @param {string} componentData.categoryId ID da categoria do componente
 * @param {string} componentData.code Código do componente
 * @returns {Promise<Object>} Componente criado
 */
export async function createComponent(componentData) {
  try {
    const { description, categoryId, code } = componentData;

    // Validar dados obrigatórios
    if (!description || !code) {
      throw new Error('Descrição e código são obrigatórios');
    }

    // Preparar dados para a API
    const apiData = {
      'Descrição': description,
      'ID Categoria': categoryId ? String(categoryId) : '',
      'code': code
    };

    console.log('Dados enviados para criação:', apiData);

    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${API_TOKEN}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(apiData)
    });

    if (!response.ok) {
      throw new Error(`Erro ao criar componente: ${response.status}`);
    }

    // Tentar obter a resposta como JSON, mas lidar com texto simples se falhar
    let data;
    let responseText;
    try {
      // Tentar ler como JSON
      data = await response.json();
    } catch (jsonError) {
      // Se falhar, ler como texto
      try {
        // Clonar a resposta porque já tentamos ler como JSON
        responseText = await response.clone().text();
        console.log('Resposta da API (texto):', responseText);
      } catch (textError) {
        console.error('Erro ao ler resposta como texto:', textError);
        responseText = 'Componente criado com sucesso';
      }
    }

    return {
      success: true,
      message: 'Componente criado com sucesso',
      data: data || { message: responseText }
    };
  } catch (error) {
    console.error('Erro ao criar componente:', error);
    return {
      success: false,
      message: error.message || 'Erro ao criar componente',
      error: error
    };
  }
}

/**
 * Atualiza um componente existente
 * @param {number} id ID do componente a ser atualizado
 * @param {Object} componentData Dados do componente a ser atualizado
 * @param {string} componentData.description Descrição do componente
 * @param {string} componentData.categoryId ID da categoria do componente
 * @param {string} componentData.code Código do componente
 * @returns {Promise<Object>} Resultado da operação
 */
export async function updateComponent(id, componentData) {
  try {
    const { description, categoryId, code } = componentData;

    // Validar dados obrigatórios
    if (!id || !description || !code) {
      throw new Error('ID, descrição e código são obrigatórios');
    }

    // Preparar dados para a API
    const apiData = {
      'ID': parseInt(id),
      'Descrição': description,
      'ID Categoria': categoryId ? String(categoryId) : '',
      'code': code
    };

    console.log('Dados enviados para atualização:', apiData);

    const response = await fetch(API_URL, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${API_TOKEN}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(apiData)
    });

    if (!response.ok) {
      throw new Error(`Erro ao atualizar componente: ${response.status}`);
    }

    // Tentar obter a resposta como JSON, mas lidar com texto simples se falhar
    let data;
    let responseText;
    try {
      // Tentar ler como JSON
      data = await response.json();
    } catch (jsonError) {
      // Se falhar, ler como texto
      try {
        // Clonar a resposta porque já tentamos ler como JSON
        responseText = await response.clone().text();
        console.log('Resposta da API (texto):', responseText);
      } catch (textError) {
        console.error('Erro ao ler resposta como texto:', textError);
        responseText = 'Componente atualizado com sucesso';
      }
    }

    return {
      success: true,
      message: 'Componente atualizado com sucesso',
      data: data || { message: responseText }
    };
  } catch (error) {
    console.error('Erro ao atualizar componente:', error);
    return {
      success: false,
      message: error.message || 'Erro ao atualizar componente',
      error: error
    };
  }
}

/**
 * Exclui um componente
 * @param {number} id ID do componente a ser excluído
 * @returns {Promise<Object>} Resultado da operação
 */
export async function deleteComponent(id) {
  try {
    // Validar ID
    if (!id) {
      throw new Error('ID é obrigatório');
    }

    const response = await fetch(`${API_URL}/${id}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${API_TOKEN}`,
        'Content-Type': 'application/json'
      }
    });

    if (!response.ok) {
      throw new Error(`Erro ao excluir componente: ${response.status}`);
    }

    // Tentar obter a resposta como JSON, mas lidar com texto simples se falhar
    let data;
    let responseText;
    try {
      // Tentar ler como JSON
      data = await response.json();
    } catch (jsonError) {
      // Se falhar, ler como texto
      try {
        // Clonar a resposta porque já tentamos ler como JSON
        responseText = await response.clone().text();
        console.log('Resposta da API (texto):', responseText);
      } catch (textError) {
        console.error('Erro ao ler resposta como texto:', textError);
        responseText = 'Componente excluído com sucesso';
      }
    }

    return {
      success: true,
      message: 'Componente excluído com sucesso',
      data: data || { message: responseText }
    };
  } catch (error) {
    console.error('Erro ao excluir componente:', error);
    return {
      success: false,
      message: error.message || 'Erro ao excluir componente',
      error: error
    };
  }
}

/**
 * Busca todas as categorias diretamente da API
 * @returns {Promise<Array>} Lista completa de categorias
 */
export async function fetchAllCategories() {
  try {
    const response = await fetch('https://api0.mitraecp.com:1004/rest/v0/Categoria', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${API_TOKEN}`,
        'Content-Type': 'application/json'
      }
    });

    if (!response.ok) {
      throw new Error(`Erro ao buscar categorias: ${response.status}`);
    }

    const data = await response.json();
    console.log('Categorias da API:', data);

    // Mapear os dados da API para o formato esperado
    const categories = data.content.map(category => ({
      id: category.ID,
      name: category.Descrição || `Categoria ${category.ID}`
    }));

    return categories;
  } catch (error) {
    console.error('Erro ao buscar categorias da API:', error);
    return [];
  }
}

/**
 * Busca categorias disponíveis
 * @returns {Promise<Array>} Lista de categorias
 * @deprecated Use fetchAllCategories para obter todas as categorias
 */
export async function fetchCategories() {
  try {
    // Primeiro, tentar buscar todas as categorias da API
    const allCategories = await fetchAllCategories();
    if (allCategories.length > 0) {
      return allCategories;
    }

    // Fallback: extrair categorias dos componentes existentes
    const components = await fetchComponents();

    // Extrair categorias únicas dos componentes
    const categories = components
      .filter(component => component.categoryId && component.category)
      .map(component => ({
        id: component.categoryId,
        name: component.category
      }));

    // Remover duplicatas
    const uniqueCategories = Array.from(new Map(
      categories.map(category => [category.id, category])
    ).values());

    return uniqueCategories;
  } catch (error) {
    console.error('Erro ao buscar categorias:', error);
    return [];
  }
}

export default {
  fetchComponents,
  fetchComponentById,
  createComponent,
  updateComponent,
  deleteComponent,
  fetchCategories,
  fetchAllCategories,
  formatCode
};
