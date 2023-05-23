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
  ],

  themeConfig: {
    lastUpdated: "Last Updated", // string | boolean
    displayAllHeaders: true, // 默认值：false
    sidebar: "auto",
    logo: "/logo.webp",
    nav: [
      { text: "Home", link: "/" },
      {
        text: "Tools",
        items: [
          {
            text: "常用工具",
            items: [
              { text: "Git", link: "/tool/git/" },
              { text: "Brew", link: "/tool/brew/" },
            ],
          },
          {
            text: "Node tools",
            items: [
              { text: "npm", link: "/tool/node/yarn.md" },
              { text: "yarn", link: "/tool/node/npm.md" },
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
        ],
      },
      {
        text: "Spring",
        items: [
          {
            text: "基础知识",
            items: [
              { text: "Spring", link: "/spring/spring.md" },
              { text: "SpringMvc", link: "/spring/springmvc.md" },
              { text: "SpringBoot", link: "/spring/springboot.md" },
            ],
          },
          {
            text: "常用集成",
            items: [
              { text: "JPA", link: "/spring/jpa.md" },
              { text: "Security", link: "/spring/SpringSecurity.md" },
            ],
          },
        ],
      },
      {
        text: "Js",
        ariaLabel: "Language Menu",
        items: [
          { text: "MarkDown", link: "/tool/markdown/" },
          { text: "Japanese", link: "/language/japanese/" },
        ],
      },
      {
        text: "Server",
        ariaLabel: "Language Menu",
        items: [
          { text: "Docker", link: "/tool/markdown/" },
          { text: "Linux", link: "/language/japanese/" },
        ],
      },
      {
        text: "Database",
        ariaLabel: "Language Menu",
        items: [
          { text: "Mysql", link: "/db/mysql.md" },
          { text: "Redis", link: "/db/redis.md" },
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
