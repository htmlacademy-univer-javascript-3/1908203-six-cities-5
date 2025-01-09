import { createMemoryHistory } from 'history';
import { render } from '@testing-library/react';
import { Route, Routes } from 'react-router-dom';
import { act } from 'react-dom/test-utils';
import { HistoryRouter } from './history-router';

describe('HistoryRouter Component', () => {
  it('should render content', () => {
    const history = createMemoryHistory();
    const content = 'Some content';

    const { container } = render(
      <HistoryRouter history={history}>
        <div>{content}</div>
      </HistoryRouter>
    );

    expect(container.innerHTML).toContain(content);
    expect(history.location.pathname).toBe('/');
  });

  it('should handle browser navigation', () => {
    const history = createMemoryHistory();

    const firstPagePath = '/';
    const secondPagePath = '/second';

    const firstPageContent = 'First Page';
    const secondPageContent = 'Second Page';

    const { container } = render(
      <HistoryRouter history={history}>
        <Routes>
          <Route path={firstPagePath} element={<div>{firstPageContent}</div>} />
          <Route path={secondPagePath} element={<div>{secondPageContent}</div>} />
        </Routes>
      </HistoryRouter>
    );

    act(() => history.push(secondPagePath));

    expect(container.innerHTML).toContain(secondPageContent);

    act(() => history.back());

    expect(container.innerHTML).toContain(firstPageContent);
  });

  it('should update content on page push', () => {
    const history = createMemoryHistory();
    const firstPagePath = '/';
    const secondPagePath = '/second';

    const firstPageContent = 'First Page';
    const secondPageContent = 'Second Page';

    const { container } = render(
      <HistoryRouter history={history}>
        <Routes>
          <Route path={firstPagePath} element={<div>{firstPageContent}</div>} />
          <Route path={secondPagePath} element={<div>{secondPageContent}</div>} />
        </Routes>
      </HistoryRouter>
    );

    expect(container.innerHTML).toContain(firstPageContent);

    act(() => history.push(secondPagePath));

    expect(container.innerHTML).toContain(secondPageContent);
  });
});
