import { IsPlayingPipe } from './is-playing.pipe';

describe('IsPlayingPipe', () => {
  it('create an instance', () => {
    const pipe = new IsPlayingPipe();
    expect(pipe).toBeTruthy();
  });
});
