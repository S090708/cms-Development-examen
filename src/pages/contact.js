import React from 'react'
import { useStaticQuery, graphql } from "gatsby"
import {RiMailSendFill, RiPhoneLine, RiUserLocationLine} from 'react-icons/ri'
import Layout from "../components/Layout"
import SEO from "../components/Seo"
import {
  Wrapper, 
  Image,
  BottomEdgeDown,
  BottomEdgeUp} 
  from "./pageStyles/pageStyles"
import {COLORS} from '../constants'

const ContactPage = () => {
    const {
        wpcontent: {
            page: {
                contactMeta: {
            contactAddress,
            contactCity,
            contactDescription,
            contactEmail,
            contactPhone,
            contactPostalCode,
            contactHeaderPicture
                }
            }
        }
    } = useStaticQuery(graphql`
   query { wpcontent {
        page(id: "contact", idType: URI) {
          contactMeta {
            contactAddress
            contactCity
            contactDescription
            contactEmail
            contactPhone
            contactPostalCode
            contactHeaderPicture {
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
      }
    }
    `)

    return(
        <Layout>
           <SEO title="Contact"/>
           <Wrapper descriptionColor={COLORS.PRIMARY}>
               <div className="banner">
                   <Image fluid={contactHeaderPicture.imageFile.childImageSharp.fluid}
                   alt={contactHeaderPicture.altText}
                   />
                   <BottomEdgeUp color={COLORS.PRIMARY}/>
               </div>
               <div className="description">
                   <h2>Hit us up</h2>
                   <p>{contactDescription}</p>
                   <BottomEdgeDown color={COLORS.BLACK}/>
               </div>
               <div className="contact-info">
                   <div>
                       <RiMailSendFill style={{height: "4rem", width: "4rem"}}/>
                        <p>Email us at{" "} <a target="__blank" href={`mailto:${contactEmail}`}>
                                {contactEmail}
                            </a>
                        </p>
                   </div>
                   <div>
                       <RiPhoneLine style={{height: "4rem", width: "4rem"}}/>
                        <p>Call us: {contactPhone}</p>
                   </div>
                   <div>
                       <RiUserLocationLine style={{height: "4rem", width: "4rem"}}/>
                        <p>
                            {contactAddress}, {contactPostalCode}, {contactCity}
                        </p>
                   </div>
               </div>
           </Wrapper>
        </Layout>
    )
}

export default ContactPage