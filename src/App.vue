<template>
  <div id="app">
    <!-- Navigation Bar -->
    <nav class="navbar navbar-expand-lg navbar-dark bg-purple shadow-sm">
      <div class="container">
        <router-link to="/" class="navbar-brand">
          <i class="bi bi-check2-square"></i> MyVueTodo
        </router-link>
        <button
          class="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNav">
          <ul class="navbar-nav ms-auto">
            <li class="nav-item">
              <router-link to="/" class="nav-link" active-class="active">
                <i class="bi bi-house-door"></i> 首頁
              </router-link>
            </li>
            <li class="nav-item">
              <router-link to="/privacy" class="nav-link" active-class="active">
                <i class="bi bi-shield-lock"></i> 版權宣告
              </router-link>
            </li>
          </ul>
        </div>
      </div>
    </nav>

    <!-- Main Content -->
    <main class="main-content">
      <router-view />
    </main>

    <!-- Footer -->
    <footer class="footer mt-auto py-3 bg-light">
      <div class="container text-center">
        <span class="text-muted">© 2026 MyVueTodo - 待辦事項管理系統</span>
      </div>
    </footer>
  </div>
</template>

<style scoped>
#app {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.main-content {
  flex: 1;
  background: linear-gradient(135deg, #f3e7ff 0%, #e3d5ff 50%, #d4bbff 100%);
  min-height: calc(100vh - 120px);
}

.bg-purple {
  background: linear-gradient(135deg, #7c3aed 0%, #9333ea 100%) !important;
}

.navbar-brand {
  font-weight: 600;
  font-size: 1.25rem;
}

.nav-link {
  transition: all 0.3s ease;
}

.nav-link:hover {
  transform: translateY(-2px);
}

.nav-link.active {
  font-weight: 600;
}

.footer {
  margin-top: auto;
}
</style>
