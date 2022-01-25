import * as React from 'react';
import { RecoilRoot } from 'recoil';
import { ErrorBoundary } from './error';
import { TodoApp } from './todo-app';

export const App: React.FC = () => {
  return (
    <RecoilRoot>
      <ErrorBoundary>
        <TodoApp />
      </ErrorBoundary>
    </RecoilRoot>
  );
};
