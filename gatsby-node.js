const path = require(`path`)
const { createFilePath } = require(`gatsby-source-filesystem`)

exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions

  return new Promise((resolve, reject) => {
    graphql(`
      {
        allDatoCmsGame {
          edges {
            node {
              slug
            }
          }
        }
      }
    `).then(result => {
      result.data.allDatoCmsGame.edges.map(({ node: game }) => {
        createPage({
          path: `games/${game.slug}`,
          component: path.resolve(`./src/templates/games.js`),
          context: {
            slug: game.slug,
          },
        })
      })
      resolve()
    })
  })
}
