export function setupScrollToTop() {
    const scrollTopBtn = document.getElementById('scroll-top');
  
    window.addEventListener('scroll', () => {
      if (window.scrollY > 300) {
        scrollTopBtn.classList.remove('opacity-0', 'pointer-events-none');
      } else {
        scrollTopBtn.classList.add('opacity-0', 'pointer-events-none');
      }
    });
  
    scrollTopBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}

export function setupScrollDown(){
    const exploreBtn = document.getElementById('scroll-down');
    const searchSection = document.getElementById('search');


    exploreBtn.addEventListener('click', () => {
        searchSection.scrollIntoView({ behavior: 'smooth' });
    });

}

export function setupBurberButton(){
    const menuToggle = document.getElementById('menu-toggle');
    const mobileMenu = document.getElementById('mobile-menu');

    menuToggle.addEventListener('click', () => {
        mobileMenu.classList.toggle('hidden');
        menuToggle.innerHTML = mobileMenu.classList.contains('hidden') 
            ? '<i class="bi bi-list"></i>' 
            : '<i class="bi bi-x"></i>';
    });
}