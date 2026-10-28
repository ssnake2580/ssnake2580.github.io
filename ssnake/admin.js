(() => {
  'use strict';
  const status = document.getElementById('admin-status');
  const message = document.getElementById('admin-message');
  const detail = document.getElementById('admin-detail');
  const settings = JSON.parse(document.getElementById('admin-settings').textContent);
  if (!settings.netlify_site_id?.trim()) {
    message.textContent = 'GitHub 로그인 연결 설정이 필요합니다.';
    detail.textContent = 'Netlify에서 GitHub OAuth를 연결하고, _data/admin.yml의 netlify_site_id에 프로젝트 ID를 입력한 뒤 다시 배포하세요.';
    return;
  }
  window.CMS_MANUAL_INIT = true;
  const script = document.createElement('script');
  script.src = 'https://unpkg.com/decap-cms@3.17.3/dist/decap-cms.js';
  script.onload = () => {
    window.CMS.registerPreviewStyle('/ssnake/preview.css');
    window.CMS.init();
    status.hidden = true;
  };
  script.onerror = () => {
    message.textContent = '관리 도구를 불러오지 못했습니다.';
    detail.textContent = '인터넷 연결이나 브라우저의 차단 설정을 확인한 뒤 새로고침하세요.';
  };
  document.head.appendChild(script);
})();
