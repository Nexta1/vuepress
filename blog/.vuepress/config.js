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
              { text: "Markdown", link: "/tool/markdown/" },
              { text: "Vim", link: "/tool/vim.md" },
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
        text: "Java",
        items: [
          {
            text: "Spring",
            items: [
              { text: "Spring", link: "/spring/spring.md" },
              { text: "SpringBoot", link: "/spring/springboot.md" },
            ],
          },
          {
            text: "常用集成",
            items: [
              { text: "JPA", link: "/spring/jpa.md" },
              { text: "Cache", link: "/spring/cache.md" },
              { text: "Security", link: "/spring/SpringSecurity.md" },
              { text: "Mybatis", link: "/spring/mybatis.md" },
              { text: "Swagger", link: "/spring/swagger.md" },
            ],
          },
          {
            text: "基础知识",
            items: [{ text: "常用类", link: "/spring/java/常用类.md" }],
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
