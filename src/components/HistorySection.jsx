const HistorySection = ({ refs }) => {
  return (
    <section ref={refs.historyRef} className="history-section">
      <div className="history-content">
        <h2 ref={refs.titleRef} className="history-title">History</h2>
        <div className="history-media">
          <div ref={refs.imageRef} className="history-image-container">
            <img src="/src/assets/running-header.webp" alt="History" className="history-image" />
          </div>
          <p ref={refs.paragraphRef} className="history-paragraph">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </p>
        </div>
      </div>
    </section>
  );
};

export default HistorySection;
