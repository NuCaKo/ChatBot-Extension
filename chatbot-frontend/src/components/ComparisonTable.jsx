const ComparisonTable = ({ matrix }) => {
    const { attributes, products } = matrix;

    if (!attributes || !products || products.length === 0) return null;

    return (
        <div className="comparison-table-container">
            <table className="comparison-table">
                <thead>
                    <tr>
                        <th className="attribute-col">Özellikler</th>
                        {products.map((p, idx) => (
                            <th key={idx} className="comparison-th-product">
                                {p.image_url && (
                                    <div className="comparison-image-container">
                                        <img src={p.image_url} alt={p.name} className="comparison-product-image" />
                                    </div>
                                )}
                                <div className="comparison-product-name">{p.name}</div>
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {attributes.map((attr, attrIdx) => (
                        <tr key={attrIdx}>
                            <td className="attribute-col">{attr}</td>
                            {products.map((p, pIdx) => (
                                <td key={pIdx}>{p.values[attrIdx]}</td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ComparisonTable;
