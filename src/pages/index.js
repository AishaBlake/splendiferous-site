import React from 'react'
import { Link, graphql } from 'gatsby'
import Masonry from 'react-masonry-component'
import Img from 'gatsby-image'
import Layout from "../components/layout"

const IndexPage = ({ data }) => (
  <Layout>
    <Masonry className="showcase">
      {data.allDatoCmsGame.edges.map(({ node: game }) => (
        <div key={game.id} className="showcase__item">
          <figure className="card">
            <Link to={`/games/${game.slug}`} className="card__image">
              <Img fluid={game.coverImage.fluid} />
            </Link>
            <figcaption className="card__caption">
              <h6 className="card__title">
                <Link to={`/games/${game.slug}`}>{game.title}</Link>
              </h6>
              <div className="card__description">
                <p>{game.pitch}</p>
              </div>
            </figcaption>
          </figure>
        </div>
      ))}
    </Masonry>
  </Layout>
)

export default IndexPage

export const query = graphql`
  query IndexQuery {
    allDatoCmsGame(sort: { fields: [position], order: ASC }) {
      edges {
        node {
          id
          title
          slug
          pitch
          coverImage {
            fluid(maxWidth: 450, imgixParams: { fm: "jpg", auto: "compress" }) {
              ...GatsbyDatoCmsSizes
            }
          }
        }
      }
    }
  }
`
