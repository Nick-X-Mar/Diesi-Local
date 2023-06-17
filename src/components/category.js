import React, { Fragment, useState } from "react"
import SEO from "../components/seo"
import SmallArticle from "../components/small-article"
import Header from "./header"
import "../styles/category.scss"

const Category = props => {
  const [lazy, setLazy] = useState(20)

  const handleLazyLoading = () => {
    setLazy(lazy + 20)
  }

  return (
    <Fragment>
      <SEO
        title={`${
          props.data.categories.articles.length > 0
            ? props.data.categories.articles[0].category.label
            : "Diesi in concert"
        }`}
      />
      <Header
        label={
          props.data.categories.articles.length > 0
            ? props.data.categories.articles[0].category.label
            : "Diesi in concert"
        }
        slug={
          props.data.categories.articles.length > 0
            ? props.data.categories.articles[0].category.slug
            : "diesi-in-concert"
        }
      />
      <div className="Category">
        <div className="articles">
          {props.data.categories.articles.slice(0, lazy).map((article, key) => (
            <SmallArticle key={`article_${key}`} data={article} />
          ))}
        </div>
        {props.data.categories.articles.length > lazy && (
          <div onClick={handleLazyLoading} className="loadMore Button">
            ΠΕΡΙΣΣΟΤΕΡΑ
          </div>
        )}
      </div>
    </Fragment>
  )
}

export default Category
