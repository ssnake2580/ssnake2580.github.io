# ssnake의 knights

포렌식과 웹에 관심을 둔 ssnake의 학습·활동 기록 블로그입니다.
Jekyll과 Chirpy 테마를 사용하며 GitHub Pages로 배포합니다.

## GitHub Pages란?

GitHub 저장소에 있는 HTML, CSS, JavaScript 등의 정적 파일을 웹사이트로 제공하는 서비스입니다.
이 블로그는 Jekyll이 Markdown을 HTML로 변환하고 GitHub Actions가 결과물을 배포합니다.
별도 서버 관리 없이 Git으로 글과 디자인의 변경 이력을 남길 수 있습니다.

- 사이트 주소: https://ssnake2580.github.io
- 공식 안내: https://docs.github.com/en/pages/getting-started-with-github-pages/what-is-github-pages
- 배포 설정: https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site

## 배포 방법

1. GitHub 저장소 **Settings → Pages → Build and deployment → Source**를 **GitHub Actions**로 설정합니다.
2. 변경 내용을 `main` 또는 `master` 브랜치에 push합니다.
3. Actions의 **Build and Deploy** 실행이 성공하면 위 사이트 주소에서 확인합니다.

워크플로는 Jekyll 빌드와 내부 링크 검사를 수행한 뒤 GitHub Pages에 배포합니다.

## 로컬 실행

Ruby 3.4와 Bundler를 준비한 뒤 실행합니다.

```sh
bundle install
bundle exec jekyll serve
```

http://127.0.0.1:4000 에서 확인할 수 있습니다.

```sh
JEKYLL_ENV=production bundle exec jekyll build
bundle exec htmlproofer _site --disable-external
```

## /ssnake에서 글과 파일 관리하기

관리 주소: https://ssnake2580.github.io/ssnake/ (`/ssnake`로 접속해도 이동합니다.)
Decap CMS가 이 주소에서 실행되고, Netlify는 GitHub OAuth 인증만 처리합니다.
블로그 호스팅과 배포는 계속 GitHub Pages를 사용합니다.
관리 주소를 블로그 메뉴에 노출하지 않으며 검색 제외 메타 태그를 적용했습니다.
주소 자체를 비공개로 차단하는 것은 아닙니다. 글·파일 변경 권한은 GitHub 저장소 권한으로 제한됩니다.

### 최초 연결 (소유자가 한 번 진행)

1. https://app.netlify.com 에서 로그인하고 수동 배포로 프로젝트를 하나 만듭니다.
   이 저장소의 `tools/netlify-auth-site` 폴더를 업로드하면 됩니다.
   블로그 저장소를 Netlify에 연결하거나 블로그 도메인을 옮길 필요는 없습니다.
2. Netlify 프로젝트에서 Project ID(API ID)를 복사합니다.
3. https://github.com/settings/applications/new 에서 OAuth App을 생성합니다.
   - Application name: `ssnake knights admin`
   - Homepage URL: `https://ssnake2580.github.io/ssnake/`
   - Authorization callback URL: `https://api.netlify.com/auth/done`
4. 생성한 앱의 Client ID를 복사하고 Client Secret을 생성합니다.
5. Netlify 프로젝트의 **Project configuration → Security → OAuth → Authentication Providers → Install Provider**에서
   GitHub를 선택하고 Client ID와 Client Secret을 입력해 저장합니다.
6. `_data/admin.yml`의 `netlify_site_id`에 2번의 Project ID를 입력합니다.
   **Client Secret은 저장소나 채팅에 입력하지 않습니다. Netlify에만 저장합니다.**
7. 변경 파일을 main 브랜치에 커밋하고 push한 뒤 GitHub Pages 배포가 완료되면 관리 주소에 접속합니다.
8. **Login with GitHub** 버튼으로 로그인하고 OAuth 접근을 승인합니다.
   이 저장소에 쓰기 권한이 있는 계정만 글과 파일을 변경할 수 있습니다.

Netlify Project ID는 공개 식별자이며 비밀키가 아닙니다.
설정 전에는 관리 주소에 연결 안내가 표시되고 로그인 창은 실행되지 않습니다.
브라우저에서 GitHub 로그인 팝업을 허용해야 합니다.

### 사용 방법

- **새 글:** 블로그 글 → 새 글 → 제목·날짜·카테고리·본문 입력 → 발행
- **수정:** 목록에서 기존 글 선택 → 수정 → 발행
- **삭제:** 글의 삭제 메뉴 선택 → 확인 (저장소에서도 삭제됩니다.)
- **파일:** 미디어 메뉴 또는 본문 편집기의 업로드 기능 사용
- **첨부파일 링크:** PDF 등을 업로드한 후 `[다운로드](/assets/files/파일명.pdf)`를 본문에 입력
- **초안:** 공개하기를 끄고 저장하면 `published: false`로 저장되어 블로그에 표시되지 않습니다.
- **로그아웃:** 관리 도구의 사용자 메뉴에서 로그아웃

파일과 글의 변경은 GitHub 커밋으로 저장되고 Actions 배포 후 블로그에 반영됩니다.
미래 날짜의 글은 해당 날짜 이후 다시 배포해야 표시됩니다.
로그인·실제 쓰기 동작은 계정 연결 이후 확인해야 합니다.

공식 문서:
- https://decapcms.org/docs/github-backend/
- https://docs.netlify.com/manage/security/secure-access-to-sites/oauth-provider-tokens/

## 글 작성

`_posts/YYYY-MM-DD-slug.md` 파일을 만들고 아래처럼 작성합니다.
다음 코드는 작성 예시이며 실제 게시글은 포함되어 있지 않습니다.
미래 날짜의 글은 해당 날짜가 된 후 다시 빌드해야 공개됩니다.

```yaml
---
title: "글 제목"
date: YYYY-MM-DD HH:MM:SS +0900
categories: [개발]
tags: [학습]
---
```

Front matter 아래에 Markdown으로 학습 내용, 시도한 방법, 결과와 참고 자료를 적습니다.
카테고리는 아래 이름 중 하나를 정확히 사용합니다. 슬래시가 포함된 이름도 하나의 카테고리입니다.

| 카테고리 | 주소 |
| --- | --- |
| 개발 | /notes/development/ |
| CTF/Wargame | /notes/ctf-wargame/ |
| Bug Bounty | /notes/bug-bounty/ |
| 블로그/기술문서 | /notes/technical-writing/ |
| 논문/컨퍼런스 | /notes/research/ |
| 공모전/자격증 | /notes/achievements/ |

글이 없어도 홈과 카테고리 메뉴에 여섯 주제가 표시됩니다. 글을 추가하면 해당 목록에 자동으로 나타납니다.

## 개인화

- `_config.yml`: 제목, 자기소개 요약, GitHub, 이메일, 기본 테마
- `_tabs/about.md`: 자기소개
- `_data/knights_categories.yml`: 카테고리 설명
- `assets/css/knights.css`: 맞춤 디자인
- `assets/img/ssnake.svg`: 직접 만든 뱀 심볼

테마: [Chirpy](https://github.com/cotes2020/jekyll-theme-chirpy), MIT 라이선스.
