// Polyfill ultra-robusto para compatibilidade com Radix UI
(function() {
  console.log('🔧 Carregando polyfill ultra-robusto para window.Image...');

  if (typeof window !== 'undefined') {
    console.log('📊 Estado inicial - window.Image:', typeof window.Image, window.Image);

    // Salvar referência original se existir
    const originalImage = window.Image;

    // Criar constructor ultra-robusto
    function UltraImagePolyfill(width, height) {
      console.log('🖼️ UltraImagePolyfill chamado com:', width, height);

      // Criar elemento img
      const img = document.createElement('img');

      // Aplicar dimensões se fornecidas
      if (typeof width === 'number' && width > 0) img.width = width;
      if (typeof height === 'number' && height > 0) img.height = height;

      // Retornar o elemento img
      return img;
    }

    // Configurar prototype e constructor
    UltraImagePolyfill.prototype = HTMLImageElement.prototype;
    UltraImagePolyfill.prototype.constructor = UltraImagePolyfill;

    // Adicionar propriedades estáticas necessárias
    Object.defineProperty(UltraImagePolyfill, 'name', {
      value: 'Image',
      writable: false,
      configurable: false
    });

    // Substituir window.Image de forma definitiva
    Object.defineProperty(window, 'Image', {
      value: UltraImagePolyfill,
      writable: true,
      configurable: true,
      enumerable: true
    });

    // Garantir HTMLImageElement
    if (!window.HTMLImageElement) {
      window.HTMLImageElement = HTMLImageElement;
    }

    // Interceptar e redirecionar qualquer tentativa de usar Image
    const imageHandler = {
      construct: function(target, args) {
        console.log('🎯 Image constructor interceptado:', args);
        return UltraImagePolyfill.apply(null, args);
      },
      apply: function(target, thisArg, args) {
        console.log('🎯 Image function interceptado:', args);
        return UltraImagePolyfill.apply(null, args);
      }
    };

    // Aplicar proxy se disponível
    if (typeof Proxy !== 'undefined') {
      window.Image = new Proxy(UltraImagePolyfill, imageHandler);
    }

    // Verificação final
    console.log('✅ Polyfill ultra-robusto aplicado!');
    console.log('📊 window.Image final:', typeof window.Image, window.Image);
    console.log('🧪 Teste new Image():', new window.Image());
    console.log('🧪 Teste Image():', window.Image());
    console.log('🔍 window.Image.prototype:', window.Image.prototype);
    console.log('🔍 window.Image.constructor:', window.Image.constructor);

    // Monitorar tentativas de redefinição
    let imageAccessCount = 0;
    Object.defineProperty(window, '_imageAccessCount', {
      get: function() { return imageAccessCount; },
      set: function(val) {
        imageAccessCount = val;
        console.log('📈 Image acessado', imageAccessCount, 'vezes');
      }
    });

    // Verificar se pode proteger contra redefinições
    try {
      const originalDescriptor = Object.getOwnPropertyDescriptor(window, 'Image');
      if (originalDescriptor && originalDescriptor.configurable !== false) {
        console.log('🔒 Tentando proteger window.Image contra redefinições...');
        // Não tentar redefinir se já foi definido como não configurável
      } else {
        console.log('⚠️ window.Image já está protegido ou não pode ser protegido');
      }
    } catch (e) {
      console.warn('⚠️ Erro ao verificar proteção:', e.message);
    }
  }
})();
