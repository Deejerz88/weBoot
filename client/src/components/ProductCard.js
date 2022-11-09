export default function ProductCard(product) {
  let {
    id,
    title,
    description,
    category,
    price,
    images,
    tags,
    reviews,
    compareAtPrice,
  } = product;
  const image = images[0];
  compareAtPrice = compareAtPrice
    ? `<span class="onSale">$${compareAtPrice}</span>`
    : "";
  tags = tags?.join(", ");
  const reviewString = reviews?.map((review) => {
    let stars = "";
    for (let i = 0; i < review.rating; i++) {
      stars += "⭐";
    }
    return `<p>${stars} ${review.body}</p>`;
  });
  reviews = reviewString?.join("");

  return `
    <div id='product-row-${id}'>
      <div class='card d-flex flex-row border-0' >
        <img src=${image} class='card-img-top product-card-image' alt='...' style="width:250px"/>
        <div class='card-body '>
          <h4 class='card-title product-card-title'>${title}</h4>
          <p class='card-text card-price'>
          $${price} ${compareAtPrice}</p>
          <div class='d-flex flex-row border rounded border-opacity-50'>
            <div class='col m-3'>
              <p class='card-text card-des'><b>Description:</b> <br/>  ${description}</p>
              <p class='card-text card-cat'> <b>Category:</b> <br/> ${category}</p>
            </div>
            <div class='col m-3'>
              <p class='card-text card-tags'> <b>Tags:</b> <br/> ${tags}</p>
              <p class='card-text card-reviews'> <b>Reviews:</b> <br/> ${reviews}</p>
            </div>
          </div>
        </div>
      </div>
    </div>`;
}
