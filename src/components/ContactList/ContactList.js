import React from 'react';

const contacts = ({ onChange, onVisible, onRemove }) => (
  <div>
    <label>
      find contacts by name
      <input onChange={onChange} name="filter"></input>
    </label>
    <ul>
      {onVisible.map(visibleTask => (
        <li key={visibleTask.id}>
          {visibleTask.name}:{visibleTask.number}
          <button onClick={() => onRemove(visibleTask.id)}>delete</button>
        </li>
      ))}
    </ul>
  </div>
);

export default contacts;
