import ProductCard from './ProductCard';

const ProductCarousel = ({ products }) => {
    return (
        <div className="product-carousel">
            {products.map((product, idx) => (
                <div key={idx} className="carousel-item">
                    <ProductCard product={product} />
                </div>
            ))}
        </div>
    );
};

export default ProductCarousel;
