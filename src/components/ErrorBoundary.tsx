import { Component, type ErrorInfo, type ReactNode } from 'react';
import RootErrorFallback from '@/components/RootErrorFallback';

type Props = {
  children: ReactNode;
};

type State = {
  hasError: boolean;
};

export default class ErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false };

  static getDerivedStateFromError(): State {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Unhandled application error', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return <RootErrorFallback />;
    }

    return this.props.children;
  }
}
