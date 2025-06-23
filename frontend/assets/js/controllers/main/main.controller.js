document.addEventListener('DOMContentLoaded', function () {
  const sidebar = document.querySelector('.sidebar');
  const mainContent = document.querySelector('.main-content');
  const sidebarToggle = document.getElementById('sidebarToggle');

  sidebarToggle.addEventListener('click', function () {
    if (window.innerWidth > 992) {
      sidebar.classList.toggle('sidebar-collapsed');
      mainContent.classList.toggle('content-expanded');
    } else {
      sidebar.classList.toggle('show');
    }
  });

  if (window.innerWidth <= 992) {
    document.querySelectorAll('.sidebar .nav-link').forEach(link => {
      link.addEventListener('click', () => {
        sidebar.classList.remove('show');
      });
    });
  }
});

const signOutButton = document.getElementById('signOutBtn');
const appStorage = new AppStorage();

window.addEventListener("load", () => {
     if(appStorage.getItem(USER_ROLE) === "admin"){
        // window.location.href = '../../';
        const adminContent = document.getElementById("admin-content");
        // console.log(adminContent);
        adminContent.style.display = 'block'
      }else if(appStorage.getItem(USER_ROLE) === "userapi") {
        // window.location.href = '../../views/userApi/index.html'
        // window.location.href = '../../';
        const userApiContent = document.getElementById("userapi-content");
        // console.log(userApiContent);
        userApiContent.style.display = 'block'
      }
})

signOutButton.addEventListener("click", (event) => {
  event.preventDefault();
  if(confirm("¿Desea cerrar sesión?")){
    appStorage.clear();
    window.location.href = `${window.location.origin}/frontend/views/auth`;
  }
})

function resizeIframe(iframe) {
    iframe.style.height = iframe.contentWindow.document.documentElement.scrollHeight + 'px';
  }

