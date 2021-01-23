import React from 'react'
import {graphql} from 'gatsby'
import Layout from '../components/Layout'
import SEO from '../components/Seo'
import {Wrapper, Image} from './templateStyles/movieStyles'

const MovieTemplate = ({
    data: {
        wpcontent: {
            movie: {
                movie,
                genres: {
                    edges: genres
                },
            },
        },
    },
}
) => {
    return  (<Layout>
        <SEO title="Movie"/>
        <Wrapper>
            <div className="movie-container">
            <div className="movie-image">
            <Image fluid={movie.movieImage.imageFile.childImageSharp.fluid}
             alt={movie.altText}
             />
             <div className="genres">
                 {genres.map(({node: genre}) => (
                 <div className="genre">{genre.name}</div>
                 ))}
             </div>
             </div>
             <div className="movie-info">
                 <div className="description">
                 <h2>{movie.title}</h2>
                 <h2>{movie.releaseYear}</h2>
                 <h3>{movie.director}</h3>
                 <h4>{movie.stars}</h4>
             </div>
             </div>
            </div>
        </Wrapper>
    </Layout>)
}

export default MovieTemplate

export const pageQuery = graphql`
query ($id: ID!) {
    wpcontent {
    movie(id: $id, idType: ID) {
      genres {
        edges {
          node {
            name
          }
        }
      }
      movie {
        title
        releaseYear
        director
        stars
        movieImage {
            sourceUrl
                imageFile {
                    childImageSharp {
                        fluid(quality: 100) {
                        ...GatsbyImageSharpFluid_withWebp
                    }
                }
            }
          altText
        }
      }
    }
  }
}
`