import React, { useContext } from 'react';
import { EmployeeContext } from '../../exployee-context';

import './employees-list.css';

const EmployeesList = () => {
  const { employees, setEmployees } = useContext(EmployeeContext);
  return (
    <div className="list-wr">
      {employees.map((item, index) => (
        <ul key={`employee-${index}`} className="list">
          <li className="list-letter">{item.letter}</li>
          {item.employees.length > 0 ? (
            <ul>
              {item.employees.map((employee) => (
                <li key={employee.id} className="list-element">
                  <div>{employee.lastName}</div>
                  <input
                    type="checkbox"
                    onChange={() => {
                      employee.showDateBirthday = !employee.showDateBirthday;
                      setEmployees([...employees]);
                    }}
                    defaultChecked={employee.showDateBirthday}
                  />
                </li>
              ))}
            </ul>
          ) : (
            <div className="list-element">----</div>
          )}
        </ul>
      ))}
    </div>
  );
};

export default EmployeesList;
