import { environment } from 'src/environments/environments';

export const ServerURLs = {
    bussion: environment.baseUrl + '/api/V3/',
    connector: window.location.protocol + '//' + window.location.hostname + ':**port**/api/V3/',
}

export const Endpoints = {
    dataops: ServerURLs.bussion + 'Applications/DataOps',
    scriptEndpoint: ServerURLs.bussion + 'Applications',
    token: '33722768367448188871',
    schooldataStoreid: '15222337461424284454',
    teacherDataStoreid: '27418338815215523468',
    studentDataStoreid: '61764346846487714172',
    lessonDataStoreid: '32265883462378636886',
    lessonCategoryDataStoreid: '61587354583527547431',
    login: ServerURLs.bussion + 'Logon/Login',
    logout: ServerURLs.bussion + 'Logon/Logout',

};