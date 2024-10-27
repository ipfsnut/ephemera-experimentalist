const useResponseHandler = (digit, onResponse) => {
  const handleResponse = async (key) => {
    const response = {
      digit,
      response: key,
      timestamp: Date.now()
    };
    
    // Let backend validate correctness
    const result = await fetch(`/api/experiment/${sessionId}/response`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(response)
    });
    
    const validatedResponse = await result.json();
    onResponse(validatedResponse);
  };
  return handleResponse;
};
