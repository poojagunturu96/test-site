import React from "react";
import { Helmet } from "react-helmet";
import { useStaticQuery, graphql } from "gatsby";

import "../styles/main.scss";

const Layout = ({ title, children }) => {
  const data = useStaticQuery(
    graphql`
      query {
        site {
          siteMetadata {
            title
            description
          }
        }
      }
    `
  );

  return (
    <div>
      <Helmet>
        <title>{title || data.site.siteMetadata.title}</title>
        <meta name="description" content={data.site.siteMetadata.description} />
        <link
          href="https://fonts.googleapis.com/css2?family=Domine:wght@400;700&family=Open+Sans:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
        <link
          rel="stylesheet"
          href="https://maxcdn.bootstrapcdn.com/font-awesome/4.5.0/css/font-awesome.min.css"
        />
      </Helmet>
      {children}
    </div>
  );
};

export default Layout;
