import { useState } from 'react';

const ProductCard = ({ product }) => {
    const { product_name, image_url, price, key_features, product_url } = product;
    const [imageLoaded, setImageLoaded] = useState(false);

    return (
        <div className="product-card">
            <div className="product-image-container">
                {!imageLoaded && <div className="skeleton-loader image-skeleton"></div>}
                <img
                    src={image_url}
                    alt={product_name}
                    className={`product-image ${imageLoaded ? 'loaded' : ''}`}
                    onLoad={() => setImageLoaded(true)}
                />
            </div>
            <div className="product-info">
                <h3 className="product-title">{product_name}</h3>
                <div className="product-price">{price}</div>
                {key_features && key_features.length > 0 && (
                    <ul className="product-features">
                        {key_features.map((feature, idx) => (
                            <li key={idx}>{feature}</li>
                        ))}
                    </ul>
                )}
                {product_url && (
                    <a href={product_url} target="_blank" rel="noopener noreferrer" className="btn btn-primary">
                        Ürünü İncele
                    </a>
                )}
            </div>
        </div>
    );
};

export default ProductCard;
