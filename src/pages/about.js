import React from 'react'
import { Link, useStaticQuery, graphql } from "gatsby"
import Layout from "../components/Layout"
import SEO from "../components/Seo"
import {
  Wrapper, 
  Image,
  BottomEdgeDown,
  BottomEdgeUp} 
  from "./pageStyles/pageStyles"
import {COLORS} from '../constants'

const AboutPage = () => {
    const { 
        wpcontent: {
            page: {
                aboutMeta: {
                    aboutHeaderPicture, aboutDescription
                }
            }
        }
    } = useStaticQuery(graphql`
    query {
        wpcontent {
        page(id: "about", idType: URI) {
          aboutMeta {
            aboutHeaderPicture {
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
            aboutDescription
          }
        }
      }
    }
    `)
    return(
        <Layout>
            <Wrapper descriptionColor={COLORS.GREY}>
            <div className="banner">
                <Image fluid={aboutHeaderPicture.imageFile.childImageSharp.fluid} 
                alt={aboutHeaderPicture.altText}/>
                <BottomEdgeDown color={COLORS.SECONDARY}/>
            </div>
            <div className="description">
                <h2>About</h2>
                <p>{aboutDescription}</p>
                <BottomEdgeUp color={COLORS.BLACK}/>
            </div>
            </Wrapper>
        </Layout>
    )
}

export default AboutPage