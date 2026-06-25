const SupportSteps = ({ data }) => {
    const { title, steps } = data;

    if (!steps || steps.length === 0) return null;

    return (
        <div className="support-steps">
            {title && <h3 className="steps-title">{title}</h3>}
            <div className="stepper-container">
                {steps.map((step, idx) => (
                    <div key={idx} className="step-item">
                        <div className="step-indicator">
                            <div className="step-circle">{idx + 1}</div>
                            {idx < steps.length - 1 && <div className="step-line"></div>}
                        </div>
                        <div className="step-content">
                            {step}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default SupportSteps;
