import React from "react";
import "../styles/training.css";
import { useNavigate } from "react-router-dom";

const TrainingProgram = () => {
    const navigate = useNavigate();

    const programs = [
        { title: "🏁 Beginner Full-Body Program", short: "Perfect for newcomers learning the basics.", details: "Light weights, form training, mobility sessions, and gradual strength progression." },
        { title: "🔥 Weight Loss / Fat Burn Program", short: "High-intensity calorie-burning routine.", details: "HIIT, circuits, fat-burn cardio, and metabolic conditioning sessions." },
        { title: "💪 Muscle Gain (Hypertrophy)", short: "Maximize muscle growth and strength.", details: "High-volume workouts, progressive overload, and targeted muscle isolation." },
        { title: "🏋️ Strength Training (Power)", short: "Focused on heavy compound lifting.", details: "5×5 strength training, low reps, heavy weight, and progressive overload." },
        { title: "⚡ Athlete Conditioning Program", short: "Speed, agility, explosiveness.", details: "Plyometrics, sprints, explosive movements, and high-performance conditioning." },
        { title: "🏆 5-Day Bodybuilding Split", short: "Classic physique-building training.", details: "Body-part splits, high volume, and maximum muscle isolation." },
    ];

    const handleProgramClick = (program) => {
        const encodedName = encodeURIComponent(program.title);
        navigate(`/training-detail/${encodedName}`);
    };

    return (
        <>
            <div className="program-container">
                <h1 className="program-title">Training Programs</h1>

                <p className="program-subtitle">
                    Structured plans built to match your goals, fitness level, and performance needs
                </p>

                <p className="program-intro">
                    Hover over a program to preview details, then click to continue.
                </p>

                {programs.map((p, index) => (
                    <div
                        key={index}
                        className="program-card hoverable clickable"
                        onClick={() => handleProgramClick(p)}
                    >
                        <h2>{p.title}</h2>
                        <p className="program-desc">{p.short}</p>

                        <div className="hover-details">
                            <p>{p.details}</p>
                            <span className="hover-tip">Click to view details →</span>
                        </div>
                    </div>
                ))}
            </div>
        </>
    );
};

export default TrainingProgram;
