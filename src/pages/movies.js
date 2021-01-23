import React from 'react'
import { useStaticQuery, graphql } from "gatsby"
import Layout from "../components/Layout"
import SEO from "../components/Seo"
import {
  Wrapper, 
  Image,
  BottomEdgeDown,
  BottomEdgeUp,
  Movie} 
  from "./pageStyles/pageStyles"
import {COLORS} from '../constants'

const MoviesPage = () => {
    const {
    wpcontent: {
        page:{
            moviesMeta: {
                moviesPageDescription,
                moviesPageHeaderPicture
            },
        },
        movies: {
            edges: movies
        },
    },
    } = useStaticQuery(graphql`
    query {
        wpcontent {
        page(id: "movies", idType: URI) {
          moviesMeta {
            moviesPageDescription
            moviesPageHeaderPicture {
              altText
              sourceUrl
                imageFile {
                    childImageSharp {
                        fluid(quality: 100) {
                        ...GatsbyImageSharpFluid_withWebp
                    }
                }
            }
            }
          }
        }
        movies {
            edges {
              node {
                movie {
                    movieImage {
                        altText
                        sourceUrl
                          imageFile {
                            childImageSharp {
                              fluid(quality: 100) {
                                ...GatsbyImageSharpFluid_withWebp
                            }
                        }
                      }
                    }
                  title
                  releaseYear
                  genre {
                    name
                  }
                  director
                  stars
                }
                slug
              }
            }
          }
      }
    }

    `)
    
    return(
        <Layout>
            <SEO title="Movies"/>
            <Wrapper moviesColor={COLORS.BLACK} descriptionColor={COLORS.SECONDARY}>
            <div className="banner">
                <Image fluid={moviesPageHeaderPicture.imageFile.childImageSharp.fluid}
                alt={moviesPageHeaderPicture.altText}
                />
                <BottomEdgeUp color={COLORS.BLACK}/>
            </div>
            <div className="description">
                <h2>Classics.Imho</h2>
                <p>{moviesPageDescription}</p>
                <BottomEdgeUp color={COLORS.BLACK}/>
            </div>
            <div className="movies">
                <h2>Classics</h2>
                <div className="movie-items">
                    {movies.map(({node: {movie, slug} }) => (
                        <Movie to={`${slug}`} key={slug}>
                            <Image fluid={movie.movieImage.imageFile.childImageSharp.fluid}
                            alt={movie.movieImage.altText}
                            />
                            <div className="movie-info">
                                <p>
                                    {movie.title} {movie.releaseYear}
                                </p>
                                {movie.director && <p>{movie.director}</p>}
                           </div>
                        </Movie>
                    ))} 
                </div>
            </div>
            </Wrapper>
        </Layout>
    )
}

export default MoviesPage