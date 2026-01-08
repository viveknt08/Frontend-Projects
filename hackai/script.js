// firbase modules imported 
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.21.0/firebase-app.js";
import { 
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  sendEmailVerification
} from "https://www.gstatic.com/firebasejs/9.21.0/firebase-auth.js";


const firebaseConfig = {
  apiKey: "AIzaSyDy4uuvK25BmPDs1CaUUMV9Q6_7ZpG7jaY",
  authDomain: "hackaccino-ai-signin.firebaseapp.com",
  projectId: "hackaccino-ai-signin",
  storageBucket: "hackaccino-ai-signin.firebasestorage.app",
  messagingSenderId: "122416790583",
  appId: "1:122416790583:web:e1f73671205c5cc1e2d3b2",
  measurementId: "G-3C8CZR4LSC"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();


export function openModal(type) {
  let modal = document.getElementById("authModal");
  let loginForm = document.getElementById("loginForm");
  let signupForm = document.getElementById("signupForm");

  if (modal && loginForm && signupForm) {
    modal.style.display = "flex";

    if (type === "login") {
      loginForm.style.display = "flex";
      signupForm.style.display = "none";
    } else {
      signupForm.style.display = "flex";
      loginForm.style.display = "none";
    }
  } else {
    console.error("Modal or forms not found.");
  }
}
window.openModal = openModal; // global variable use hua thoda dhyan se 

export function closeModal() {
  document.getElementById("authModal").style.display = "none";
}
window.closeModal = closeModal;

// Event listener for the login form
document.getElementById("loginForm").addEventListener("submit", (e) => {
  e.preventDefault();
  const email = document.getElementById("loginEmail").value;
  const password = document.getElementById("loginPassword").value;

  signInWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    const user = userCredential.user;
    if (!user.emailVerified) {
      sendEmailVerification(user)
        .then(() => {
          alert("Please verify your email. A verification link has been sent.");
        });
    } else {
      alert("Login successful!");
      updateUI(user); 
    }
    closeModal();
    })
    .catch((error) => {
      console.error("Login error:", error);
      alert(error.message);
    });
});

// El for signup form
document.getElementById("signupForm").addEventListener("submit", (e) => {
  e.preventDefault();
  const email = document.getElementById("signupEmail").value;
  const password = document.getElementById("signupPassword").value;

  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      // email verification
      sendEmailVerification(user)
        .then(() => {
          alert("Signup successful! A verification email has been sent.");
        });
      closeModal();
    })
    .catch((error) => {
      console.error("Signup error:", error);
      alert(error.message);
    });
});

// el for cwg
document.getElementById("googleLoginBtn").addEventListener("click", (e) => {
  e.preventDefault();
  signInWithPopup(auth, googleProvider)
  .then((result) => {
    alert("Logged in with Google!");
    updateUI(result.user); // Call function to update UI
    closeModal();
    })
    .catch((error) => {
      console.error("Google login error:", error);
      alert(error.message);
    });
});
function updateUI(user) {
    document.querySelector(".login-btn").style.display = "none"; 
    document.querySelector(".profile-dropdown").style.display = "block"; 
    
    // profile image
    if (user.photoURL) {
      document.querySelector(".profile-icon").src = user.photoURL;
    }
  }
  function logout() {
    auth.signOut().then(() => {
      alert("Logged out successfully!");
      document.querySelector(".login-btn").style.display = "block"; // Show login button
      document.querySelector(".profile-dropdown").style.display = "none"; // Hide profile icon
    }).catch((error) => {
      console.error("Logout error:", error);
    });
  }
  window.logout = logout;
 
  function toggleDropdown() {
    let menu = document.getElementById("dropdownMenu");
    menu.style.display = menu.style.display === "block" ? "none" : "block";
  }
  window.toggleDropdown = toggleDropdown;
  document.getElementById("toggleSidebar").addEventListener("click", () => {
    let sidebar = document.getElementById("sidebar");
    let content = document.querySelector(".sidebar-content");
    if (sidebar.style.width === "250px") {
      sidebar.style.width = "60px";
      content.style.display = "none";
    } else {
      sidebar.style.width = "250px";
      content.style.display = "flex";
    }
  });
  
  document.querySelectorAll(".sidebar-item").forEach(item => {
    item.addEventListener("click", (event) => {
      event.preventDefault();
      let destination = item.getAttribute("data-page");
      window.location.href = destination;
    });
  });
  