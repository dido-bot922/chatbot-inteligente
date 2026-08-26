// Base de conhecimento do chatbot
const knowledgeBase = {
    // Saudações
    'oi': 'Olá! Como posso ajudá-lo? 😊',
    'olá': 'E aí! Tudo bem? Como posso ser útil? 👋',
    'opa': 'E aí, tudo certo! O que você precisa? 💪',
    'tudo bem': 'Tudo ótimo! E com você, como vai? 😄',

    // Tecnologia
    'javascript': 'JavaScript é uma linguagem de programação que roda nos navegadores e servidores. É perfeita para criar aplicações web interativas! 💻',
    'html': 'HTML é a linguagem de marcação usada para estruturar conteúdo na web. É a base de qualquer site! 🌐',
    'css': 'CSS é usada para estilizar e posicionar elementos HTML. Deixa o site bonito e responsivo! 🎨',
    'python': 'Python é uma linguagem versátil, ótima para iniciantes e também usada em data science, IA e backend. Muito poderosa! 🐍',
    'react': 'React é uma biblioteca JavaScript para criar interfaces de usuário componentes e reativas. Feita pelo Facebook! ⚛️',
    'api': 'API (Application Programming Interface) é um conjunto de protocolos que permite que diferentes aplicações se comuniquem. É essencial na web moderna! 🔌',

    // Dicas úteis
    'como aprender programação': 'Comece com HTML/CSS, depois JavaScript. Pratique todos os dias com pequenos projetos. Use recursos como freeCodeCamp, Codecademy ou YouTube. A consistência é a chave! 📚',
    'como fazer um site': 'Você precisa de HTML (estrutura), CSS (estilos) e JavaScript (interatividade). Comece com um projeto simples e vá evoluindo! 🌟',
    'git': 'Git é um sistema de controle de versão que permite rastrear mudanças no código. Essencial para trabalho em equipe! 📝',
    'github': 'GitHub é uma plataforma online para hospedar repositórios Git. Perfeita para compartilhar código e colaborar! 🐙',

    // Motivação
    'tô com preguiça': 'Entendo! Mas lembra que cada linha de código que você escreve agora é um passo para algo incrível no futuro. Vamo lá! 💪',
    'sou ruim em programação': 'Ninguém nasce sabendo! Todo expert foi iniciante um dia. A chave é praticar, praticar e mais praticar. Você consegue! 🚀',
    'qual é o sentido da vida': 'Ah, essa é profunda! Cada um encontra seu próprio sentido. Mas uma coisa é certa: criar coisas incríveis com código é bem gratificante! 🌟',

    // Perguntas sobre você
    'quem é você': 'Sou um chatbot inteligente criado para conversar e ajudar você com dúvidas sobre tecnologia, programação e muito mais! 🤖',
    'qual é seu nome': 'Sou o ChatBot Inteligente! Prazer em conhecê-lo! 😊',
    'você é IA': 'Sou um chatbot inteligente baseado em padrões de conversação. Não sou tão inteligente quanto uma IA de verdade, mas faço meu melhor! 🤖',

    // Piadas e humor
    'me conte uma piada': 'Por que o desenvolvedor saiu de casa? Porque ele perdeu um cache! 😄',
    'você é engraçado': 'Obrigado! Meu senso de humor é tão bom quanto meu código - está em constante melhoria! 😄',

    // Geral
    'obrigado': 'De nada! Fico feliz em ajudar! 😊',
    'valeu': 'Por nada! Sempre aqui para ajudar! 👍',
    'tchau': 'Até logo! Continue criando coisas incríveis! 👋🚀',
    'adeus': 'Adeus! Volte sempre que precisar de ajuda! 👋',
};

// Elementos do DOM
const chatMessages = document.getElementById('chatMessages');
const userInput = document.getElementById('userInput');
const sendBtn = document.getElementById('sendBtn');

// Função para encontrar resposta na base de conhecimento
function findResponse(userMessage) {
    const message = userMessage.toLowerCase().trim();
    
    // Busca exata
    if (knowledgeBase[message]) {
        return knowledgeBase[message];
    }

    // Busca parcial (contém a palavra-chave)
    for (const key in knowledgeBase) {
        if (message.includes(key)) {
            return knowledgeBase[key];
        }
    }

    // Respostas padrão variadas
    const defaultResponses = [
        'Ótima pergunta! Infelizmente não tenho informações sobre isso. Tente me perguntar sobre tecnologia, programação ou dicas de desenvolvimento! 🤔',
        'Hmm, não tenho certeza sobre isso. Mas estou sempre aprendendo! Me pergunte sobre JavaScript, HTML, CSS, Python, ou dicas de programação! 📚',
        'Essa é uma boa! Não tenho uma resposta pronta para isso, mas posso ajudar com dúvidas sobre desenvolvimento web e programação! 💡',
        'Interessante pergunta! Meu banco de dados é focado em tecnologia e programação. Tenta me fazer uma pergunta sobre isso! 🧠',
    ];

    return defaultResponses[Math.floor(Math.random() * defaultResponses.length)];
}

// Função para adicionar mensagem ao chat
function addMessage(text, isUser) {
    const messageDiv = document.createElement('div');
    messageDiv.className = isUser ? 'message user-message' : 'message bot-message';
    
    const contentDiv = document.createElement('div');
    contentDiv.className = 'message-content';
    contentDiv.textContent = text;
    
    messageDiv.appendChild(contentDiv);
    chatMessages.appendChild(messageDiv);
    
    // Scroll para baixo
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

// Função para simular digitação
function simulateTyping() {
    const messageDiv = document.createElement('div');
    messageDiv.className = 'message bot-message';
    
    const contentDiv = document.createElement('div');
    contentDiv.className = 'message-content';
    contentDiv.textContent = '✏️ Digitando...';
    
    messageDiv.appendChild(contentDiv);
    chatMessages.appendChild(messageDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;
    
    return messageDiv;
}

// Função para enviar mensagem
function sendMessage() {
    const message = userInput.value.trim();
    
    if (message === '') return;

    // Adiciona mensagem do usuário
    addMessage(message, true);
    userInput.value = '';

    // Simula digitação
    const typingMessage = simulateTyping();

    // Simula delay de resposta (como se o bot estivesse "pensando")
    setTimeout(() => {
        typingMessage.remove();
        
        const response = findResponse(message);
        addMessage(response, false);
    }, 500 + Math.random() * 1000);
}

// Event listeners
sendBtn.addEventListener('click', sendMessage);

userInput.addEventListener('keypress', (event) => {
    if (event.key === 'Enter') {
        sendMessage();
    }
});

// Focus inicial
userInput.focus();