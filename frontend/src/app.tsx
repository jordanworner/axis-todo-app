import * as React from 'react';
import { RecoilRoot } from 'recoil';
import { TodoApp } from './todo-app';

export const App: React.FC = () => {
  return (
    <RecoilRoot>
      <TodoApp />
    </RecoilRoot>
  );
};
