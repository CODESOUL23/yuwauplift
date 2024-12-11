// Organization.js
import React, { useState } from 'react';
import './organisation.css';
import backgroundImage from '../components/orgBg.jpg';

const Organization = () => {
  const [formData, setFormData] = useState({
    studentEmail: '',
    parentEmail: '',
    semester: '',
    grades: {
      dataStructures: { exam1: '', exam2: '', exam3: '' },
      webDevelopment: { exam1: '', exam2: '', exam3: '' },
      mathematics: { exam1: '', exam2: '', exam3: '' }
    }
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleGradeChange = (subject, exam, value) => {
    // Convert value to number for comparison
    const numValue = Number(value);
    
    // Check if value exceeds 20
    if (numValue > 20) {
      alert('Maximum marks allowed is 20');
      // Set value to 20 if exceeded
      value = '20';
    }

    setFormData(prev => ({
      ...prev,
      grades: {
        ...prev.grades,
        [subject]: {
          ...prev.grades[subject],
          [exam]: value
        }
      }
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    // Add your submission logic here
  };

  return (
    <div 
      className="org-page-container" 
      style={{ 
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        minHeight: '100vh'
      }}
    >
      <div className="org-overlay"></div>
      <div className="org-container">
        <h2>Student Performance Management</h2>
        <form onSubmit={handleSubmit} className="org-form">
          <div className="form-group">
            <label>Student Email:</label>
            <input
              type="email"
              name="studentEmail"
              value={formData.studentEmail}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Parent Email:</label>
            <input
              type="email"
              name="parentEmail"
              value={formData.parentEmail}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Semester:</label>
            <select
              name="semester"
              value={formData.semester}
              onChange={handleInputChange}
              required
            >
              <option value="">Select Semester</option>
              {[...Array(8)].map((_, i) => (
                <option key={i + 1} value={i + 1}>
                  Semester {i + 1}
                </option>
              ))}
            </select>
          </div>

          <div className="grades-table">
            <table>
              <thead>
                <tr>
                  <th>Subject</th>
                  <th>Exam 1</th>
                  <th>Exam 2</th>
                  <th>Exam 3</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Data Structures</td>
                  {['exam1', 'exam2', 'exam3'].map((exam) => (
                    <td key={exam}>
                      <input
                        type="number"
                        min="0"
                        max="20"
                        value={formData.grades.dataStructures[exam]}
                        onChange={(e) => handleGradeChange('dataStructures', exam, e.target.value)}
                        required
                      />
                    </td>
                  ))}
                </tr>
                <tr>
                  <td>Web Development</td>
                  {['exam1', 'exam2', 'exam3'].map((exam) => (
                    <td key={exam}>
                      <input
                        type="number"
                        min="0"
                        max="20"
                        value={formData.grades.webDevelopment[exam]}
                        onChange={(e) => handleGradeChange('webDevelopment', exam, e.target.value)}
                        required
                      />
                    </td>
                  ))}
                </tr>
                <tr>
                  <td>Mathematics</td>
                  {['exam1', 'exam2', 'exam3'].map((exam) => (
                    <td key={exam}>
                      <input
                        type="number"
                        min="0"
                        max="20"
                        value={formData.grades.mathematics[exam]}
                        onChange={(e) => handleGradeChange('mathematics', exam, e.target.value)}
                        required
                      />
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>

          <button type="submit" className="submit-btn">Submit Grades</button>
        </form>
      </div>
    </div>
  );
};

export default Organization;