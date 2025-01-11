import React from "react";
import "./timeline.css";

const Timeline: React.FC = () => {
  return (
    <div style={{
        margin: "25px 25px 25px 25px",
    }}>
        <div className="timeline">
        <div className="timeline-item">
            <div className="timeline-content">
            <h3>Event 1</h3>
            <p>This is the description for the first event.</p>
            </div>
        </div>
        <div className="timeline-item">
            <div className="timeline-content">
            <h3>Event 2</h3>
            <p>This is the description for the second event.</p>
            </div>
        </div>
        <div className="timeline-item">
            <div className="timeline-content">
            <h3>Event 3</h3>
            <p>This is the description for the third event.</p>
            </div>
        </div>
        <div className="timeline-item">
            <div className="timeline-content">
            <h3>Event 4</h3>
            <p>This is the description for the third event.</p>
            </div>
        </div>
        <div className="timeline-item">
            <div className="timeline-content">
            <h3>Event 5</h3>
            <p>This is the description for the third event.</p>
            </div>
        </div>
        </div>
    </div>
  );
};

export default Timeline;
