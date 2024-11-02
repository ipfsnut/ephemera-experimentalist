class NSTErrorBoundary extends React.Component {
  state = { hasError: false, error: null };

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="error-container">
          <h2>Trial Error</h2>
          <button onClick={() => dispatch({ type: 'RESET_ERROR' })}>
            Retry Trial
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}
