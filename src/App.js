import React, { useState, useEffect } from 'react';
import moment from 'moment';

import { employeesWithLetter, employeeApiUrl } from './constants';
import { EmployeeContext } from './exployee-context';

import EmployeesList from './views/employees-list/employees-list';
import DateBrithdayList from './views/date-brithday-list/date-brithday-list';

import './App.css';

const App = () => {
  const [finalListEmployee, setFinalListEmployee] = useState([]);

  useEffect(() => {
    fetch(employeeApiUrl)
      .then((response) => response.json())
      .then((data) => {
        data.sort((first, second) =>
          second.lastName > first.lastName ? -1 : 1,
        );
        data.forEach((employee) => {
          employee.showDateBirthday = false;
          employee.dob = moment(employee.dob).format('D MMMM YYYY');
        });
        return data;
      })
      .then((sorteredArr) => {
        employeesWithLetter.forEach((item) => {
          sorteredArr.forEach((employee) => {
            employee.lastName[0] === item.letter &&
              item.employees.push(employee);
          });
        });
        setFinalListEmployee(employeesWithLetter);
      });
  }, []);

  return (
    <div className="main-wr">
      <EmployeeContext.Provider
        value={{
          employees: finalListEmployee,
          setEmployees: setFinalListEmployee,
        }}
      >
        <EmployeesList />
        <DateBrithdayList />
      </EmployeeContext.Provider>
    </div>
  );
};

export default App;
