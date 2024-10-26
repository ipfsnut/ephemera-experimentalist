import experimentReducer, { 
  setCurrentTrial,
  updateResponse 
} from '../experimentSlice';

describe('Experiment Reducer', () => {
  test('handles trial updates', () => {
    const initialState = { currentTrial: 0 };
    const nextState = experimentReducer(initialState, setCurrentTrial(1));
    expect(nextState.currentTrial).toBe(1);
  });
});
