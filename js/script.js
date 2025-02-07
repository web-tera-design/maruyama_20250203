document.addEventListener("DOMContentLoaded", () => {
  const drawerIcon = document.querySelector('.drawer__icon');
  const drawer = document.querySelector('.drawer');
  const drawerBackground = document.querySelector('.drawer__background'); // 追加
  const drawerNavItem = document.querySelectorAll('.drawer__body a[href^="#"]');
  const headerHeight = document.querySelector('header').offsetHeight;
  const breakpoint = 768;
  let isMenuOpen = false;
  let isMenuOpenAtBreakpoint = false;

  // メニューを開く
  const openMenu = () => {
    if (!drawer.classList.contains("js-show")) {
      drawer.classList.add("js-show");
      drawerIcon.classList.add("js-show");
      drawerBackground.classList.add("js-show"); // 背景を表示
    }
  };

  // メニューを閉じる
  const closeMenu = () => {
    if (drawer.classList.contains("js-show")) {
      drawer.classList.remove("js-show");
      drawerIcon.classList.remove("js-show");
      drawerBackground.classList.remove("js-show"); // 背景を非表示
      isMenuOpen = false;
    }
  };

  // メニューの開閉動作
  const toggleMenu = () => {
    if (!drawer.classList.contains("js-show")) {
      openMenu();
    } else {
      closeMenu();
    }
  };

  // 画面幅リサイズ時
  const handleResize = () => {
    const bp = breakpoint;
    const windowWidth = window.innerWidth;
    if (windowWidth > bp && isMenuOpenAtBreakpoint) {
      closeMenu();
    } else if (windowWidth <= bp && drawer.classList.contains("js-show")) {
      isMenuOpenAtBreakpoint = true;
    }
  };

  // メニュー外クリック時
  const clickOuter = (event) => {
    if (drawer.classList.contains("js-show") && !drawer.contains(event.target) && isMenuOpen) {
      closeMenu();
    } else if (drawer.classList.contains("js-show") && !drawer.contains(event.target)) {
      isMenuOpen = true;
    }
  };

  // 背景クリックでドロワーを閉じる
  drawerBackground.addEventListener("click", closeMenu);

  // アイコンクリック時
  drawerIcon.addEventListener("click", toggleMenu);

  // 画面幅リサイズ時
  window.addEventListener("resize", handleResize);

  // メニュー外クリック時
  document.addEventListener("click", clickOuter);

  // ページ内リンクメニュー クリック時
  drawerNavItem.forEach(item => {
    item.addEventListener("click", event => {
      event.preventDefault();
      closeMenu();
      const targetItem = document.querySelector(item.getAttribute("href"));
      linkScroll(targetItem);
    });
  });
});
