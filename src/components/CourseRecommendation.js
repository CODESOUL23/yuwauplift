import React, { useState } from 'react';
import './CourseRecommendation.css';

const coursesData = [
  {
    subject: 'Web Development',
    courses: [
      {
        name: 'Complete Web Development Bootcamp',
        courseLink: 'https://www.udemy.com/course/the-complete-web-development-bootcamp/',
        recommendedVideoLink: 'https://www.youtube.com/watch?v=AmX9zoLhUKU&list=PLOK_oIDzalSj0QAUIWBGOHCJVjBsPoPgR',
        videoTitle: 'The Complete 2023 Web Development Bootcamp'
      },
      {
        name: 'The Web Developer Bootcamp',
        courseLink: 'https://www.udemy.com/course/the-web-developer-bootcamp/',
        recommendedVideoLink: 'https://www.youtube.com/watch?v=MDZC8VDZnV8',
        videoTitle: '23 HOURS Free Coding Bootcamp - Build 4 Awesome Projects'
      },
      {
        name: 'Modern React with Redux',
        courseLink: 'https://www.udemy.com/course/react-redux/',
        recommendedVideoLink: 'https://www.youtube.com/watch?v=OxIDLw0M-m0&list=PL4cUxeGkcC9ij8CfkAY2RAGb-tmkNwQHG',
        videoTitle: 'Complete React Tutorial (with Redux)'
      },
      {
        name: 'Full Stack Web Development',
        courseLink: 'https://www.coursera.org/specializations/full-stack',
        recommendedVideoLink: 'https://www.youtube.com/watch?v=R6RX2Zx96fE',
        videoTitle: 'Full Stack Web Development Course 2023 | Complete Full Stack Developer Course | Simplilearn'
      },
      {
        name: 'Intro to Web Development',
        courseLink: 'https://www.edx.org/course/introduction-to-web-development',
        recommendedVideoLink: 'https://www.youtube.com/watch?v=bc0-nKpHKxU',
        videoTitle: 'Introduction to Web Development'
      }
    ]
  },
  {
    subject: 'Data Structures',
    courses: [
      {
        name: 'Data Structures and Algorithms in Python',
        courseLink: 'https://www.udacity.com/course/data-structures-and-algorithms-in-python--ud513',
        recommendedVideoLink: 'https://www.youtube.com/watch?v=pkYVOmU3MgA',
        videoTitle: 'Data Structures and Algorithms in Python'
      },
      {
        name: 'Master the Coding Interview: Data Structures',
        courseLink: 'https://www.udemy.com/course/master-the-coding-interview-data-structures-algorithms/',
        recommendedVideoLink: 'https://www.youtube.com/watch?v=8hly31xKli0',
        videoTitle: 'Master the Coding Interview: Data Structures'
      },
      {
        name: 'Data Structures Fundamentals',
        courseLink: 'https://www.edx.org/course/data-structures-fundamentals',
        recommendedVideoLink: 'https://www.youtube.com/watch?v=jXEWPZeHbM0',
        videoTitle: 'Data Structures Fundamentals'
      },
      {
        name: 'Advanced Data Structures',
        courseLink: 'https://www.coursera.org/learn/advanced-data-structures',
        recommendedVideoLink: 'https://www.youtube.com/watch?v=8h80p_rYv1Y',
        videoTitle: 'Advanced Data Structures'
      },
      {
        name: 'Practical Data Structures',
        courseLink: 'https://www.udemy.com/course/practical-data-structures-algorithms-in-python/',
        recommendedVideoLink: 'https://www.youtube.com/watch?v=zg9ih6SVACc',
        videoTitle: 'Practical Data Structures'
      }
    ]
  },
  {
    subject: 'Mathematics',
    courses: [
      {
        name: 'Linear Algebra Fundamentals',
        courseLink: 'https://www.coursera.org/learn/linear-algebra-fundamentals',
        recommendedVideoLink: 'https://www.youtube.com/watch?v=kjBOesZCoqc',
        videoTitle: 'Linear Algebra Fundamentals'
      },
      {
        name: 'Calculus Made Easy',
        courseLink: 'https://www.udemy.com/course/calculus-made-easy/',
        recommendedVideoLink: 'https://www.youtube.com/watch?v=9vKqVkMQHKk',
        videoTitle: 'Calculus Made Easy'
      },
      {
        name: 'Discrete Mathematics',
        courseLink: 'https://www.edx.org/course/discrete-mathematics',
        recommendedVideoLink: 'https://www.youtube.com/watch?v=3d6DsjIBzJ4',
        videoTitle: 'Discrete Mathematics'
      },
      {
        name: 'Statistics and Probability',
        courseLink: 'https://www.udacity.com/course/statistics-and-probability--st101',
        recommendedVideoLink: 'https://www.youtube.com/watch?v=xxpc-HPKN28',
        videoTitle: 'Statistics and Probability'
      },
      {
        name: 'Applied Mathematics',
        courseLink: 'https://www.udemy.com/course/applied-mathematics/',
        recommendedVideoLink: 'https://www.youtube.com/watch?v=iSAsNxqYbt8',
        videoTitle: 'Applied Mathematics'
      }
    ]
  }
];

const CourseRecommendation = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSubject, setSelectedSubject] = useState(null);

  const getYouTubeThumbnail = (url) => {
    const videoId = new URL(url).searchParams.get('v') || url.split('/').pop();
    return `https://img.youtube.com/vi/${videoId}/0.jpg`;
  };

  // Get unique subjects
  const subjects = coursesData.map(data => data.subject);

  const filteredCourses = coursesData
    .map((subjectData) => ({
      ...subjectData,
      courses: subjectData.courses.filter((course) =>
        (selectedSubject ? subjectData.subject === selectedSubject : true) &&
        (course.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
         course.courseLink.toLowerCase().includes(searchTerm.toLowerCase()) ||
         course.recommendedVideoLink.toLowerCase().includes(searchTerm.toLowerCase()))
      )
    }))
    .filter((subjectData) => subjectData.courses.length > 0);

  const resetFilters = () => {
    setSelectedSubject(null);
    setSearchTerm('');
  };

  return (
    <div className="course-recommendation-container">
      <h1 className="main-title">Online Course Recommendations</h1>
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search courses or links..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />
      </div>
      <div className="subject-filter-buttons">
        {subjects.map((subject) => (
          <button
            key={subject}
            onClick={() => setSelectedSubject(subject)}
            className={`subject-button ${selectedSubject === subject ? 'active' : ''}`}
          >
            {subject}
          </button>
        ))}
        {selectedSubject && (
          <button onClick={resetFilters} className="reset-button">
            Reset
          </button>
        )}
      </div>
      <div className="courses-wrapper">
        {filteredCourses.length > 0 ? (
          filteredCourses.map((subjectData, index) => (
            <div key={index} className="subject-section">
              <div className="subject-header">
                <h2>{subjectData.subject}</h2>
              </div>
              <div className="courses-grid">
                {subjectData.courses.map((course, idx) => (
                  <div key={idx} className="course-card">
                    <h3 className="course-name">{course.name}</h3>
                    <div className="course-details">
                      <div>
                        <strong>Course: </strong>
                        <a href={course.courseLink} target="_blank" rel="noopener noreferrer">
                          {course.name}
                        </a>
                      </div>
                      <div className="recommended-video">
                        <strong>Recommended video: </strong>
                        <div>
                          <a
                            href={course.recommendedVideoLink}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <img src={getYouTubeThumbnail(course.recommendedVideoLink)} alt="Thumbnail" />
                            <span>{course.videoTitle}</span>
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))
        ) : (
          <p className="no-courses-message">No courses found for "{searchTerm}"</p>
        )}
      </div>
    </div>
  );
};

export default CourseRecommendation;
