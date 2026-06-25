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
                            <th key={idx}>{p.name}</th>
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
