const ratingFilter = (row, rating) => {
  console.log('ratings', row, rating)
  if (!rating) return true
  const { reviews } = row
  let ratingCount = 0
  reviews.forEach((review) => {
    const { rating } = review
    ratingCount += rating
  })
  const avgRating = ratingCount / reviews.length
  console.log('avgRating', avgRating)
  return avgRating >= rating
}

export default ratingFilter;