module.exports = {
  title: "知识",
  port: 8002,
  description: "Just playing around",
  markdown: {
    lineNumbers: true,
  },
  plugins: [
    [
      "@vuepress/blog",
      {
        directories: [
          {
            id: "post",
            dirname: "_posts",
          },
        ],
      },
    ],
    "@vuepress/back-to-top",
    [
      "vuepress-plugin-nuggets-style-copy",
      {
        copyText: "复制代码",
        tip: {
          content: "复制成功",
        },
      },
    ],
  ],

  themeConfig: {
    lastUpdated: "Last Updated", // string | boolean
    displayAllHeaders: true, // 默认值：false
    sidebar: {
      "/spring/": ["cache", "spring-redis"],
      "/java/": ["common-classes"],
      "/tool/": ["vim", "curl", "git", "brew", "markdown", "yarn", "npm"],
    },
    logo: "/logo.webp",
    nav: [
      { text: "Home", link: "/" },
      {
        text: "Tools",
        items: [
          {
            text: "常用工具",
            items: [
              { text: "Git", link: "/tool/git" },
              { text: "Brew", link: "/tool/brew" },
              { text: "Markdown", link: "/tool/markdown" },
              { text: "Vim", link: "/tool/vim.md" },
              { text: "Curl", link: "/tool/curl.md" },
            ],
          },
          {
            text: "Node tools",
            items: [
              { text: "npm", link: "/tool/yarn.md" },
              { text: "yarn", link: "/tool/npm.md" },
            ],
          },
        ],
      },

      {
        text: "Java",
        items: [
          {
            text: "Spring",
            items: [{ text: "SpringBoot", link: "/spring/springboot.md" }],
          },
          {
            text: "常用集成",
            items: [
              { text: "JPA", link: "/spring/jpa.md" },
              { text: "Cache", link: "/spring/cache.md" },
              { text: "Security", link: "/spring/SpringSecurity.md" },
              { text: "Mybatis", link: "/spring/mybatis.md" },
              { text: "Swagger", link: "/spring/swagger.md" },
              { text: "Jackson", link: "/spring/Jackson.md" },
              { text: "Valid", link: "/spring/Valid.md" },
            ],
          },
          {
            text: "基础知识",
            items: [{ text: "常用类", link: "/java/common-classes.md" }],
          },
        ],
      },
      {
        text: "Js",
        items: [{ text: "Nuxt", link: "/js/nuxt.md" }],
      },
      {
        text: "Server",
        items: [
          {
            text: "The server",
            items: [
              { text: "Docker", link: "/service/docker.md" },
              { text: "Linux", link: "/service/linux.md" },
            ],
          },

          {
            text: "Database",
            items: [
              { text: "Mysql", link: "/db/mysql.md" },
              { text: "Redis", link: "/db/redis.md" },
            ],
          },
        ],
      },

      {
        text: "More",
        items: [
          {
            text: "Java",
            items: [{ text: "并发编程", link: "/more/concurrent.md" }],
          },
          {
            text: "DevOps",
            items: [
              { text: "Github-actions", link: "/more/github-actions.md" },
            ],
          },
          {
            text: "Tech",
            link: "/more/technology.md",
          },
          {
            text: "Chat",
            link: "/more/chat.md",
          },
        ],
      },
      {
        text: "External",
        items: [
          {
            text: "Vue",
            items: [
              {
                text: "VuePress",
                link: "https://vuepress.vuejs.org/zh/guide/",
              },
              {
                text: "Nuxt",
                link: "https://nuxt.org.cn/getting-started/introduction",
              },
            ],
          },
          {
            text: "Spring",
            items: [
              { text: "JPA", link: "/spring/jpa.md" },
              { text: "Security", link: "/spring/SpringSecurity.md" },
            ],
          },
        ],
      },
      { text: "ChatGPT", link: "https://ai.com" },
    ],
  },
};
