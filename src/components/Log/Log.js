import React, {useEffect, useState} from 'react';
import './Log.css';

function Log({title, data, color}) {
  return (
    <div className="Log">
      <div className="logName" style={{ "backgroundColor": color }}>
        {`${title} `}
        <span className="number">{data.length}</span>
      </div>
      <div className="logList">
        {data.length > 0 ? (
          data.map(time => <div className="result" key={time}>{time}</div>)
        ) : (
          <div id="noResults">None yet</div>
        )}
      </div>
    </div>
  );
}

export default Log;
