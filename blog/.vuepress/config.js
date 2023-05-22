module.exports = {
  title: "知识",
  description: "Just playing around",
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
              { text: "Markdown", link: "/tool/markdown/" },
              { text: "Git", link: "/tool/git/" },
              { text: "Brew", link: "/tool/brew/" },
            ],
          },
          {
            text: "Node tools",
            items: [
              { text: "npm", link: "/tool/node/" },
              { text: "yarn", link: "/tool/node/" },
            ],
          },
        ],
      },
      {
        text: "Java",
        ariaLabel: "Language Menu",
        items: [
          { text: "MarkDown", link: "/tool/markdown/" },
          { text: "Japanese", link: "/language/japanese/" },
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
              { text: "JPA", link: "/spring/springDataJpa.md" },
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
              { text: "JPA", link: "/spring/springDataJpa.md" },
              { text: "Security", link: "/spring/SpringSecurity.md" },
            ],
          },
        ],
      },
      { text: "ChatGPT", link: "https://ai.com" },
    ],
  },
  port: 8002,
};
