import { Link } from "react-router-dom";
import { config } from "../config";
import { MdArrowOutward } from "react-icons/md";
import "./MyWorks.css";

const MyWorks = () => {
  return (
    <div className="myworks-page">
      <div className="myworks-header">
        <Link to="/" className="back-button" data-cursor="disable">
          ← Back to Home
        </Link>
        <h1>
          All <span>Works</span>
        </h1>
        <p>A collection of all my projects and creations</p>
      </div>

      <div className="myworks-grid">
        {config.projects.map((project, index) => (
          <div className="myworks-card" key={project.id} data-cursor="disable">
            <div className="myworks-card-number">0{index + 1}</div>
            <div className="myworks-card-image">
              <img src={project.image} alt={project.title} />
            </div>
            <div className="myworks-card-info">
              <h3>{project.title}</h3>
              <p className="myworks-card-category">{project.category}</p>
              <p className="myworks-card-description">{project.description}</p>
              <p className="myworks-card-tech">{project.technologies}</p>

              <div className="myworks-card-links">
                <div className="social-section">
                  <h4>Social</h4>
                  {project.github && (
                    <a href={project.github} target="_blank" rel="noopener noreferrer" className="project-link">
                      Github <MdArrowOutward />
                    </a>
                  )}
                  {project.github2 && (
                    <a href={project.github2} target="_blank" rel="noopener noreferrer" className="project-link">
                      Github 2 <MdArrowOutward />
                    </a>
                  )}
                  {project.demo && (
                    <a href={project.demo} target="_blank" rel="noopener noreferrer" className="project-link">
                      Live Demo <MdArrowOutward />
                    </a>
                  )}
                  {project.app && (
                    <a href={project.app} target="_blank" rel="noopener noreferrer" className="project-link">
                      App <MdArrowOutward />
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyWorks;
