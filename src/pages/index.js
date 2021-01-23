import React from "react"
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

const IndexPage = () => {
  const {
    wpcontent: {
      page: {
        homeMeta: {
          homePageDescription,
          homePageFeaturedMovies,
          homePageHeaderDescription,
          homePageHeaderImage,
          homePageHeaderTitle
        }
      }
    }
  } = useStaticQuery(graphql `
  query {
    wpcontent {
      page(id: "home", idType: URI) {
        homeMeta {
          homePageHeaderImage {
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
          homePageHeaderTitle
          homePageHeaderDescription
          homePageDescription
          homePageFeaturedMovies {
            ... on WPGraphql_Movie {
              id
              slug
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
            }
          }
        }
      }
    }
  }
  `)

  return (
    <Layout>
      <SEO title="Home" />
      <Wrapper>
        <div className="banner">
          <Image fluid={homePageHeaderImage.imageFile.childImageSharp.fluid} 
          alt={homePageHeaderImage.altText}
          />
          <div className="inner-div">
            <p className="header-title">{homePageHeaderTitle}</p>
            <p className="header-description">{homePageHeaderDescription}</p>
          </div>
          <BottomEdgeDown color={COLORS.BLACK}/>
        </div>
        <div className="description">
          <p>{homePageDescription}</p>
          <BottomEdgeUp color={COLORS.SECONDARY} />
        </div>
        <div className="movies">
          <h2>Featured Movies</h2>
          <div className="movie-items">
            {homePageFeaturedMovies.map(({movie, slug}) => (
              <Movie to={`/${slug}`} key={slug}>
              <Image fluid={movie.movieImage.imageFile.childImageSharp.fluid} 
              altText={movie.altText}
              />
              <div className="movie-info">
                <p>{movie.title} {movie.releaseYear}</p>
              </div>
              </Movie>
              
            ))}
          </div>
        </div>
      </Wrapper>
    </Layout>
  )
}

export default IndexPage
