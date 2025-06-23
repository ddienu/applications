document.addEventListener('DOMContentLoaded', async ()=> {
  document.querySelector('body').style.display = 'none';
  document.querySelector('body').style.opacity = 0;
 
  await checkAuth();
  console.log('dashboard controller has been loaded');
  fadeInElement(document.querySelector('body'), 1000);
  // Initialize the loading screen
});

const appStorage = new AppStorage();

window.addEventListener("load", () => {
     if(appStorage.getItem(USER_ROLE) === "admin"){
        // window.location.href = '../../';
        const adminContent = document.getElementById("admin-content");
        // console.log(adminContent);
        adminContent.style.display = 'flex'
      }else if(appStorage.getItem(USER_ROLE) === "userapi") {
        // window.location.href = '../../views/userApi/index.html'
        // window.location.href = '../../';
        const userApiContent = document.getElementById("userapi-content");
        // console.log(userApiContent);
        userApiContent.style.display = 'flex'
      }
})
