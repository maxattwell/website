const ProjectSection = ({ refs }) => {
  return (
    <section ref={refs.projectRef} className="project-section">
      <div className="project-content">
        <h2 ref={refs.titleRef} className="project-title">Project</h2>
        <div className="project-media">
          <div ref={refs.imageRef} className="project-image-container">
            <img src="/src/assets/iphones_image.png" alt="Project" className="project-image" />
          </div>
          <p ref={refs.paragraphRef} className="project-paragraph">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </p>
        </div>
      </div>
    </section>
  );
};

export default ProjectSection;
