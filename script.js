document.addEventListener("DOMContentLoaded", () => {
    const languageToggle = document.getElementById("languageToggle");
    const navLinks = document.querySelectorAll("nav ul li a");
    const sections = document.querySelectorAll(".content-section");

    // Detecta se o idioma atual é inglês com base no nome do arquivo
    const isEnglish = window.location.pathname.includes("index.html");

    // Define o estado inicial do toggle switch
    languageToggle.checked = !isEnglish;

    // Função para alternar entre os idiomas
    const switchLanguage = () => {
        // Obtém a aba ativa no momento (seção visível)
        const activeSection = [...sections].find(section => !section.classList.contains("hidden"));
        const activeSectionId = activeSection ? activeSection.id : null;

        // Redireciona para o arquivo correspondente, mantendo a aba ativa
        if (isEnglish) {
            // Versão em português
            const newUrl = activeSectionId ? `indexpt.html#${activeSectionId}` : `indexpt.html`;
            window.location.href = newUrl;
        } else {
            // Versão em inglês
            const newUrl = activeSectionId ? `index.html#${activeSectionId}` : `index.html`;
            window.location.href = newUrl;
        }
    };

    // Adiciona o listener ao toggle switch
    languageToggle.addEventListener("change", switchLanguage);

    // Função para mudar entre abas (seções)
    navLinks.forEach(link => {
        link.addEventListener("click", event => {
            event.preventDefault();

            // Obtém o ID da aba associada ao link clicado
            const sectionId = link.getAttribute("data-section");
            const targetSection = document.getElementById(sectionId);

            // Esconde todas as seções e exibe a seção correspondente
            sections.forEach(section => section.classList.add("hidden"));
            targetSection.classList.remove("hidden");

            // Atualiza o URL para refletir a aba ativa
            history.pushState(null, "", `#${sectionId}`);
        });
    });

    // Mostra a aba correspondente ao hash na URL ao carregar a página
    const loadSectionFromHash = () => {
        const hash = window.location.hash.substring(1);
        const targetSection = document.getElementById(hash);
        if (targetSection) {
            sections.forEach(section => section.classList.add("hidden"));
            targetSection.classList.remove("hidden");
        }
    };

    // Carrega a aba correta com base no hash na URL
    loadSectionFromHash();
});
