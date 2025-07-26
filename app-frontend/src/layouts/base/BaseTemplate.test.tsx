import { render, screen } from '@testing-library/react';

jest.mock('../../components/Header', () => () => <div data-testid="mock_header">Header Mock</div>);

import BaseTemplate from ".";

describe("BaseTemplate component", () => {
  it('renders the heading and paragraph correctly', () => {
    render(
      <BaseTemplate>
        <div>Child Content</div>
      </BaseTemplate>
    );

    expect(screen.getByText('Child Content')).toBeInTheDocument();
    expect(screen.getByTestId('mock_header')).toBeInTheDocument();
  });
});
