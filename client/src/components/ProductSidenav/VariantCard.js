export default function VariantCard(product) {
  let { id, title, size, color, inventory, image } = product;
  return `
    <div class="card">
      <div class="card-header">
        <h5 class="card-title">${title}</h5>
      </div>
      <div class="card-body">
        <div class="row">
          <div class="col-4">
            <img src=${image} class="card-img-top variant-card-image" alt="..." />
          </div>
          <div class="col-8">
            <p class="card-text">
              <b>Size:</b> ${size}
            </p>
            <p class="card-text">
              <b>Color:</b> ${color}
            </p>
            <p class="card-text">
              <b>Inventory:</b> ${inventory}
            </p>
          </div>
        </div>
      </div>
    </div>
  `;
}
