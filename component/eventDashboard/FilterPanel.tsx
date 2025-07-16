'use client';

import React from 'react';
import './FilterPanel.css';
import { Props } from '../../types/filter';



const FilterPanel: React.FC<Props> = ({
  filterType,
  filterCategory,
  startDate,
  endDate,
  updateQueryParam,
  clearAllQueryParams,
  onClose,
}) => {

const clearAllFilters = () => {
    clearAllQueryParams(); 
};

  return (
    <div className="filter-panel">
      <div>
        <h2 className="filter-heading">Filters</h2>

        <div className="filter-group">
          <label className="filter-label">Event Type:</label>
          <select
            value={filterType}
            onChange={(e) => updateQueryParam('type', e.target.value)}
            className="filter-input"
          >
            <option value="">All Types</option>
            <option value="Online">Online</option>
            <option value="In-Person">In-Person</option>
          </select>
        </div>

        <div className="filter-group">
          <label className="filter-label">Category:</label>
          <select
            value={filterCategory}
            onChange={(e) => updateQueryParam('category', e.target.value)}
            className="filter-input"
          >
            <option value="">All Categories</option>
            <option value="Workshop">Workshop</option>
            <option value="Webinar">Webinar</option>
            <option value="Meetup">Meetup</option>
          </select>
        </div>

        <div className="filter-group">
          <label className="filter-label">Start Date:</label>
          <input
            type="date"
            value={startDate}
            onChange={(e) => updateQueryParam('start', e.target.value)}
            className="filter-input"
          />
        </div>

        <div className="filter-group">
          <label className="filter-label">End Date:</label>
          <input
            type="date"
            value={endDate}
            onChange={(e) => updateQueryParam('end', e.target.value)}
            className="filter-input"
          />
        </div>

        <button type="button" onClick={clearAllFilters} className="filter-clear-btn">
          Clear All Filters
        </button>
      </div>

      <button type="button" onClick={onClose} className="filter-close-btn">
        Close
      </button>
    </div>
  );
};

export default FilterPanel;