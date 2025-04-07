import React from 'react';
import './Announcements.css';

const Announcements = ({ announcements }) => {
  return (
    <div className="announcements-section">
      <h2 className="announcements-title">お知らせ</h2>
      <ul className="announcements-list">
        {announcements.map((announcement, index) => (
          <li key={index} className="announcement-item">
            <div className="announcement-date">{announcement.date}</div>
            <div className="announcement-category">{announcement.category}</div>
            <div className="announcement-title">{announcement.title}</div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Announcements;
