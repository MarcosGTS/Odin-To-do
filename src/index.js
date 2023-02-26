import createProject from './project';

const state = [
  createProject(),
];

state.forEach((e) => console.log(e));
