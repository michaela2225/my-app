import React, { useContext } from 'react';
import { EmployeeContext } from '../../exployee-context';

import { employeesWithMonth } from '../../constants';

import './date-brithday-list.css';

const DateBrithdayList = () => {
  const { employees } = useContext(EmployeeContext);
  const employeesWithDob = [];

  employees.forEach((item) => {
    item.employees.forEach(
      (employee) =>
        employee.showDateBirthday && employeesWithDob.push(employee),
    );
  });

  employeesWithMonth.forEach((item) => {
    employeesWithDob.forEach((employee) => {
      if (item.month === employee.dob.split(' ')[1]) {
        const id = item.employees.find((e) => e.id === employee.id);
        !id && item.employees.push(employee);
      }
    });

    item.employees = item.employees.filter((e) => e.showDateBirthday);
  });

  return (
    <div className="list-dob-wr">
      <div className="list-title">Employees birthday</div>
      {employeesWithMonth.map((item, index) => (
        <ul key={`employee-dob-${index}`}>
          {item.employees.length > 0 ? (
            <>
              <li className="list-title">{item.month}</li>
              <ul>
                {item.employees.map((employee) => (
                  <li key={`dob-${employee.id}`} className="list-dob-element">
                    <div>{`${employee.lastName} ${employee.dob}`}</div>
                  </li>
                ))}
              </ul>
            </>
          ) : (
            <></>
          )}
        </ul>
      ))}
    </div>
  );
};

export default DateBrithdayList;
