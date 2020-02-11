import { IsNotPlayingPipe } from './is-not-playing.pipe';

describe('IsNotPlayingPipe', () => {
  it('create an instance', () => {
    const pipe = new IsNotPlayingPipe();
    expect(pipe).toBeTruthy();
  });
});
