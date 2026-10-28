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
