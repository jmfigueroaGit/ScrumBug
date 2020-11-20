const KEYS = {
    employees: 'employees',
    employeeId: 'employeeId',
};

export const getQuestionCollection = () => [
    { id: '1', title: 'What is the name of the road you grew up on?' },
    { id: '2', title: 'What is your mother’s maiden name?' },
    { id: '3', title: 'What was the name of your first/current/favorite pet?' },
    { id: '4', title: 'What was the first company that you worked for?' },
    { id: '5', title: 'Where did you meet your spouse?' },
];
export const insertEmployee = (data) => {
    let employees = getAllEmployees();
    data['id'] = generateEmployeeId();
    employees.push(data);
    localStorage.setItem(KEYS.employees, JSON.stringify(employees));
};

export const generateEmployeeId = () => {
    if (localStorage.getItem(KEYS.employeeId) == null)
        localStorage.setItem(KEYS.employeeId, '0');
    var id = parseInt(localStorage.getItem(KEYS.employeeId));
    localStorage.setItem(KEYS.employeeId, (++id).toString());
    return id;
};

export const getAllEmployees = () => {
    if (localStorage.getItem(KEYS.employees) == null)
        localStorage.setItem(KEYS.employees, JSON.stringify([]));
    return JSON.parse(localStorage.getItem(KEYS.employees));
};
