import * as React from 'react';

export interface ErrorBoundaryProps {}

interface ErrorBoundaryState {
  hasError: boolean;
}

export class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: any) {
    console.error(error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="max-w-sm m-auto bg-white text-center p-4 rounded-md my-4">
          <h1>Something went wrong.</h1>
        </div>
      );
    }

    return this.props.children; 
  }
}