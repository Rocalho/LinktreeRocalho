/**
 * =====================================
 * 🔗 LINKTREE - ROCALHO JÚNIOR
 * =====================================
 * 
 * Configuração centralizada de dados
 * Fácil de manter e personalizar
 */

// ====================================
// 📊 DADOS CENTRALIZADOS (RF01 & RNF01)
// ====================================
const linksData = {
    // 👤 Informações do perfil
    profile: {
        name: "Rocalho Assis",
        bio: "Desenvolvedor Junior",
        avatar: "👨‍💻", // Pode ser emoji ou URL da imagem
        location: "São Paulo, Brasil" // Opcional
    },
    
    // 🔗 Lista de links (RF01)
    links: [
        {
            id: 1,
            title: "📱 Instagram",
            description: "Acompanhe meu dia a dia",
            url: "https://instagram.com/rocalhoassis",
            icon: "fab fa-instagram",
            featured: true, // RF05 - Link destacado
            category: "social"
        },
        {
            id: 2,
            title: "💼 LinkedIn",
            description: "Conecte-se comigo profissionalmente",
            url: "https://linkedin.com/in/rocalho-assis",
            icon: "fab fa-linkedin",
            category: "profissional"
        },
        {
            id: 3,
            title: "🐙 GitHub",
            description: "Confira meus códigos",
            url: "https://github.com/rocalhoassis",
            icon: "fab fa-github",
            category: "código"
        },
        {
            id: 4,
            title: "📧 Contato",
            description: "Entre em contato",
            url: "mailto:contato@rocalhoassis.dev",
            icon: "fas fa-envelope",
            style: "accent", // RF05 - Estilo especial
            category: "contato"
        }
    ],
    
    // ⚙️ Configurações gerais
    settings: {
        openInNewTab: true, // RF04
        trackClicks: true,
        showFooter: true,
        animationsEnabled: true
    }
};

// ====================================
// 🏗️ CLASSE PRINCIPAL DO LINKTREE
// ====================================
class LinkTree {
    constructor(data) {
        this.data = data;
        this.container = null;
        this.profileElements = {};
        this.init();
    }
    
    // 🚀 Inicialização
    init() {
        this.cacheElements();
        this.render();
        this.bindEvents();
        this.addLoadingEffect();
    }
    
    // 📦 Cache dos elementos DOM
    cacheElements() {
        this.container = document.getElementById('linksContainer');
        this.profileElements = {
            name: document.getElementById('profileName'),
            bio: document.getElementById('profileBio'),
            avatar: document.getElementById('profileAvatar')
        };
    }
    
    // 🎨 Renderização principal
    render() {
        this.renderProfile();
        this.renderLinks();
    }
    
    // 👤 Renderizar perfil
    renderProfile() {
        const { profile } = this.data;
        
        if (this.profileElements.name) {
            this.profileElements.name.textContent = profile.name;
        }
        
        if (this.profileElements.bio) {
            this.profileElements.bio.textContent = profile.bio;
        }
        
        if (this.profileElements.avatar) {
            if (profile.avatar.startsWith('http')) {
                // Se for URL, criar img
                this.profileElements.avatar.innerHTML = `<img src="${profile.avatar}" alt="${profile.name}" style="width: 100%; height: 100%; object-fit: cover; border-radius: 50%;">`;
            } else {
                // Se for emoji ou texto
                this.profileElements.avatar.textContent = profile.avatar;
            }
        }
    }
    
    // 🔗 Renderizar links
    renderLinks() {
        if (!this.container) return;
        
        const linksHTML = this.data.links.map(link => this.createLinkHTML(link)).join('');
        this.container.innerHTML = linksHTML;
        
        // Adicionar animação escalonada
        this.addStaggeredAnimation();
    }
    
    // 🏗️ Criar HTML de um link
    createLinkHTML(link) {
        const classes = ['link-item'];
        
        // RF05 - Adicionar classes especiais
        if (link.featured) classes.push('featured');
        if (link.style) classes.push(link.style);
        
        // RF04 - Target blank
        const target = this.data.settings.openInNewTab ? 'target="_blank" rel="noopener noreferrer"' : '';
        
        return `
            <a href="${link.url}" 
               class="${classes.join(' ')}" 
               ${target}
               data-link-id="${link.id}"
               data-category="${link.category || 'geral'}"
               aria-label="${link.title} - ${link.description}">
                <div class="link-icon">
                    <i class="${link.icon}" aria-hidden="true"></i>
                </div>
                <div class="link-content">
                    <div class="link-title">${link.title}</div>
                    <div class="link-description">${link.description}</div>
                </div>
                <div class="link-arrow">
                    <i class="fas fa-external-link-alt" aria-hidden="true"></i>
                </div>
            </a>
        `;
    }
    
    // 🎭 Animação escalonada dos links
    addStaggeredAnimation() {
        const links = this.container.querySelectorAll('.link-item');
        links.forEach((link, index) => {
            link.style.animationDelay = `${0.1 * index}s`;
            link.classList.add('slide-up');
        });
    }
    
    // 🔄 Efeito de carregamento
    addLoadingEffect() {
        document.body.classList.add('loading');
        
        setTimeout(() => {
            document.body.classList.remove('loading');
            document.body.classList.add('loaded');
        }, 300);
    }
    
    // 🎯 Event listeners
    bindEvents() {
        // Click tracking
        if (this.data.settings.trackClicks) {
            document.addEventListener('click', this.handleLinkClick.bind(this));
        }
        
        // Keyboard navigation
        document.addEventListener('keydown', this.handleKeydown.bind(this));
        
        // Theme toggle (opcional)
        this.addThemeToggle();
    }
    
    // 📊 Rastrear cliques nos links
    handleLinkClick(event) {
        const linkItem = event.target.closest('.link-item');
        if (!linkItem) return;
        
        const linkId = linkItem.getAttribute('data-link-id');
        const category = linkItem.getAttribute('data-category');
        const url = linkItem.getAttribute('href');
        
        // Analytics tracking
        this.trackClick(linkId, url, category);
        
        // Feedback visual
        this.addClickFeedback(linkItem);
    }
    
    // 📈 Função de tracking (integração com Google Analytics, etc.)
    trackClick(linkId, url, category) {
        console.log(`🔗 Link clicado: ID ${linkId}, URL: ${url}, Categoria: ${category}`);
        
        // Google Analytics 4 (se configurado)
        if (typeof gtag !== 'undefined') {
            gtag('event', 'link_click', {
                event_category: 'outbound',
                event_label: url,
                link_id: linkId,
                category: category,
                value: 1
            });
        }
        
        // Google Analytics Universal (se configurado)
        if (typeof ga !== 'undefined') {
            ga('send', 'event', 'Links', 'Click', url, {
                'custom_map.dimension1': category,
                'custom_map.dimension2': linkId
            });
        }
        
        // Facebook Pixel (se configurado)
        if (typeof fbq !== 'undefined') {
            fbq('track', 'Lead', {
                content_name: url,
                content_category: category
            });
        }
        
        // Plausible Analytics (se configurado)
        if (typeof plausible !== 'undefined') {
            plausible('Link Click', {
                props: { 
                    url: url, 
                    category: category,
                    link_id: linkId 
                }
            });
        }
    }
    
    // 💫 Feedback visual do clique
    addClickFeedback(element) {
        element.style.transform = 'scale(0.98)';
        element.style.transition = 'transform 0.1s ease';
        
        setTimeout(() => {
            element.style.transform = '';
            element.style.transition = '';
        }, 100);
    }
    
    // ⌨️ Navegação por teclado
    handleKeydown(event) {
        // Atalhos de teclado úteis
        switch(event.key) {
            case '1':
            case '2':
            case '3':
            case '4':
            case '5':
            case '6':
            case '7':
            case '8':
            case '9':
                if (event.ctrlKey || event.metaKey) {
                    event.preventDefault();
                    const index = parseInt(event.key) - 1;
                    const links = document.querySelectorAll('.link-item');
                    if (links[index]) {
                        links[index].click();
                    }
                }
                break;
                
            case 'Escape':
                // Remover focus de elementos
                document.activeElement.blur();
                break;
        }
    }
    
    // 🌓 Toggle de tema
    addThemeToggle() {
        // Criar botão de toggle (opcional)
        const themeToggle = document.createElement('button');
        themeToggle.className = 'theme-toggle';
        themeToggle.innerHTML = '🌓';
        themeToggle.title = 'Alternar tema';
        themeToggle.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: var(--card-background);
            border: 1px solid var(--border-color);
            border-radius: 50%;
            width: 48px;
            height: 48px;
            font-size: 1.5rem;
            cursor: pointer;
            z-index: 1000;
            transition: all 0.3s ease;
            box-shadow: var(--shadow-md);
        `;
        
        themeToggle.addEventListener('click', this.toggleTheme.bind(this));
        document.body.appendChild(themeToggle);
        
        // Carregar tema salvo
        this.loadSavedTheme();
    }
    
    // 🎨 Alternar tema
    toggleTheme() {
        const currentTheme = localStorage.getItem('linktree-theme') || 'dark';
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        
        this.setTheme(newTheme);
        localStorage.setItem('linktree-theme', newTheme);
    }
    
    // 🎨 Aplicar tema
    setTheme(themeName) {
        const themes = {
            dark: {
                '--primary-color': '#6366f1',
                '--secondary-color': '#8b5cf6',
                '--accent-color': '#f59e0b',
                '--background-color': '#0f172a',
                '--card-background': '#1e293b',
                '--text-color': '#f8fafc',
                '--text-secondary': '#94a3b8',
                '--border-color': '#334155'
            },
            light: {
                '--primary-color': '#4f46e5',
                '--secondary-color': '#7c3aed',
                '--accent-color': '#d97706',
                '--background-color': '#f8fafc',
                '--card-background': '#ffffff',
                '--text-color': '#1e293b',
                '--text-secondary': '#64748b',
                '--border-color': '#e2e8f0'
            },
            ocean: {
                '--primary-color': '#0891b2',
                '--secondary-color': '#0284c7',
                '--accent-color': '#0ea5e9',
                '--background-color': '#0c4a6e',
                '--card-background': '#075985',
                '--text-color': '#e0f2fe',
                '--text-secondary': '#bae6fd',
                '--border-color': '#0369a1'
            },
            sunset: {
                '--primary-color': '#ea580c',
                '--secondary-color': '#dc2626',
                '--accent-color': '#f59e0b',
                '--background-color': '#7c2d12',
                '--card-background': '#9a3412',
                '--text-color': '#fed7aa',
                '--text-secondary': '#fdba74',
                '--border-color': '#c2410c'
            }
        };
        
        const theme = themes[themeName];
        if (theme) {
            Object.entries(theme).forEach(([property, value]) => {
                document.documentElement.style.setProperty(property, value);
            });
        }
    }
    
    // 💾 Carregar tema salvo
    loadSavedTheme() {
        const savedTheme = localStorage.getItem('linktree-theme');
        if (savedTheme) {
            this.setTheme(savedTheme);
        }
    }
    
    // ➕ Adicionar link dinamicamente
    addLink(linkData) {
        const newLink = {
            ...linkData,
            id: Date.now() // ID único baseado no timestamp
        };
        
        this.data.links.push(newLink);
        this.renderLinks();
        
        // Scroll para o novo link
        setTimeout(() => {
            const newLinkElement = document.querySelector(`[data-link-id="${newLink.id}"]`);
            if (newLinkElement) {
                newLinkElement.scrollIntoView({ 
                    behavior: 'smooth', 
                    block: 'center' 
                });
            }
        }, 100);
    }
    
    // ➖ Remover link
    removeLink(linkId) {
        this.data.links = this.data.links.filter(link => link.id != linkId);
        this.renderLinks();
    }
    
    // ✏️ Atualizar perfil
    updateProfile(newProfile) {
        this.data.profile = { ...this.data.profile, ...newProfile };
        this.renderProfile();
    }
    
    // 🔍 Filtrar links por categoria
    filterByCategory(category) {
        const links = document.querySelectorAll('.link-item');
        
        links.forEach(link => {
            const linkCategory = link.getAttribute('data-category');
            if (category === 'all' || linkCategory === category) {
                link.style.display = 'flex';
                link.style.animation = 'fadeInUp 0.3s ease-out';
            } else {
                link.style.display = 'none';
            }
        });
    }
    
    // 🔄 Reordenar links
    reorderLinks(newOrder) {
        const orderedLinks = newOrder.map(id => 
            this.data.links.find(link => link.id === id)
        ).filter(Boolean);
        
        this.data.links = orderedLinks;
        this.renderLinks();
    }
    
    // 📱 Detectar dispositivo móvel
    isMobile() {
        return window.innerWidth <= 768 || 
               /Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    }
    
    // 📊 Estatísticas de uso
    getStats() {
        return {
            totalLinks: this.data.links.length,
            featuredLinks: this.data.links.filter(link => link.featured).length,
            categories: [...new Set(this.data.links.map(link => link.category))],
            lastUpdated: new Date().toISOString()
        };
    }
}

// ====================================
// 🚀 INICIALIZAÇÃO
// ====================================
document.addEventListener('DOMContentLoaded', function() {
    // Criar instância do LinkTree
    const linkTree = new LinkTree(linksData);
    
    // Expor globalmente para facilitar debugging e customização
    window.LinkTree = linkTree;
    window.linksData = linksData;
    
    // Funções de conveniência globais
    window.addLink = linkTree.addLink.bind(linkTree);
    window.removeLink = linkTree.removeLink.bind(linkTree);
    window.updateProfile = linkTree.updateProfile.bind(linkTree);
    window.setTheme = linkTree.setTheme.bind(linkTree);
    
    // Performance monitoring
    if ('performance' in window) {
        window.addEventListener('load', () => {
            setTimeout(() => {
                const perfData = performance.getEntriesByType('navigation')[0];
                console.log(`⚡ Página carregada em ${Math.round(perfData.loadEventEnd - perfData.loadEventStart)}ms`);
            }, 0);
        });
    }
    
    // Service Worker para cache (opcional)
    if ('serviceWorker' in navigator && 'production' === 'production') {
        navigator.serviceWorker.register('/sw.js')
            .then(registration => console.log('🔄 SW registrado:', registration))
            .catch(error => console.log('❌ SW falhou:', error));
    }
});

// ====================================
// 🔧 UTILITÁRIOS EXTRAS
// ====================================

// Função para compartilhar a página
function shareProfile() {
    if (navigator.share) {
        navigator.share({
            title: `${linksData.profile.name} - Meus Links`,
            text: linksData.profile.bio,
            url: window.location.href
        });
    } else {
        // Fallback para clipboard
        navigator.clipboard.writeText(window.location.href)
            .then(() => alert('📋 Link copiado para a área de transferência!'))
            .catch(() => alert('❌ Erro ao copiar link'));
    }
}

// Função para exportar dados
function exportData() {
    const dataStr = JSON.stringify(linksData, null, 2);
    const dataBlob = new Blob([dataStr], {type: 'application/json'});
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'linktree-data.json';
    link.click();
    URL.revokeObjectURL(url);
}

// Função para importar dados
function importData(file) {
    const reader = new FileReader();
    reader.onload = function(e) {
        try {
            const importedData = JSON.parse(e.target.result);
            Object.assign(linksData, importedData);
            window.LinkTree.data = linksData;
            window.LinkTree.render();
            console.log('✅ Dados importados com sucesso!');
        } catch (error) {
            console.error('❌ Erro ao importar dados:', error);
            alert('Erro ao importar arquivo. Verifique se é um JSON válido.');
        }
    };
    reader.readAsText(file);
}

// Adicionar CSS para o botão de tema no head
const themeToggleCSS = `
    .theme-toggle:hover {
        transform: scale(1.1);
        box-shadow: var(--shadow-lg);
    }
    
    .theme-toggle:active {
        transform: scale(0.95);
    }
`;

const styleSheet = document.createElement('style');
styleSheet.textContent = themeToggleCSS;
document.head.appendChild(styleSheet);

// ====================================
// 🎯 CONFIGURAÇÕES AVANÇADAS
// ====================================

// Configuração de PWA (opcional)
const PWA_CONFIG = {
    enabled: false,
    name: `${linksData.profile.name} - Links`,
    shortName: 'Links',
    description: linksData.profile.bio,
    backgroundColor: '#0f172a',
    themeColor: '#6366f1'
};

// Configuração de analytics
const ANALYTICS_CONFIG = {
    googleAnalytics: '', // GA4 Measurement ID
    facebookPixel: '',   // Facebook Pixel ID
    plausible: false,    // true se usar Plausible
    customEvents: true   // Eventos personalizados
};

console.log('🔗 LinkTree iniciado com sucesso!');
console.log('📊 Dados:', window.LinkTree.getStats());