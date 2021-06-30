module.exports = {
  siteMetadata: {
    title: `Middlebury Handbook`,
    description: `Middlebury Handbook`,
  },
  flags: {
    PRESERVE_FILE_DOWNLOAD_CACHE: true,
    PRESERVE_WEBPACK_CACHE: true
  },
  plugins: [
    "gatsby-plugin-remove-fingerprints",
    "gatsby-plugin-netlify-cms",
    "gatsby-plugin-sass",
    "gatsby-transformer-remark",
    "gatsby-plugin-react-helmet",
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "i-policies-for-all",
        path: `${__dirname}/content/i-policies-for-all`,
      },
    },
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "ii-ug-college-policies",
        path: `${__dirname}/content/ii-ug-college-policies`,
      },
    },
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "iii.-policies-for-the-language-schools",
        path: `${__dirname}/content/iii-policies-for-the-language-schools`,
      },
    },
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "iv.-policies-for-the-institute",
        path: `${__dirname}/content/iv-policies-for-the-institute`,
      },
    },
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "v-handbook_archive",
        path: `${__dirname}/content/v-handbook_archive`,
      },
    },
    {
      resolve: "gatsby-plugin-local-search",
      options: {
        name: "pages",
        engine: "flexsearch",
        engineOptions: {
          encode: "icase",
          async: false,
        },
        query: `
        {
          allMarkdownRemark {
            nodes {
              id
              frontmatter {
                slug
                title
              }
              excerpt
              rawMarkdownBody
              html
            }
          }
        }
        `,
        ref: "id",
        index: ["title", "body"],
        store: ["id", "slug", "title", "body", "excerpt", "html"],
        normalizer: ({ data }) =>
          data.allMarkdownRemark.nodes.map((node) => ({
            id: node.id,
            slug: node.frontmatter.slug,
            title: node.frontmatter.title,
            body: node.rawMarkdownBody,
            excerpt: node.excerpt,
            html: node.html,
          })),
      },
    },
  ],
};
